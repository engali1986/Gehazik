import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductDetails = ({ GlobalState,AddToCart }) => {
  const [Product, setProduct] = useState({ ProductImages: [] }); // this will store product details
  const [ProductSelection,SetProductSelection]=useState({
    Color:"",
    Size:"",
    Hex:"",
    Qty:0
  }) // this will be used to store selected color and size
  const [Colors,SetColors]=useState([])
  const [SelectedColor,SetSelectedColor]=useState({Color:"",Hex:""})// this will be used to store selected product color
  const [SelectedSize,SetSelectedSize]=useState("")
  const [Sizes,SetSizes]=useState([])// this will be used to store available sizes based on color selection
  const [Loader, SetLoader] = useState(false); // this will handle loader visbility during fetch product details
  const [Count, SetCount] = useState(1); // this will store ordered qty
  const params = useParams(); // this will provide productID to fetch from server in useeffect
  const Navigate = useNavigate();
  console.log(params.id);
  let prod;
  useEffect(() => { 
    SetLoader(true);
    const GetProductDetails = async (ProductID) => {
      try {
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
          prod = Productdetails.resp;
          console.log(prod);
          setProduct((Perv) => ({
            ...Perv,
            ProductImages: prod.ProductImagesIDs,
            ProductTitle: prod.ProductTitle,
            ProductUnitPrice: prod.ProductUnitPrice,
            InStockQty: prod.ProductOptions[0].Qty,// this will display quantity of first Item in ProductOptions array
            ProductOptions:prod.ProductOptions,
            ProductAdditionalFeatures: prod.ProductAdditionalFeatures,
            EgyptDelivery:prod.EgyptDelivery,
            GovernorateDelivery:prod.GovernorateDelivery,
            CityDelivery:prod.CityDelivery,
            Governorate:prod.Governorate,
            City:prod.City.split('\t')[0],
            MerchantID:prod.MerchantID,
            ID:prod._id
          }));
          // next we will make color arrays to group duplicate colors
          let InitialColors=[]
          for (let index = 0; index < prod.ProductOptions.length; index++) {
            let obj={
              Color:prod.ProductOptions[index].Color,
              Hex:prod.ProductOptions[index].Hex
            }
            InitialColors.push(obj) 
          }
          const uniqueColorsByColor = InitialColors.filter((item, index, self) =>
            index === self.findIndex(t => t.Color === item.Color)
          ); 
          SetColors(uniqueColorsByColor)
          // Colors Array finished
          // next we will make sizes array
          let InitialSizes=[]
          for (let index = 0; index < prod.ProductOptions.length; index++) {
            if (prod.ProductOptions[index].Color===prod.ProductOptions[0].Color) {
              InitialSizes.push(prod.ProductOptions[index].Size)
            }
            
          }
          SetSizes(InitialSizes)
          // sizes array finished

          SetProductSelection({...ProductSelection,
            Color:prod.ProductOptions[0].Color,
            Size:prod.ProductOptions[0].Size,
            Hex:prod.ProductOptions[0].Hex,
            Qty:1
          })
         
          console.log(Product);
        } else {
          Navigate("/ProductNotFound");
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error)
        
      }
      
    };
    GetProductDetails(params.id);
    if (GlobalState.UserLogged===false || GlobalState.Client===false|| GlobalState.Name.length===0) {
      toast.warn((<div>Please <a href="/LogIn">LogIn/Signup</a> to add product </div>), {
        autoClose:false
      })
      
    } else {
      
    }
    console.log(Product);
  }, []);
  return (
    <Container onClick={(e)=>{
      e.stopPropagation()
      console.log(Product)
      console.log(ProductSelection)
      console.log(Sizes)
      console.log(Colors)
    }}>
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
        <Col
          className=" d-flex flex-column justify-content-between"
          xs={12}
          md={6}
        >
          <Row>
            <h3
              className=" p-1"
              style={{ textAlign: "start", borderBottom: "2px solid gray" }}
            >
              {Product.ProductTitle}
            </h3>
          </Row>
          <Row
            className=" my-3 justify-content-between"
            style={{
              textAlign: "start",
              borderBottom: "2px solid gray",
            }}
          >
            <h5
              style={{
                color: "red",
                width: "fit-content",
              }}
            >
              {Product.ProductUnitPrice} EGP
            </h5>
            <h5
              style={{
                width: "fit-content",
                color: Product.InStockQty >= 5 ? "black" : "red",
              }}
            >
              {Product.InStockQty === 0
                ? "Out of Stock!"
                : Product.InStockQty > 0 && Product.InStockQty < 5
                  ? " Only " + Product.InStockQty + " available in stock"
                  : " In stock"}
            </h5>
          </Row>
          <Row
            className=" my-3"
            style={{ textAlign: "start", borderBottom: "2px solid gray" }}
          >
            <h5>
              <strong> Delivery: </strong> within 2 days
            </h5>
          </Row>
          <Row>
            <div
              className=" d-flex align-items-center"
              
            >
              <div>
                Color
                <select onChange={(e)=>{
                  e.target.style.backgroundColor=Colors[e.target.selectedIndex].Hex
                }} style={{backgroundColor:Array.isArray(Product.ProductOptions)?Product.ProductOptions[0].Hex:"white"}}>
                  {Array.isArray(Colors)?Colors.map((item,index)=>(
                    <option data-index={index} style={{backgroundColor:item.Hex}} key={index}>
                      {item.Color}
                    </option>
                  )):""}
                </select>
              </div>
              <div>
                Size
                <select>
                  {Array.isArray(Sizes)?Sizes.map(item=>(
                    <option key={item}>
                      {item}
                    </option>
                  )):""}
                </select>
              </div>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  if (Count > 1) {
                    SetCount(Count - 1);
                  }
                }}
                style={{
                  display: "inline-block",
                  width: "20%",
                  cursor: "pointer",
                }}
              >
                <i
                  className="fa-solid fa-square-minus fa-xl"
                  style={{ color: "#04aa6d" }}
                ></i>
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "60%",
                  backgroundColor: "#E8E8E7",
                }}
              >
                {Count.toString()}
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  if (Count >= 1 && Count<Product.InStockQty) {
                    SetCount(Count + 1);
                  }
                }}
                style={{
                  display: "inline-block",
                  width: "20%",
                  cursor: "pointer",
                }}
              >
                <i
                  className="fa-solid fa-square-plus fa-xl"
                  style={{ color: "#04aa6d" }}
                ></i>
              </span>
            </div>
            <Col className=" pt-2" xs={12}>
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(Product)
                  console.log(Count);
                  if (GlobalState.UserLogged===true && GlobalState.Client===true && GlobalState.Name.length>0 && GlobalState.Merchant===false && GlobalState.Admin===false && GlobalState.Governorate.length>0 && GlobalState.City.length>0) {
                    if ((Product.EgyptDelivery===true)|| (Product.GovernorateDelivery===true && Product.Governorate===GlobalState.Governorate)||(Product.CityDelivery===true && Product.City===GlobalState.City)) {
                      console.log(AddToCart);
                  let AddedProduct = { ...Product, Qty: Count };
                  console.log(AddedProduct);
                  AddToCart(AddedProduct);
                  e.target.innerText = "Added...";
                  e.target.disabled = true;
                  toast.success((<div>Product added, view <a href="/cart">Cart</a> or <a href="/">continue shopping</a></div>))
                    } else {
                      toast.error(`This product cannot be shipped to ${GlobalState.City}`)
                      
                    }
                    
                  } else {
                    toast.warn((<div>Please <a href="/LogIn">Login/Signup</a> to Client account</div>))
                    
                  }
                  
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#04aa6d",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "5%",
                }}
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-title="Click to Add"
       
              >
                Add to cart
              </button>
            </Col>
            
          </Row>
        </Col>
      </Row>
      <Row className=" my-1">
        <h4 style={{ textAlign: "start" }}>Description:</h4>
      </Row>
      <Row style={{ textAlign: "start" }}>
        {/* {Product.ProductAdditionalFeatures.map((product, index) => (
          <ul key={index}>{product}</ul>
        ))} */}
        {Array.isArray(Product.ProductAdditionalFeatures)
          ? Product.ProductAdditionalFeatures.map((product, index) => (
              <ul key={index}>{product}</ul>
            ))
          : "No Description"}
      </Row>
    </Container>
  );
};
export default ProductDetails;
