import { MongoClient, ObjectId } from "mongodb";
import mailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from 'fs';

const uri = "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);

const AddOrder = async (OrderData) => {
    try {
        // Establish database connection
        await client.connect();
        const db = client.db("Gehazik");
        const productsCollection = db.collection("Products");
        const ordersCollection = db.collection("Orders");

        const session = client.startSession();

        let response;

        // Start transaction
        await session.withTransaction(async () => {
            // Step 1: Validate product availability
            const productChecks = await Promise.all(
                OrderData.OrderDetails.map(async (item) => {
                    const product = await productsCollection.findOne(
                        {
                            _id: new ObjectId(item.ID),
                            ProductOptions:{
                                $elemMatch: {
                                    Color: item.Color,
                                    Size: item.Size,
                                    Qty: { $gte: item.Qty } // Ensure sufficient stock
                                }
                            } // Ensure sufficient stock
                        },
                        { projection: { "ProductOptions.$": 1 } }
                    ).then(res=>{
                        console.log("AddOrder file 1")
                        console.log(res)
                        return res
                    }).catch(err=>{
                        console.log("AddOrder file 2")
                        console.log(err)
                    });
                    
                    console.log(product)

                    return product ? { valid: true, item } : { valid: false, item };
                })
            );

            // Check for any invalid products
            console.log("AddOrder file 2", productChecks)
            const invalidProducts = productChecks.filter((check) => {
                if (check.valid===false) {
                    return check
                }});
            if (invalidProducts.length > 0) {
                console.log("Invalid products found:", invalidProducts);
                throw new Error("One or more products are unavailable or have insufficient stock.");
            }

            // Step 2: Update product stock in a single bulk operation
            const bulkOperations = productChecks.map(({ item }) => ({
                updateOne: {
                    filter: {
                        _id: new ObjectId(item.ID),
                        ProductOptions:{
                            $elemMatch: {
                                Color: item.Color,
                                Size: item.Size,   
                            }
                        }
                    },
                    update: {
                        $inc: {
                            "ProductOptions.$.Qty": -item.Qty,
                            "ProductOptions.$.OrderedQty": item.Qty,
                        },
                    },
                },
            }));

            const bulkResult = await productsCollection.bulkWrite(bulkOperations, { session });
            console.log("AddOrder file 3", bulkResult)
            if (!bulkResult.modifiedCount) {
                throw new Error("Failed to update stock for one or more products.");
            }

            // Step 3: Insert order into the Orders collection
            const order = {
                OrderedBy: OrderData.ClientName,
                OrderedEmail: OrderData.ClientEmail,
                OrderedDate: new Date(),
                OrderedPhone: OrderData.Address.Phone,
                OrderedPayed: false,
                OrderedPaymentMethod: OrderData.Address.Payment,
                OrderedItems: OrderData.OrderDetails,
                OrderedValue: OrderData.OrderValue,
                OrderedAddress: OrderData.Address,
                OrderDelivered: false,
                OrderPayed: false,
                OrderPaymentDate: "",
                MerchantPaymentSent: false,
                MerchantPaymentDate: "",
                OrderCompleted: false,
                OrderCancelled: false,
                OrderCancelledDate: "",
                CancelReason: "",
                OrderStatus: [
                    {
                        Status: OrderData.Address.Payment === "Vodafone Cash" ? "Waiting Payment" : "On the way",
                        Date: new Date(),
                    },
                ],
            };

            const insertResult = await ordersCollection.insertOne(order, { session });
            if (!insertResult.insertedId) {
                throw new Error("Failed to add order to Orders collection.");
            }else{

                response = insertResult
                // Step 4: Generate PDF Invoice
                    const doc = new PDFDocument();
                    const pdfPath = `./invoice-${insertResult.insertedId}.pdf`;
                    doc.pipe(fs.createWriteStream(pdfPath));

                    doc
                        .fontSize(20)
                        .text("Invoice", { align: "center" })
                        .moveDown()
                        .fontSize(12)
                        .text(`Order ID: ${insertResult.insertedId}`)
                        .text(`Client Name: ${OrderData.ClientName}`)
                        .text(`Client Email: ${OrderData.ClientEmail}`)
                        .text(`Order Date: ${new Date().toLocaleString()}`)
                        .moveDown()
                        .text("Ordered Items:")
                        .moveDown();

                    OrderData.OrderDetails.forEach((item, index) => {
                        doc.text(`${index + 1}. Product: ${item.ProductName}, Color: ${item.Color}, Size: ${item.Size}, Qty: ${item.Qty}`);
                    });

                    doc.end();
                 // Step 5: Send Email with PDF Attachment
                    const transporter = mailer.createTransport({
                                service:"gmail",
                                port: 587, 
                                secure:true,
                                auth: {
                                  user: "engaligulf1986@gmail.com",
                                  pass: "swqtgeywhhucrcwh",
                                },
                                })
                                await transporter.sendMail({
                                    from: "Gehazik" ,
                                    to: OrderData.ClientEmail,
                                    subject: "Your Order Invoice",
                                    text: "Thank you for your order. Please find your invoice attached.",
                                    attachments: [
                                        {
                                            filename: `invoice-${insertResult.insertedId}.pdf`,
                                            path: pdfPath
                                        }
                                    ]
                                });
            }

            
        });

        // Return success response
        console.log(response)
        return response;
    } catch (error) {
        console.error("Error in AddOrder:", error);
        return error.message
    } 
};

export default AddOrder;
