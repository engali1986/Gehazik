import { MongoClient, ObjectId } from "mongodb";
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
    } else if (UpdateProductData.FieldToUpdate === "Products List Update") {
      console.log("UpdateProduct file 6 Update list of products");
      let ModefiedCounts = 0;
      let ObjectID = new ObjectId();
      console.log(UpdateProductData.UpdateData);
      console.log(UpdateProductData.UpdateData.length);
      console.log(UpdateProductData.UpdateData[0]);
      for (
        let index = 0;
        index < UpdateProductData.UpdateData.length;
        index++
      ) {
        console.log(
          "UpdateProduct file 6.5 Update list of products Product to update"
        );
        console.log(UpdateProductData.UpdateData[index]);
        const UpdateElement = await client
          .db("Gehazik")
          .collection("Products")
          .updateOne(
            {
              _id: new ObjectId(
                UpdateProductData.UpdateData[index].UpdateProductID
              ),
            },
            {
              $set: {
                InStockQty:
                  UpdateProductData.UpdateData[index].UpdateProductInStockQty,
                ProductUnitPrice:
                  UpdateProductData.UpdateData[index].UpdateProductUnitPrice,
                LatestUpdate: new Date(),
              },
            }
          )
          .then((res) => {
            console.log("UpdateProduct file 7 Update products result");
            console.log(res);
            console.log(typeof res.modifiedCount);
            return res.modifiedCount;
          })
          .catch((err) => {
            console.log("UpdateProduct file 8 Update products error");
            console.log(err);
            return "Products Not Modefied";
          });
        console.log("UpdateProduct file 9 Update products Add modefiedcounts");
        console.log(UpdateElement);
        if (typeof UpdateElement === "number") {
          if (UpdateElement > 0) {
            ModefiedCounts = ModefiedCounts + UpdateElement;
          } else {
            console.log(
              "UpdateProduct file 9.5 Update products ModefiedCounts not added"
            );
            return "Products Not updated";
          }
        } else {
          console.log(
            "UpdateProduct file 9.55 Update products ModefiedCounts not added"
          );
          return "Products Not updated";
        }
      }
      console.log(
        "UpdateProduct file 10 Update products compare ModefiedCounts with UpdateProductData.UpdateData.length "
      );
      console.log(UpdateProductData.UpdateData.length);
      console.log(ModefiedCounts);
      if (ModefiedCounts === UpdateProductData.UpdateData.length) {
        console.log("UpdateProduct file 11 Update products Update Success ");
        return "Products Updated Successfully";
      } else {
        console.log("UpdateProduct file 12 Update products Update Success ");
        return "Products Not updated";
      }
    } else {
    }
  } catch (error) {
    console.log("UpdateProduct file 13 error");
    console.log(error);
    return "Connection Error";
  } finally {
    await client.close(true).then((res) => {
      console.log("UpdateProdct file 14");
      console.log(res);
    });
  }
};
export default UpdateProduct;
