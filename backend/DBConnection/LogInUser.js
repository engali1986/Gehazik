import { MongoClient } from "mongodb";
import Uservarification from "./UserVarification.js";

const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
async function LogInUser(Credentials) {
  try {
    console.log("LogInUser file 0");
    console.log(Credentials);
    const GetUser = await client
      .db("Gehazik")
      .collection("Users")
      .findOne({ email: Credentials.Email, pass: Credentials.Password })
      .then((res) => {
        console.log("LogInUser file 1");
        console.log(res);
        if (res === null) {
          console.log("LogInUser file 2");
          console.log(res)
          return "User Not Found";
        } else {
          console.log("LogInUser file 3");
          console.log(res)
          return res;
        }
      })
      .catch((err) => {
        console.log("LogInUser file 4");
        console.log(err)
        return "Connection error";
      });

    if (GetUser.email) {
      console.log("LogInUser file 5");
      console.log(GetUser);

      if (GetUser.uservarified === false) {
        console.log("LogInUser file 6");
        if (Credentials.VarificationCode) {
          console.log("LogInUser file 7");
         

          if (Credentials.VarificationCode === GetUser.varificationcode) {
            const VarifyUser = await client
              .db("Gehazik")
              .collection("Users")
              .updateOne(
                { email: Credentials.Email, pass: Credentials.Password },
                {$set:{ uservarified: true }}
                
              )
              .then((res) => {
                console.log("LogInUser file 7.5");
                console.log(res);
                return res;
              })
              .catch((err) => {
                console.log(err)
                return "Connection error";
              });

            if (typeof VarifyUser === "object") {
              console.log("LogInUser file 8");
              GetUser.uservarified=true
              
              

             
        
              return GetUser;
            } else {
              console.log("LogInUser file 9");
              console.log(VarifyUser)
              return "Connection error";
            }
          } else {
            const UserVarification = await Uservarification(
              GetUser.email,
              GetUser.pass
            )
              .then((res) => {
                console.log("LogInUser file 10");
                console.log(res);

                return res;
              })
              .catch((err) => {
                console.log("LogInUser file 11");
                console.log(err);
                return "Connection error";
              });
            if (UserVarification !== "Connection error" && typeof UserVarification==="object") {
              console.log("LogInUser file 12");
              return "Varification Code sent by email";
            } else {
              console.log("LogInUser file 13");
              return "Connection error";
            }
          }
        } else {
          console.log("LogInUser file 14");
          const UserVarification = await Uservarification(
            GetUser.email,
            GetUser.pass
          )
            .then((res) => {
              console.log("LogInUser file 14-10");
              console.log(res);

              return res;
            })
            .catch((err) => {
              console.log("LogInUser file 14-11");
              console.log(err);
              return "Connection error";
            });
          if (UserVarification !== "Connection error" && typeof UserVarification==="object") {
            console.log("LogInUser file 14-12");
            console.log(UserVarification)
            return "Varification Code sent by email";
          } else {
            console.log("LogInUser file 14-13");
            return "Connection error";
          }
        }
      } else {
        console.log("LogInUser file 15");
        return GetUser;
      }
    } else {
      console.log("LogInUser file 16");
      return GetUser;
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(true).then(res=>{
    //     console.log("LogInUser file 5")
    //     console.log(res)

    // });
    setTimeout(() => {
      console.log("done");
    }, 10000);
  }
}
// LogInUser().catch(console.dir);

export default LogInUser;
