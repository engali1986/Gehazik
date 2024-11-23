import { MongoClient, ObjectId } from "mongodb";
//  This will check Admin credentials
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
const CheckAdmin=async(AdminData)=>{
    
    try {
        console.log("CheckAdmin file 0");
    await client.connect();
    console.log("Connection established ");
    console.log("CheckAdminFile 1 AdminData is")
    console.log(AdminData)
        const Admin=await client
        .db("Gehazik")
        .collection("Admins")
        .findOne({Email:AdminData.Email,Token:AdminData.Token}).then((res=>{
            return res
        })).catch(err=>{
            console.log("CheckAdminFile 2 Error")
            console.log(err)
            return "Connection error" 
        })
       if (typeof Admin==="object") {
        console.log("CheckAdminFile 3 Admin found data")
        console.log(Admin)
        return Admin
        
       } else if (Admin==="Connection error") {
        console.log("CheckAdminFile 4 Connection Error")
        return "Connection error"
        
       }else {
        console.log("CheckAdminFile 5 Admin Not Found")
        return "Admin Not Found"
        
       }
        
    } catch (error) {
        console.log("CheckAdminFile 6 Error")
        console.Console.og(error)
       return "Connection error"
        
    }
}
export default CheckAdmin