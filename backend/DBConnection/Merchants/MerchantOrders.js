import { MongoClient } from "mongodb";
//  This will get All Orders for Merchant 
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
const MerchantOrders=async(MerchantID)=>{
    try {
        console.log("MerchantOrders file 0")
        console.log(MerchantID)
        const Orders=await client
        .db("Gehazik")
        .collection("Orders")
        .find({'OrdedredItems.MerchantID': MerchantID.toString()}).toArray()
        console.log("MerchantOrders file 1")
        console.log(Orders)
        console.log(Orders.length)
        if (Orders.length>0) {
            Orders.forEach((Order)=>{
                let Arr=Order.OrdedredItems.filter(item=>{
                    if(item.MerchantID===MerchantID.toString()){
                        return item
                    }
                })
                Order.OrdedredItems=Arr
            })
            return Orders  
        } else {
            return "No Orders Found"
        }
    } catch (error) {
        return "Connection Error"
    }
}
export default MerchantOrders