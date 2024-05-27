import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = (params) => {
  return (
    <Container>
      <Row className="NavBarBig">
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
            document.getElementsByClassName("Services")[0].lastChild.style.display = "none";
            if (document.getElementsByClassName("Categories")[0].style.height === "90vh") {
              document.getElementsByClassName("Categories")[0].style.height = "0vh";
              document.getElementsByClassName("Categories")[0].style.overflowY = "hidden";
            } else {
              document.getElementsByClassName("Categories")[0].style.height = "90vh";
              document.getElementsByClassName("Categories")[0].style.overflowY = "scroll";
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
            console.log(e.target.lastChild);
            if (e.target.lastChild.style.display === "block") {
              e.target.lastChild.style.display = "none";
            } else {
              e.target.lastChild.style.display = "block";
            }

            console.log(e.target);
          }}>
          Services
          <div style={{ position: "absolute", minHeight: "400px", minWidth: "400px", top: "100%", left: "0%", display: "none" }}></div>
        </div>
      </Row>
      <Row>
        <div className="Categories">adsasd</div>
      </Row>
    </Container>
  );
};

export default Home;
