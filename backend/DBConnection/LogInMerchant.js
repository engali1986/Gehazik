import { MongoClient } from "mongodb";
import Merchantvarification from "./MerchantVarification.js";
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
async function LogInMerchant(Credentials) {
  try {
    console.log("LogInMerchant file 0");
    await client.connect().then((res) => {
      console.log("Connection res ");
      // console.log(res);
    });
    let NewToken = Math.floor(Math.random() * 10000) + 1;
    console.log(Credentials);
    console.log(NewToken);
    const GetMerchant = await client
      .db("Gehazik")
      .collection("Merchants")
      .findOne({ Email: Credentials.Email, Pass: Credentials.Password })
      .then((res) => {
        console.log("LogInMerchant file 1");
        console.log(res);
        if (res === null) {
          console.log("LogInMerchant file 2");
          console.log(res);
          return "Merchant Not Found";
        } else {
          console.log("LogInMerchant file 3");
          console.log(res);
          return res;
        }
      })
      .catch((err) => {
        console.log("LogInMerchant file 4");
        console.log(err);
        return "Connection error";
      });
    if (GetMerchant.Email) {
      console.log("LogInMerchant file 5");
      console.log(GetMerchant);
      //  next we will check if Merchant varified through Email or not
      if (GetMerchant.MerchantVarified === false) {
        console.log("LogInMerchant file 6");
        if (Credentials.VarificationCode) {
          console.log("LogInMerchant file 7");
          if (Credentials.VarificationCode === GetMerchant.VarificationCode) {
            const VarifyMerchant = await client
              .db("Gehazik")
              .collection("Merchants")
              .updateOne(
                { Email: Credentials.Email, Pass: Credentials.Password },
                { $set: { MerchantVarified: true, Token: NewToken } }
               
              )
              .then((res) => {
                console.log("LogInMerchant file 7.5");
                console.log(res);
                return res;
              })
              .catch((err) => {
                console.log(err);
                return "Connection error";
              });
            if (VarifyMerchant.modifiedCount>0) {
              console.log("LogInMerchant file 8");
              GetMerchant.MerchantVarified = true;
              GetMerchant.Token = NewToken;
              return GetMerchant;
            } else {
              console.log("LogInMerchant file 9");
              console.log(VarifyMerchant);
              return "Connection error";
            }
          } else {
            const MerchantVarification = await Merchantvarification(
              GetMerchant.Email,
              GetMerchant.Pass
            )
              .then((res) => {
                console.log("LogInMerchant file 10");
                console.log(res);
                return res;
              })
              .catch((err) => {
                console.log("LogInMerchant file 11");
                console.log(err);
                return "Connection error";
              });
            if (
              MerchantVarification !== "Connection error" &&
              typeof MerchantVarification === "object"
            ) {
              console.log("LogInMerchant file 12");
              return "Varification Code sent by Email";
            } else {
              console.log("LogInMerchant file 13");
              return "Connection error";
            }
          }
        } else {
          console.log("LogInMerchant file 14");
          const MerchantVarification = await Merchantvarification(
            GetMerchant.Email,
            GetMerchant.Pass
          )
            .then((res) => {
              console.log("LogInMerchant file 14-10");
              console.log(res);
              return res;
            })
            .catch((err) => {
              console.log("LogInMerchant file 14-11");
              console.log(err);
              return "Connection error";
            });
          if (
            MerchantVarification !== "Connection error" &&
            typeof MerchantVarification === "object"
          ) {
            console.log("LogInMerchant file 14-12");
            console.log(MerchantVarification);
            return "Varification Code sent by Email";
          } else {
            console.log("LogInMerchant file 14-13");
            return "Connection error";
          }
        }
      } else {
        console.log("LogInMerchant file 15");
        const UpdateMerchantToken = await client
          .db("Gehazik")
          .collection("Merchants")
          .updateOne(
            { Email: Credentials.Email, Pass: Credentials.Password },
            { $set: { Token: NewToken } }
          )
          .then((res) => {
            console.log("LogInMerchant file 15 UpdateMerchantToken");
            return res;
          })
          .catch((err) => {
            console.log("LogInMerchant file 15 UpdateMerchantToken error");
            console.log(err);
            return "Connection error";
          });
        if (typeof UpdateMerchantToken === "object") {
          GetMerchant.Token = NewToken;
          return GetMerchant;
        } else {
          return "Connection error";
        }
      }
    } else {
      console.log("LogInMerchant file 16");
      return GetMerchant;
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(true).then((res) => {
    //   console.log("LogInMerchant file 5");
    //   console.log(res);
    // });
    setTimeout(() => {
      console.log("done");
    }, 10000);
  }
}
// LogInMerchant().catch(console.dir);
export default LogInMerchant;
