import React, { useState,useEffect, useRef} from "react";
import io from 'socket.io-client';
import {Container,Row, Col} from "react-bootstrap"
const socket = io('http://localhost:5000'); // Connect to the Node.js server
const Test = ({globalState}) => {
 
 
 
  return (
   
      <Row>
        <Col className=" d-flex align-items-center" xs={12} sm={6}>
        <input type="text"/> <i className=" fa-solid fa-magnifying-glass" style={{color:'blue'}}></i>
        </Col>
      </Row>
      
    
 
  );
};
export default Test;
