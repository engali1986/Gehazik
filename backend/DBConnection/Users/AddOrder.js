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
    //  Next we check available Qty for each product
    let results=0
    for (let index = 0; index < OrderData.OrderDetails.length; index++) {
        console.log("AddOrder file 1 Order.OrderDetails", [index]);
        console.log(OrderData.OrderDetails[index])
        const res=await client.db("Gehazik").collection("Products").findOne({_id:new ObjectId(OrderData.OrderDetails[index].ID)},{projection:{ProductOptions:1}}).then(res=>{
            console.log("AddOrder file 2 Order.OrderDetails", [index]);
            console.log(res)
            for (let J = 0; J < res.ProductOptions.length; J++) {
                if (res.ProductOptions[J].Color===OrderData.OrderDetails[index].Color && res.ProductOptions[J].Size===OrderData.OrderDetails[index].Size && res.ProductOptions[J].Qty>OrderData.OrderDetails[index].Qty ) {
                    results=results+1
                } else {
                    
                }    
            }
            return res
        }).catch(err=>{
            console.log(err)
            return "Product not found"
        })
        
    }
    if (OrderData.OrderDetails.length===results) {
        console.log("AddOrder file 3 Order availability results", results, OrderData.OrderDetails.length );
        // Next we will adjust available Qty of each item in DB
        for (let index = 0; index < OrderData.OrderDetails.length; index++) {
            console.log("AddOrder file 4 Order.OrderDetails", [index]);
            console.log(OrderData.OrderDetails[index])
            const res=await client.db("Gehazik").collection("Products").findOne({_id:new ObjectId(OrderData.OrderDetails[index].ID)},{projection:{ProductOptions:1}}).then(res=>{
                console.log("AddOrder file 5 Order.OrderDetails", [index]);
                console.log(res)
               
                return res
            }).catch(err=>{
                console.log(err)
                return "Product not found"
            })
            let K=0 // this to find which product option index to Update
            for (let J = 0; J < res.ProductOptions.length; J++) {
                if (res.ProductOptions[J].Color===OrderData.OrderDetails[index].Color && res.ProductOptions[J].Size===OrderData.OrderDetails[index].Size ) {
                    let NewQty=OrderData.OrderDetails[index].Qty
                    const UpdateQty= await client.db("Gehazik").collection("Products").updateOne({_id:new ObjectId(OrderData.OrderDetails[index].ID), "ProductOptions.Color":OrderData.OrderDetails[index].Color, "ProductOptions.Size":OrderData.OrderDetails[index].Size },{$inc:{ "ProductOptions.$.Qty":-NewQty}})
                } else {
                    
                }    
                
            }

            
            
        }
        
    } else {
        console.log("AddOrder file 4 Some Items not available", results, OrderData.OrderDetails.length );
        return "Order Not Added"
    }
        
    } catch (error) {
        console.log("AddOrder file 10 error");
        console.log(error)
        return "Connection error"
        
    }
    
    
    
}
export default AddOrder