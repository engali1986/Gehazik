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
function App() {
  const BackDrop = useRef();
  const ProfileItems = useRef();
  if (sessionStorage.getItem("globalState") !== null) {
    console.log("ther is sission")
    
  }

  //  first check if there is GlobalState in session and local storage
  if (localStorage.getItem("globalState") === null && sessionStorage.getItem("globalState") === null) {
    console.log("initiale state");
    localStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: false,
        Name: "",
        email: "",
        Admin:false,
        Client: false,
        Merchant: false

      })
    );

    sessionStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: false,
        Name: "",
        email: "",
        Admin:false,
        Client: false,
        Merchant: false

      })
    );

    console.log(JSON.parse(sessionStorage.getItem("globalState")));

    console.log("initial sessionstorage");

    console.log(localStorage.getItem("globalState"));
  } else if (sessionStorage.getItem("globalState") === null && localStorage.getItem("globalState") != null) {
    sessionStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: JSON.parse(localStorage.getItem("globalState")).UserLogged,
        Name: JSON.parse(localStorage.getItem("globalState")).Name,
        email: JSON.parse(localStorage.getItem("globalState")).email,
        Admin: JSON.parse(localStorage.getItem("globalState")).Admin,
        Client: JSON.parse(localStorage.getItem("globalState")).Client,
        Merchant: JSON.parse(localStorage.getItem("globalState")).Merchant

      })
    );

    console.log(sessionStorage.getItem("globalState"));
    console.log("initial sessionstorage");
  } else if (sessionStorage.getItem("globalState") === null) {
    sessionStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: JSON.parse(localStorage.getItem("globalState")).UserLogged,
        Name: JSON.parse(localStorage.getItem("globalState")).Name,
        email: JSON.parse(localStorage.getItem("globalState")).email,
        Admin: JSON.parse(localStorage.getItem("globalState")).Admin,
        Client: JSON.parse(localStorage.getItem("globalState")).Client,
        Merchant: JSON.parse(localStorage.getItem("globalState")).Merchant

      })
    );

    console.log("initial sessionstorage");
  }
  //  if no data set session and local storage above

  const [GlobalState, SetGlobal] = useState(JSON.parse(sessionStorage.getItem("globalState")));
  console.log("app started");
  console.log(GlobalState);
  console.log(sessionStorage.getItem("globalState"));
  console.log(localStorage.getItem("globalState"));
  console.log(localStorage.getItem("globalState") === !null);

  //  if user logged time stamp will be addded to local storage to allow for other tabs
  // if (localStorage.getItem("globalState") === null) {
  //   console.log("No data in local storage")
  // } else {
  //   console.log("Time logges start");
  //   if (JSON.parse(localStorage.getItem("globalState")).TimeLogged) {
  //     console.log("Time logged");
  //     if (
  //       new Date().getTime() -
  //         JSON.parse(localStorage.getItem("globalState")).TimeLogged >=
  //       20000
  //     ) {
  //       localStorage.removeItem("globalState");
  //     }
  //   } else {
  //     console.log("No time Logged");
  //   }
  // }

  const userChange = (name, LogInStatus, mail, Admin, Client, Merchant) => {
    SetGlobal({
      ...GlobalState,
      UserLogged: LogInStatus,
      Name: name,
      email: mail,
      Admin: Admin,
      Client: Client,
      Merchant:Merchant
    });

    localStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: LogInStatus,
        Name: name,
        email: mail,
        Admin: Admin,
        Client: Client,
        Merchant:Merchant,
        TimeLogged: new Date().getTime(),
      })
    );

    sessionStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: LogInStatus,
        Name: name,
        email: mail,
        Admin: Admin,
        Client: Client,
        Merchant:Merchant
      })
    );
  };

  console.log(typeof new Date().getTime());

  // if (JSON.parse(localStorage.getItem("globalState")).TimeLogged) {
  //   if (new Date().getTime() - JSON.parse(localStorage.getItem("globalState")).TimeLogged >= 20000) {

  //     localStorage.setItem("globalState",JSON.stringify({
  //       "UserLogged":false,
  //       "Name":"",
  //       "email":"",

  //     }))

  //   } else {
  //     console.log(new Date().getTime() - JSON.parse(localStorage.getItem("globalState")).TimeLogged)

  //   }

  // } else {
  //   console.log("User Not")

  // }
  // used localStorage to keep state when page refresh

  console.log(typeof GlobalState);
  // console.log(typeof GlobalState.UserLogged)
  window.onresize = () => {
    console.log(window.innerWidth);
  };
  // Main bage to be directly below navbar we use window,onresize and adjust margintop

  window.onresize = () => {
    if (window.innerWidth >= 768) {
      console.log("navBarBig");
      document.getElementsByClassName("MainBage")[0].style.marginTop = document.getElementsByClassName("NavBarBig")[0].getBoundingClientRect().bottom + "px";
    } else {
      console.log("navBarsmall");
      document.getElementsByClassName("MainBage")[0].style.marginTop = document.getElementsByClassName("NavBarSmall")[0].getBoundingClientRect().bottom + "px";
    }
  };

 window.onunload=()=>{
  localStorage.clear()
 }
  useEffect(() => {
    if (window.innerWidth >= 768) {
      console.log("navBarBig");
      document.getElementsByClassName("MainBage")[0].style.marginTop = document.getElementsByClassName("NavBarBig")[0].getBoundingClientRect().bottom + "px";
    } else {
      console.log("navBarsmall");
      document.getElementsByClassName("MainBage")[0].style.marginTop = document.getElementsByClassName("NavBarSmall")[0].getBoundingClientRect().bottom + "px";
    }
  }, []);

  return (
    <div
      onClick={() => {
        console.log(window.innerWidth);
      }}>
      <div
        ref={BackDrop}
        onClick={(e) => {
          e.stopPropagation();
          console.log("backdrop clicked");
          
          document.getElementsByClassName("Categories")[0].style.height = "0vh";
          document.getElementsByClassName("Categories")[0].style.overflowY = "hidden";
          document.getElementsByClassName("BackDrop")[0].classList.remove("BackDropActivated");
       
        }}
        className="BackDrop "></div>

      <Container className="App " style={{ border: "2px solid red", fontSize: "1rem", zIndex: "100" }}>
        <Row style={{ zIndex: "5", backgroundRowor: "gray", position: "relative" }}>
          <div
            className="fixed-top"
            onClick={(e) => {
              e.stopPropagation();
              console.log("nav clicked");
              if (document.getElementsByClassName("Categories")[0].style.height === "90vh" || document.getElementsByClassName("Services")[0].lastChild.style.display === "block") {
        
                document.getElementsByClassName("Categories")[0].style.height = "0vh";
                document.getElementsByClassName("Categories")[0].style.overflowY = "hidden";
                document.getElementsByClassName("BackDrop")[0].classList.remove("BackDropActivated");
               
              } else {
              }
              BackDrop.current.classList.remove("BackDropActivated");
            }}>
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
            }}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/Test" element={<Test />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/AdminLogIn" element={<AdminLogIn globalState={GlobalState} setGlobal={userChange} />} />
              <Route path="/Admins/:Name"  element={<AdminPage globalState={GlobalState} setGlobal={userChange} />} />



              <Route path="/LogIn" element={<LogIn globalState={GlobalState} setGlobal={userChange} />} />
              <Route path="/SignUp" element={<SignUp globalState={GlobalState} setGlobal={userChange} />} />
              <Route path="/PasswordRecovery" element={<PasswordRecovery />} />
              <Route path="/*" element={<WrongPage />} />

            </Routes>
          </div>
        </div>
        <Row className="Footer" style={{ fontSize: "1rem", color: "white", backgroundColor: "gray" }}>
          <Col xs={12} md={2} onClick={(e)=>{
            e.stopPropagation()
          }} >
            
            <a href="/ContactUs" style={{display:'block', textDecoration:'none', fontSize: "1rem", color: "white"}}>
              Contact Us

            </a>
          </Col>
          <Col xs={12} md={2}onClick={(e)=>{
            e.stopPropagation()
          }}>
          <a href="/ReturnPolicy" style={{display:'block', textDecoration:'none', fontSize: "1rem", color: "white"}}>
              Return Policy

            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
