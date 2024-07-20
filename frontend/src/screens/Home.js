import React, { useState,useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";
import { Link } from "react-router-dom";
import StaticData, {Categories} from "../Data/StaticData.js"

// here we use if else to check params.GlobalState.Admin if false display NavBar items means normal user else means admin donot display navbar items except home

const Home = (params) => {
  

  
  console.log()
  const LogInItems = () => {
    if (params.GlobalState.UserLogged === true) {
      return (
        <div
          style={{ width: "fit-content", marginLeft: "10%" }}
          onClick={(e) => {
            e.stopPropagation();
            document.getElementsByClassName("BackDrop")[0].click();
            console.log("Login/Signup clicked");
          }}>
          Hi,{params.GlobalState.Name}
        </div>
      );
    } else {
      return (
        <div
          style={{ width: "fit-content", marginLeft: "5%" }}
          onClick={(e) => {
            e.stopPropagation();

            document.getElementsByClassName("BackDrop")[0].click();
            document.getElementsByClassName("LogIn")[0].click();
            console.log("Login/Signup clicked");
          }}>
          LogIn/SignUp
          <a className="LogIn" href="/LogIn"></a>
        </div>
      );
    }
  };



  
//  here we check if normal user or admin
  if (params.GlobalState.Admin===true || params.GlobalState.Merchant===true ) {
    return(
      <Container
      onClick={() => {
        console.log(params);
      
      }}>
      <Row className="NavBarBig d-none d-md-flex">
        <div
          style={{
            fontSize: "1.5rem",
            textAlign: "start",
            width: "fit-content",
          }}>
          home
        </div>
       
      </Row>
      {/* Small screen navbar-------------------------------------------------------------------------------------------------- */}
      <Row className=" NavBarSmall d-flex d-md-none">
        <div
          style={{
            fontSize: "1.5rem",
            textAlign: "start",
            width: "fit-content",
          }}>
          home
        </div>
      
      </Row>
     
    </Container>
    )


    
   


   
    
  } else {
    return (
      <Container
      onClick={() => {
        console.log(params);
        console.log(params.GlobalState.Admin)
      }}>
      <Row className="NavBarBig d-none d-md-flex">
        <div
          style={{
            fontSize: "1.5rem",
            textAlign: "start",
            width: "fit-content",
          }}>
          home
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
            console.log(document.getElementsByClassName("Categories")[0].style.height);
           
            if (document.getElementsByClassName("Categories")[0].style.height === "90vh") {
              document.getElementsByClassName("Categories")[0].style.height = "0vh";
              document.getElementsByClassName("Categories")[0].style.overflowY = "hidden";
              document.getElementsByClassName("BackDrop")[0].classList.remove("BackDropActivated");
           
            } else {
              document.getElementsByClassName("Categories")[0].style.height = "90vh";
              document.getElementsByClassName("Categories")[0].style.overflowY = "scroll";
              document.getElementsByClassName("BackDrop")[0].classList.add("BackDropActivated");
             
            }
            console.log(e.target);
          }}>
          categories
        </div>
       
        <div className="SearchBar d-flex" style={{ marginLeft: "auto", width: "30%", backgroundColor: "white", border: "1px solid black", borderRadius: "5px" }}>
          <input type="text" style={{ maxHeight: "4vh", border: "1px solid white" }} />
          <i className="fa-solid fa-magnifying-glass" style={{ color: "blue" }}></i>
        </div>

        <LogInItems />
      </Row>
      {/* Small screen navbar-------------------------------------------------------------------------------------------------- */}
      <Row className=" NavBarSmall d-flex d-md-none">
        <div
          style={{
            fontSize: "1.5rem",
            textAlign: "start",
            width: "fit-content",
          }}>
          home
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
            console.log(document.getElementsByClassName("Categories")[0].style.height);
            
            if (document.getElementsByClassName("Categories")[0].style.height === "90vh") {
              document.getElementsByClassName("Categories")[0].style.height = "0vh";
              document.getElementsByClassName("Categories")[0].style.overflowY = "hidden";
              document.getElementsByClassName("BackDrop")[0].classList.remove("BackDropActivated");
             
            } else {
              document.getElementsByClassName("Categories")[0].style.height = "90vh";
              document.getElementsByClassName("Categories")[0].style.overflowY = "scroll";
              document.getElementsByClassName("BackDrop")[0].classList.add("BackDropActivated");
              
            }
            console.log(e.target);
          }}>
          &#9776;
        </div>
        <Col xs={12}className="SearchBar d-flex order-4" style={{  backgroundColor: "white", border: "1px solid black", borderRadius: "5px" }}>
          <input type="text" style={{ maxHeight: "4vh", border: "1px solid white" }} />
          <i className="fa-solid fa-magnifying-glass" style={{ color: "blue" }}></i>
        </Col>
       


        <div className=" order-3"
          style={{ width: "fit-content", marginLeft: "auto" }}
          onClick={(e) => {
            e.stopPropagation();
            document.getElementsByClassName("BackDrop")[0].click();
            console.log("Login/Signup clicked");
          }}>
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
          }}>
          {StaticData.Categories.map(Item=>(
            <div key={Item}>
              <a href={`/Products/${Item}`} style={{textDecoration:'none', color:'black', fontSize:'1.25rem'}} >
             
              {Item}

              </a>
              
            </div>
          ))}

     
        </Col>
        
      </Row>
    </Container>

    )
  }
  
 
};

export default Home;
