import logo from "./logo.svg";
import Home from "./screens/Home.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navbar } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import { useState, useRef, useEffect } from "react";
import Main from "./screens/Main.js";
import ErrorWindow from "./screens/ErrorWindow.js";
import LogIn from "./screens/LogIn.js";
import SignUp from "./screens/SignUp.js";
import PasswordRecovery from "./screens/PasswordRecovery.js";
import Test from "./screens/Test.js";
import ContactUs from "./screens/ContactUs.js";
import AdminLogIn from "./screens/AdminLogIn.js";
import AdminPage from "./screens/AdminPage.js";
import WrongPage from "./screens/WrongPage.js";
import StaticData from "./Data/StaticData.js";
import ProductsScreen from "./screens/ProductsScreen.js";
import AddressSelect from "./screens/AddressSelect.js";
import MerchantLogIn from "./screens/MerchantLogIn.js";
import MerchantSignUp from "./screens/MerchantSignUp.js";
import MerchantPage from "./screens/MerchantPage.js";
import ProductDetails from "./screens/ProductDetails.js";
import CartPage from "./screens/CartPage.js";
import UserCheckOutPage from "./screens/UserCheckOutPage.js";

function App() {
  const BackDrop = useRef();
  const ProfileItems = useRef();

  //  first check if there is GlobalState in session and local storage
  if (
    localStorage.getItem("globalState") === null &&
    sessionStorage.getItem("globalState") === null
  ) {
    console.log("initiale state");
    localStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: false,
        Name: "",
        email: "",
        Admin: false,
        Client: false,
        Merchant: false,
        Token: 0,
        Governorate: "",
        City: "",
        TimeLogged: new Date().getTime(),
        CartItems: [],
      })
    );

    sessionStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: false,
        Name: "",
        email: "",
        Admin: false,
        Client: false,
        Merchant: false,
        Token: 0,
        Governorate: "",
        City: "",
        TimeLogged: new Date().getTime(),
        CartItems: [],
      })
    );
    localStorage.setItem("NoLocalStorage", "yes");

    console.log(JSON.parse(sessionStorage.getItem("globalState")));

    console.log("initial sessionstorage");

    console.log(localStorage.getItem("globalState"));
  } else if (
    sessionStorage.getItem("globalState") === null &&
    localStorage.getItem("globalState") != null
  ) {
    console.log("there is local storage, no sission storage");
    console.log(JSON.parse(localStorage.getItem("globalState")).TimeLogged);

    if (
      new Date().getTime() -
        JSON.parse(localStorage.getItem("globalState")).TimeLogged <=
      1800000
    ) {
      sessionStorage.setItem(
        "globalState",
        localStorage.getItem("globalState")
      );

      // if (
      //   localStorage.getItem("NumTabsOpened") === null ||
      //   localStorage.getItem("NumTabsOpened") == "NaN"
      // ) {
      //   let x = 1;
      //   console.log("LocalStorage NumTabsOpened intiated");
      //   localStorage.setItem("NumTabsOpened", x.toString());
      // } else {
      //   let x = parseInt(localStorage.getItem("NumTabsOpened"), 10);
      //   let y = x + 1;
      //   localStorage.setItem("NumTabsOpened", y.toString());
      // }

      console.log(sessionStorage.getItem("globalState"));
      console.log("initial sessionstorage");
    } else {
      console.log("reset credentials");
      localStorage.setItem(
        "globalState",
        JSON.stringify({
          UserLogged: false,
          Name: "",
          email: "",
          Admin: false,
          Client: false,
          Merchant: false,
          Token: 0,
          Governorate: "",
          City: "",
          TimeLogged: new Date().getTime(),
          CartItems: [],
        })
      );

      sessionStorage.setItem(
        "globalState",
        JSON.stringify({
          UserLogged: false,
          Name: "",
          email: "",
          Admin: false,
          Client: false,
          Merchant: false,
          Token: 0,
          Governorate: "",
          City: "",
          TimeLogged: new Date().getTime(),
          CartItems: [],
        })
      );
      // let j = 1;

      // localStorage.setItem("NumTabsOpened", j.toString());
    }
  } else if (
    sessionStorage.getItem("globalState") !== null &&
    localStorage.getItem("globalState") === null
  ) {
    console.log("ther is sission");
    console.log(sessionStorage.getItem("globalState"));
    localStorage.setItem("globalState", sessionStorage.getItem("globalState"));
    
  } else if (sessionStorage.getItem("globalState") === null) {
    sessionStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: JSON.parse(localStorage.getItem("globalState")).UserLogged,
        Name: JSON.parse(localStorage.getItem("globalState")).Name,
        email: JSON.parse(localStorage.getItem("globalState")).email,
        Admin: JSON.parse(localStorage.getItem("globalState")).Admin,
        Client: JSON.parse(localStorage.getItem("globalState")).Client,
        Merchant: JSON.parse(localStorage.getItem("globalState")).Merchant,
      })
    );

    console.log("initial sessionstorage");
  }
  //  if no data set session and local storage above

  const [GlobalState, SetGlobal] = useState(
    JSON.parse(sessionStorage.getItem("globalState"))
  );
  console.log("app started");
  console.log(GlobalState);
  console.log(sessionStorage.getItem("globalState"));
  console.log(localStorage.getItem("globalState"));
  console.log(localStorage.getItem("globalState") === !null);

 
