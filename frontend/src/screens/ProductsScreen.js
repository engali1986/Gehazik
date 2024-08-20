import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import StaticData from "../Data/StaticData";

const ProductsScreen = () => {
  const [Loader, SetLoader] = useState(false);
  const params = useParams();
  const [AllProduct, SetAllProducts] = useState([]);// All products will be stored in this state
  const [SubCategories,SetSubCategories]=useState([]) // all sub categories object will be saved  here
  // the following funcion will get sub categories to list them on side Column
  const SubCategoriesList=()=>{
    console.log(StaticData.ProductCategories[0][Object.values(params)[0].replace(/-+/g,"_")])
    for (let index = 0; index < StaticData.ProductCategories.length; index++) {
      if (StaticData.ProductCategories[index][Object.values(params)[0].replace(/-+/g,"_")]) {
        console.log("Sub categories found")
        let arr=StaticData.ProductCategories[index][Object.values(params)[0].replace(/-+/g,"_")]
        console.log(arr)
        SetSubCategories(arr)
        break;
        
      } else {
        console.log("SubCategorie not found")
        
      }
      
    }

    if (SubCategories.length>0) {
      return<>
      {SubCategories.map(item=>(
        <Row>
          {Object.keys(item)[0].replace(/_+/g," ")}
          {Object.values(item)[0].map(elem=>(
            <div>
              {elem}
            </div>
          ))}
        </Row>
      ))}
      </>
      
    }else{
      return "Sub Categories"

    }
    
    
  }
  // the following function will provide page Content 
  const PageContent=()=>{
    return   <Row>
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
                if (e.target.complete && e.target.naturalHeight > 20) {
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
    

  }
// UseEffect will be used to get the product list from backend
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
          "https://gehazik-server.onrender.com/Users/ProductsList",
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
      {/* Loader */}
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
      {/* Page head */}
      <Row style={{ borderBottom: "1px solid gray", textAlign: "start" }}>
        <h3>{Object.values(params)[0].replace(/-/g, " ")}</h3>
      </Row>
      {/* Page content */}
      <Row
        className=" justify-content-center align-content-start"
        style={{ textAlign: "start" }}
      >
        {/* Side Column */}
        <Col xs={4}>{<SubCategoriesList/>}</Col>
        {/* Content Column */}
        <Col xs={8}>
         {<PageContent/>}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsScreen;
