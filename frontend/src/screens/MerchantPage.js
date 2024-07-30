import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const MerchantPage = ({ globalState, setGlobal }) => {
  const [Data, SetData] = useState(""); // this state will be used to store the selected menu items to display data
  const navigate = useNavigate();
  const params = useParams();
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
            fontSize: "2vw",
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
                  id="arrow"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    if (
                      document
                        .getElementById("MerchantProfile")
                        .classList.contains("MerchantMenuActive")
                    ) {
                      for (let index = 0; index < Menues.length; index++) {
                        if (
                          Menues[index].classList.contains("MerchantMenuActive")
                        ) {
                          Menues[index].classList.remove("MerchantMenuActive");
                        } else {
                        }
                      }

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
                    SetData(e.target.innerText);
                  }}
                >
                  Change Password
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
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
                id="OrdersArrow"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  let Menues = document.querySelectorAll(".MerchantMenu");
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
                    SetData(e.target.innerText);
                  }}
                >
                  New Orders
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
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
                id="ProductsArrow"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  let Menues = document.querySelectorAll(".MerchantMenu");
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
                    SetData(e.target.innerText);
                  }}
                >
                  All Products
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    SetData(e.target.innerText);
                  }}
                >
                  Add Products
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
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
                id="PaymentsArrow"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  let Menues = document.querySelectorAll(".MerchantMenu");
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
                    SetData(e.target.innerText);
                  }}
                >
                  Recieved Payments
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
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
        <Col xs={10}>{Data}</Col>
      </Row>
    </Container>
  );
};

export default MerchantPage;
