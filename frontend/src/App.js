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

function App() {
  const BackDrop = useRef();
  const ProfileItems = useRef();
  console.log(JSON.parse(localStorage.getItem("globalState")).TimeLogged);

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
      })
    );

    sessionStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: false,
        Name: "",
        email: "",
      })
    );

    console.log(JSON.parse(sessionStorage.getItem("globalState")));

    console.log("initial sessionstorage");

    console.log(localStorage.getItem("globalState"));
  } else if (
    sessionStorage.getItem("globalState") === null &&
    localStorage.getItem("globalState") != null
  ) {
    sessionStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: JSON.parse(localStorage.getItem("globalState")).UserLogged,
        Name: JSON.parse(localStorage.getItem("globalState")).Name,
        email: JSON.parse(localStorage.getItem("globalState")).email,
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

  const userChange = (name, LogInStatus, mail) => {
    SetGlobal({
      ...GlobalState,
      UserLogged: LogInStatus,
      Name: name,
      email: mail,
    });

    localStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: LogInStatus,
        Name: name,
        email: mail,
        TimeLogged: new Date().getTime(),
      })
    );

    sessionStorage.setItem(
      "globalState",
      JSON.stringify({
        UserLogged: LogInStatus,
        Name: name,
        email: mail,
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

  window.onresize=()=>{
    document.getElementsByClassName("MainBage")[0].style.marginTop=document.getElementsByClassName("NavBarBig")[0].getBoundingClientRect().bottom+"px"

  }
  useEffect(()=>{
    document.getElementsByClassName("MainBage")[0].style.marginTop=document.getElementsByClassName("NavBarBig")[0].getBoundingClientRect().bottom+"px"

  },[])


  return (
    <div
      onClick={() => {
        console.log(window.innerWidth);
      }}
    >
      <div
        ref={BackDrop}
        onClick={() => {
          const SubMenus = document.querySelectorAll(".NavItem");
          for (let index = 0; index < SubMenus.length; index++) {
            SubMenus[index].children[1].style.display = "none";
          }
          document.querySelectorAll(".categories")[0].style.display = "none";
          console.log("backdrop clicked");

          console.log(document.querySelectorAll(".NavItem"));

          BackDrop.current.classList.remove("BackDropActivated");
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
              
              BackDrop.current.classList.remove("BackDropActivated");
            }}
          >
            <Home BackDropRef={BackDrop} />
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
              <Route path="/" element={<Main />} />
              <Route
                path="/LogIn"
                element={
                  <LogIn globalState={GlobalState} setGlobal={userChange} />
                }
              />
              <Route
                path="/SignUp"
                element={
                  <SignUp globalState={GlobalState} setGlobal={userChange} />
                }
              />
              <Route path="/PasswordRecovery" element={<PasswordRecovery />} />
            </Routes>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
