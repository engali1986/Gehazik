import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const ProductsScreen = () => {
  const [Loader, SetLoader] = useState(false);
  const params = useParams();
  const [AllProduct, SetAllProducts] = useState([]);

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
        )
          .then((res) => {
            return res.json();
          })
          .catch((err) => {
            console.log(err);
            return { resp: "Connection Error" };
          });
        console.log("ProductsList resp is:", ProductsList);
        if (Array.isArray(ProductsList.resp)) {
          SetAllProducts(ProductsList.resp);
          console.log(ProductsList);
          SetLoader(false);
        } else {
          console.log(ProductsList);
          SetLoader(false);
        }
      } catch (error) {
        console.log(error);
        SetLoader(false);
      }
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
      <Row style={{ borderBottom: "1px solid gray", textAlign: "start" }}>
        <h3>{Object.values(params)[0].replace(/-/g, " ")}</h3>
      </Row>
      <Row
        className=" justify-content-center align-content-start"
        style={{ textAlign: "start" }}
      >
        <Col xs={4}>Sub categories</Col>
        <Col xs={8}>
          <Row>
            {AllProduct.map((Product) => (
              <Col
                xs={6}
                md={4}
                className=" pb-4 pe-1"
                style={{
                  wordBreak: "break-all",
                  backgroundColor: "#eae6db",
                  border: "2px solid white",
                }}
                key={Product._id}
              >
                <Row>
                  <Col xs={12}>
                    <div>Loading</div>
                    <img
                      onLoadedData={(e) => {
                        console.log(e.target.src);
                      }}
                      onLoad={(e) => {
                        e.target.parentElement.children[0].style.innerText =
                          "red";
                        console.log(e.target.complete);
                        console.log(e.target.naturalHeight);
                        console.log(e.target.parentElement.children[0]);
                        if (e.target.complete && e.target.naturalHeight !== 0) {
                          console.log("Image loaded");
                        } else {
                          console.log("Image not loaded");
                          e.target.parentElement.children[0].style.color =
                            "red";
                          e.target.src = `https://drive.google.com/thumbnail?id=${Product.ProductImagesIDs[0]}`;
                        }
                      }}
                      style={{ width: "100%", aspectRatio: "1/1" }}
                      loading="lazy"
                      src={`https://drive.google.com/thumbnail?id=${Product.ProductImagesIDs[0]}`}
                      alt={Product.ProductImagesIDs[0]}
                      decoding="async"
                    />
                  </Col>
                </Row>
                <Row className=" pb-1" key={Product.ProductTitle}>
                  <Col xs={12}>
                    <h5>
                      <a href={`/productdetails/${Product._id}`}>
                        {Product.ProductTitle}
                      </a>
                    </h5>
                  </Col>
                </Row>
                <Row key={Product.ProductUnitPrice}>
                  <Col xs={12}>
                    <div className=" d-flex justify-content-between">
                      <span className=" d-inline-block">
                        {Product.ProductUnitPrice} EGP
                      </span>
                      <span className=" d-inline-block">
                        <i className="fa-solid fa-cart-shopping"></i>
                      </span>
                    </div>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsScreen;
