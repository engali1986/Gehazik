import express from "express";
import run from "./DBConnection/DBConnection.js";
import cors from "cors";
import AddUser from "./DBConnection/AddUser.js";
import Test from "./DBConnection/Test.js";
import LogInUser from "./DBConnection/LogInUser.js";
import PasswordRecovery from "./DBConnection/PasswordRecovery.js";
import AdminLogIn from "./DBConnection/AdminLogIn.js";
import AddOrder from "./DBConnection/AddOrder.js";
import GetOrders from "./DBConnection/GetOrders.js";
import AddMerchant from "./DBConnection/AddMerchant.js";
import LogInMerchant from "./DBConnection/LogInMerchant.js";
import VarifyMerchant from "./DBConnection/VarifyMercahant.js";
import AddProduct from "./DBConnection/Products/AddProduct.js";
import multer from "multer";
import { MongoClient } from "mongodb";

import { createRequire } from "module";
import { google } from "googleapis";
import path from "path";
import fs from "fs";
import { Stream } from "stream";
import { fileURLToPath } from "url";
import UpdateProduct from "./DBConnection/Products/UpdateProduct.js";
import MerchantProductsList from "./DBConnection/Products/MerchantProductsList.js";
import UsersProductsList from "./DBConnection/Products/UsersProductsList.js";
import UsersProductDetails from "./DBConnection/Products/UsersProductDetails.js";

const require = createRequire(import.meta.url);
const ServiceAccountKey = require("./API keys/ServiceAccountKey.json");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  console.log("server running");

  res.send("Server is running");

  console.log("server.js ");
});

// UserRoutes start
app.post("/AddUser", async (req, res) => {
  const credintials = await req.body;
  console.log("server file AddUser 0");
  console.log(credintials);
  const result = await AddUser(credintials);

  console.log("server file AddUser1");
  console.log(result);
  if (
    result.email ||
    result === "User Already Registered" ||
    result === "Connection error"
  ) {
    res.json({ resp: result });
  } else {
    res.json({ resp: "User Not Added" });
  }

  console.log("finished");
});

app.post("/LogInUser", async (req, res) => {
  const credentials = await req.body;
  console.log("server /LogInUser 0");
  console.log(credentials);
  const result = await LogInUser(credentials);
  console.log("server /LogInUser 1");
  console.log(result);
  if (result.email) {
    console.log("server /LogInUser 2");
    res.json({ resp: result });
  } else if (result === "User Not Found") {
    console.log("server /LogInUser 3");
    res.json({ resp: result });
  } else if (result === "Connection error") {
    console.log("server /LogInUser 4");
    res.json({ resp: result });
  } else if (result === "Varification Code sent by email") {
    console.log("server /LogInUser 6");
    res.json({ resp: result });
  } else {
    console.log("server /LogInUser 9");
    res.json({ resp: "Internal error" });
  }
});

app.post("/UpdateUser", async (req, res) => {
  const result = await Test();
  res.json(result);
});

app.post("/PasswordRecovery", async (req, res) => {
  const email = await req.body.email;
  const result = await PasswordRecovery(email);
  console.log("server PasswordRecovery");
  console.log(result);
  if (result !== "User Not Found") {
    if (result.accepted.length > 0) {
      console.log("server file PasswordRecovery 0");
      console.log(result.accepted.length);
      res.json({ resp: result.accepted[0] });
    }
  } else {
    res.json({ resp: "User Not Found" });
  }
});

// user routes end

// Admin routes start

app.post("/AdminLogIn", async (req, res) => {
  const credentials = await req.body;
  console.log("server /AdminLogIn 0");
  console.log(credentials);
  const result = await AdminLogIn(credentials);
  console.log("server /AdminLogIn 1");
  console.log(result);
  if (result.email) {
    console.log("server /AdminLogIn 2");
    console.log(result);
    res.json({ resp: result });
  } else if (result === "User Not Found") {
    console.log("server /AdminLogIn 3");
    res.json({ resp: result });
  } else if (result === "Connection error") {
    console.log("server /AdminLogIn 4");
    res.json({ resp: result });
  } else if (result === "Varification Code sent by email") {
    console.log("server /AdminLogIn 6");
    res.json({ resp: result });
  } else {
    console.log("server /AdminLogIn 9");
    res.json({ resp: "Internal error" });
  }
});

// Admin routes end

// Merchant routes start

app.post("/AddMerchant", async (req, res) => {
  const credintials = await req.body;
  console.log("server file AddMerchant 0");
  console.log(credintials);
  const result = await AddMerchant(credintials);

  console.log("server file AddMerchant1");
  console.log(result);
  if (
    result.email ||
    result === "Merchant Already Registered" ||
    result === "Connection error"
  ) {
    res.json({ resp: result });
  } else {
    res.json({ resp: "Merchant Not Added" });
  }

  console.log("finished");
});