//  following function will store user/Admin/Merchant data when login
  const userChange = (
    name,
    LogInStatus,
    mail,
    Admin,
    Client,
    Merchant,
    Token
  ) => {
    SetGlobal({
      ...GlobalState,
      UserLogged: LogInStatus,
      Name: name,
      email: mail,
      Admin: Admin,
      Client: Client,
      Merchant: Merchant,
      Token: Token,
    });

    sessionStorage.setItem(
      "globalState",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("globalState")),
        UserLogged: LogInStatus,
        Name: name,
        email: mail,
        Admin: Admin,
        Client: Client,
        Merchant: Merchant,
        Token: Token,
      })
    );
    localStorage.setItem("globalState", sessionStorage.getItem("globalState"));
  };
// Following function will store User Address to use it later to find merchants
  const UpdateAddress = (AddressData) => {
    console.log("AddressData Updated");
    console.log(AddressData);
    SetGlobal({
      ...GlobalState,

      Governorate: AddressData.Governorate,
      City: AddressData.City,
    });

    sessionStorage.setItem(
      "globalState",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("globalState")),
        Governorate: AddressData.Governorate,
        City: AddressData.City,
      })
    );
    localStorage.setItem("globalState", sessionStorage.getItem("globalState"));
  };
// Following functions will add items to cart and save it in session storage
  const AddToCart = (Order) => {
    console.log("Order added to cart");
    let OrderAdded = false;
    console.log(OrderAdded);
    console.log();
    if (
      Array.isArray(GlobalState.CartItems) &&
      GlobalState.CartItems.length > 0
    ) {
      for (let index = 0; index < GlobalState.CartItems.length; index++) {
        if (GlobalState.CartItems[index].ID === Order.ID) {
          console.log("Existing order Update");
          let y = GlobalState.CartItems[index].Qty;
          let j = y + Order.Qty;
          GlobalState.CartItems[index].Qty = j;
          OrderAdded = true;
          break;
        } else {
          console.log("No existing Order");
          OrderAdded = false;
          console.log(OrderAdded);
        }
      }
      if (OrderAdded === false) {
        console.log("New Order added");
        SetGlobal((PervState) => ({
          ...PervState,
          CartItems: [...PervState.CartItems, Order],
        }));

        let arr = GlobalState.CartItems;
        console.log(arr);

        sessionStorage.setItem(
          "globalState",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("globalState")),
            CartItems: [
              ...JSON.parse(sessionStorage.getItem("globalState")).CartItems,
              Order,
            ],
          })
        );
        localStorage.setItem(
          "globalState",
          sessionStorage.getItem("globalState")
        );
        OrderAdded = true;
      } else if (OrderAdded == true) {
        sessionStorage.setItem(
          "globalState",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("globalState")),
            CartItems: GlobalState.CartItems,
          })
        );
        localStorage.setItem(
          "globalState",
          sessionStorage.getItem("globalState")
        );
      }
    } else {
      console.log("First Order Added");

      SetGlobal((PervState) => ({
        ...PervState,
        CartItems: [...PervState.CartItems, Order],
      }));

      let arr = GlobalState.CartItems;
      console.log(arr);

      sessionStorage.setItem(
        "globalState",
        JSON.stringify({
          ...JSON.parse(sessionStorage.getItem("globalState")),
          CartItems: [
            ...JSON.parse(sessionStorage.getItem("globalState")).CartItems,
            Order,
          ],
        })
      );
      localStorage.setItem(
        "globalState",
        sessionStorage.getItem("globalState")
      );
    }
  };
