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
      
      let ObjectID = new ObjectId();
      console.log(UpdateProductData.UpdateData);
      console.log(UpdateProductData.UpdateData.length);
      console.log(UpdateProductData.UpdateData[0]);
      // Create an array of bulk operations
    const bulkOperations = UpdateProductData.UpdateData.map((product) => {
      // Calculate the total quantity by summing all Qty values in ProductOptions
      const totalQty = product.ProductOptions.reduce(
        (sum, option) => sum + (option.Qty || 0),
        0
      );

      // Construct the update object
      const updateObject = {
        $set: {
          ProductOptions: product.ProductOptions,
          ProductUnitPrice: product.ProductUnitPrice, // Ensure price updates too
          ProductInStock: totalQty > 0 ? true: false, // Set InStockQty based on total quantity
          LatestUpdate: new Date(),
        },
        $push: {
          UpdateLog: { UpdateDate: new Date() }, // Add a new update entry to UpdateLog
        },
      };

      return {
        updateOne: {
          filter: { _id: new ObjectId(product._id) },
          update: updateObject,
        },
      };
    });

    // Execute bulk operations
    const result = await client
      .db("Gehazik")
      .collection("Products")
      .bulkWrite(bulkOperations);

    console.log("Bulk write result:", result);
     // Check if all products were successfully updated
    if (result.modifiedCount === UpdateProductData.UpdateData.length) {
      console.log("All products updated successfully");
      return "Products Updated Successfully";
    } else {
      console.log(
        `Partial update: ${result.modifiedCount} out of ${UpdateProductData.UpdateData.length} products updated`
      );
      return "Partial update: Some products were not updated";
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
