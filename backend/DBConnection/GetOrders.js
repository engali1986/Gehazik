// GetOrders is used to get list of all orders in DB
import { MongoClient } from "mongodb";


const uri =
    "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
// GetOrders function is used to get all orders

const GetOrders=async(Admin)=>{
    try {
        console.log("GetOrders 0")
        console.log(Admin)
       
    await client.connect().then(res=>{
        console.log("Connection res ")
        // console.log(res)
    })
    const VarifyAdmin=await client
    .db("Gehazik")
    .collection("Admins")
    .findOne({ email: Admin.email, token: Admin.Token })
    console.log("GetOrders 0 Admin Varified")
    console.log(VarifyAdmin)

    if (VarifyAdmin.token===Admin.Token) {
    const Orders=await client.db("Gehazik").collection("Orders").find().toArray()
    console.log("GetOrders 1")
    console.log(Orders)
    
    return Orders
        
    } else {
        return "Connection Error"

        
    }

    
        
    } catch (error) {
        console.log(error)
        return "Connection Error"

        
    }finally{
        await client.close().then(res=>{
            console.log("GetOrders 2")
            console.log(res)
    
        })

    }
    
    

}

export default GetOrders