// Following functions will Update items to cart and save it in session storage
  const UpdateCart = (UpdateData) => {
    console.log(UpdateData);
    if (UpdateData.Field === "Add") {
      if (Array.isArray(GlobalState.CartItems)) {
        let y;
        GlobalState.CartItems.forEach((item) => {
          if (item.ID === UpdateData.ID && item.Qty<item.InStockQty) {
            console.log(item.Qty);
            console.log(typeof item.Qty);
            let j = item.Qty + 1;
            console.log(j);
            item.Qty = j;
            y = GlobalState.CartItems;
            console.log(y);

            console.log(GlobalState);
          } else {
            console.log("Item qty exceeded")
            y = GlobalState.CartItems;
            console.log(GlobalState);

          }
        });
        SetGlobal((PervState) => ({
          ...PervState,
          CartItems: y,
        }));
        sessionStorage.setItem(
          "globalState",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("globalState")),
            CartItems: y,
          })
        );
        localStorage.setItem(
          "globalState",
          sessionStorage.getItem("globalState")
        );
      }
    } else if (UpdateData.Field === "Remove") {
      if (Array.isArray(GlobalState.CartItems)) {
        let y = GlobalState.CartItems;
        GlobalState.CartItems.forEach((item) => {
          if (item.ID === UpdateData.ID && item.Qty > 1) {
            console.log(item.Qty);
            console.log(typeof item.Qty);
            let j = item.Qty - 1;
            console.log(j);
            item.Qty = j;
            y = GlobalState.CartItems;
            console.log(y);

            console.log(GlobalState);
          } else {
          }
        });
        SetGlobal((PervState) => ({
          ...PervState,
          CartItems: y,
        }));
        sessionStorage.setItem(
          "globalState",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("globalState")),
            CartItems: y,
          })
        );
        localStorage.setItem(
          "globalState",
          sessionStorage.getItem("globalState")
        );
      }
    } else if (UpdateData.Field === "Delete") {
      console.log("Delete cart Item");
      if (Array.isArray(GlobalState.CartItems)) {
        let y = GlobalState.CartItems.filter((item) => {
          if (item.ID !== UpdateData.ID) {
            return item;
          }
        });

        SetGlobal((PervState) => ({
          ...PervState,
          CartItems: y,
        }));
        sessionStorage.setItem(
          "globalState",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("globalState")),
            CartItems: y,
          })
        );
        localStorage.setItem(
          "globalState",
          sessionStorage.getItem("globalState")
        );
      }
    } else {
    }
  };
// following function will store order data
const AddOrder=(Order)=>{
  console.log(Order)
  
} 

  console.log(typeof new Date().getTime());

  console.log(typeof GlobalState);
 
  window.onresize = () => {
    console.log(window.innerWidth);
  };
 
// Following function will change navbar and main page sizes when resize window
  window.onresize = () => {
    if (window.innerWidth >= 768) {
      console.log("navBarBig");
      document.getElementsByClassName("MainBage")[0].style.marginTop =
        document.getElementsByClassName("NavBarBig")[0].getBoundingClientRect()
          .bottom + "px";
    } else {
      console.log("navBarsmall");
      document.getElementsByClassName("MainBage")[0].style.marginTop =
        document
          .getElementsByClassName("NavBarSmall")[0]
          .getBoundingClientRect().bottom + "px";
    }
  };
  useEffect(() => {
    if (document.querySelectorAll(".AddressSelection")[0]) {
      console.log(GlobalState);
      if (GlobalState.Governorate.length > 0 && GlobalState.City.length > 0) {
        console.log("Location added");
        document.querySelectorAll(".AddressSelection")[0].style.display =
          "none";
      } else {
        console.log("Location not added");
        // document.querySelectorAll(".AddressSelection")[0].style.display="block"
      }
    }

    if (window.innerWidth >= 768) {
      console.log("navBarBig");
      document.getElementsByClassName("MainBage")[0].style.marginTop =
        document.getElementsByClassName("NavBarBig")[0].getBoundingClientRect()
          .bottom + "px";
    } else {
      console.log("navBarsmall");
      document.getElementsByClassName("MainBage")[0].style.marginTop =
        document
          .getElementsByClassName("NavBarSmall")[0]
          .getBoundingClientRect().bottom + "px";
    }
  }, []);
