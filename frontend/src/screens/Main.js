import React,{useRef,useState} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {Container, Col, Row} from"react-bootstrap"


import ErrorWindow from "./ErrorWindow";
import AdsSlider from "./AdsSlider";
import StaticData from "../Data/StaticData";
const Main = ({globalState,UpdateAddress}) => {
  const [Cities,SetCities]=useState([])
  
  
  UpdateAddress()
  return <>
  <Container style={{position:"relative"}}>
    <div style={{position:'absolute', zIndex:"20", minWidth:"100%",minHeight:"100%", backgroundColor:'white'}}>
      <Row style={{marginTop:'25%'}}>
        <Col xs={6} md={2}>
          Please select your Governorate
        </Col>
        <Col xs={6} md={4}>
          <select onChange={(e)=>{
            console.log(e.target.value)
            SetCities(Object.keys(StaticData.Cities[e.target.value]))
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
        <Col xs={6} md={2}>
          Please select your City
        </Col>
        <Col xs={6} md={4}>
          <select>
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
        <Col xs={12}>
          <button>
            Conte
          </button>
        </Col>
      </Row>

    </div>

 
 
    
      <AdsSlider/>
    

    <div className="MainAds" onClick={(e)=>{
      e.stopPropagation()
      console.log(globalState)
    }}>
      Main ad

    </div>
    <div>
      hghjgjhg
    </div>

    
    
    </Container>

  </>;
};

export default Main;
