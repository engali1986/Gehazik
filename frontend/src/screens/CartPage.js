import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const CartPage = ({ GlobalState, UpdateCart }) => {
  const [SubTotal,SetSubTotal]=useState([]) // this state will be used to calculate subtotal
  
  // the following function will be used to update total price for each item
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
  // the following function will calculate sub total
  const SubTotalPrice=()=>{
    let x=0
    let y=0
    let j=0
    console.log(j)
    if (SubTotal.length!==GlobalState.CartItems.length) {
      if (Array.isArray(GlobalState.CartItems) && GlobalState.CartItems.length>0 ) {
        console.log(GlobalState.CartItems.length)
        SetSubTotal(GlobalState.CartItems)
        for (let index = 0; index < GlobalState.CartItems.length; index++) {
          x=GlobalState.CartItems[index].Qty*GlobalState.CartItems[index].ProductUnitPrice
          y=y+x
         
          j=y
          console.log(SubTotal)
        }
  
        return <h5>{j.toString()} EGP</h5>
        
      } else {
        console.log(SubTotal)
        console.log(GlobalState.CartItems)
        console.log("Not equal")
        return <h5>{j.toString()} EGP</h5>
  
        
      }
      
    } else if( SubTotal.every((item,index)=>{
      return item===GlobalState.CartItems[index]
    })===true) {
      console.log("Identical")
      if (Array.isArray(GlobalState.CartItems) && GlobalState.CartItems.length>0 ) {
        console.log(GlobalState.CartItems.length)
        SetSubTotal(GlobalState.CartItems)
        for (let index = 0; index < GlobalState.CartItems.length; index++) {
          x=GlobalState.CartItems[index].Qty*GlobalState.CartItems[index].ProductUnitPrice
         y=y+x
          j=y
          console.log(SubTotal)
        }
  
        return <h5>{j.toString()} EGP</h5>
        
      } else {
        console.log(SubTotal)
        console.log(GlobalState.CartItems)
        console.log("Not equal")
        return <h5>{j.toString()} EGP</h5>
  
        
      }
      
      
    } 
   
  }

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
      {/* head of page */}
      <Row style={{ textAlign: "start" }}>
        <h3>Cart</h3>
      </Row>
      {/* Page content and array map */}
    
      {Array.isArray(GlobalState.CartItems) &&
      GlobalState.CartItems.length > 0 ? (
        GlobalState.CartItems.map((item) => (
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
                      textAlign: "center",
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
                    onClick={(e) => {
                      e.stopPropagation();
                      const UpdatRequired = { Field: "Delete", ID: item.ID };
                      UpdateCart(UpdatRequired);
                    }}
                    style={{
                      color: "#04aa6d",
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                    className=" ms-2 fa-solid fa-trash-can fa-xl"
                  ></i>
                </div>

                <div className="text-start" style={{ color: "red" }}>
                  {<TotalPrice ID={item.ID} />}
                </div>
              </div>
            </Col>
          </Row>
        ))
      ) : (
        <Row className=" my-auto">
          <h3>Your cart is empty!</h3>
          <div
            className=" mt-5"
            style={{
              backgroundColor: "#04aa6d",
            }}
          >
            <a
              href="/"
              style={{
                textDecoration: "none",

                width: "100%",
                color: "white",
                fontSize: "2rem",
              }}
            >
              Start Shopping
            </a>
          </div>
        </Row>
      )}

    
      {/* Total price and checkout button */}
      <Row className= {Array.isArray(GlobalState.CartItems)&&GlobalState.CartItems.length>0?" d-flex text-start": " d-none"}>
        <div className=" d-flex flex-row my-2" style={{borderBottom:'2px solid gray'}}>
          <div>
            <h4>
              Sub Total:
            </h4>
          </div>
          <div className=" flex-grow-1 text-center">
            {<SubTotalPrice/>}
          </div>


        </div>

      </Row>
     
    </Container>
  );
};

export default CartPage;
