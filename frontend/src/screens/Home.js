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
          }}>
          categories
         
        </div>
      </Row>
    </Container>
  );
};

export default Home;
