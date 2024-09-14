import React, { useState,useEffect, useRef,useContext} from "react";
import io from 'socket.io-client';
import {LanguageContext} from "../Context/LanguageContext";
import {Container,Row, Col} from "react-bootstrap"
const socket = io('http://localhost:5000'); // Connect to the Node.js server
const Test = ({globalState}) => {
  const {Language,ToggleLanguage}=useContext(LanguageContext)
  const [Text,SetText]=useState("")

  // const Change=(x)=>{
  //   SetText(x)
  // }
 
 
 
  return (
   
     <>
     
     </>
    
 
  );
};
export default Test;
