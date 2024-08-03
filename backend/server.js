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

const app = express();
const upload = multer({
  dest: "uploads/",
});
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
// app.post("/Merchants/AddProduct", async (req, res) => {
//   console.log("server/AddProduct 0");
//   console.log(req.body);
//   const AddProductData = await req.body;
//   console.log("server/AddProduct 1 req.body is");
//   console.log(AddProductData);

//   const MerchantVarification = await VarifyMerchant(AddProductData);
//   console.log("server/AddProduct 2 MerchantVarification result");
//   console.log(MerchantVarification);
//   if (MerchantVarification._id) {
//     console.log("server/AddProduct  MerchantVarification done");
//     AddProductData.MerchantID = MerchantVarification._id;
//     console.log(AddProductData);
//     const ProductAdded = await AddProduct(AddProductData);
//     res.json({ resp: ProductAdded });

//     // res.send(AddProductData.MerchantID);
//   } else {
//     res.json({ resp: MerchantVarification });
//   }
// });

app.post("/Merchants/AddProduct", upload.single("File"), async (req, res) => {
  console.log("server/AddProduct 0");

  console.log(JSON.parse(req.body.Data));
  // const AddProductData = await req.body;
  // console.log("server/AddProduct 1 req.body is");
  // console.log(AddProductData);

  // const MerchantVarification = await VarifyMerchant(AddProductData);
  // console.log("server/AddProduct 2 MerchantVarification result");
  // console.log(MerchantVarification);
  // if (MerchantVarification._id) {
  //   console.log("server/AddProduct  MerchantVarification done");
  //   AddProductData.MerchantID = MerchantVarification._id;
  //   console.log(AddProductData);
  //   const ProductAdded = await AddProduct(AddProductData);
  //   res.json({ resp: ProductAdded });

  //   // res.send(AddProductData.MerchantID);
  // } else {
  //   res.json({ resp: MerchantVarification });
  // }
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

app.post("/Test", async (req, res) => {
  const Credentials = await req.body;
  const result = await Test(Credentials);
  res.json({ resp: result });
});

app.listen("5000", () => {
  console.log("server started");
});
