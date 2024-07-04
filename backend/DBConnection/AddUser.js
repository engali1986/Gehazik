// first we import MongoClient to connect to database
// then we import Uservarification function which will send email to user after regester with varificationcode to confirm user email
import { MongoClient } from "mongodb";
import Uservarification from "./UserVarification.js";

const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
// AddUser function is used to add user to database
async function AddUser(Credentials) {
  try {
    console.log("AddUser file 0");
    console.log(Credentials);

    // First we check if user already regestered by searching for user email in database
    const IsUserRegistered = await client
      .db("Gehazik")
      .collection("Users")
      .findOne({ email: Credentials.Email })
      .then((res) => {
        console.log("AddUser file 1");
        console.log(res);
        if (res === null) {
          return "User Not Found";
        } else {
          return res;
        }
      })
      .catch((err) => {
        return "Connection error";
      });

    console.log("AddUser file 2");
    console.log(IsUserRegistered);

    // if user not regestered we add user to database and create varificationcode
    if (IsUserRegistered === "User Not Found") {
      let x = Math.floor(Math.random() * 9999);

      if (x < 1000) {
        x = x + 1000;
      }

      const res = await client
        .db("Gehazik")
        .collection("Users")
        .insertOne({
          name: Credentials.Name,
          email: Credentials.Email,
          pass: Credentials.Password,
          uservarified: false,
          varificationcode: x,
          Date: new Date(),
        })
        .then((res) => {
          console.log("AddUser file 2");
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log("AddUser file 3");
          console.log("connection error");
          console.log(err);
          return "Connection error";
        });

      // next we search for user by email in database to return the user full data to client
      if (res.acknowledged === true) {
        const user = await client
          .db("Gehazik")
          .collection("Users")
          .findOne({ email: Credentials.Email })
          .then((res) => {
            if (res === null) {
              return "User Not Found";
            } else {
              return res;
            }
          })
          .catch((err) => {
            return "Connection error";
          });

        if (user !== "User Not Found" || user !== "Connection error") {
          const varification = await Uservarification(user.email,user.pass)
            .then((res) => {
              console.log("AddUser file 4");
              console.log(res);
              return res;
            })
            .catch((err) => {
              console.log("AddUser file 5");
              return "Varification Email not sent";
            });
        }

        return user;
      } else {
        return "Connection error";
      }
    } else {
      if (IsUserRegistered === "Connection error") {
        return "Connection error";
      } else {
        return "User Already Registered";
      }
    }

    // Send a ping to confirm a successful connection
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(true).then(res=>{
    //     console.log("AddUser file 5")
    //     console.log(res)

    // });
    setTimeout(() => {
      console.log("done");
    }, 10000);
  }
}
// AddUser().catch(console.dir);

export default AddUser;
