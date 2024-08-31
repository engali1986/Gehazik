import React, {useState,useEffect} from 'react'
import { Container,Row,Col } from 'react-bootstrap'

const UserCheckOutPage = ({GlobalState,AddOrderDetails}) => {
  const [Step,SetStep]=useState(0)
  
  
  const PageContent=()=>{
    const [ShippingData,SetShippingData]=useState({
      FirstName:''
    })
    if (Step===0) {
      return (<>
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
        }} type="text" className="form-control" id="inputFirstName" placeholder="First Name"></input>
        </Col>
        <Col xs={12} md={6}>
        <input onChange={(e)=>{
          SetShippingData({...ShippingData,LastName:e.target.value})
        }} type="text" className="form-control" id="inputLastName" placeholder="Last Name"></input>
        </Col>
      </Row>
      <Row className=' my-3'>
        <Col xs={12} md={6}>
        <input onChange={(e)=>{
          SetShippingData({...ShippingData,Address:e.target.value})
        }} type="text" className="form-control" id="inputAddress" placeholder="Street, Building number"></input>
        </Col>
        <Col xs={12} md={6}>
        <input onChange={(e)=>{
          SetShippingData({...ShippingData,Phone:e.target.value})
        }} type="phone" className="form-control my-2 h-75" id="inputPhone" placeholder="contact number"></input>
        </Col>
      </Row>
      <Row className=' my-3'>
        <Col xs={12} >
        <button onClick={(e)=>{
          e.stopPropagation()
          console.log(ShippingData)
          console.log(GlobalState)
          GlobalState.Order.Address=ShippingData
          console.log(GlobalState)
          SetStep(Step+1)
        }} className='SignUpButton'>
          Confirm shipping
        </button>
        </Col>
        
      </Row>
      </>)
      
    } else {
      return (<>
      </>)
      
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
      <PageContent/>
     
      
      
    </Container>
  )
}

export default UserCheckOutPage