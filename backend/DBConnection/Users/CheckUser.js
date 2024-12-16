import { MongoClient, ObjectId } from "mongodb";
//  This will check user credentials
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
const CheckUser=async(UserData)=>{
    
    try {
        console.log("CheckUser file 0");
    await client.connect();
    console.log("Connection established ");
    console.log("CheckUserFile 1 UserData is")
    console.log(UserData)
        const User=await client
        .db("Gehazik")
        .collection("Users")
        .findOne({Email:UserData.Email,Token:UserData.Token}).then((res=>{
            return res
        })).catch(err=>{
            console.log("CheckUserFile 2 Error")
            console.log(err)
            return "Connection error" 
        })
       if (typeof User==="object") {
        console.log("CheckUserFile 3 User found data")
        console.log(User)
        return User
        
       } else if (User==="Connection error") {
        console.log("CheckUserFile 4 Connection Error")
        return "Connection error"
        
       }else {
        console.log("CheckUserFile 5 user Not Found")
        return "User Not Found"
        
       }
        
    } catch (error) {
        console.log("CheckUserFile 6 Error")
        console.log(error)
       return "Connection error"
        
    }
}
export default CheckUser