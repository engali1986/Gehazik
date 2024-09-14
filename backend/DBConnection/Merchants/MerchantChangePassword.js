import { MongoClient } from "mongodb";
//  This will get All Orders for Merchant 
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
const MerchantChangePassword= async (Passworddata,MerchantData)=>{
    try {
        console.log("MercahantPasswordChange file 0")
        console.log(Passworddata.OldPassword===MerchantData.Pass)
        if (Passworddata.OldPassword===MerchantData.Pass) {
            const ChangePassword=await client
            .db("Gehazik")
            .collection("Merchants").updateOne({Email:MerchantData.Email,Name:MerchantData.Name},{$set:{Pass:Passworddata.NewPassword}}).then(res=>{
                console.log("MercahantPasswordChange file 1")
                console.log(res)
                return res
            }).catch(err=>{
                console.log("MercahantPasswordChange file 2 err")
                console.log(err)
                return "Connection Error"
            })
            console.log(typeof ChangePassword)
            if (typeof ChangePassword==="object" && ChangePassword.modifiedCount>0) {
                return "Password Updated successfully"
            } else {
                return "Internal Error" 
                
            }
           
        } else {
            return "Old Password is wrong"
        }
        
    } catch (error) {
        console.log(error)
        return "Connection Error"
    }
}

export default MerchantChangePassword