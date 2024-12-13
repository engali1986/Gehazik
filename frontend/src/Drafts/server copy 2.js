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
import env from "dotenv";
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
import CheckUser from "./DBConnection/Users/CheckUser.js";
import OrderEmails from "./DBConnection/Merchants/OrderEmails.js";
import http from "http"
import MerchantOrders from "./DBConnection/Merchants/MerchantOrders.js";
import { type } from "os";
import MerchantChangePassword from "./DBConnection/Merchants/MerchantChangePassword.js";
import UserChangePassword from "./DBConnection/Users/UserChangePassword.js";
import UserOrders from "./DBConnection/Users/UserOrders.js";
import UserDBChanges from "./DBConnection/DBChanges/UsersDBChange.js";
import DeleteOrders from "./DBConnection/Orders/DeleteOrder.js";
import MerchantPasswordRecovery from "./DBConnection/Merchants/MerchantPasswordRecovery.js";
const require = createRequire(import.meta.url);
const socketIo = require('socket.io');
// const ServiceAccountKey = require("./API keys/ServiceAccountKey.json");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://gehazik-l9ggfsnq5-engali1986s-projects.vercel.app", // React App's URL
    methods: ["GET", "POST"]
  }
});

let Users=[]
io.on("connection",(socket)=>{
  
  console.log("Socket connected, socket")
  console.log(socket.id)
 

  socket.on("Add_User",(email)=>{
    console.log(email)
    let User={id:socket.id,email:email}
    Users.push(User)
    console.log(Users)

  })

  socket.on('send_message', (message) => {
    console.log('Received message:', message);
   
    // Broadcast the message to all other connected clients
    io.emit('receive_message', message);
    //Send the message to specific clients
    // Users.forEach((user)=>{
    //   if (user.email==='engali@mailedaa.com' || user.email==='engali@mailedbb.com') {
    //     io.to(user.id).emit('receive_message', message);
    //   } else {
        
    //   }
    // })
    

   
  });
  
  socket.on('disconnect', () => {
    Users=Users.filter((item)=>{
      return item.id !== socket.id
    })

    console.log('User disconnected:', socket.id);
    console.log(Users)
  });
})

env.config();
console.log(process.env.ALI);
const uri =
  "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";
const client = new MongoClient(uri);
client.connect();
    console.log("Connection established ");
    
