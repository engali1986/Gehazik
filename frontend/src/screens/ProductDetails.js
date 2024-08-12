import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const ProductDetails = () => {
  const [Loader, SetLoader] = useState(false);
  const params = useParams();
  const Navigate = useNavigate();
  console.log(params.id);
  useEffect(() => {
    SetLoader(true);
    const ProductDetails = async (ProductID) => {
      const GetProductetails = fetch(
        "http://localhost:5000/Users/GetProductDetails",
        {
          method: "post",
          body: JSON.stringify({ Data: ProductID }),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          console.log(err);
          return { resp: "Connection error" };
        });
      console.log(GetProductetails);
      SetLoader(false);
    };

    ProductDetails(params.id);
  }, []);
  return (
    <Container>
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
      >
        <div
          style={{
            color: "black",
            opacity: "1",
            fontSize: "3rem",
            marginTop: "25%",
            backgroundColor: "white",
          }}
        >
          Please wait
        </div>
      </Row>
      <div>ProductDetails</div>;
    </Container>
  );
};

export default ProductDetails;
