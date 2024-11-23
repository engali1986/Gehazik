import { MongoClient } from "mongodb";
//  this will get All products from DB
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
const AdminsBendingProductsList = async () => {
  try {
    console.log("AdminsBendingProductsList file 0");
    await client.connect();
    console.log("Connection established ");
    
    const AdminsBendingProductsList = await client
      .db("Gehazik")
      .collection("Products")
      .find({ ProductVisibility:false })
      .project({
        ProductTitle: 1,
        ProductOptions:1,
        ProductInStock:1,
        ProductUnitPrice: 1,
        ProductImagesIDs: 1,
        ProductAdditionalFeatures: 1,
        ProductQtyUnit: 1,
        MerchantName: 1,
        ProductCategory:1,
        ProductSubCategory:1,
        ProductFeature:1
      })
      .toArray();
    console.log("AdminsBendingProductsList file 1");
    console.log(Array.isArray(AdminsBendingProductsList));
    return AdminsBendingProductsList;
  } catch (error) {
    console.log("AdminsBendingProductsList file 2 error");
    console.log(error);
    return "Connection error";
  } finally {
    // await client.close();
  }
};
export default AdminsBendingProductsList;
