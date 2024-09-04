// AddOrder is used to Add orders to Database
import { MongoClient } from "mongodb";


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
        



    }).then(res => {
        return res

    }).catch(err => {
        console.log("AddOrder 4")
        console.log(err)
        return "Connection error"
    })
        
    } catch (error) {
        
    }
    
    

    




}

export default AddOrder