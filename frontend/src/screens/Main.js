import React,{useRef,useState} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {Container, Col, Row} from"react-bootstrap"


import ErrorWindow from "./ErrorWindow";
import AdsSlider from "./AdsSlider";
import StaticData from "../Data/StaticData";
const Main = ({globalState,UpdateAddress}) => {
 
  
  
  return <>
  <Container style={{position:"relative"}}>
   

 
 
    
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
