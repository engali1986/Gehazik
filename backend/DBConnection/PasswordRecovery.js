import mailer from "nodemailer"
import {MongoClient} from "mongodb"

const uri= "mongodb+srv://ali:cossacks1@cluster0.xerwiw2.mongodb.net/"
const client = new MongoClient(uri
  );



const PasswordRecovery=async(Email)=>{
    console.log("PassordRecovery 0")
    console.log(Email)
    const user=await client.db("Projectman").collection("Projectma").findOne({email:Email}).then(res=>{
      console.log(res)
      return res
    }).catch(err=>{
      return "Database Error"
    })
    if (user!=="Database Error") {
      if (user!==null) {
        console.log("PassordRecovery 1")
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
          to: user.email,
          subject: 'Password Recovery',
          html: `<h1> Please find below your account details</h1><h2>Email:${user.email}</h2><h2>Password:${user.pass}</h2>`
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
        console.log("PassordRecovery 2")
  
        return "User Not Found"
  
  
        
      }
      
      
    }else{
      console.log("PassordRecovery 3")
      return "User Not Found"

    }
    

    

   

      

}

export default PasswordRecovery