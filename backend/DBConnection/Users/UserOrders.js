import { MongoClient,ObjectId } from "mongodb";
//  This will get All Orders for User 
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
const UserOrders=async(UserData)=>{
    try {
        console.log("UserOrders file 0")
        console.log(UserData)
        const Orders=await client
        .db("Gehazik")
        .collection("Orders")
        .find({OrderedEmail:UserData.Email, OrderCancelled:false},{projection:{OrderedBy:1,OrderedDate:1,OrderedPaymentMethod:1,OrderedItems:1,OrderedValue:1,OrderDelivered:1,OrderPayed:1,OrderPaymentDate:1, OrderCompleted:1,OrderStatus:1}}).toArray()
        console.log("UserOrders file 1")
        console.log(Orders)
        console.log(Orders.length)
        if (Orders.length>0) {
            return Orders  
        } else {
            return "No Orders Found"
        }
    } catch (error) {
        return "Connection Error"
    }
}
export default UserOrders