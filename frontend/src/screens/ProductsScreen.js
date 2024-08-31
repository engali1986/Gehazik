import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import StaticData from "../Data/StaticData";

const ProductsScreen = ({globalState}) => {
  const [Loader, SetLoader] = useState(false);
  const params = useParams();
  const [AllProduct, SetAllProducts] = useState([]);// All products will be stored in this state
  const [SubCategories,SetSubCategories]=useState([]) // all sub categories object will be saved  here
  const [SelectedFilter,SetSelectedFilter]=useState("")
  const [FeatureFilterArr,SetFeatureFilterArr]=useState([]) // this array will be used for feature filter
  const [SetSubCategoriesFilterArr,SetSetSubCategoriesFilterArr]=useState([]) // this array for sub categories filter
  // the following function will provide page Content 
  const PageContent=()=>{
    if (SetSubCategoriesFilterArr.length===0 && FeatureFilterArr.length===0 && SelectedFilter.length>0) {
      console.log("No Products Found")
      return   <Row>
    No Products Found
    </Row>
      
    } else if(SetSubCategoriesFilterArr.length>0) {
      console.log("All products in subcategory")
      return   <Row>
      {SetSubCategoriesFilterArr.map((Product) => (
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

      
    } else if(FeatureFilterArr.length>0){
      console.log("All products in features")
      return   <Row>
      {FeatureFilterArr.map((Product) => (
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

    } else{
      console.log("All Products")
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
   
    

  }
// UseEffect will be used to get the product list from backend
  useEffect(() => {
    console.log(SelectedFilter)
    SetLoader(true);
    console.log("Loader is: ", Loader);
    console.log("params is: ", Object.values(params)[0].replace(/-/g, " "));
    const GetAllProducts = async () => {
      try {
        const Category = Object.values(params)[0].replace(/-/g, " ");
        const CategoryData={
          Category:Category,
          Governorate:globalState.Governorate,
          City:globalState.City
        }
        console.log("Category is : ", Category);
        console.log("All Products");
        const ProductsList = await fetch(
          "http://localhost:5000/Users/ProductsList",
          {
            method: "post",
            body: JSON.stringify({ Data: CategoryData }),
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
    // Generate subCategories
    for (let index = 0; index < StaticData.ProductCategories.length; index++) {
      if (StaticData.ProductCategories[index][Object.values(params)[0].replace(/-+/g,"_")]) {
        console.log(Object.values(params)[0].replace(/-+/g,"_"))
        console.log("Sub categories found")
        let arr=StaticData.ProductCategories[index][Object.values(params)[0].replace(/-+/g,"_")]
        console.log(arr)
        SetSubCategories(arr)
        break;
        
      } else {
        console.log(Object.values(params)[0].replace(/-+/g,"_"))
        console.log("SubCategorie not found")
        
      }
      
    }
  }, [SubCategories]);
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
        <Col xs={4}>
       
        {Array.isArray(SubCategories) && SubCategories.length>0?SubCategories.map((item,index)=>(
        <Row key={index}>
          <div id={index}  className={`SubCategories fs-6 text-decoration-underline ${SelectedFilter===Object.keys(item)[0].replace(/_+/g," ")?"Selected":""}`} onClick={(e)=>{
            e.stopPropagation()
           
            console.log(e.target.id)
            let select=e.target.innerText
            SetSelectedFilter(select)
            console.log(SelectedFilter)
            console.log(Object.keys(item)[0].replace(/_+/g," "))
            console.log(SelectedFilter===Object.keys(item)[0].replace(/_+/g," "))
            
            let arr=[]
            
            
            console.log(AllProduct)
            for (let index = 0; index < AllProduct.length; index++) {
              if (AllProduct[index].ProductSubCategory===e.target.innerText) {
                arr.push(AllProduct[index])
              } else {
                
              }
              
            }
            console.log(arr)
            SetFeatureFilterArr([])
            SetSetSubCategoriesFilterArr(arr)
            
            
          }} > 
          
          {Object.keys(item)[0].replace(/_+/g," ")}
          </div>
          {Object.values(item)[0].map(elem=>(
            <div key={elem} className={`Features ps-3 ${SelectedFilter===elem?"Selected":""}`} onClick={(e)=>{
              e.stopPropagation()
              let select=e.target.innerText
            SetSelectedFilter(select)

             
              const Features=document.querySelectorAll(".Feature")
              let arr=[]
              
              console.log(FeatureFilterArr)
              
              
              for (let index = 0; index < Features.length; index++) {
                Features[index].style.backgroundColor="#ffffffff"
                
              }
              e.target.classList.add("Selected")
             
               console.log(e.target)
              
              console.log(AllProduct)
              for (let index = 0; index < AllProduct.length; index++) {
                if (AllProduct[index].ProductFeature===e.target.innerText) {
                  arr.push(AllProduct[index])

                } else {
                  
                }
                
              }
              console.log(arr)
              SetSetSubCategoriesFilterArr([])
             
              SetFeatureFilterArr(arr)
              console.log(FeatureFilterArr.length)
              
              
            }}>
              {elem}
            </div>
          ))}
        </Row>
      )):"Sub Categories"}
        </Col>
        {/* Content Column */}
        <Col xs={8}>
         {<PageContent/>}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsScreen;
