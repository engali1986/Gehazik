import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import StaticData from "../Data/StaticData.js";

const MerchantPage = ({ globalState, setGlobal }) => {
  const [Data, SetData] = useState(""); // this state will be used to store the selected menu items to display data
  const navigate = useNavigate();
  const params = useParams();
  const DtataDisplay = () => {
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
        <Container>
          <Row>
            <h3
              onClick={(e) => {
                e.stopPropagation();
                console.log(StaticData.ProductCategories);
              }}
            >
              {Data}
            </h3>
          </Row>
          <Row>
            <Col xs={12}>
              <select>
                <option>Please select Category</option>
                {StaticData.ProductCategories.map((Item, Index) => (
                  <option key={Object.keys(Item)[Index]}>
                    {Object.keys(Item)[Index].replace(/_/g, " ")}
                  </option>
                ))}
              </select>
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
