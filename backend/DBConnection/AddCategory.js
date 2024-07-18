// AddCategory is used to Add orders to Database
import { MongoClient } from "mongodb";


const uri =
    "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
// AddCategory function is used to add Order to database

const AddCategory = async (CategoryData) => {
    console.log("AddCategory 0")
    console.log(CategoryData)
    console.log(typeof CategoryData)
    const res = await client.db("Gehazik").collection("Categories").insertOne(CategoryData).then(res => {
        console.log("AddCategory 1")
        console.log(res)
        if (res.insertedId) {
            console.log("AddCategory 2")
            console.log(" Category Added to DB")
            return res.insertedId


        } else {
            console.log("AddCategory 3")
            console.log("Category not Added to DB")
            return "Category not Added to DB"

        }

    }).catch(err => {
        console.log("AddCategory 4")
        console.log(err)
        return "Connection error"
    })

   return res




}

export default AddCategory