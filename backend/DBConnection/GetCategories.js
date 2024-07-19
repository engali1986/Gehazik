// GetCategories is used to get all categories from Database
import { MongoClient } from "mongodb";


const uri =
    "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);


const GetCategories = async () => {
    console.log("GetCategories 0")
    try {
    await client.connect()
    const res= await client.db("Gehazik").collection("Categories").findOne({Categories:Main_Menu})
    console.log("GetCategories 1")

    console.log(res)
        
    } catch (error) {
        console.log(error)
        
    }finally{

        await client.close()

    }
    
    

   




}

export default GetCategories