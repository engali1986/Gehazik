import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import StaticData from "../Data/StaticData.js";

const MerchantPage = ({ globalState, setGlobal }) => {
  const [Data, SetData] = useState(""); // this state will be used to store the selected menu items to display data

  const navigate = useNavigate();

  const params = useParams();
  const DtataDisplay = () => {
    const [ProductImageFile, SetProductImageFile] = useState();
    const [AddProductData, SetAddProductData] = useState({
      ProductCategory: "",
      ProductSubCategory: "",
      ProductFeature: "",
      ProductQty: 0,
      ProductQtyUnit: "",
      ProductUnitPrice: 0,
      ProductTitle: "",
      ProductAdditionalFeatures: [],
      Token: globalState.Token,
      Name: globalState.Name,
      Email: globalState.email,
    });
    const [Disabled, SetDisabled] = useState(false);
    const ProductTitle = useRef();

    const Alert = useRef();
    const LoginButtonRef = useRef();

    const Subcategories = () => {
      for (
        let index = 0;
        index < StaticData.ProductCategories.length;
        index++
      ) {
        if (
          Object.keys(StaticData.ProductCategories[index])[0].replace(
            /_/g,
            " "
          ) === AddProductData.ProductCategory
        ) {
          console.log("ProductCategory found");
          console.log(Object.keys(StaticData.ProductCategories[index])[0]);
          let Arr = StaticData.ProductCategories[index];
          console.log(Arr);
          console.log(Arr[Object.keys(StaticData.ProductCategories[index])[0]]);
          let Arr2 = Arr[Object.keys(StaticData.ProductCategories[index])[0]];
          console.log(Arr2.length);
          const Arr3 = [];
          for (let index = 0; index < Arr2.length; index++) {
            console.log(Object.keys(Arr2[index])[0]);
            Arr3.push(Object.keys(Arr2[index])[0]);
          }

          return Arr3.map((item) => (
            <option key={item.replace(/_/g, " ")}>
              {item.replace(/_/g, " ")}
            </option>
          ));
        } else {
        }
      }
    };
    const Features = () => {
      console.log(AddProductData);
      for (
        let index = 0;
        index < StaticData.ProductCategories.length;
        index++
      ) {
        if (
          Object.keys(StaticData.ProductCategories[index])[0].replace(
            /_/g,
            " "
          ) === AddProductData.ProductCategory
        ) {
          console.log(Object.keys(StaticData.ProductCategories[index])[0]);
          console.log(
            StaticData.ProductCategories[index][
              Object.keys(StaticData.ProductCategories[index])[0]
            ]
          );
          let arr =
            StaticData.ProductCategories[index][
              Object.keys(StaticData.ProductCategories[index])[0]
            ];
          console.log(arr);
          console.log(arr.length);
          for (let index = 0; index < arr.length; index++) {
            console.log(arr[index][Object.keys(arr[index])[0]]);
            console.log(Object.keys(arr[index])[0]);
            if (
              Object.keys(arr[index])[0].replace(/_/g, " ") ===
              AddProductData.ProductSubCategory
            ) {
              console.log(arr[index][Object.keys(arr[index])[0]]);
              let FeaturesArr = arr[index][Object.keys(arr[index])[0]];
              console.log(FeaturesArr);
              console.log(FeaturesArr.length);
              return FeaturesArr.map((item) => (
                <option key={item}>{item}</option>
              ));
            } else {
            }
          }
        } else {
        }
      }
    };
    //  AddProduct function will be initiated when user clicks on Add Product button to add products to data base
    const AddProduct = async (e) => {
      e.stopPropagation();

      console.log("Adding new product");
      console.log(AddProductData);

      SetDisabled(true);

      // Next we will check for any missing data
      let Keyes = Object.keys(AddProductData);
      console.log(Keyes);
      let ProductDataChecked = false;
      for (let index = 0; index < Keyes.length; index++) {
        if (
          AddProductData[Keyes[index]] === "" ||
          AddProductData[Keyes[index]] === 0
        ) {
          console.log("Product not added " + Keyes[index]);
          Alert.current.classList.replace("alert-success", "alert-danger");
          Alert.current.innerText = "Please add " + Keyes[index];
          Alert.current.style.maxHeight = "500px";
          SetDisabled(false);
          ProductDataChecked = false;

          break;
        } else {
          ProductDataChecked = true;
        }
      }

      if (ProductDataChecked === true) {
        console.log("Submitting data");
        const ProductAdded = await fetch(
          "http://localhost:5000/Merchants/AddProduct",
          {
            method: "POST",
            body: JSON.stringify(AddProductData),
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
          }
        )
          .then((res) => {
            console.log(res);
            SetDisabled(false);
            return res.json();
          })
          .catch((err) => {
            console.log(err);
            SetDisabled(false);
          });

        console.log(ProductAdded);
        Alert.current.classList.replace("alert-danger", "alert-success");
        Alert.current.innerText = ProductAdded.resp;
        Alert.current.style.maxHeight = "500px";
        SetDisabled(false);
      }
    };
    if (Data === "Change Password") {
      return (
        <Container>
          <Row>
            <h3>{Data}</h3>
          </Row>
          <Row className=" align-items-center">
            <Col xs={12} md={4}>
              Please enter old password
            </Col>
            <Col xs={12} md={8}>
              <input type="password" style={{ width: "100%" }} />
            </Col>
          </Row>
          <Row className=" align-items-center">
            <Col xs={12} md={4}>
              Please enter new password
            </Col>
            <Col xs={12} md={8}>
              <input type="password" style={{ width: "100%" }} />
            </Col>
          </Row>
          <Row className=" align-items-center">
            <Col xs={12} md={4}>
              Please confirm new password
            </Col>
            <Col xs={12} md={8}>
              <input type="password" style={{ width: "100%" }} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <button className="SignUpButton" style={{ width: "100%" }}>
                confirm
              </button>
            </Col>
          </Row>
        </Container>
      );
    } else if (Data === "New Orders") {
      return (
        <Container>
          <Row>
            <h3>{Data}</h3>
          </Row>
          <Row>
            <div style={{ overflow: "scroll" }}>
              <div className=" d-flex" style={{ width: "max-content" }}>
                <div className=" mx-2 px-2">
                  <div>Order Id</div>
                  <div>hjkhjshadudwuhduay78iu9uihjdakshd</div>
                </div>

                <div className=" mx-2 px-2">
                  <div>Product Id</div>
                  <div>hjghjg7678jghjghjghjgjh</div>
                </div>

                <div className=" mx-2 px-2">
                  <div>Product</div>
                  <div>جبنه ملح خفيف</div>
                </div>
                <div className=" mx-2 px-2">
                  <div>Order Qty</div>
                  <div>20</div>
                </div>
                <div className=" mx-2 px-2">
                  <div>Unit</div>
                  <div>Kg</div>
                </div>
                <div className=" mx-2 px-2">
                  <div>Confirmation</div>
                  <button className="SignUpButton">Confirm</button>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      );
    } else if (Data === "Orders History") {
      return <Container>{Data}</Container>;
    } else if (Data === "All Products") {
      return (
        <Container>
          <Row>
            <h3>All Products</h3>
          </Row>
        </Container>
      );
    } else if (Data === "Add Products") {
      return (
        <Container style={{ backgroundColor: "gray" }}>
          <Row>
            <h3
              onClick={(e) => {
                e.stopPropagation();
                console.log(StaticData.ProductCategories.length);
                console.log(AddProductData);
              }}
            >
              {Data}
            </h3>
          </Row>
          <Row className=" pb-2 align-items-center text-start">
            <Col xs={12}>
              <select
                style={{ width: "100%" }}
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  if (e.target.value === "Please select Category") {
                    SetAddProductData({
                      ...AddProductData,
                      ProductCategory: "",
                      ProductFeature: "",
                      ProductQty: 0,
                      ProductQtyUnit: "",
                      ProductSubCategory: "",
                    });
                  } else {
                    SetAddProductData({
                      ...AddProductData,
                      ProductCategory: e.target.value,
                      ProductFeature: "",
                      ProductQty: 0,
                      ProductQtyUnit: "",
                      ProductSubCategory: "",
                    });
                  }
                  console.log(e.target.value);
                }}
              >
                <option>Please select Category</option>
                {StaticData.ProductCategories.map((Item, Index) => (
                  <option key={Object.keys(Item)[0].replace(/_/g, " ")}>
                    {Object.keys(Item)[0].replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row className=" pb-2 align-items-center text-start">
            <Col xs={12}>
              <select
                style={{ width: "100%" }}
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  if (e.target.value === "Please select Subcategory") {
                    SetAddProductData({
                      ...AddProductData,
                      ProductSubCategory: "",
                    });
                  } else {
                    SetAddProductData({
                      ...AddProductData,
                      ProductSubCategory: e.target.value,
                    });
                  }
                  console.log(e.target.value);
                }}
              >
                <option>Please select Subcategory</option>
                {Subcategories()}
              </select>
            </Col>
          </Row>
          <Row className=" pb-2 align-items-center text-start">
            <Col xs={12}>
              <select
                style={{ width: "100%" }}
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  if (e.target.value === "Please select Features") {
                    SetAddProductData({
                      ...AddProductData,
                      ProductFeature: "",
                    });
                  } else {
                    SetAddProductData({
                      ...AddProductData,
                      ProductFeature: e.target.value,
                    });
                  }
                  console.log(e.target.value);
                }}
              >
                <option>Please select Features</option>
                {Features()}
              </select>
            </Col>
          </Row>
          <Row className=" pb-2 align-items-center text-start">
            <Col xs={4} md={8}>
              <div style={{ color: "white" }}>Please add quantity</div>
            </Col>
            <Col xs={4} md={2}>
              <input
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  SetAddProductData({
                    ...AddProductData,
                    ProductQty: parseInt(e.target.value, 10),
                  });
                }}
                style={{ width: "100%" }}
                type="number"
              />
            </Col>
            <Col xs={4} md={2}>
              <select
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  SetAddProductData({
                    ...AddProductData,
                    ProductQtyUnit: e.target.value,
                  });
                }}
                style={{ width: "100%" }}
              >
                <option>Unit</option>
                {StaticData.Units.map((Unit) => (
                  <option key={Unit}>{Unit}</option>
                ))}
              </select>
            </Col>
          </Row>
          <Row className=" pb-2 align-items-center text-start">
            <Col xs={4} md={8}>
              <div style={{ color: "white" }}>Please add Unit Price</div>
            </Col>
            <Col xs={4} md={2}>
              <input
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  SetAddProductData({
                    ...AddProductData,
                    ProductUnitPrice: parseInt(e.target.value, 10),
                  });
                }}
                style={{ width: "100%" }}
                type="number"
              />
            </Col>
            <Col xs={4} md={2}>
              <div style={{ color: "white" }}>EGP</div>
            </Col>
          </Row>
          <Row className=" pb-2 align-items-center text-start">
            <Col style={{ color: "white" }} xs={6}>
              {" "}
              Add product title
            </Col>
            <Col xs={6}>
              <input
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  SetAddProductData({
                    ...AddProductData,
                    ProductTitle: e.target.value,
                  });
                }}
                type="text"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row
            style={{ color: "white" }}
            className=" pb-2 align-items-center text-start"
          >
            <Col xs={6}> Add product dditional features separated by comma</Col>
            <Col xs={6}>
              <input
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  console.log(e.target.value.split(","));
                  let Arr = e.target.value.split(",");
                  SetAddProductData({
                    ...AddProductData,
                    ProductAdditionalFeatures: Arr,
                  });
                }}
                type="text"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row
            style={{ color: "white" }}
            className=" pb-2 align-items-center text-start"
          >
            <Col xs={6}> Pleas add product main photo</Col>
            <Col xs={6}>
              <input
                onChange={(e) => {
                  e.stopPropagation();
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  console.log(e.target.files[0]);
                  console.log(e.target.files[0].size);
                  if (e.target.files[0].size > 540000) {
                    Alert.current.classList.replace(
                      "alert-success",
                      "alert-danger"
                    );
                    Alert.current.innerText =
                      "Please upload file less than 512 KB";
                    Alert.current.style.maxHeight = "500px";
                  } else {
                  }
                }}
                type="file"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row className=" pb-2 align-items-center text-start">
            <Col xs={12}>
              <div
                ref={Alert}
                className=" alert alert-danger text-start"
                style={{
                  boxSizing: "border-box",
                  marginBottom: "0",
                  width: "100%",
                  overflow: "hidden",
                  padding: "0px",
                  border: "0px",
                  maxHeight: "0px",
                  transition: "all 0.3s ease-in-out",
                }}
                role="alert"
              ></div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <button
                ref={LoginButtonRef}
                className="LogInButton"
                disabled={Disabled}
                onClick={(e) => AddProduct(e)}
              >
                Add Product
              </button>
            </Col>
          </Row>
        </Container>
      );
    } else if (Data === "Update Products") {
      return (
        <Container>
          <Row>
            <h3>{Data}</h3>
          </Row>
        </Container>
      );
    } else if (Data === "Recieved Payments") {
      return (
        <Container>
          <Row>
            <h3>{Data}</h3>
          </Row>
        </Container>
      );
    } else if (Data === "Bending Payments") {
      return (
        <Container>
          <Row>
            <h3>{Data}</h3>
          </Row>
        </Container>
      );
    } else {
      return <Container>{Data}</Container>;
    }
  };
  useEffect(() => {
    // The following code will check if the looged user is merchant or not
    if (globalState.UserLogged === true) {
      if (globalState.Admin === true) {
        navigate("/Admins/" + globalState.Name);
      } else if (globalState.Client === true) {
        navigate("/");
      } else if (globalState.Merchant === true) {
        navigate("/Merchants/" + globalState.Name);
      }
    } else {
      navigate("/");
    }
  }, []);
  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        console.log(params);
      }}
    >
      <Row>
        <h2>Merchant Page</h2>
      </Row>

      <Row>
        {/* the following Col will be the side menu for the merchant page */}
        <Col
          xs={2}
          style={{
            fontSize: "1.5vw",
            overflowWrap: "break-word",
            textAlign: "start",
          }}
        >
          <Row>
            <Col xs={12} className=" d-flex flex-wrap">
              <div style={{ width: "fit-content" }}>
                <span>Welcome, </span>

                <span>{params.Name}</span>
                <span
                  className="MenuArrow"
                  id="arrow"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");

                    if (
                      document
                        .getElementById("MerchantProfile")
                        .classList.contains("MerchantMenuActive")
                    ) {
                      document
                        .getElementById("MerchantProfile")
                        .classList.remove("MerchantMenuActive");
                      e.target.innerHTML = "&#11206;";
                    } else {
                      for (let index = 0; index < Menues.length; index++) {
                        if (
                          Menues[index].classList.contains("MerchantMenuActive")
                        ) {
                          Menues[index].classList.remove("MerchantMenuActive");
                          MenuArrows[index].innerHTML = "&#11206;";
                        } else {
                        }
                      }
                      document
                        .getElementById("MerchantProfile")
                        .classList.add("MerchantMenuActive");
                      e.target.innerHTML = "&#11205;";
                    }
                  }}
                >
                  &#11206;
                </span>
              </div>
              <div
                id="MerchantProfile"
                className="MerchantMenu d-flex flex-column"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  Change Password
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  Log Out
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div>
              <span>Orders</span>
              <span
                className="MenuArrow"
                id="OrdersArrow"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  let Menues = document.querySelectorAll(".MerchantMenu");
                  let MenuArrows = document.querySelectorAll(".MenuArrow");
                  if (
                    document
                      .getElementById("MerchantOrders")
                      .classList.contains("MerchantMenuActive")
                  ) {
                    document
                      .getElementById("MerchantOrders")
                      .classList.remove("MerchantMenuActive");
                    e.target.innerHTML = "&#11206;";
                  } else {
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    document
                      .getElementById("MerchantOrders")
                      .classList.add("MerchantMenuActive");
                    e.target.innerHTML = "&#11205;";
                  }
                }}
              >
                &#11206;
              </span>

              <div
                id="MerchantOrders"
                className="MerchantMenu d-flex flex-column"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  New Orders
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  Orders History
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <div>
              <span>Products</span>
              <span
                className="MenuArrow"
                id="ProductsArrow"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  let Menues = document.querySelectorAll(".MerchantMenu");
                  let MenuArrows = document.querySelectorAll(".MenuArrow");
                  if (
                    document
                      .getElementById("MerchantProducts")
                      .classList.contains("MerchantMenuActive")
                  ) {
                    document
                      .getElementById("MerchantProducts")
                      .classList.remove("MerchantMenuActive");
                    e.target.innerHTML = "&#11206;";
                  } else {
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    document
                      .getElementById("MerchantProducts")
                      .classList.add("MerchantMenuActive");
                    e.target.innerHTML = "&#11205;";
                  }
                }}
              >
                &#11206;
              </span>

              <div
                id="MerchantProducts"
                className="MerchantMenu d-flex flex-column"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  All Products
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  Add Products
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  Update Products
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <div>
              <span>Payments</span>
              <span
                className="MenuArrow"
                id="PaymentsArrow"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  let Menues = document.querySelectorAll(".MerchantMenu");
                  let MenuArrows = document.querySelectorAll(".MenuArrow");
                  if (
                    document
                      .getElementById("MerchantPayments")
                      .classList.contains("MerchantMenuActive")
                  ) {
                    document
                      .getElementById("MerchantPayments")
                      .classList.remove("MerchantMenuActive");
                    e.target.innerHTML = "&#11206;";
                  } else {
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    document
                      .getElementById("MerchantPayments")
                      .classList.add("MerchantMenuActive");
                    e.target.innerHTML = "&#11205;";
                  }
                }}
              >
                &#11206;
              </span>

              <div
                id="MerchantPayments"
                className="MerchantMenu d-flex flex-column"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  Recieved Payments
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        MenuArrows[index].innerHTML = "&#11206;";
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  Bending Payments
                </div>
              </div>
            </div>
          </Row>
        </Col>
        {/* the following Col will display the data after merchant select option from side menu */}
        <Col xs={10}>
          <DtataDisplay />
        </Col>
      </Row>
    </Container>
  );
};

export default MerchantPage;
