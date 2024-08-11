import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const ProductsScreen = () => {
  const [Loader, SetLoader] = useState(false);
  const params = useParams();

  useEffect(() => {
    SetLoader(true);
    console.log("Loader is: ", Loader);
    console.log("params is: ", Object.values(params)[0].replace(/-/g, " "));
    const GetAllProducts = async () => {
      try {
        const Category = Object.values(params)[0].replace(/-/g, " ");
        console.log("Category is : ", Category);
        console.log("All Products");
        const ProductsList = await fetch(
          "http://localhost:5000/Users/ProductsList",
          {
            method: "post",
            body: JSON.stringify({ Data: Category }),
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
          }
        );
        SetLoader(false);
      } catch (error) {}
    };
    GetAllProducts();
  }, []);
  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        console.log(params);
      }}
      style={{ position: "relative" }}
    >
      <Row
        style={{
          position: "fixed",
          display: Loader === true ? "block" : "none",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundColor: "gray",
          opacity: "0.3",
          top: "0px",
          left: "0px",
          zIndex: "100",
        }}
      ></Row>
      <Row style={{ borderBottom: "1px solid gray", textAlign: "start" }}>
        <h3>{Object.values(params)[0].replace(/-/g, " ")}</h3>
      </Row>
      <Row
        className=" justify-content-center align-content-start"
        style={{ textAlign: "start" }}
      >
        <Col xs={4}>Sub categories</Col>
        <Col xs={8}>
          <Row></Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsScreen;
