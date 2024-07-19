import express from "express";
import run from "./DBConnection/DBConnection.js";
import cors from "cors";
import AddUser from "./DBConnection/AddUser.js";
import Test from "./DBConnection/Test.js";
import LogInUser from "./DBConnection/LogInUser.js";
import PasswordRecovery from "./DBConnection/PasswordRecovery.js";
import AdminLogIn  from "./DBConnection/AdminLogIn.js"
import AddOrder from "./DBConnection/AddOrder.js";
import GetOrders from "./DBConnection/GetOrders.js";
import AddCategory from "./DBConnection/AddCategory.js";
import GetCategories from "./DBConnection/GetCategories.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  console.log("server running");

  res.send("Server is running");

  console.log("server.js " );
});
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

// UserRoutes start

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

app.post("/AdminLogIn", async (req, res) => {
  const credentials = await req.body;
  console.log("server /AdminLogIn 0");
  console.log(credentials);
  const result = await AdminLogIn(credentials);
  console.log("server /AdminLogIn 1");
  console.log(result);
  if (result.email) {
    console.log("server /AdminLogIn 2");
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

//  Orders Route start
// AddOrder route to Add orders
app.post("/AddOrder",async(req,res)=>{
  const OrderData= await req.body
  console.log("Server AddOrder 0")
  console.log(OrderData)
  const OrderAdded=await AddOrder(OrderData)
  console.log("Server AddOrder 1")
  console.log(OrderAdded)
  if (typeof OrderAdded==="string") {
    console.log("Server AddOrder 2")

    res.send(OrderAdded)
    
  } else {
    console.log("Server AddOrder 3")
    res.send(OrderAdded._id)
    
  }
})

// GetOrders Route to get list of all orders in DB
app.get("/GetOrders", async(req,res)=>{
  console.log("server GetOrders 0")
  const Orders= await GetOrders()
  console.log("server GetOrders 1 "+ typeof Orders)
  
  res.json(Orders)
})



// Orders Route end

// Categories Route start

app.post("/AddCategory",async (req,res)=>{
  const CategoryData=await req.body
  console.log("server AddCategory 0")
  console.log(CategoryData)
  const AddCategoryData= await AddCategory(CategoryData)
  console.log(AddCategoryData)

  res.json("AddCategory")
})

app.get("/Categories", async(req,res)=>{
  console.log("server Categories 0")
  const Categories=await GetCategories()
  console.log(Categories)
  
})


// Categories Route end
app.post("/Test", async (req, res) => {
  const Credentials = await req.body;
  const result = await Test(Credentials);
  res.json({ resp: result });
});

app.listen("5000", () => {
  console.log("server started");
});