app.post("/LogInMerchant", async (req, res) => {
  const credentials = await req.body;
  console.log("server /LogInMerchant 0");
  console.log(credentials);
  const result = await LogInMerchant(credentials);
  console.log("server /LogInMerchant 1");
  console.log(result);
  if (result.email) {
    console.log("server /LogInMerchant 2");
    res.json({ resp: result });
  } else if (result === "Merchant Not Found") {
    console.log("server /LogInMerchant 3");
    res.json({ resp: result });
  } else if (result === "Connection error") {
    console.log("server /LogInMerchant 4");
    res.json({ resp: result });
  } else if (result === "Varification Code sent by email") {
    console.log("server /LogInMerchant 6");
    res.json({ resp: result });
  } else {
    console.log("server /LogInMerchant 9");
    res.json({ resp: "Internal error" });
  }
});

// Merchant routes end

// Product routes start

// AddProduct route

const upload = multer({ storage: multer.memoryStorage() });

app.post("/Merchants/AddProduct", upload.array("Files"), async (req, res) => {
  try {
    // first we will varify merchant by Tokebn number in req.body.Data
    const AddProductData = await JSON.parse(req.body.Data);
    console.log("server/AddProduct 1 req.body is");
    console.log(AddProductData);

    const MerchantVarification = await VarifyMerchant(AddProductData);
    console.log("server/AddProduct 2 MerchantVarification result");
    console.log(MerchantVarification);
    if (MerchantVarification._id) {
      console.log("server/AddProduct 3 MerchantVarification done");
      // Next we will add product and get product Id to use it as the folder name for product Images
      AddProductData.MerchantID = MerchantVarification._id;
      console.log(AddProductData);
      const ProductAdded = await AddProduct(AddProductData);
      console.log("server/AddProduct 4 ProductAdded result");
      console.log(ProductAdded);
      if (ProductAdded.insertedId) {
        console.log(
          "server/AddProduct 5 ProductAdded Added next we add images"
        );
        // next we will upload product images to google reive and send back Image ID
        const AddProductID = ProductAdded.insertedId;

        console.log(req.files);
        const files = req.files;
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
        const KEYFILEPATH = path.join(
          __dirname,
          "/API keys/ServiceAccountKey.json"
        );
        console.log(KEYFILEPATH);

        const auth = new google.auth.GoogleAuth({
          keyFile: KEYFILEPATH,
          scopes: SCOPES,
        });

        const drive = google.drive({ version: "v3", auth });

        const FolderID = AddProductID;
        console.log(FolderID);
        console.log(typeof FolderID);
        const ImagesFolder = await drive.files.create({
          resource: {
            name: FolderID,
            mimeType: "application/vnd.google-apps.folder",
            parents: ["1r7mz2Cde6DgSDOLqlEhORIR0Pkoh7qcd"],
          },
          fields: "id",
        });
        console.log("server/AddProduct 6 Google drive folder created ID is");
        console.log(ImagesFolder.data.id);
        const uploadFileToDrive = async (fileObject) => {
          const { originalname, buffer, mimetype } = fileObject;
          console.log(" fileobj");
          console.log(fileObject);
          console.log(originalname);
          console.log(buffer);

          const bufferStream = new Stream.PassThrough();
          bufferStream.end(buffer);

          const media = {
            mimeType: mimetype,
            body: bufferStream,
          };

          const response = await drive.files.create({
            requestBody: {
              name: originalname,
              parents: [ImagesFolder.data.id], // replace with your Google Drive folder ID
            },
            media,
            fields: "id, webViewLink",
          });

          return response.data;
        };

        console.log(files);
        if (files.length > 0) {
          const fileLinks = await Promise.all(
            files.map(async (file) => {
              const fileData = await uploadFileToDrive(file);
              return fileData.id;
            })
          );
          console.log(fileLinks); // returns an array of file data
          console.log(fileLinks.length);
          // Next we will add the filelinks to database at the same product

          const UpdateProductData = {
            FieldToUpdate: "Product Images IDs",
            ProductID: AddProductID,
            ImagesID: fileLinks,
          };
          console.log(UpdateProductData);
          const AddImagesIDs = await UpdateProduct(UpdateProductData);
          console.log(AddImagesIDs);
          if (AddImagesIDs === "Product Images IDs Added") {
            res.status(200).json({ resp: "Product Added successfully" });
          } else {
            res.status(200).json({ resp: "Product Not Added" });
          }
        } else {
          console.log("server/AddProduct 7 error");

          res.status(200).json({ resp: "Images not added" });
        }
      } else {
        console.log("server/AddProduct 8 error");

        res.json({ resp: ProductAdded });
      }

      // res.send(AddProductData.MerchantID);
    } else {
      console.log("server/AddProduct 8.5 error");
      res.json({ resp: MerchantVarification });
    }
  } catch (error) {
    console.error("server/AddProduct 9 error", error);
    res.status(500).json({ resp: "Internal Server Error" });
  }
});

