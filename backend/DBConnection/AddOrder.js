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
    console.log("Connection established ");
    console.log(OrderData)
   
   
    const res = await client.db("Gehazik").collection("Orders").insertOne({
        
        OrderedBy:OrderData.ClientName,
        OrderedEmail:OrderData.ClientEmail,
        OrderedDate:new Date(),
        OrderedPhone:OrderData.Address.Phone,
        OrderedPayed:false,
        OrderedPaymentMethod:OrderData.Address.Payment,
        OrdedredItems:OrderData.OrderDetails,
        OrderedValue:OrderData.OrderValue,
        OrderedAddress:OrderData.Address,
        MerchantConfirmed:false,
        OrderDelivered:false
        



    }).then(res => {
        console.log("AddOrder file 1 res result");
        console.log(res)
        return res

    }).catch(err => {
        console.log("AddOrder 2 error")
        console.log(err)
        return "Connection error"
    })

    console.log("AddOrder file 3 res result");
        console.log(res)
    //  Next we adjust InstockQty for each product
    let AllItemsChecked=false
    let AvailabilityChicked=false
        if (res.insertedId) {
            // first we check every product availability in stock
            for (let index = 0; index <  OrderData.OrderDetails.length; index++) {
                const CheckAvailability=await client.db("Gehazik").collection("Products").findOne({_id:new ObjectId(OrderData.OrderDetails[index].ID)},{projection:{InStockQty:1}}).then(res=>{
                    return res
                }).catch(err=>{
                    return "Connection error"
                })
                console.log("AddOrder file CheckAvailability result")
                console.log(CheckAvailability)
                console.log(typeof CheckAvailability)
                if (typeof CheckAvailability==="object") {
                 if (CheckAvailability.InStockQty>=OrderData.OrderDetails[index].Qty) {
                    console.log("AddOrder file InStockQty Check true")

                    AvailabilityChicked=true
                    
                 } else {
                    console.log("AddOrder file InStockQty Check false")
                    AvailabilityChicked=false
                    break
                    
                 }
                    
                } else {
                    console.log("AddOrder file Check availablity not object")
                    AvailabilityChicked=false
                    break
                    
                }
                
            }
            // Next we upfdate stock qty of each product
            console.log("AddOrder file 3.5 AvailabilityChicked");
            console.log(AvailabilityChicked)

            if (AvailabilityChicked===true) {
                for (let index = 0; index < OrderData.OrderDetails.length; index++) {
           
                    const UpdateQty=await client.db("Gehazik").collection("Products").updateOne({_id:new ObjectId(OrderData.OrderDetails[index].ID)},{$inc:{InStockQty:-OrderData.OrderDetails[index].Qty,
                      OrderedQty:OrderData.OrderDetails[index].Qty}}).then((res=>{
                      console.log("AddOrder file 4 Update Products Qtyresult");
                      console.log(res)
                      return res
                    })).catch(err=>{
                      console.log("AddOrder file 5 Update Products error");
                      console.log(err)
                      return "Connection error"
          
                   })
          
                   if (UpdateQty==="Connection error" || UpdateQty.modifiedCount===0) {
                      AllItemsChecked=false
                      console.log("AddOrder file 6 Update Products error");
                      return "Order Not Added"
                      break 
          
                      
                    } else {
                      AllItemsChecked=true
                      
                   }
          
                 
                  
                     }
                
            } else {
                AllItemsChecked=false
                
            }
            
        

           if (AllItemsChecked===true && AvailabilityChicked===true) {
            console.log("AddOrder file 7 Update Products Finished");
           
            return res
            
           } else {
            console.log("AddOrder file 8 Update Products Finished");
            const DeleteOrder=await client.db("Gehazik").collection("Orders").deleteOne({_id:res.insertedId}).then(res=>{
                return res
            }).catch(err=>{
                return "Order Not Added"
            })
            return "Order Not Added"
            
           }

            
        } else {
            console.log("AddOrder file 9 Order Not added");
            return "Order Not Added"
            
        }
        


        
    } catch (error) {
        console.log("AddOrder file 10 error");
        console.log(error)

        return "Connection error"

        
    }
    
    

    




}

export default AddOrder