import mailer from "nodemailer"
import {MongoClient} from "mongodb"
const uri= "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000"
const client = new MongoClient(uri
  );
const Merchantvarification=async(Email,Password)=>{
    console.log("Merchantvarification 0")
    console.log(Email)
    const Merchant=await client.db("Gehazik").collection("Merchants").findOne({Email:Email,Pass:Password}).then(res=>{
      console.log(res)
      return res
    }).catch(err=>{
      return "Database Error"
    })
    if (Merchant!=="Database Error") {
      if (Merchant!==null) {
        console.log("Merchantvarification 1")
        console.log(Merchant.VarificationCode)
  
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
          to: Merchant.email,
          subject: 'New Merchant varification',
          html: `<h1> Please find below your varification code</h1><h2>Varification Code:${Merchant.VarificationCode}</h2>`
        };
        
        const result=await Transporter.sendMail(mailOptions).then(res=>{
          console.log("Merchantvarification 2")
          console.log(res)
          return res
        }).catch(err=>{
          console.log("Merchantvarification 3")
          console.log(err)
          return "Error happened"
        });
  
        return result
        
      } else {
        console.log("Merchantvarification 4")
  
        return "Merchant Not Found"
  
  
        
      }
      
      
    }else{
      console.log("Merchantvarification 5")
      return "Merchant Not Found"
    }
    
    
   
      
}
export default Merchantvarification