// ProductsList route for merchant
app.post("/Merchants/ProductsList", async (req, res) => {
  console.log("server/ProductsList 0 ");
  const MerchantCredentials = await req.body;
  console.log(MerchantCredentials);
  const CheckMerchant = await VarifyMerchant(MerchantCredentials);
  console.log("server/ProductsList 1 Merchant Varification result ");
  console.log(CheckMerchant);
  if (CheckMerchant._id) {
    console.log("server/ProductsList 2 Merchant Varification done ");
    const MerchantProducts = await MerchantProductsList(CheckMerchant._id);
    console.log("server/ProductsList 3 Merchant Products result ");
    console.log(MerchantProducts);
    if (Array.isArray(MerchantProducts)) {
      res.json({ resp: MerchantProducts });
    } else {
      res.json({ resp: "Connection Error" });
    }
  } else {
    res.json({ resp: "Merchant Not found" });
  }
});
// UpdateProduct route for merchant
app.post("/Merchants/UpdateProduct", async (req, res) => {
  try {
    console.log("Server/UpdateProduct 0");
    const UpdatedProduct = await req.body;
    console.log(UpdatedProduct);
    console.log(Array.isArray(UpdatedProduct));
    //  first we will varify merchant credentials
    const UpdateProductMerchantCheck = await VarifyMerchant(
      UpdatedProduct.Credentials
    );
    console.log("Server/UpdateProduct 1 Varify merchant result");
    console.log(UpdateProductMerchantCheck);
    if (UpdateProductMerchantCheck._id) {
      console.log("Server/UpdateProduct 2 Merchant varified");
      // Next we will Update the products UpdatedData oject will include FieldToUpdate which will be used later inside UpdateProduct function
      const UpdatedData = {
        FieldToUpdate: "Products List Update",
        UpdateData: UpdatedProduct.UpdateData,
      };
      console.log(UpdatedData);
      const UpdatedProductList = await UpdateProduct(UpdatedData);
      console.log("Server/UpdateProduct 3 UpdatedProductList result");
      console.log(UpdatedProductList);
      if (UpdatedProductList === "Products Updated Successfully") {
        res.json({ resp: UpdatedProductList });
      } else {
        res.json({ resp: "Products Not updated" });
      }
    } else {
      res.json({ resp: "Merchant not found" });
    }
  } catch (error) {
    console.log(error);

    res.json({ resp: "Internal error" });
  }
});
// productslist for users
app.post("/Users/ProductsList", async (req, res) => {
  console.log("server/Productslist users 0");
  const Category = await req.body;
  console.log("server/Productslist users 1 req,body is:");
  console.log(Category);
  const GetProductsList = await UsersProductsList(Category.Data);
  console.log("server/Productslist users 2 GetProductsList result:");
  console.log(GetProductsList);
  if (Array.isArray(GetProductsList)) {
    console.log("server/Productslist users 3 send GetProductsList");
    res.json({ resp: GetProductsList });
  } else {
    console.log("server/Productslist users 3 error");
    res.json({ resp: "Connection error" });
  }
});

// ProductDetails for users
app.post("/Users/GetProductDetails", async (req, res) => {
  try {
    console.log("Server/ProductDetails 0 for users");
    const GetProductID = await req.body.Data;
    console.log(GetProductID);
    const GetProductDetails = await UsersProductDetails(GetProductID);
    console.log("Server/ProductDetails 1 GetProductDetails is:");
    console.log(GetProductDetails);
    if (typeof GetProductDetails === "object" && GetProductDetails._id) {
      res.json({ resp: GetProductDetails });
    } else {
      res.json({ resp: "Product Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ resp: "Connection error server" });
  }
});

// Product routes end

//  Orders Route start
// AddOrder route to Add orders
app.post("/AddOrder", async (req, res) => {
  const OrderData = await req.body;
  console.log("Server AddOrder 0");
  console.log(OrderData);
  const OrderAdded = await AddOrder(OrderData);
  console.log("Server AddOrder 1");
  console.log(OrderAdded);
  if (typeof OrderAdded === "string") {
    console.log("Server AddOrder 2");

    res.send(OrderAdded);
  } else {
    console.log("Server AddOrder 3");
    res.send(OrderAdded._id);
  }
});

// GetOrders Route to get list of all orders in DB
app.post("/GetOrders", async (req, res) => {
  console.log("server GetOrders 0");
  const Admin = await req.body;
  console.log("server GetOrders 1");
  console.log(Admin);
  const Orders = await GetOrders(Admin);
  console.log("server GetOrders 1 " + typeof Orders);

  res.json(Orders);
});

// Orders Route end

app.post("/test", upload.array("files"), async (req, res) => {
  try {
    const files = req.files;

    console.log(files);

    const fileLinks = await Promise.all(
      files.map(async (file) => {
        const fileData = await uploadFileToDrive(file);
        return { name: file.originalname, link: fileData.webViewLink };
      })
    );
    console.log(fileLinks);

    res.status(200).json({ fileLinks });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).send("Internal Server Error");
  }
});

const server = app.listen("5000", () => {
  console.log("server started");
});

// close DB connection on shutdown
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);

const gracefulShutdown = () => {
  console.log("Shutting down gracefully...");
  server.close(async () => {
    console.log("HTTP server closed.");
    try {
      await client.close();
      console.log("MongoDB connection closed.");
      process.exit(0);
    } catch (error) {
      console.error("Error closing MongoDB connection", error);
      process.exit(1);
    }
  });
};

// Listen for termination signals (e.g., Ctrl+C, kill)
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
