import { MongoClient, ObjectId } from "mongodb";
//  this will get All products from DB
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
const UsersProductDetails = async (ProductID) => {
  try {
    console.log("UserGetProductDetails file 0");
    await client.connect();
    console.log("Connection established ");

    const ProductDetails = await client
      .db("Gehazik")
      .collection("Products")
      .findOne(
        { _id: new ObjectId(ProductID) },
        { projection: { ProductTitle: 1 } }
      )
      .then((res) => {
        console.log("UserGetProductDetails file 1");
        return res;
      })
      .catch((err) => {
        console.log("UserGetProductDetails file 2 error");
        console.log(err);
        return "Connection Error";
      });

    console.log("UserGetProductDetails file 3 ProductDetails is :");
    console.log(ProductDetails);

    return ProductDetails;
  } catch (error) {
    console.log("UserGetProductDetails file 4 error :");
    console.log(error);
    return "Connection Error";
  }
};

export default UsersProductDetails;
