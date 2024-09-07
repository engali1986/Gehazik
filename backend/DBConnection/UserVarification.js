import mailer from "nodemailer"
import {MongoClient} from "mongodb"
const uri= "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000"
const client = new MongoClient(uri
  );
const Uservarification=async(Email,Password)=>{
    console.log("Uservarification 0")
    console.log(Email)
    const user=await client.db("Gehazik").collection("Users").findOne({email:Email,pass:Password}).then(res=>{
      console.log(res)
      return res
    }).catch(err=>{
      return "Database Error"
    })
    if (user!=="Database Error") {
      if (user!==null) {
        console.log("Uservarification 1")
        console.log(user.varificationcode)
  
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
          subject: 'New user varification',
          html: `<h1> Please find below your varification code</h1><h2>Varification Code:${user.varificationcode}</h2>`
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
        console.log("Uservarification 2")
  
        return "User Not Found"
  
  
        
      }
      
      
    }else{
      console.log("Uservarification 3")
      return "User Not Found"
    }
    
    
   
      
}
export default Uservarification