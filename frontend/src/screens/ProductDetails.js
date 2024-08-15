import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const ProductDetails = () => {
  const [Product, setProduct] = useState({ ProductImages: [] });
  const [Loader, SetLoader] = useState(false);
  const params = useParams();
  const Navigate = useNavigate();
  console.log(params.id);
  let prod;

  useEffect(() => {
    SetLoader(true);
    const GetProductDetails = async (ProductID) => {
      const Productdetails = await fetch(
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
      console.log(Productdetails);
      console.log(Productdetails.resp);
      console.log(Productdetails.resp.resp);
      if (typeof Productdetails.resp === "object") {
        console.log(Productdetails.resp);
        SetLoader(false);
        prod = await Productdetails.resp;
        console.log(prod);
        setProduct((Perv) => ({
          ...Perv,
          ProductImages: prod.ProductImagesIDs,
        }));
        console.log(Product);
      } else {
        Navigate("/ProductNotFound");
      }
    };

    GetProductDetails(params.id);

    console.log(Product);
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
      <Row>
        <Col
          xs={12}
          md={6}
          className=" d-flex"
          style={{ height: "min-content" }}
        >
          <div
            className=" d-flex flex-column"
            style={{ maxWidth: "20%", maxHeight: "100%", overflow: "hidden" }}
          >
            <div style={{ maxWidth: "100%", position: "relative" }}>
              {Product.ProductImages.map((item, index) => (
                <img
                  key={item}
                  onLoadedData={(e) => {
                    console.log(e.target.src);
                  }}
                  onLoad={(e) => {
                    console.log(e.target.complete);
                    console.log(e.target.naturalHeight);

                    if (e.target.complete && e.target.naturalHeight > 20) {
                      console.log("Image loded");
                      console.log(e.target.naturalHeight);
                      console.log(e.target.style.width);
                      console.log(typeof e.target.style.width);
                    } else {
                      console.log("Image not loaded");
                      e.target.src = `https://drive.google.com/thumbnail?id=${item}`;
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("small image clicked");
                    const Images = document.querySelectorAll(
                      ".ProductDetailsImage"
                    );
                    console.log(Images);
                    if (e.target.classList.contains("ProductImageActive")) {
                      console.log("Image selected");
                    } else {
                      for (let index = 0; index < Images.length; index++) {
                        Images[index].classList.remove("ProductImageActive");
                      }
                      e.target.classList.add("ProductImageActive");
                      document.getElementById("MainImage").src = e.target.src;
                    }
                  }}
                  className={
                    index === 0
                      ? "ProductDetailsImage ProductImageActive"
                      : "ProductDetailsImage"
                  }
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    aspectRatio: "1/1",

                    cursor: "pointer",
                  }}
                  src={`https://drive.google.com/thumbnail?id=${item}`}
                  alt={Product.item}
                  decoding="async"
                />
              ))}
            </div>
          </div>
          <div
            style={{
              width: "80%",
              maxWidth: "80%",
              aspectRatio: "1/1",
              maxHeight: "100%",
            }}
          >
            <img
              onLoadedData={(e) => {
                console.log(e.target.src);
              }}
              onLoad={(e) => {
                console.log(e.target.complete);
                console.log(e.target.naturalHeight);

                if (e.target.complete && e.target.naturalHeight > 20) {
                  console.log("Image loded");
                } else {
                  console.log("Image not loaded");
                  e.target.src = `https://drive.google.com/thumbnail?id=${Product.ProductImages[0]}`;
                }
              }}
              id="MainImage"
              style={{ width: "100%", aspectRatio: "1/1" }}
              src={`https://drive.google.com/thumbnail?id=${Product.ProductImages[0]}`}
              alt={Product.ProductImages[0]}
              decoding="async"
            />
          </div>
        </Col>
        <Col xs={12} md={6}></Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
