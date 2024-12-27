import React, { useEffect, useState,useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import { LanguageContext } from "../Context/LanguageContext";
const CartPage = ({ GlobalState, UpdateCart,AddOrder }) => {
  const {Language}=useContext(LanguageContext)
  const [SubTotal,SetSubTotal]=useState([]) // this state will be used to calculate subtotal
  const [SubTotalValue,SetSubTotalValue]=useState(0)
  const [DeliveryChargesValue,SetDeliveryChargesValue]=useState(0)
  const [TotalValue,SetTotalValue]=useState(0)
  const Navigate=useNavigate()
  
  // the following function will be used to update total price for each item
  const TotalPrice = ({ Item }) => {
    let totalprice = 0;
    console.log(Item);
    if (Array.isArray(GlobalState.CartItems)) {
      GlobalState.CartItems.forEach((element) => {
        console.log(element);
        if (element.ID === Item.ID && element.Size===Item.Size && element.Color===Item.Color) {
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
    console.log(SubTotalValue)
    console.log(typeof SubTotalValue)
    // Calculate sub total
    let x=0
    let y=0
    let j=0
    console.log(j)
      if (Array.isArray(GlobalState.CartItems) && GlobalState.CartItems.length>0 ) {
        console.log(GlobalState.CartItems.length)
        SetSubTotal(GlobalState.CartItems)
        for (let index = 0; index < GlobalState.CartItems.length; index++) {
          x=GlobalState.CartItems[index].Qty*GlobalState.CartItems[index].ProductUnitPrice
          y=y+x
         
          j=y
          SetSubTotalValue(j)
          console.log(SubTotal)
        }
  
        
        
      } else {
        console.log(SubTotal)
        console.log(GlobalState.CartItems)
        console.log("Not equal")
      }
  // Calculate Delivery charges
    if (SubTotalValue>500) {
      let x=Math.round(SubTotalValue*0.2)
      SetDeliveryChargesValue(x)
      
      
      
    } else {
      let y=100
      SetDeliveryChargesValue(y)
      
      
    }
  //  Calculate Total price
  let f=SubTotalValue+DeliveryChargesValue
    SetTotalValue(f)
   
  }, [GlobalState, SubTotalValue, DeliveryChargesValue]);
  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        console.log(GlobalState);
        console.log(DeliveryChargesValue)
        console.log(SubTotalValue)
      }}
    >
      {/* head of page */}
      <Row style={{ textAlign: "start" }}>
        <h3>{Language==="ar"?"عربة التسوق ":"Cart"}</h3>
      </Row>
      {/* Page content and array map */}
    
      {Array.isArray(GlobalState.CartItems) &&
      GlobalState.CartItems.length > 0 ? (
        GlobalState.CartItems.map((item) => (
          <Row
            key={item.ID +item.Color+item.Size}
            className=" my-1"
            style={{ border: "2px solid gray", borderRadius:'10px' }}
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
            <Col xs={10} className="align-content-center">
            <Row>
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

            </Row>
            <Row id="0">
              <Col id="1" xs={10}>
              <Row className={Language==="ar"?"text-end":"text-start"}>
                  <Col id="2" xs={12} md="auto">
                  <span>
                    {Language==="ar"?"اللون":"Color"}
                  </span>
                  <span>
                    : {item.Color}, 
                  </span>
                  <span>
                     {Language==="ar"?"المقاس ":" Size"}
                  </span>
                  <span>
                    : {item.Size} 
                  </span>

                  </Col>
                 <Col id="3" xs={12} md={true}>
                 <i
                    onClick={(e) => {
                      e.stopPropagation();
                      const UpdatRequired = { Field: "Remove", ID: item.ID, Color:item.Color, Size:item.Size };
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
                      const UpdatRequired = { Field: "Add", ID: item.ID, Color:item.Color, Size:item.Size, Qty:item.Qty };
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
                      const UpdatRequired = { Field: "Delete", ID: item.ID, Color:item.Color, Size:item.Size };
                      UpdateCart(UpdatRequired);
                    }}
                    style={{
                      color: "#04aa6d",
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                    className=" ms-2 fa-solid fa-trash-can fa-xl"
                  ></i>

                 </Col>
              </Row>

              </Col>
              <Col id="4" xs={2} className="text-start" style={{ color: "red" }}>
              {<TotalPrice Item={item} />}
              </Col>
            </Row>
              
             
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
        <div className=" d-flex flex-column my-2" style={{borderBottom:'2px solid gray'}}>
          {/* Sub total */}
          <div className=" d-flex flex-row justify-content-between">
          <div  >
            <h4>
              {Language==="ar"?"المجموع الفرعي :":"Sub Total:"}
            </h4>
          </div>
          <div className="  text-end">
          
            <h5>{SubTotalValue} EGP</h5>
          </div>
          </div>
          {/* Delivery charges */}
          <div className=" d-flex flex-row justify-content-between">
          
          <div >
            <h4>
              {Language==="ar"?"رسوم التوصيل :":"Delivery charges:"}
            </h4>
          </div>
          <div className="text-end">
           
            <h5>{DeliveryChargesValue} EGP</h5>
           
            
          </div>
          </div>
          {/* Total Price */}
          <div className=" d-flex flex-row justify-content-between">
          
          <div>
            <h4>
              {Language==="ar"?"المجموع الكلي :":"Total Price:"}
            </h4>
          </div>
          <div className="text-end">
           
            <h5>{TotalValue} EGP</h5>
            
          </div>
          </div>
          {/* Checkout button */}
          <div>
            <button className="SignUpButton" onClick={(e)=>{
              e.stopPropagation()
              console.log(GlobalState)
              
              if (GlobalState.UserLogged===false) {
                Navigate('/LogIn')
                
                
              } else if(GlobalState.UserLogged===true && GlobalState.Client===true &&GlobalState.Admin===false && GlobalState.Merchant===false) {
                const Order={OrderValue:TotalValue,OrderDetails:GlobalState.CartItems,OrderConfirmed:false}
              AddOrder(Order)
                Navigate(`/${GlobalState.Name}/Checkout`)
                
              }else{
                Navigate('/')
              }
            }}>
              {Language==="ar"?"الدفع ":"Checkout"}
            </button>
          </div>
        </div>
      </Row>
     
     
    </Container>
  );
};
export default CartPage;
