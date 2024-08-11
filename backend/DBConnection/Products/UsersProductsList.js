import { MongoClient } from "mongodb";
//  this will get All products from DB
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
const UsersProductsList = async (Category) => {
  try {
    console.log("UsersProductsList file 0");
    await client.connect().then((res) => {
      console.log("Connection res ");
      //   console.log(res);
    });
    console.log(Category);
    const UsersProductsList = await client
      .db("Gehazik")
      .collection("Products")
      .find({ ProductCategory: Category })
      .project({
        ProductTitle: 1,
        InStockQty: 1,
        OrderedQty: 1,
        ProductUnitPrice: 1,
      })
      .toArray();
    console.log("UsersProductsList file 1");
    console.log(UsersProductsList);
    console.log(Array.isArray(UsersProductsList));
    await client.close(true).then((res) => {
      console.log("UsersProductsList file 3");
      console.log(res);
    });
    return UsersProductsList;
  } catch (error) {
    console.log("UsersProductsList file 2 error");
    console.log(error);
    return "Connection error";
  } finally {
  }
};

export default UsersProductsList;
