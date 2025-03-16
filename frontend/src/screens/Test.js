import React, { useState,useEffect, useRef,useContext} from "react";
import io from 'socket.io-client';
import StaticData from "../Data/StaticData.js";
import {LanguageContext} from "../Context/LanguageContext";
import {Row, Col, Button, Form} from "react-bootstrap"
import { useParams, useNavigate, useLocation, UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { toast } from "react-toastify";
const socket = io('http://localhost:5000'); // Connect to the Node.js server


const Test = () => {
  const [Quantity,SetQuantity]=useState(0)
  let rating =5
 

  return (
    <div>
     <button onClick={(e)=>{
      e.stopPropagation()
      console.log(Array(rating).fill("0"))
      console.log(typeof Array(rating).fill("0")[0])
     }}>
      click me
     </button>
    </div>
  );
};




export default Test;
