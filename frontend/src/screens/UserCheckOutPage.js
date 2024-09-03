import React, {useState,useEffect} from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { toast } from 'react-toastify'

const UserCheckOutPage = ({GlobalState,AddOrderDetails}) => {
  const [ShippingData,SetShippingData]=useState({
    FirstName:"",
    LastName:"",
    Address:"",
    Phone:"",
    Payment:"Cash on Delivery"
  })
 
  const PlaceOrder=(e)=>{
    e.stopPropagation()
    console.log(ShippingData)
    console.log(GlobalState)
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

    if (DataChicked===true) {
      AddOrderDetails(ShippingData)
      console.log(GlobalState)
      
    }else{
      toast.error("Order not Added")
    }
   
   
    
  }
  
 

  return (
    <Container>
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
        <button onClick={(e)=>PlaceOrder(e)} className='SignUpButton'>
          Place Order
        </button>
        </Col>
        
      </Row>
     
      
      
    </Container>
  )
}

export default UserCheckOutPage