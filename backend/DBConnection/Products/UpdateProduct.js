import { MongoClient } from "mongodb";
//  this will UpdateProduct to the DB
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
const UpdateProduct = async (UpdateProductData) => {
  try {
    await client.connect().then((res) => {
      console.log("Connection res ");
      //   console.log(res);
    });

    console.log("UpdateProduct file 0");
    console.log(UpdateProductData);
    if (UpdateProductData.FieldToUpdate === "Product Images IDs") {
      console.log("UpdateProduct file 1 Add product Images ID to procduct");
      const AddProductImagesIDs = await client
        .db("Gehazik")
        .collection("Products")
        .updateOne(
          { _id: UpdateProductData.ProductID },
          { $set: { ProductImagesIDs: UpdateProductData.ImagesID } }
        )
        .then((res) => {
          console.log(
            "UpdateProduct file 2 Add product Images ID to procduct res"
          );
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(
            "UpdateProduct file 3 Add product Images ID to procduct err"
          );
          console.log(err);
          return "Product Images IDs not added";
        });

      if (AddProductImagesIDs.modifiedCount > 0) {
        ("UpdateProduct file 4 Add product Images ID to procduct Done");

        return "Product Images IDs Added";
      } else {
        ("UpdateProduct file 5 Add product Images ID to procdut Not done");
        return "Product Images IDs Not Added";
      }
    } else {
    }
  } catch (error) {
    console.log("UpdateProduct file 6 error");
    console.log(error);
    return "Connection Error";
  } finally {
    await client.close(true).then((res) => {
      console.log("UpdateProdct file 7");
      console.log(res);
    });
  }
};

export default UpdateProduct;
