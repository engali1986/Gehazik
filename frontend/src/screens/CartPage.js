import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const CartPage = ({ GlobalState, UpdateCart }) => {
  const TotalPrice = ({ ID }) => {
    let totalprice = 0;
    console.log(ID);
    if (Array.isArray(GlobalState.CartItems)) {
      GlobalState.CartItems.forEach((element) => {
        console.log(element);
        if (element.ID === ID) {
          console.log(typeof element.ProductUnitPrice);
          console.log(typeof element.Qty);
          let price = element.ProductUnitPrice;
          let qty = element.Qty;
          totalprice = price * qty;
          console.log(totalprice);
        }
      });
      return <div>{totalprice} EGP</div>;
    } else {
      return <div> No result</div>;
    }
  };

  useEffect(() => {
    console.log(GlobalState);
  }, []);

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        console.log(GlobalState);
      }}
    >
      <Row style={{ textAlign: "start" }}>
        <h3>Cart</h3>
      </Row>
      {Array.isArray(GlobalState.CartItems)
        ? GlobalState.CartItems.map((item) => (
            <Row
              key={item.ID}
              className=" my-1"
              style={{ border: "2px solid gray" }}
            >
              <Col xs={2}>
                <img
                  src={
                    Array.isArray(item.ProductImages)
                      ? `https://drive.google.com/thumbnail?id=${item.ProductImages[0]}`
                      : ""
                  }
                  style={{ width: "100%", aspectRatio: "1/1" }}
                />
              </Col>
              <Col xs={10} className=" flex-column align-content-center">
                <h4
                  style={{ textAlign: "start", borderBottom: "2px solid gray" }}
                >
                  {item.ProductTitle && item.ID ? (
                    <a
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                      href={`/ProductDetails/${item.ID}`}
                    >
                      {item.ProductTitle}
                    </a>
                  ) : (
                    ""
                  )}
                </h4>
                <div className=" d-flex flex-wrap">
                  <div className=" flex-grow-1 text-start">
                    <i
                      onClick={(e) => {
                        e.stopPropagation();
                        const UpdatRequired = { Field: "Remove", ID: item.ID };
                        UpdateCart(UpdatRequired);
                      }}
                      className="fa-solid fa-square-minus fa-xl"
                      style={{
                        color: "#04aa6d",
                        display: "inline-block",
                        cursor: "pointer",
                      }}
                    ></i>
                    <span
                      style={{
                        display: "inline-block",
                        width: "60%",
                        backgroundColor: "#E8E8E7",
                      }}
                    >
                      {item.Qty ? item.Qty : ""}
                    </span>
                    <i
                      onClick={(e) => {
                        e.stopPropagation();
                        const UpdatRequired = { Field: "Add", ID: item.ID };
                        UpdateCart(UpdatRequired);
                      }}
                      className="fa-solid fa-square-plus fa-xl"
                      style={{
                        color: "#04aa6d",
                        display: "inline-block",
                        cursor: "pointer",
                      }}
                    ></i>
                    <i
                      style={{
                        color: "#04aa6d",
                        display: "inline-block",
                        cursor: "pointer",
                      }}
                      className="fa-solid fa-trash-can fa-xl"
                    ></i>
                  </div>

                  <div className="text-start" style={{ color: "red" }}>
                    {/* {item.ProductUnitPrice
                      ? item.ProductUnitPrice + " EGP"
                      : ""} */}

                    {<TotalPrice ID={item.ID} />}
                  </div>
                </div>
              </Col>
            </Row>
          ))
        : ""}
    </Container>
  );
};

export default CartPage;
