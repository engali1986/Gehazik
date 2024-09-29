import mailer from "nodemailer"
import {MongoClient} from "mongodb"
const uri= "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000"
const client = new MongoClient(uri
  );
const MerchantPasswordRecovery=async(Email)=>{
    console.log("MerchantPasswordRecovery 0")
    console.log(Email)
    const user=await client.db("Gehazik").collection("Merchants").findOne({Email:Email}).then(res=>{
      console.log(res)
      return res
    }).catch(err=>{
      return "Database Error"
    })
    if (user!=="Database Error") {
      if (user!==null) {
        console.log("MerchantPasswordRecovery 1")
        console.log(user.pass)
  
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
          to: user.Email,
          subject: 'Password Recovery',
          html: `<h1> Please find below your account details</h1><h2>Email:${user.Email}</h2><h2>Password:${user.Pass}</h2>`
        };
        
        const result=await Transporter.sendMail(mailOptions).then(res=>{
          console.log(res)
          return res
        }).catch(err=>{
          console.log(err)
          return "Error happened"
        });
  
        return result
        
      } else {
        console.log("MerchantPasswordRecovery 2")
  
        return "User Not Found"
  
  
        
      }
      
      
    }else{
      console.log("MerchantPasswordRecovery 3")
      return "User Not Found"
    }
    
    
   
      
}
export default MerchantPasswordRecovery