import React, { useState, useEffect, useRef,useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";
import { Link, useNavigate } from "react-router-dom";
import StaticData, { Categories } from "../Data/StaticData.js";
import {LanguageContext} from "../Context/LanguageContext.js"
import Logo from "../Data/Images/Logo.jpg"
// here we use if else to check params.GlobalState.Admin if false display NavBar items means normal user else means admin donot display navbar items except home
const Home = (params) => {
  const {Language,ToggleLanguage}=useContext(LanguageContext)
  const [ClientLogged,SetClientLogged]=useState(false)
  const Navigate=useNavigate()
  console.log();
  const LogInItems = () => {
    if (params.GlobalState.UserLogged === true) {
      return (
        <>
          <div
            style={{
              position: "relative",
              width: "fit-content",
              
            }}
          >
            <div
              style={{
                position: "absolute",
                display:
                  Array.isArray(params.GlobalState.CartItems) &&
                  params.GlobalState.CartItems.length > 0
                    ? "block"
                    : "none",
                top: "-5px",
                right: "-5px",
                paddingTop: "10%",
                backgroundColor: "red",
                color: "white",
                width: "20px",
                height: "20px",
                borderRadius: "10px",
                fontSize: "0.5rem",
                zIndex: "10",
              }}
            >
              {Array.isArray(params.GlobalState.CartItems)
                ? params.GlobalState.CartItems.length
                : ""}
            </div>
            <a href="/cart">
              <i
                style={{ zIndex: "1", textDecoration: "none", color: "black" }}
                className="fa-solid fa-cart-shopping fa-xl"
              ></i>
            </a>
          </div>
      
        <div
          style={{ width: "fit-content" }}
          onClick={(e) => {
            e.stopPropagation();
            document.getElementsByClassName("BackDrop")[0].click();
            console.log("Login/Signup clicked");
          }}
        >
          <a style={{textDecoration:'none', color:'black'}} href={`/Clients/${params.GlobalState.Name}`}>{Language==="ar"?`مرحبا ${params.GlobalState.Name}`:`Hi ${params.GlobalState.Name}`}</a>
        </div>
        </>
      );
    } else {
      return (
        <div className=" d-flex flex-row" style={{ width: "fit-content" }}>
          <div
            style={{
              position: "relative",
              width: "fit-content",
              
            }}
          >
            
            <a href="/cart" style={{position:'relative'}}>
            <div
              style={{
                position: "absolute",
                display:
                  Array.isArray(params.GlobalState.CartItems) &&
                  params.GlobalState.CartItems.length > 0
                    ? "block"
                    : "none",
                top: "-5px",
                right: "-5px",
                paddingTop: "10%",
                backgroundColor: "red",
                color: "white",
                width: "20px",
                height: "20px",
                borderRadius: "10px",
                fontSize: "0.5rem",
                zIndex: "10",
              }}
            >
              {Array.isArray(params.GlobalState.CartItems)
                ? params.GlobalState.CartItems.length
                : ""}
            </div>
              <i
                style={{ zIndex: "1", textDecoration: "none", color: "black" }}
                className="fa-solid fa-cart-shopping fa-xl"
              ></i>
            </a>
          </div>
          <div
            style={{ width: "fit-content", marginLeft: "5%" }}
            onClick={(e) => {
              e.stopPropagation();
              document.getElementsByClassName("BackDrop")[0].click();
              document.getElementsByClassName("LogIn")[0].click();
              console.log("Login/Signup clicked");
            }}
          >
            {Language==="ar"?"تسجيل الدخول/ مستخدم جديد":"LogIn/SignUp"}
            <a className="LogIn" href="/LogIn"></a>
          </div>
        </div>
      );
    }
  };
  
  useEffect(()=>{
    if (
      params.GlobalState.Admin === true ||
      params.GlobalState.Merchant === true
    ){
      console.log("Admin/ merchant Logged")
      SetClientLogged(false)
    }else{
      console.log("Client Logged")
      SetClientLogged(true)
    }

   
  

  })

  //  here we check if normal user or admin
  if (
    ClientLogged===false
  ) {
    return (
      <Container
        onClick={() => {
          console.log(params);
        }}
      >
        <Row className="NavBarBig d-none d-md-flex">
          
          <div
            style={{
              fontSize: "1.5rem",
              textAlign: "start",
              width: "5vw",
              wordBreak:'break-word'
            }}
          >
            <a href="/">
            <img src={Logo} alt="" style={{width:"5vw" ,aspectRatio:"1/1"}} />
            </a>
          </div>
          <div
            style={{
              fontSize: "1rem",
              textAlign: "start",
              width: "fit-content",
            }}
            onClick={(e)=>{
              e.stopPropagation()
              ToggleLanguage()
            }}
          >
            {Language==="en"?"العربيه":"English"}
          </div> 
          <div className={Language==="ar"?"me-auto":"ms-auto"} style={{width:'fit-content'}} onClick={(e)=>{
            e.stopPropagation()
            Navigate(`/Merchants/${params.GlobalState.Name}`)
          }}>
            {Language==="ar"?`مرحبا ${params.GlobalState.Name}`:`Hi ${params.GlobalState.Name}`}
          </div>
        
          <Col className=" Categories d-none"></Col>
        </Row>
        {/* Small screen navbar-------------------------------------------------------------------------------------------------- */}
        <Row className=" NavBarSmall d-flex d-md-none justify-content-between">
        <div
            style={{
              fontSize: "1.5rem",
              textAlign: "start",
              width: "5vw",
              wordBreak:'break-word'
            }}
          >
            <a href="/">
            <img src={Logo} alt="" style={{width:"5vw" ,aspectRatio:"1/1"}} />
            </a>
          </div>
          <div
            style={{
              fontSize: "1rem",
              textAlign: "start",
              width: "fit-content",
            }}
            onClick={(e)=>{
              e.stopPropagation()
              ToggleLanguage()
            }}
          >
            {Language==="en"?"العربيه":"English"}
          </div> 
          <div className={Language==="ar"?"me-auto":"ms-auto"} style={{width:'fit-content'}} onClick={(e)=>{
            e.stopPropagation()
            Navigate(`/Merchants/${params.GlobalState.Name}`)
          }}>
            {Language==="ar"?`مرحبا ${params.GlobalState.Name}`:`Hi ${params.GlobalState.Name}`}
          </div>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container
        onClick={() => {
          console.log(params);
          console.log(params.GlobalState.Admin);
        }}
      >
        <Row className="NavBarBig d-none d-md-flex">
          <div
            style={{
              fontSize: "1.5rem",
              textAlign: "start",
              width: "5vw",
              wordBreak:'break-word'
            }}
          >
            <a href="/">
            <img src={Logo} style={{width:'100%' ,aspectRatio:"1/1"}} />
            </a>
          </div>
          <div
            style={{
              fontSize: "1rem",
              textAlign: "start",
              width: "fit-content",
              position: "relative",
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("categories triggered");
              console.log(
                document.getElementsByClassName("Categories")[0].style.height
              );
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
                document.getElementsByClassName("Categories")[0].style.height =
                  "90vh";
                document.getElementsByClassName(
                  "Categories"
                )[0].style.overflowY = "scroll";
                document
                  .getElementsByClassName("BackDrop")[0]
                  .classList.add("BackDropActivated");
              }
              console.log(e.target);
            }}
          >
            {Language==="ar"?"جميع الاقسام":"categories"}
          </div>
          <div
            style={{
              fontSize: "1rem",
              textAlign: "start",
              width: "fit-content",
            }}
            onClick={(e)=>{
              e.stopPropagation()
              ToggleLanguage()
            }}
          >
            {Language==="en"?"العربيه":"English"}
          </div>
          <div
            className="SearchBar d-flex"
            style={{
              marginLeft: "auto",
              width: "30%",
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "5px",
            }}
          >
            <input
              type="text"
              style={{ maxHeight: "4vh", border: "1px solid white" }}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "blue" }}
            ></i>
          </div>
          <LogInItems />
        </Row>
        {/* Small screen navbar-------------------------------------------------------------------------------------------------- */}
        <Row className=" NavBarSmall d-flex d-md-none">
        <div
            style={{
              fontSize: "1.5rem",
              textAlign: "start",
              width: "10vw",
              wordBreak:'break-word'
            }}
          >
            <a href="/">
            <img src={Logo} style={{width:'100%' ,aspectRatio:"1/1"}} />
            </a>
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              textAlign: "start",
              width: "fit-content",
              position: "relative",
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("categories small screen triggered");
              console.log(
                document.getElementsByClassName("Categories")[0].style.height
              );
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
                document.getElementsByClassName("Categories")[0].style.height =
                  "90vh";
                document.getElementsByClassName(
                  "Categories"
                )[0].style.overflowY = "scroll";
                document
                  .getElementsByClassName("BackDrop")[0]
                  .classList.add("BackDropActivated");
              }
              console.log(e.target);
            }}
          >
            &#9776;
          </div>
          <div
            style={{
              fontSize: "1rem",
              textAlign: "start",
              width: "fit-content",
            }}
            onClick={(e)=>{
              e.stopPropagation()
              ToggleLanguage()
            }}
          >
            {Language==="en"?"العربيه":"English"}
          </div>
          <Col
            xs={12}
            className="SearchBar d-flex order-4"
            style={{
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "5px",
            }}
          >
            <input
              type="text"
              style={{ maxHeight: "4vh", border: "1px solid white" }}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "blue" }}
            ></i>
          </Col>
          <div
            className=" order-3"
            style={{ width: "fit-content", marginLeft: "auto" }}
            onClick={(e) => {
              e.stopPropagation();
              document.getElementsByClassName("BackDrop")[0].click();
              console.log("Login/Signup clicked");
            }}
          >
            <LogInItems />
          </div>
        </Row>
        <Row>
          <Col
            xs={12}
            md={6}
            className="Categories"
            onClick={() => {
              console.log("menu items clicked");
            }}
          >
            {StaticData.Categories.map((Item) => (
              <div key={Item}>
                <a
                  href={`/Products/${Item.replace(/\s+/g, "-")}/All`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "black",
                    fontSize: "1.25rem",
                    width: "100%",
                  }}
                >
                  {Item}
                </a>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
  
};
export default Home;
