// GetOrders is used to get list of all orders in DB
import { MongoClient } from "mongodb";


const uri =
    "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
// GetOrders function is used to get all orders

const GetOrders=async()=>{
    try {
        console.log("GetOrders 0")
    await client.connect().then(res=>{
        console.log("Connection res ")
        console.log(res)
    })
    const Orders=await client.db("Gehazik").collection("Orders").find().toArray()
    console.log("GetOrders 1")
    console.log(Orders)
    
    return Orders
        
    } catch (error) {
        console.log(error)
        
    }finally{
        await client.close().then(res=>{
            console.log("GetOrders 2")
            console.log(res)
    
        })

    }
    
    

}

export default GetOrders