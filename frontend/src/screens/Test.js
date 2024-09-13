import React, { useState,useEffect, useRef} from "react";
import io from 'socket.io-client';
import {Container,Row, Col} from "react-bootstrap"
const socket = io('http://localhost:5000'); // Connect to the Node.js server
const PassTest=({Change})=>{
  return(<input type="password" onChange={(e)=>{
    Change(e.target.value)
  }}/>)
  
}
const Test = ({globalState}) => {
  const [Text,SetText]=useState("")

  // const Change=(x)=>{
  //   SetText(x)
  // }
 
 
 
  return (
   
      <Row onClick={(e)=>{
        e.stopPropagation()
        console.log(Text)
      }}>
       <PassTest Change={SetText}/>

      </Row>
      
    
 
  );
};
export default Test;
