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
        .find({'OrderedItems.MerchantID': MerchantID.toString()},{projection:{OrderedBy:1,OrderedDate:1, OrderedPaymentMethod:1,OrderedItems:1,OrderDelivered:1,OrderPayed:1,OrderPaymentDate:1,MerchantPaymentSent:1, MerchantPaymentDate:1, OrderCompleted:1}}).toArray()
        console.log("MerchantOrders file 1")
        console.log(Orders)
        console.log(Orders.length)
        if (Orders.length>0) { 
            let OrderArr=Orders.filter(Item=>{
                if((Item.OrderedPaymentMethod==="Vodafone Cash" && Item.OrderPayed===true) ||(Item.OrderedPaymentMethod==="Cash on Delivery") ){
                    return Item
                }
            })

            OrderArr.forEach((Order)=>{
                let Arr=Order.OrderedItems.filter(item=>{
                    if(item.MerchantID===MerchantID.toString()){
                        return item
                    }
                })
                Order.OrderedItems=Arr
            })
            return OrderArr  
        } else {
            return "No Orders Found"
        }
    } catch (error) {
        return "Connection Error"
    }
}
export default MerchantOrders