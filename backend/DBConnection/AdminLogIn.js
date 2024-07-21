import { MongoClient } from "mongodb";
import Uservarification from "./UserVarification.js";

const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
async function AdminLogIn(Credentials) {
  try {
    console.log("AdminLogIn file 0");
    console.log(Credentials);
    const GetUser = await client
      .db("Gehazik")
      .collection("Admins")
      .findOne({ email: Credentials.Email, pass: Credentials.Password })
      .then((res) => {
        console.log("AdminLogIn file 1");
        console.log(res);
        if (res === null) {
          console.log("AdminLogIn file 2");
          console.log(res)
          return "User Not Found";
        } else {
          console.log("AdminLogIn file 3");
          console.log(res)
          return res;
        }
      })
      .catch((err) => {
        console.log("AdminLogIn file 4");
        console.log(err)
        return "Connection error";
      });

    if (GetUser.email) {
      console.log("AdminLogIn file 5");
      console.log(GetUser);

      if (GetUser.uservarified === false) {
        console.log("AdminLogIn file 6");
        if (Credentials.VarificationCode) {
          console.log("AdminLogIn file 7");


          if (Credentials.VarificationCode === GetUser.varificationcode) {
            const VarifyUser = await client
              .db("Gehazik")
              .collection("Admins")
              .updateOne(
                { email: Credentials.Email, pass: Credentials.Password },
                { $set: { uservarified: true } }

              )
              .then((res) => {
                console.log("AdminLogIn file 7.5");
                console.log(res);
                return res;
              })
              .catch((err) => {
                console.log(err)
                return "Connection error";
              });

            if (typeof VarifyUser === "object") {
              console.log("AdminLogIn file 8");
              GetUser.uservarified = true





              return GetUser;
            } else {
              console.log("AdminLogIn file 9");
              console.log(VarifyUser)
              return "Connection error";
            }
          } else {
            const UserVarification = await Uservarification(
              GetUser.email,
              GetUser.pass
            )
              .then((res) => {
                console.log("AdminLogIn file 10");
                console.log(res);

                return res;
              })
              .catch((err) => {
                console.log("AdminLogIn file 11");
                console.log(err);
                return "Connection error";
              });
            if (UserVarification !== "Connection error" && typeof UserVarification === "object") {
              console.log("AdminLogIn file 12");
              return "Varification Code sent by email";
            } else {
              console.log("AdminLogIn file 13");
              return "Connection error";
            }
          }
        } else {
          console.log("AdminLogIn file 14");
          const UserVarification = await Uservarification(
            GetUser.email,
            GetUser.pass
          )
            .then((res) => {
              console.log("AdminLogIn file 14-10");
              console.log(res);

              return res;
            })
            .catch((err) => {
              console.log("AdminLogIn file 14-11");
              console.log(err);
              return "Connection error";
            });
          if (UserVarification !== "Connection error" && typeof UserVarification === "object") {
            console.log("AdminLogIn file 14-12");
            console.log(UserVarification)
            return "Varification Code sent by email";
          } else {
            console.log("AdminLogIn file 14-13");
            return "Connection error";
          }
        }
      } else {
        console.log("AdminLogIn file 15");
        let NewToken=Math.floor(Math.random()*10000)+1
        console.log("AdminLogIn file 15 new token"+NewToken)
        const updateToken=await client
        .db("Gehazik")
        .collection("Admins")
        .updateOne(
          { email: Credentials.Email, pass: Credentials.Password },
          { $set: { token: NewToken } }

        ).then(res=>{
          console.log(console.log("AdminLogIn file 15 new token added"))
          console.log(res)
          return res
        })

        if (updateToken.modifiedCount===1) {
          

          GetUser.token=NewToken
          console.log("AdminLogIn file 15 new AdminData")
          console.log(GetUser.token)
          return GetUser;
          
        } else {
          return "Connection error";
          
        }
        
        
      }
    } else {
      console.log("AdminLogIn file 16");
      return GetUser;
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(true).then(res=>{
    //     console.log("AdminLogIn file 5")
    //     console.log(res)

    // });
    setTimeout(() => {
      console.log("done");
    }, 10000);
  }
}
// AdminLogIn().catch(console.dir);

export default AdminLogIn;
