import React, {useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = (params) => {
  const [SubCategories,setSubCategories]=useState("")
  return (
    <Container>
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
            console.log("categories triggered")
            console.log(document.getElementsByClassName("Categories")[0].style.height)
            document.getElementsByClassName("Services")[0].lastChild.style.display = "none";
            if (document.getElementsByClassName("Categories")[0].style.height === "90vh") {
              document.getElementsByClassName("Categories")[0].style.height = "0vh";
              document.getElementsByClassName("Categories")[0].style.overflowY = "hidden";
              document.getElementsByClassName("BackDrop")[0].classList.remove("BackDropActivated")
              document.getElementsByClassName("SubCategories")[0].style.display="none"
            } else {
              document.getElementsByClassName("Categories")[0].style.height = "90vh";
              document.getElementsByClassName("Categories")[0].style.overflowY = "scroll";
              document.getElementsByClassName("BackDrop")[0].classList.add("BackDropActivated")
              document.getElementsByClassName("SubCategories")[0].style.display="block"
            }
            console.log(e.target);
          }}>
          categories
        </div>
        <div
          className="Services"
          style={{
            fontSize: "1rem",
            textAlign: "start",
            width: "fit-content",
            position: "relative",
          }}
          onClick={(e) => {
            e.stopPropagation();
            document.getElementsByClassName("Categories")[0].style.height = "0vh";
            document.getElementsByClassName("Categories")[0].style.overflowY = "hidden";
            document.getElementsByClassName("SubCategories")[0].style.display="none"
            document.getElementsByClassName("BackDrop")[0].classList.remove("BackDropActivated")
            console.log(e.target.lastChild);
            if (e.target.lastChild.style.display === "block") {
              e.target.lastChild.style.display = "none";
            } else {
              e.target.lastChild.style.display = "block";
              document.getElementsByClassName("BackDrop")[0].classList.add("BackDropActivated")
            }

            console.log(e.target);
          }}>
          Services
          <div style={{ position: "absolute", minHeight: "400px", minWidth: "400px", top: "100%", left: "0%", display: "none" }}
          onClick={(e)=>{
            e.stopPropagation()
            document.getElementsByClassName("Categories")[0].style.height = "0vh";
            document.getElementsByClassName("Categories")[0].style.overflowY = "hidden";
            document.getElementsByClassName("Services")[0].lastChild.style.display = "none";
            document.getElementsByClassName("BackDrop")[0].classList.remove("BackDropActivated")
          }}></div>
        </div>
        <div style={{width:'fit-content', marginLeft:'auto'}} onClick={(e)=>{
          e.stopPropagation()
          document.getElementsByClassName("BackDrop")[0].click()
          console.log("Login/Signup clicked")
        }}>
          Login/Signup
        </div>
      </Row>
      <Row className=" NavBarSmall d-flex d-md-none">
      <div
          style={{
            fontSize: "1.5rem",
            textAlign: "start",
            width: "fit-content",
          }}>
          home
        </div>
        <div  style={{
            fontSize: "1.5rem",
            textAlign: "start",
            width: "fit-content",
            position: "relative",

          }} onClick={(e)=>{
            e.stopPropagation();
            console.log("categories small screen triggered")
            console.log(document.getElementsByClassName("Categories")[0].style.height)
            document.getElementsByClassName("Services")[0].lastChild.style.display = "none";
            if (document.getElementsByClassName("Categories")[0].style.height === "90vh") {
              document.getElementsByClassName("Categories")[0].style.height = "0vh";
              document.getElementsByClassName("Categories")[0].style.overflowY = "hidden";
              document.getElementsByClassName("BackDrop")[0].classList.remove("BackDropActivated")
              document.getElementsByClassName("SubCategories")[0].style.display="none"
            } else {
              document.getElementsByClassName("Categories")[0].style.height = "90vh";
              document.getElementsByClassName("Categories")[0].style.overflowY = "scroll";
              document.getElementsByClassName("BackDrop")[0].classList.add("BackDropActivated")
              document.getElementsByClassName("SubCategories")[0].style.display="block"
            }
            console.log(e.target);

          }} >
        &#9776;
        </div>
        <div style={{width:'fit-content', marginLeft:'auto'}} onClick={(e)=>{
          e.stopPropagation()
          document.getElementsByClassName("BackDrop")[0].click()
          console.log("Login/Signup clicked")
        }}>
          Login/Signup
        </div>

      </Row>
      <Row>
        <Col xs={6} md={4} className="Categories" onClick={()=>{
          console.log("menu items clicked")
        }}>
          
          <div onClick={(e)=>{
            e.stopPropagation()
            setSubCategories(e.target.innerText)
            document.getElementsByClassName("SubCategories")[0].style.display="block"
           
            
            
           

          }}>
          Electronics
          
            </div>
            <div>
          Kitchen
            </div>

           
  

        
        <div
          className="Services d-block d-md-none"
          style={{
            fontSize: "1rem",
            textAlign: "start",
            position: "relative",
            marginTop:'80vh'
          }}
          onClick={(e) => {
            e.stopPropagation();
           
            console.log(e.target);
          }}>
          Services
         
        </div>
          
     
        </Col>
        <Col xs={6} md={8} className="SubCategories" onClick={(e)=>{
          e.stopPropagation()
          
          document.getElementsByClassName("BackDrop")[0].click()
          setSubCategories("")

        }}>
          {SubCategories}
        </Col>
        
      </Row>
    </Container>
  );
};

export default Home;
