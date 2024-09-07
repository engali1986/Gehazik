import React, {useState,useEffect,useRef} from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import {useNavigate,useParams} from "react-router-dom"
const UserCheckOutPage = ({GlobalState, UpdateCart}) => {
  const Navigate=useNavigate()
  const Params=useParams()
  const Alert=useRef()
  console.log(Params.Name)
  const [ShippingData,SetShippingData]=useState({
    FirstName:"",
    LastName:"",
    Address:"",
    Phone:"",
    Payment:"Cash on Delivery"
  })// this will store Address and phone number
  const [Disabled,SetDisabled]=useState(false) // this will be used to disable place order button 
  const [Loader, SetLoader] = useState(false); // this will handle loader visbility during fetch product details
  const [OrderAdded,SetOrderAdded]=useState("")
 
  const PlaceOrder=async (e)=>{
    try {
      e.stopPropagation()
    console.log(ShippingData)
    console.log(GlobalState)
    SetDisabled(true)
    SetLoader(true)
    let x=Object.keys(ShippingData)
    let DataChicked=false
    for (let index = 0; index < x.length; index++) {
      let j=x[index]
      console.log(ShippingData[j])
      if(ShippingData[j].length===0){
        toast.error(`Please add ${[j]}`,({autoClose:3000}))
        DataChicked=false
        break
      }else{
        DataChicked=true
      }
      
    }
    if (DataChicked===true && GlobalState.Order.OrderDetails.length>0 && GlobalState.Order.OrderValue>0 && GlobalState.Order.OrderConfirmed===false) {
      console.log(GlobalState)
      let OrderData={...GlobalState.Order,OrderConfirmed:true,Address:ShippingData,ClientName:GlobalState.Name,ClientPhone:ShippingData.Phone,ClientEmail:GlobalState.email,ClientToken:GlobalState.Token}
     
      console.log(OrderData)
      const AddOrder=await fetch(
        "http://localhost:5000/Orders/AddOrder",
        {
          method: "POST",
          body: JSON.stringify(OrderData),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      ).then(res=>{
        return res.json()
      }).catch(err=>{
        console.log(err)
        toast.error("Order not Added")
        SetDisabled(false)
        SetLoader(false)
      })
      if (AddOrder.resp==="Order Not Added" || AddOrder.resp==="User Not Found" ) {
        toast.error(AddOrder.resp)
        SetDisabled(false)
        SetLoader(false)
        
      } else {
        let UpdateData={Field:"Empty"}
        SetOrderAdded(AddOrder.resp)
        await UpdateCart(UpdateData)
        Alert.current.style.maxHeight="500px"
        SetLoader(false)
      }
      
    }else{
      toast.error("Order not Added")
      console.log("OrderData not available")
      SetDisabled(false)
      SetLoader(false)
    }
      
    } catch (error) {
      console.log(error)
      toast.error("Internal error")
      SetDisabled(false)
      SetLoader(false)
      
    }
    
   
   
    
  }
  
 useEffect(()=>{
  if (GlobalState.UserLogged===false || GlobalState.Name.length===0 || GlobalState.Admin===true || GlobalState.Merchant===true || GlobalState.Client===false) {
    Navigate("/")
    
  } else if(GlobalState.Admin===true || GlobalState.Merchant===true || Params.Name!==GlobalState.Name) {
    Navigate("/")
    
  }else {
  }
 },[])
  return (
    <Container>
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
      {/* Page heading */}
      <Row onClick={(e)=>{
        e.stopPropagation()
        console.log(GlobalState)
        
      }} style={{ textAlign: "start" }}>
        <h3>Checkout</h3>
      </Row>
      
      {/* Page Contents */}
      <Row>
      <Col xs={12} className=' text-start'>
        {GlobalState.Governorate}, {GlobalState.City}
        </Col>
      </Row>
      <Row className=' my-3'>
        <Col xs={12} md={6}>
        <input onChange={(e)=>{
          console.log(e.target.value)
          SetShippingData({...ShippingData,FirstName:e.target.value})
        }} type="text"   className="form-control" id="inputFirstName" placeholder="First Name"></input>
        </Col>
        <Col xs={12} md={6}>
        <input onChange={(e)=>{
          SetShippingData({...ShippingData,LastName:e.target.value})
        }} type="text"  className="form-control" id="inputLastName" placeholder="Last Name"></input>
        </Col>
      </Row>
      <Row className=' my-3'>
        <Col xs={12} md={6}>
        <input onChange={(e)=>{
          SetShippingData({...ShippingData,Address:e.target.value})
        }} type="text"  className="form-control" id="inputAddress" placeholder="Street, Building number"></input>
        </Col>
        <Col xs={12} md={6}>
        <input onChange={(e)=>{
          SetShippingData({...ShippingData,Phone:e.target.value})
        }} type="phone"  className="form-control my-2 h-75" id="inputPhone" placeholder="contact number"></input>
        </Col>
      </Row>
      <Row className=' my-3'>
        <h5 className=' text-start'> Payment method</h5>
        <Row className=' text-start'>
        <div onClick={(e)=>{
    e.stopPropagation()
    console.log(e.target)
    ShippingData.Payment="Vodafone Cash"
  }} className="form-check">
  <input  className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label className="form-check-label" htmlFor="flexRadioDefault1">
    Vodafone Cash
  </label>
</div>
<div onClick={(e)=>{
    e.stopPropagation()
    console.log(e.target)
    ShippingData.Payment="Cash on Delivery"
  }} className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked/>
  <label className="form-check-label" htmlFor="flexRadioDefault2">
    Cash on Delivery
  </label>
</div>
        </Row>
      </Row>
      
      <Row className=' my-3'>
        <Col xs={12} >
        <button disabled={Disabled} onClick={(e)=>PlaceOrder(e)} className='SignUpButton'>
          Place Order for {GlobalState.Order.OrderValue} EGP
        </button>
        </Col>
        
      </Row>
     <Row ref={Alert} style={{maxHeight:'0px',overflow:'hidden', transition:"maxHeight 0.3s ease-in-out", textAlign:'start'}}>
      <Col xs={12}>
      <div  className="alert alert-success" role="alert" >
  {OrderAdded}
</div>
      </Col>
     
     </Row>
      
      
    </Container>
  )
}
export default UserCheckOutPage