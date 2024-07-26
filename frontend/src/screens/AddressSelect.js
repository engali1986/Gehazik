import React,{useRef,useState} from "react";
import {Container, Col, Row, Alert} from"react-bootstrap"
import StaticData from "../Data/StaticData";
import { getOverlayDirection } from "react-bootstrap/esm/helpers";

const AddressSelect = ({globalState,updateAddress}) => {
    const [Cities,SetCities]=useState([])
    const [Address,SetAddress]=useState({
        Governorate:"",
        City:""
    })
    
  
  return (
    <Container className="AddressSelection p-5" style={{position:'fixed', top:'0px', left:'0px', zIndex:"20", minWidth:"100vw",minHeight:"100vh", backgroundColor:'white'}} onClick={(e)=>{
        e.stopPropagation()
        console.log(localStorage.getItem("globalState"))
        console.log(sessionStorage.getItem("globalState"))
        console.log(globalState)
    }}>
    <Row style={{marginTop:'25%'}}>
      <Col className=" align-content-center" xs={6} md={2}>
        Please select your Governorate
      </Col>
      <Col xs={6} md={4} className=" align-content-center">
        <select style={{width:'100%'}} onChange={(e)=>{
          console.log(e.target.value)
          SetCities(Object.keys(StaticData.Cities[e.target.value]))
          SetAddress({...Address,Governorate:e.target.value,City:""})
         
        }}>
          <option >
            Please select

          </option>
          {Object.keys(StaticData.Cities).map(Item=>(
            <option key={Item}>
              {Item}

            </option>
          ))}
        </select>
      </Col>
      <Col className=" align-content-center" xs={6} md={2}>
        Please select your City
      </Col>
      <Col xs={6} md={4} className=" align-content-center">
        <select style={{width:'100%'}} onChange={(e)=>{
            e.stopPropagation()
            console.log(e.target.value)
            console.log(Address)
            SetAddress({...Address,City:e.target.value})
        }}>
          <option>
          Please select

          </option>
          {Cities.map(City=>(
            <option key={City}>
              {City}

            </option>
          ))}
        
        </select>
      </Col>
      <Col className=" d-flex justify-content-center" xs={12}>
        <button onClick={(e)=>{
            e.stopPropagation()
            console.log(globalState)
            console.log(updateAddress)
            if (Address.Governorate.length>0 && Address.City.length>0) {
                console.log(updateAddress)
                updateAddress(Address)
                document.querySelectorAll(".AddressSelection")[0].style.display="none"
                
            } else {
                console.log("Slect location")
                alert("Please select location")
                
            }

        }} >
          Confirm Address
        </button>
      </Col>
    </Row>

  </Container>
  )
}

export default AddressSelect