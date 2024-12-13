import { MongoClient, ObjectId } from "mongodb";

// Connection URI to your MongoDB cluster
const uri = "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);

// Function to approve products
const ApproveProducts = async (BendingProductsList) => {
  try {
    // Connect to the database
    await client.connect();

    // Get the database and collection
    const database = client.db("Gehazik");
    const collection = database.collection("Products");

    // Loop through each item in the BendingProductsList
    for (const item of BendingProductsList) {
      console.log("Processing item:", item);

      if (item.ProductVisibility === true) {
        // Perform the update operation
        const filter = { _id: new ObjectId(item.ID) };
        const update = { $set: { ProductVisibility: true } };

        const result = await collection.updateOne(filter, update);

        if (result.modifiedCount === 0) {
          console.warn(`No documents were updated for item with ID: ${item.ID}`);
        } else {
          console.log(`Successfully updated item with ID: ${item.ID}`);
        }

        // Log the result for debugging
        console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
      } else {
        console.log(`Skipping item with ID: ${item.ID} as ProductVisibility is false.`);
      }
    }

    return "Products Approved";
  } catch (error) {
    console.error("Error in ApproveProducts function:", error);
    return "Products Not Approved";
  } finally {
    // Ensure the client connection is closed
    await client.close();
  }
};

export default ApproveProducts;
