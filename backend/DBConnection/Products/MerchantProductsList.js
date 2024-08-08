import { MongoClient } from "mongodb";
//  this will AddProduct to the DB
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
const MerchantProductsList = async (MerchantID) => {
  try {
    console.log("MerchantProductsList file 0");
    await client.connect().then((res) => {
      console.log("Connection res ");
      //   console.log(res);
    });
    console.log(MerchantID);
    const MerchantProductsList = await client
      .db("Gehazik")
      .collection("Products")
      .find({ MerchantID: MerchantID })
      .project({
        ProductTitle: 1,
        InStockQty: 1,
        OrderedQty: 1,
        ProductUnitPrice: 1,
      })
      .toArray();
    console.log("MerchantProductsList file 1");
    console.log(MerchantProductsList);
    console.log(Array.isArray(MerchantProductsList));
    return MerchantProductsList;
  } catch (error) {
    console.log("MerchantProductsList file 2 error");
    return "Connection error";
  } finally {
    await client.close(true).then((res) => {
      console.log("MerchantProductsList file 3");
      console.log(res);
    });
  }
};

export default MerchantProductsList;
