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
    // await client.connect();
    // console.log("Connection established ");
    console.log(OrderData)
    //  Next we adjust InstockQty for each product
    let Availability=false
    for (let index = 0; index < OrderData.OrderDetails.length; index++) {
        console.log("AddOrder file 1 Order.OrderDetails", [index]);
        console.log(OrderData.OrderDetails[index])
        const res=await client.db("Gehazik").collection("Products").findOne({_id:new ObjectId(OrderData.OrderDetails[index].ID)},{projection:{ProductOptions:1}}).then(res=>{
            return res
        }).catch(err=>{
            console.log(err)
            return "Product not found"
        })
        console.log("AddOrder file 2 Order.OrderDetails", [index]);
        console.log(res)
        
    }
        
    } catch (error) {
        console.log("AddOrder file 10 error");
        console.log(error)
        return "Connection error"
        
    }
    
    
    
}
export default AddOrder