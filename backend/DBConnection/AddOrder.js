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
        OrderedBy:OrderData.ClientName,
        OrderedEmail:OrderData.ClientEmail,
        OrderedDate:new Date(),
        OrderedPhone:OrderData.Address.Phone,
        OrderedPayed:OrderData.Address.Payment==="Cash on Delivery"?true:false,
        OrdedredItems:OrderData.OrderDetails,
        OrderedValue:OrderData.Ordervalue,
        OrderedAddress:OrderData.Address,
        MerchantConfirmed:false,
        OrderDelivered:false
        



    }).then(res => {
        console.log("AddOrder file 1 res result");
        console.log(res)
        return res

    }).catch(err => {
        console.log("AddOrder 2 error")
        console.log(err)
        return "Connection error"
    })

    console.log("AddOrder file 3 res result");
        console.log(res)
        return res


        
    } catch (error) {
        console.log("AddOrder file 4 error");
        console.log(error)

        return "Connection error"

        
    }
    
    

    




}

export default AddOrder