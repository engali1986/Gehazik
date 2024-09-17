import { ChangeStream, MongoClient } from "mongodb";
import UsersDBChangeEmails from "./UsersDBChangesEmails.js";
//  This will get All Orders for Merchant 
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);

const UserDBChanges=async()=>{
    let ChangeStream
    let Changes
    try {
        ChangeStream=client
        .db("Gehazik")
        .collection("Users").watch()
        for await(const Change of ChangeStream){
            console.log("Recived Changes:\n" ,Change)
            Changes=Change.updateDescription.updatedFields
            console.log(Changes)
            const Email=await UsersDBChangeEmails(Changes).then(res=>{
                console.log("Changes Emails res")
                return res
            }).catch(err=>{
                console.log("Changes Emails error")
                return "error"
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export default UserDBChanges