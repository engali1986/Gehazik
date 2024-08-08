import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
const VarifyMerchant = async (Credentials) => {
  console.log("varifyMerchant file 0");
  try {
    await client.connect().then((res) => {
      console.log("Connection res ");
      //   console.log(res);
    });

    const MerchantVarification = await client
      .db("Gehazik")
      .collection("Merchants")
      .findOne({
        email: Credentials.Email,
        name: Credentials.Name,
        token: Credentials.Token,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("varifyMerchant file 1 error found");
        console.log(err);
        return "Connection Error";
      });

    console.log("varifyMerchant file 2 MerchantVarification result");

    console.log(MerchantVarification);
    if (MerchantVarification) {
      console.log("varifyMerchant file 3");
      return MerchantVarification;
    } else if (!MerchantVarification) {
      console.log("varifyMerchant file 4");
      console.log(MerchantVarification);

      return "Merchant Not Found";
    } else {
      console.log("varifyMerchant file 4.4");
      ("Merchant Not Found");
    }
  } catch (error) {
    console.log(error);
    console.log("varifyMerchant file 5 error found");
    return "Connection Error";
  } finally {
    await client.close(true).then((res) => {
      console.log("VarifyMerchant file 6");
      console.log(res);
    });
  }
};

export default VarifyMerchant;
