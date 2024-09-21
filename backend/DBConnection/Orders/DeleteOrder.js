// DeleteOrder is used to Delete orders to Database
import { MongoClient, ObjectId } from "mongodb";
const Object=new ObjectId()
const uri =
    "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
// DeleteOrder function is used to Delete Order to database
const DeleteOrders=async(CancelData)=>{
    try {
      console.log("DeleteOrder file 0");
      await client.connect();
      console.log("Connection established ");
      console.log(CancelData)
      const CancelOrder=await client.db("Gehazik").collection("Orders").updateOne({_id:new ObjectId(CancelData.OrderId)},{$push:{OrderStatus:{Status:"Cancelled",Date:new Date(),Reason:CancelData.Reason}}}).then((res)=>{
        console.log("DeleteOrder file 1");
        console.log(res)
        return res
      }).catch(err=>{
        console.log("DeleteOrder file 2 err");
        console.log(err)
        return "Connection Error"
      })
      if (typeof CancelOrder==="object" && CancelOrder.modifiedCount>0) {
        return "Order Deleted Successfully"
      } else {
        return "Order Not Deleted"
      }
        
    } catch (error) {
        console.log(error)
       return "Connection Error" 
    }

}
export default DeleteOrders