// following function will create route for all categories
  const CategoryRoutes = StaticData.Categories.map((Item, Index) => (
    <Route
      path={`/Products/:${Item.replace(/\s+/g, "-")}/All`}
      element={<ProductsScreen globalState={GlobalState} />}
      key={Item[Index]}
    />
  ));

  return (
    <div
      onClick={() => {
        console.log(window.innerWidth);
      }}
    >
      <AddressSelect globalState={GlobalState} updateAddress={UpdateAddress} />
      <div
        ref={BackDrop}
        onClick={(e) => {
          e.stopPropagation();
          console.log("backdrop clicked");

          document.getElementsByClassName("Categories")[0].style.height = "0vh";
          document.getElementsByClassName("Categories")[0].style.overflowY =
            "hidden";
          document
            .getElementsByClassName("BackDrop")[0]
            .classList.remove("BackDropActivated");
        }}
        className="BackDrop "
      ></div>

      <Container
        className="App "
        style={{ border: "2px solid red", fontSize: "1rem", zIndex: "100" }}
      >
        <Row
          style={{ zIndex: "5", backgroundRowor: "gray", position: "relative" }}
        >
          <div
            className="fixed-top"
            onClick={(e) => {
              e.stopPropagation();
              console.log("nav clicked");
              console.log(GlobalState);

              if (
                document.getElementsByClassName("Categories")[0].style
                  .height === "90vh"
              ) {
                document.getElementsByClassName("Categories")[0].style.height =
                  "0vh";
                document.getElementsByClassName(
                  "Categories"
                )[0].style.overflowY = "hidden";
                document
                  .getElementsByClassName("BackDrop")[0]
                  .classList.remove("BackDropActivated");
              } else {
              }
              BackDrop.current.classList.remove("BackDropActivated");
            }}
          >
            <Home BackDropRef={BackDrop} GlobalState={GlobalState} />
          </div>
        </Row>

        <div className="row px-2 ps-2">
          <div
            className="MainBage col-12"
            style={{
              position: "relative",
              minHeight: "120vh",
              border: "2px solid green",
              marginTop: "0px",
            }}
          >
            <Routes>
              {CategoryRoutes}

              <Route
                path="/"
                element={
                  <Main
                    globalState={GlobalState}
                    UpdateAddress={UpdateAddress}
                  />
                }
              />
              <Route path="/Test" element={<Test />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route
                path="/AdminLogIn"
                element={
                  <AdminLogIn
                    globalState={GlobalState}
                    setGlobal={userChange}
                  />
                }
              />
              <Route
                path="/Admins/:Name"
                element={
                  <AdminPage globalState={GlobalState} setGlobal={userChange} />
                }
              />
              <Route
                path="/LogIn"
                element={
                  <LogIn globalState={GlobalState} setGlobal={userChange} />
                }
              />
              <Route
                path="/ProductDetails/:id"
                element={<ProductDetails AddOrders={AddToCart} />}
              />
              <Route
                path="/Cart"
                element={
                  <CartPage GlobalState={GlobalState} UpdateCart={UpdateCart} AddOrder={AddOrder} />
                }
              />
              <Route path="/:Name/Checkout" element={<UserCheckOutPage />}/>

              <Route
                path="/SignUp"
                element={
                  <SignUp globalState={GlobalState} setGlobal={userChange} />
                }
              />
              <Route
                path="/MerchantLogIn"
                element={
                  <MerchantLogIn
                    globalState={GlobalState}
                    setGlobal={userChange}
                  />
                }
              />
              <Route
                path="/MerchantSignUp"
                element={
                  <MerchantSignUp
                    globalState={GlobalState}
                    setGlobal={userChange}
                  />
                }
              />
              <Route
                path="/Merchants/:Name"
                element={
                  <MerchantPage
                    globalState={GlobalState}
                    setGlobal={userChange}
                  />
                }
              />
              <Route path="/PasswordRecovery" element={<PasswordRecovery />} />
              <Route path="/*" element={<WrongPage />} />
            </Routes>
          </div>
        </div>
        <Row
          className="Footer"
          style={{ fontSize: "1rem", color: "white", backgroundColor: "gray" }}
        >
          <Col
            xs={12}
            md={2}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <a
              href="/ContactUs"
              style={{
                display: "block",
                textDecoration: "none",
                fontSize: "1rem",
                color: "white",
              }}
            >
              Contact Us
            </a>
          </Col>
          <Col
            xs={12}
            md={2}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <a
              href="/ReturnPolicy"
              style={{
                display: "block",
                textDecoration: "none",
                fontSize: "1rem",
                color: "white",
              }}
            >
              Return Policy
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