app.use(cors());
app.use(express.json());
// following function will watch any changes in Uses collection and send engali1986ac@mail.com an email
// UserDBChanges()
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
    result.Email ||
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
  if (result.Email) {
    console.log("server /LogInUser 2");
    res.json({ resp: result });
  } else if (result === "User Not Found") {
    console.log("server /LogInUser 3");
    res.json({ resp: result });
  } else if (result === "Connection error") {
    console.log("server /LogInUser 4");
    res.json({ resp: result });
  } else if (result === "Varification Code sent by Email") {
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
  const email = await req.body.Email;
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
app.post("/Users/ChangePassword",async(req,res)=>{
  try {
    console.log("server/Users Changepassword 0")
    const PasswordData=await req.body
    console.log(PasswordData)
    if (PasswordData.User==="User") {
      // First we varify User login
      const VarifyData={Name:PasswordData.Name,Email:PasswordData.Email,Token:PasswordData.Token}
      const UserVarify=await CheckUser(VarifyData)
      console.log("server/Users Changepassword 1 UserVarify result")
      console.log(UserVarify)
      if (typeof UserVarify==="object" && UserVarify._id) {
        const ChangePassword=await UserChangePassword(PasswordData,UserVarify)
        console.log("server/Users Changepassword 2 ChangePassword result")
        console.log(ChangePassword)
        res.json({resp:ChangePassword})
      } else {
        res.json({resp:"Connection Error"})
      }
    } else {
      res.json({resp:"Please LogIn as User"})
    }
  } catch (error) {
    console.log*error
    res.json({resp:"Connection Error"})
  }
})
app.post("/Users/OrdersList",async(req,res)=>{
  try {
    console.log("server/UserOrdersList 0 ");
    const UserCredentials = await req.body;
    console.log(UserCredentials);
    const UserCheck = await CheckUser(UserCredentials);
    console.log("server/UserOrdersList 1 ");
    console.log(UserCheck);
    if (UserCheck._id) {
      const GetUserOrders=await UserOrders(UserCheck)
      if (Array.isArray(GetUserOrders)) {
        res.json({resp:GetUserOrders})
      } else {
        res.json({resp:GetUserOrders})
      }
    } else {
      res.json({resp:"No Orders Found"})
    }
  } catch (error) {
    console.log(error)
    res.json({resp:"Connection Error"})
  }
})
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
  } else if (result === "Varification Code sent by Email") {
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
    result.Email ||
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
  if (result.Email) {
    console.log("server /LogInMerchant 2");
    res.json({ resp: result });
  } else if (result === "Merchant Not Found") {
    console.log("server /LogInMerchant 3");
    res.json({ resp: result });
  } else if (result === "Connection error") {
    console.log("server /LogInMerchant 4");
    res.json({ resp: result });
  } else if (result === "Varification Code sent by Email") {
    console.log("server /LogInMerchant 6");
    res.json({ resp: result });
  } else {
    console.log("server /LogInMerchant 9");
    res.json({ resp: "Internal error" });
  }
});
// Product routes start
// AddProduct route
const upload = multer({ storage: multer.memoryStorage() });
app.post("/Merchants/AddProduct", upload.array("Files"), async (req, res) => {
  try {
    // first we will varify merchant by Token number in req.body.Data
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
      AddProductData.Governorate=MerchantVarification.Governorate
      AddProductData.City=MerchantVarification.City
      console.log(AddProductData);
      const ProductAdded = await AddProduct(AddProductData);
      console.log("server/AddProduct 4 ProductAdded result");
      console.log(ProductAdded);
      if (ProductAdded.insertedId) {
        console.log(
          "server/AddProduct 5 ProductAdded Added next we add images"
        );
        // next we will upload product images to google reive and send back Image ID
        // we will use Retry Logic with Exponential Backoff to handle error 429 toomany request in gooogle drive
        const AddProductID = ProductAdded.insertedId;
        console.log(req.files);
        const files = req.files;
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
        const KEYFILEPATH = path.join(__dirname, "/ServiceAccountKey.json");
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
        // following function modefied by chat gpt to apply exponential backoff strategy for 429 error handing
        const uploadFileToDrive = async (fileObject,retryCount = 0) => {
          const maxRetries = 5; // Maximum number of retries
          const baseDelay = 1000; // Start with a 1-second delay
          try {
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
          console.log("Image file upload resoponce")
          console.log(response)
          return response.data;
            
          } catch (error) {
            console.log("UploadFileToDrive error")
            console.log(error)
            // Check if the error is a 429 Too Many Requests error
            if (error.response && error.response.status === 429 && retryCount < maxRetries) {
               const backoffTime = baseDelay * Math.pow(2, retryCount); // Exponential backoff
              console.log(`Retrying after ${backoffTime}ms... (Attempt ${retryCount + 1} of ${maxRetries})`);
              await new Promise((resolve) => setTimeout(resolve, backoffTime)); // Wait before retrying

              return uploadFileToDrive(fileObject, retryCount + 1); // Retry the request
            }
            await client.db("Gehazik").collection("Products").deleteOne({_id:AddProductID}).then(res=>{
              console.log("Failed to upload image delete product resulte")
              console.log(res)
            }).catch(err=>{
              console.log("Failed to upload image delete product error")
              console.log(err)
            })
            res.status(500).json({ resp: "Internal Server Error" });
          }
          
        };
        //  following is the original UploadFileToDrive function 
        // const uploadFileToDrive = async (fileObject) => {
        //   try {
        //     const { originalname, buffer, mimetype } = fileObject;
        //   console.log(" fileobj");
        //   console.log(fileObject);
        //   console.log(originalname);
        //   console.log(buffer);
        //   const bufferStream = new Stream.PassThrough();
        //   bufferStream.end(buffer);
        //   const media = {
        //     mimeType: mimetype,
        //     body: bufferStream,
        //   };
          
        //   const response = await drive.files.create({
        //     requestBody: {
        //       name: originalname,
        //       parents: [ImagesFolder.data.id], // replace with your Google Drive folder ID
        //     },
        //     media,
        //     fields: "id, webViewLink",
        //   });
        //   console.log("Image file upload resoponce")
        //   console.log(response)
        //   return response.data;
            
        //   } catch (error) {
        //     console.log("UploadFileToDrive error")
        //     console.log(error)
        //   }
          
        // };
        // ----------------------------
        console.log(files);
        if (files.length > 0) {
          const fileLinks=[]
          for (const file of files) {
            try {
              console.log(`Uploading - ${file.originalname}`)
              const fileData = await uploadFileToDrive(file);
              fileLinks.push(fileData.id);
              console.log("file links is")
              console.log(fileLinks)
            } catch (error) {
              console.error(`Failed to upload ${file.originalname}:`, error);
              // Optionally handle the error, e.g., continue or abort
            }
          }
          // const fileLinks = await Promise.all(
            
          //   files.map(async (file) => {
          //    try {
          //     const fileData = await uploadFileToDrive(file);
          //     console.log("Image file upload result")
          //     console.log(fileData)
          //     return fileData.id;
          //    } catch (error) {
          //     console.log("Promise all error")
          //     console.log(error)
          //    }
              
          //   })
          // );
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
// Merchant route starts
// Merchant Change password
app.post("/Merchants/ChangePassword",async(req,res)=>{
  try {
    console.log("server/Merchant Changepassword 0")
    const PasswordData=await req.body
    console.log(PasswordData)
    if (PasswordData.User==="Merchant") {
      // First we varify Merchant login
      const VarifyData={Name:PasswordData.Name,Email:PasswordData.Email,Token:PasswordData.Token}
      const MerchantVarify=await VarifyMerchant(VarifyData)
      console.log("server/Merchant Changepassword 1 MerchantVarify result")
      console.log(MerchantVarify)
      if (typeof MerchantVarify==="object" && MerchantVarify._id) {
        const ChangePassword=await MerchantChangePassword(PasswordData,MerchantVarify)
        console.log("server/Merchant Changepassword 2 ChangePassword result")
        console.log(ChangePassword)
        res.json({resp:ChangePassword})
      } else {
        res.json({resp:"Connection Error"})
      }
    } else {
      res.json({resp:"Please LogIn as Merchant"})
    }
  } catch (error) {
    console.log*error
    res.json({resp:"Connection Error"})
  }
})
app.post("/MerchantPasswordRecovery", async (req, res) => {
  const email = await req.body.Email;
  const result = await MerchantPasswordRecovery(email);
  console.log("server MerchantPasswordRecovery");
  console.log(result);
  if (result !== "User Not Found") {
    if (result.accepted.length > 0) {
      console.log("server file MerchantPasswordRecovery 0");
      console.log(result.accepted.length);
      res.json({ resp: result.accepted[0] });
    }
  } else {
    res.json({ resp: "User Not Found" });
  }
});
// Merchant Orders list
app.post("/Merchants/OrdersList",async(req,res)=>{
  try {
    console.log("server/MerchantOrdersList 0 ");
    const MerchantCredentials = await req.body;
    console.log(MerchantCredentials);
    const CheckMerchant = await VarifyMerchant(MerchantCredentials);
    console.log("server/MerchantOrdersList 1 ");
    console.log(CheckMerchant);
    if (CheckMerchant._id) {
      const GetMerchantOrders=await MerchantOrders(CheckMerchant._id)
      if (Array.isArray(GetMerchantOrders)) {
        res.json({resp:GetMerchantOrders})
      } else {
        res.json({resp:GetMerchantOrders})
      }
    } else {
      res.json({resp:"No Orders Found"})
    }
  } catch (error) {
    console.log(error)
    res.json({resp:"Connection Error"})
  }
})
// ProductsList route for merchant
app.post("/Merchants/ProductsList", async (req, res) => {
  try {
    console.log("server/ProductsList 0 ");
    const MerchantCredentials = await req.body ;
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
    
  } catch (error) {
    console.log(error)
    res.json({ resp: "Connection Error" });
    
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
// Merchant routes end
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
app.post("/Orders/AddOrder", async (req, res) => {
 try {
  const OrderData=await req.body
  console.log("Server/AddOrder 0 OrderData is ")
  console.log(OrderData)
  // First we check if the user credentials is correct using OrderData.ClientEmail, OrderData.Token
  const UserData={
    Email:OrderData.ClientEmail,
    Token:OrderData.ClientToken
  }
  console.log("Server/AddOrder 1 UserData is ")
  console.log(UserData)
  const User=await CheckUser(UserData)
  console.log("Server/AddOrder 2 User Check result ")
  console.log(User)
  if (typeof User==="object" && User._id) {
    console.log("Server/AddOrder 3 User found")
  // Next we will add the order
  const OrderAdd=await AddOrder(OrderData)
  console.log("Server/AddOrder 4 AddOrder result")
  console.log(OrderAdd)
  if (typeof OrderAdd==="object" && OrderAdd.insertedId) {
    console.log("Server/AddOrder 5 Order Added")
    // Next we will send emails to all merchants to prepare the order
    const Emails=await OrderEmails(OrderData, OrderAdd.insertedId)
    res.json({resp:`Your Order No: ${OrderAdd.insertedId} Added successfully`})
    
  }else{
    console.log("Server/AddOrder 6 Order Not Added")
    res.json({resp:"Order Not Added"})
  }
  
      
  }else{
    console.log("Server/AddOrder 7 user Not Found")
    res.json({resp:"User Not Found"})
  }
  
 } catch (error) {
  console.log("Server/AddOrder 8 Order Add error")
  console.log(error)
  res.json({resp:"Order Not Added"})
  
 }
});
// Delete Order
app.post("/Orders/DeleteOrder",async(req,res)=>{
  try {
    const CancelData=await req.body
    console.log("server/DeleteOrder 0 CancelData")
    console.log(CancelData)
    const UserData={
      Email:CancelData.Email,
      Token:CancelData.Token
    }
    console.log("Server/DeleteOrder 1 UserData is ")
    console.log(UserData)
    const User=await CheckUser(UserData)
    console.log("Server/DeleteOrder 2 User Check result ")
    console.log(User)
    if (typeof User==="object" && User._id) {
      const Cancelorder=await DeleteOrders(CancelData)
      console.log("Server/DeleteOrder 3 DeleteOrder result ")
      console.log(Cancelorder)
      res.json({resp:Cancelorder})
    } else {
      res.json({resp:"User Not Found"})
    }
    
    
  } catch (error) {
    console.log(error)
    res.json({resp:"Internal Error"})
  }
})
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
app.post("/test", async (req, res) => {
  try {
    if (req.body.test==="yes") {
      res.json({resp:"yes"})
      
    }
    if (req.body.test2==="no") {
      res.json({resp:"no"})
      
    }
    
  } catch (error) {
    res.json({error})
    
  }
 
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
console.log(path.join(__dirname, "uploads"));
app.use(express.static(path.join(__dirname, "uploads")));
server.listen("5000", () => {
  console.log("server started");
});
// close DB connection on shutdown
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
