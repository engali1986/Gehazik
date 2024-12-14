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
    // following loop will be used to group similir items qty
    for (let index = 0; index < AddProductData.ProductOptions.length; index++) {
      for (let J = 0; J < AddProductData.ProductOptions.length; J++) {
        if (J>index && AddProductData.ProductOptions[J].Color===AddProductData.ProductOptions[index].Color && AddProductData.ProductOptions[J].Size===AddProductData.ProductOptions[index].Size) {
          AddProductData.ProductOptions[index].Qty=AddProductData.ProductOptions[index].Qty+AddProductData.ProductOptions[J].Qty
          AddProductData.ProductOptions.splice(J,1)
        } 
      }
      
    }
    const NewProduct = await client
      .db("Gehazik")
      .collection("Products")
      .insertOne({
        ProductTitle: AddProductData.ProductTitle,
        ProductCategory: AddProductData.ProductCategory,
        ProductSubCategory: AddProductData.ProductSubCategory,
        ProductFeature: AddProductData.ProductFeature,
        ProductAdditionalFeatures: AddProductData.ProductAdditionalFeatures,
        ProductOptions: AddProductData.ProductOptions,
        ProductQtyUnit: AddProductData.ProductQtyUnit,
        ProductInStock:true,
        ProductUnitPrice: AddProductData.ProductUnitPrice,
        Date: new Date(),
        MerchantName: AddProductData.Name,
        MerchantEmail: AddProductData.Email,
        MerchantID: AddProductData.MerchantID,
        EgyptDelivery:AddProductData.EgyptDelivery,
        GovernorateDelivery:AddProductData.GovernorateDelivery,
        CityDelivery:AddProductData.CityDelivery,
        Governorate:AddProductData.Governorate,// merchant store governorate
        City:AddProductData.City,// merchant store city
        ProductVisibility:false
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
