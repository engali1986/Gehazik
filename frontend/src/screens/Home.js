import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = (params) => {
  return (
    <Container>
      <Row
        style={{
          backgroundColor: "gray",
          minHeight: "5vh",
          alignItems: "center",
        }}>
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
          <div
            style={{
              position: "absolute",
              left: "-90%",
              minWidth: "400px",
              minHeight: "400px",
              backgroundColor: "red",
            }}></div>
        </div>
      </Row>
    </Container>
  );
};

export default Home;
