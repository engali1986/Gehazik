import { MongoClient } from "mongodb";
//  this will Post Approve products to DB
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
const ApproveProducts=async(BendingProductsList)=>{
    try {
        
    } catch (error) {
        console.log("ApproveProducts File error", error)
        return "Products Not Approved"
    }
}
export default ApproveProducts