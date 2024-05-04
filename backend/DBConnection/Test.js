import {MongoClient} from "mongodb"

const uri= "mongodb+srv://ali:cossacks1@cluster0.xerwiw2.mongodb.net/"


const client = new MongoClient(uri
);
async function Test(Credintials) {
    try {
    
        console.log("Test file 0");
        console.log(Credintials)
        const GetUser=await client
        .db("Gehazik")
        .collection("Users").findOne({email:Credintials.Email}).then(res=>{
          console.log("Test file 1");
          console.log(res)
          if (res===null) {
            console.log("Test file 2");
            return "User Not Found"
          } else {
            console.log("Test file 3");
            return res
            
          }
          
        }).catch(err=>{
          console.log("Test file 4");
          return "Connection error"
        })
       
       if (GetUser!=="User Not Found" && GetUser!=="Connection error" ) {
        if (GetUser.uservarified===false) {
    
          if (Credintials.VarificationCode===GetUser.varificationcode ) {
            const updateUser=await client
            .db("Gehazik")
            .collection("Users").updateOne({email:GetUser.email},{$set:{uservarified:true}}).then(res=>{
              return res
            }).catch(err=>{
              return "Update failed"
            }) 
    
            return updateUser
            
          } else {
            return "Please add correct varification code"
            
          }
          
        } else {
          return "No varification Code"
          
        }
        
       } else {
        return GetUser
        
       }
    
        
       
        
    
        
      } finally {
        // Ensures that the client will close when you finish/error
        // await client.close(true).then(res=>{
        //     console.log("Test file 5")
        //     console.log(res)
    
        // });
        setTimeout(()=>{
          console.log("done");
    
    
        },10000)
    
        
      }
// run().catch(console.dir);

    }

export default Test