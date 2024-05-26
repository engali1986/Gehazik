import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = (params) => {

  
  return (
    <Container>
      <Row className="NavBarBig"
        >
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
          }} onClick={(e)=>{
            e.stopPropagation()
            console.log(e.target)
          }}>
          categories
         
        </div>
      </Row>
      <Row >
        <div className="Catigories" style={{width:'fit-content', height:'0vh', overflowY:'hidden'}}>
        adsasd

        </div>
       
      </Row>
    </Container>
  );
};

export default Home;
