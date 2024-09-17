import { MongoClient, ObjectId } from "mongodb";
import mailer from "nodemailer"
//  This will send Email to all Merchants 
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
const OrderEmails=async(OrderData, OrderID)=>{
    try {
    console.log("OrderEmails file 0");
    // await client.connect();
    // console.log("Connection established ");
    // First we get all Merchant Ids from OrderData
    let MerchantIDs=[]
    for (let index = 0; index < OrderData.OrderDetails.length; index++) {
        MerchantIDs.push(OrderData.OrderDetails[index].MerchantID)
        
    }
    // then we create new array of merchant ids and remove duplicates
    const MerchantIDsSorted=[...new Set(MerchantIDs)]
    // then swe create array of Mercant emails to send the order number
    let MerchantEmails=[]
    for (let index = 0; index < MerchantIDsSorted.length; index++) {
        const MerchantEmail=await client
        .db("Gehazik")
        .collection("Merchants")
        .findOne({_id:new ObjectId(MerchantIDsSorted[index])},{projection:{Email:1}}).then(res=>{
            return res
        }).catch(error=>{
            console.log(error)
            return "Connection error"
        })
        if (typeof MerchantEmail==="object" && MerchantEmail.Email) {
            MerchantEmails.push(MerchantEmail.Email)   
        } 
    }
    // then we send email of order number for each merchant
        if (MerchantEmails.length>0) {
          let Transporter=await mailer.createTransport({
            service:"gmail",
            port: 587,
            secure:true,
            auth: {
              user: "engaligulf1986@gmail.com",
              pass: "swqtgeywhhucrcwh",
            },
            })
         for (let index = 0; index < MerchantEmails.length; index++) {
             let mailOptions = {
                from: 'Ali Mohammed <engaligulf1986@gmail.com>',
                to: MerchantEmails[index],
                subject: 'New Order Confirmation !',
                html: `<h1> You have got new Order Please confirm</h1><h2>Order Number :${OrderID}</h2>`
              };
              const result=await Transporter.sendMail(mailOptions).then(res=>{
                console.log(res)
                return res
              }).catch(err=>{
                console.log(err)
                return "Error happened"
              });
              console.log("OrderEmails file 1");
              console.log(result)
            
            }
        
        }
    // then we return to server
    
    return
        
    } catch (error) {
        console.log(error)
        return "Connection error"
        
    }
    
   
}
export default OrderEmails