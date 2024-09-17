import { MongoClient, ObjectId } from "mongodb";
import mailer from "nodemailer"
//  This will send Email to all Merchants 
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
const UsersDBChangeEmails=async(Changes)=>{
    try {
    console.log("OrderEmails file 0");
    let Keys=Object.keys(Changes)
    await client.connect();
    console.log("Connection established ");
    let Transporter=await mailer.createTransport({
      service:"gmail",
      port: 587,
      secure:true,
      auth: {
        user: "engaligulf1986@gmail.com",
        pass: "swqtgeywhhucrcwh",
      },
      })

      let mailOptions = {
        from: 'Ali Mohammed <engaligulf1986@gmail.com>',
        to: "engali1986ac@mail.com",
        subject: 'New Users Changes !',
        html: `<h1> You got new Changes</h1><div>Order Numbers: 
    ${Keys.map(item => `<div>${item}</div>`).join('')}
  </div>`
      };
      const result=await Transporter.sendMail(mailOptions).then(res=>{
        console.log(res)
        return res
      }).catch(err=>{
        console.log(err)
        return "Error happened"
      });

      if(result!=="Error happened"){
        return "Done"
      }else{
        return "Not Done"
      }
      
        
    } catch (error) {
        console.log(error)
        return "Connection error"
        
    }
    
   
}
export default UsersDBChangeEmails