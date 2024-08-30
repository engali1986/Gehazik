// first we import MongoClient to connect to database
// then we import Merchantvarification function which will send email to Merchant after regester with varificationcode to confirm Merchant email
import { GridFSBucket, MongoClient } from "mongodb";
import Merchantvarification from "./MerchantVarification.js";

const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
// AddMerchant function is used to add Merchant to database
async function AddMerchant(Credentials) {
  try {
    await client.connect().then((res) => {
      console.log("Connection res ");
      console.log(res);
    });
    console.log("AddMerchant file 0");
    console.log(Credentials);

    // First we check if Merchant already regestered by searching for Merchant email in database
    const IsMerchantRegistered = await client
      .db("Gehazik")
      .collection("Merchants")
      .findOne({ email: Credentials.Email })
      .then((res) => {
        console.log("AddMerchant file 1");
        console.log(res);
        if (res === null) {
          return "Merchant Not Found";
        } else {
          return res;
        }
      })
      .catch((err) => {
        console.log("AddMerchant file 1.1");
        console.log(err);

        return "Connection error";
      });

    console.log("AddMerchant file 2");
    console.log(IsMerchantRegistered);

    // if Merchant not regestered we add Merchant to database and create varificationcode
    if (IsMerchantRegistered === "Merchant Not Found") {
      let x = Math.floor(Math.random() * 9999);
      let NewToken = Math.floor(Math.random() * 10000) + 1;

      if (x < 1000) {
        x = x + 1000;
      }

      const res = await client
        .db("Gehazik")
        .collection("Merchants")
        .insertOne({
          name: Credentials.Name,
          email: Credentials.Email,
          pass: Credentials.Password,
          Merchantvarified: false,
          varificationcode: x,
          Date: new Date(),
          Token: NewToken,
          Governorate:Credentials.Governorate,
          City:Credentials.City
        })
        .then((res) => {
          console.log("AddMerchant file 2");
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log("AddMerchant file 3");
          console.log("connection error");
          console.log(err);
          return "Connection error";
        });

      // next we search for Merchant by email in database to return the Merchant full data to client
      if (res.acknowledged === true) {
        const Merchant = await client
          .db("Gehazik")
          .collection("Merchants")
          .findOne({ email: Credentials.Email })
          .then((res) => {
            if (res === null) {
              return "Merchant Not Found";
            } else {
              return res;
            }
          })
          .catch((err) => {
            return "Connection error";
          });

        if (
          Merchant !== "Merchant Not Found" ||
          Merchant !== "Connection error"
        ) {
          const varification = await Merchantvarification(
            Merchant.email,
            Merchant.pass
          )
            .then((res) => {
              console.log("AddMerchant file 4");
              console.log(res);
              return res;
            })
            .catch((err) => {
              console.log("AddMerchant file 5");
              return "Varification Email not sent";
            });
        }

        return Merchant;
      } else {
        return "Connection error";
      }
    } else {
      if (IsMerchantRegistered === "Connection error") {
        return "Connection error";
      } else {
        return "Merchant Already Registered";
      }
    }

    // Send a ping to confirm a successful connection
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close(true).then((res) => {
      console.log("AddMerchant file 5");
      console.log(res);
    });
    setTimeout(() => {
      console.log("done");
    }, 10000);
  }
}
// AddMerchant().catch(console.dir);

export default AddMerchant;
