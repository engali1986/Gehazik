import { MongoClient } from "mongodb";
//  this will AddProduct to the DB
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
const AddProduct = async (AddProductData) => {
  try {
    await client.connect().then((res) => {
      console.log("Connection res ");
      //   console.log(res);
    });
    console.log("AddProduct file 0");
    console.log(AddProductData);
    const NewProduct = await client
      .db("Gehazik")
      .collection("Products")
      .insertOne({
        ProductTitle: AddProductData.ProductTitle,
        ProductCategory: AddProductData.ProductCategory,
        ProductSubCategory: AddProductData.ProductSubCategory,
        ProductFeature: AddProductData.ProductFeature,
        ProductAdditionalFeatures: AddProductData.ProductAdditionalFeatures,
        ProductQty: AddProductData.ProductQty,
        ProductQtyUnit: AddProductData.ProductQtyUnit,
        ProductUnitPrice: AddProductData.ProductUnitPrice,
        Date: new Date(),
        MerchantName: AddProductData.Name,
        MerchantEmail: AddProductData.Email,
        MerchantID: AddProductData.MerchantID,
        InStockQty: AddProductData.ProductQty,
        OrderedQty: 0,
        EgyptDelivery:AddProductData.EgyptDelivery,
        GovernorateDelivery:AddProductData.GovernorateDelivery,
        CityDelivery:AddProductData.CityDelivery,
        Governorate:AddProductData.Governorate,
        City:AddProductData.City
      })
      .then((res) => {
        console.log("AddProduct file 1");
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log("AddProduct file 2 error");
        console.log(err);
        return "Connection Error";
      });
    if (NewProduct.acknowledged === true) {
      console.log("AddProduct file 2.5 Product added");
      return NewProduct;
    } else {
      console.log("AddProduct file 2.75 Product Not Added");
      return "Product Not added";
    }
  } catch (error) {
    console.log("AddProduct file 3 error");
    console.log(error);
    return "Connection Error";
  } finally {
    await client.close(true).then((res) => {
      console.log("AddProduct file 5");
      console.log(res);
    });
  }
};
export default AddProduct;
