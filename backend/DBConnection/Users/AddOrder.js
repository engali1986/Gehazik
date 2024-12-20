// AddOrder is used to Add orders to Database
import { MongoClient, ObjectId } from "mongodb";
const Object=new ObjectId()
const uri =
    "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
// AddOrder function is used to add Order to database
const AddOrder = async (OrderData) => {
    try {
        console.log("AddOrder file 0");
    await client.connect();
    // console.log("Connection established ");
    console.log(OrderData)
    //  Next we check available Qty for each product
    let results=0
    for (let index = 0; index < OrderData.OrderDetails.length; index++) {
        console.log("AddOrder file 1 Order.OrderDetails", [index]);
        console.log(OrderData.OrderDetails[index])
        const res=await client.db("Gehazik").collection("Products").findOne({_id:new ObjectId(OrderData.OrderDetails[index].ID), "ProductOptions.Color":OrderData.OrderDetails[index].Color, "ProductOptions.Size":OrderData.OrderDetails[index].Size},{projection:{ProductOptions:1}}).then(res=>{
            console.log("AddOrder file 2 Order.OrderDetails", [index]);
            console.log(res)
            if (typeof res==="object" && res._id) {
                results=results+1
            } else {
                
            }
            return res
        }).catch(err=>{
            console.log(err)
            return "Product not found"
        })
        
    }
    console.log("AddOrder file 3 availability results", results, OrderData.OrderDetails.length)
    if (OrderData.OrderDetails.length===results) {
        // Next we will adjust available Qty of each item in DB
        const updateResults = await Promise.all(OrderData.OrderDetails.map(async (item) => {
            const updateResult = await client.db("Gehazik").collection("Products").updateOne({
                _id: new ObjectId(item.ID),
                "ProductOptions.Color": item.Color,
                "ProductOptions.Size": item.Size
            }, {
                $inc: { "ProductOptions.$.Qty": -item.Qty, "ProductOptions.$.OrderedQty":item.Qty }
            });

            if (updateResult.modifiedCount !== 1) {
                console.log(`Failed to update product: ID=${item.ID}, Color=${item.Color}, Size=${item.Size}`);
                return false;
            }
            return true;
        }));

        // If any update failed, terminate the process
        if (updateResults.includes(false)) {
            console.log("Failed to update one or more products.");
            return "Failed to update stock";
        }else{
            console.log("Qty updated")
        }

        // let ModefiedQty=0
        // for (let index = 0; index < OrderData.OrderDetails.length.length; index++) {
        //     const UpdateQty=await client.db("Gehazik").collection("Products").updateOne({_id:new ObjectId(OrderData.OrderDetails[index].ID), "ProductOptions.Color":OrderData.OrderDetails[index].Color, "ProductOptions.Size":OrderData.OrderDetails[index].Size},{$inc:{ "ProductOptions.$.Qty":-OrderData.OrderDetails[index].Qty}}).then(res=>{
        //         console.log(res)
        //         if (res.modifiedCount===1) {
        //             ModefiedQty=ModefiedQty+1
        //         }
        //         return res
        //     }).catch(err=>{
        //         console.log(err)
        //         return "Product not found"
        //     })
        // }
        // console.log("AddOrder file 4 ModefiedQty results", ModefiedQty, OrderData.OrderDetails.length)
    } else {
        return "Product not found"
    }
   
    } catch (error) {
        console.log("AddOrder file 10 error");
        console.log(error)
        return "Connection error"
        
    }
    
    
    
}
export default AddOrder