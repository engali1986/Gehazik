import React, { useState,useEffect, useRef,useContext} from "react";
import io from 'socket.io-client';
import {LanguageContext} from "../Context/LanguageContext";
import {Container,Row, Col} from "react-bootstrap"
const socket = io('https://gehazik-server.onrender.com'); // Connect to the Node.js server
const Test = ({globalState}) => {
  const {Language,ToggleLanguage}=useContext(LanguageContext)
  const [Text,SetText]=useState("")

  
 
 
  return (
   
     <>
    <button onClick={(e)=>{
      e.stopPropagation()
      let x=new Date("2024-09-07T04:57:29.732+00:00")
      console.log(x)
      console.log(x.getDay())
      console.log(typeof x)
    }}>
      click

    </button>
     
     </>
    
 
  );
};
export default Test;
