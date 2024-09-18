import { MongoClient } from "mongodb";
import Uservarification from "./UserVarification.js";
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);

async function LogInUser(Credentials) {
  try {
    console.log("LogInUser file 0");
    // await client.connect().then((res) => {
    //   console.log("Connection res ");
    //   console.log(res);
    // });
    console.log(Credentials);
    let NewToken = Math.floor(Math.random() * 10000) + 1;
    const GetUser = await client
      .db("Gehazik")
      .collection("Users")
      .findOne({ Email: Credentials.Email, Pass: Credentials.Password })
      .then((res) => {
        console.log("LogInUser file 1");
        console.log(res);
        if (res === null) {
          console.log("LogInUser file 2");
          console.log(res);
          return "User Not Found";
        } else {
          console.log("LogInUser file 3");
          console.log(res);
          return res;
        }
      })
      .catch((err) => {
        console.log("LogInUser file 4");
        console.log(err);
        return "Connection error";
      });
    if (GetUser.Email) {
      console.log("LogInUser file 5");
      console.log(GetUser);
      if (GetUser.UserVarified === false) {
        console.log("LogInUser file 6");
        if (Credentials.VarificationCode) {
          console.log("LogInUser file 7");
          if (Credentials.VarificationCode === GetUser.VarificationCode) {
            const VarifyUser = await client
              .db("Gehazik")
              .collection("Users")
              .updateOne(
                { Email: Credentials.Email, Pass: Credentials.Password },
                { $set: { UserVarified: true,Token:NewToken } }
              )
              .then((res) => {
                console.log("LogInUser file 7.5");
                console.log(res);
                return res;
              })
              .catch((err) => {
                console.log(err);
                return "Connection error";
              });
            if (typeof VarifyUser === "object") {
              console.log("LogInUser file 8");
              GetUser.UserVarified = true;
              GetUser.Token=NewToken
              return GetUser;
            } else {
              console.log("LogInUser file 9");
              console.log(VarifyUser);
              return "Connection error";
            }
          } else {
            const UserVarification = await Uservarification(
              GetUser.Email,
              GetUser.Pass
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
            if (
              UserVarification !== "Connection error" &&
              typeof UserVarification === "object"
            ) {
              console.log("LogInUser file 12");
              return "Varification Code sent by Email";
            } else {
              console.log("LogInUser file 13");
              return "Connection error";
            }
          }
        } else {
          console.log("LogInUser file 14");
          const UserVarification = await Uservarification(
            GetUser.Email,
            GetUser.Pass
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
          if (
            UserVarification !== "Connection error" &&
            typeof UserVarification === "object"
          ) {
            console.log("LogInUser file 14-12");
            console.log(UserVarification);
            return "Varification Code sent by Email";
          } else {
            console.log("LogInUser file 14-13");
            return "Connection error";
          }
        }
      } else {
        console.log("LogInUser file 15");
        const UpdateUserToken=await client
        .db("Gehazik")
        .collection("Users")
        .updateOne(
          { Email: Credentials.Email, Pass: Credentials.Password },
          { $set: {Token:NewToken } }).then(res=>{
            console.log("LogInUser file 15.5 Update Token");
            return res
          }).catch(err=>{
            console.log("LogInUser file 15.5 err");
            console.log(err)
            return "Connection error" 
          })
          if (typeof UpdateUserToken==="object"  && UpdateUserToken.modifiedCount>0) {
            console.log("LogInUser file 15.5 Token Updated");
            GetUser.Token=NewToken
            return GetUser;
            
          } else {
            return "Connection error" 
            
          }
        
      }
    } else {
      console.log("LogInUser file 16");
      return GetUser;
    }
  } finally {
   
    setTimeout(() => {
      console.log("done");
    }, 10000);
  }
}
// LogInUser().catch(console.dir);
export default LogInUser;
