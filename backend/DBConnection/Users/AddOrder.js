import { MongoClient, ObjectId } from "mongodb";

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
                            "ProductOptions.$.Color": item.Color,
                            "ProductOptions.$.Size": item.Size,
                            "ProductOptions.$.Qty": { $gte: item.Qty }, // Ensure sufficient stock
                        },
                        { projection: { "ProductOptions.$": 1 } }
                    );
                    console.log(product)

                    return product ? { valid: true, item } : { valid: false, item };
                })
            );

            // Check for any invalid products
            const invalidProducts = productChecks.filter((check) => !check.valid);
            if (invalidProducts.length > 0) {
                console.log("Invalid products found:", invalidProducts);
                throw new Error("One or more products are unavailable or have insufficient stock.");
            }

            // Step 2: Update product stock in a single bulk operation
            const bulkOperations = productChecks.map(({ item }) => ({
                updateOne: {
                    filter: {
                        _id: new ObjectId(item.ID),
                        "ProductOptions.Color": item.Color,
                        "ProductOptions.Size": item.Size,
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
            }

            response = insertResult
        });

        // Return success response
        console.log(response)
        return response;
    } catch (error) {
        console.error("Error in AddOrder:", error.message);
        return "Order Not Added"
    } 
};

export default AddOrder;
