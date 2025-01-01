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
 

  return (
    <div>
     <input onChange={(e)=>{
      SetQuantity(parseInt(e.target.value,10))
      console.log(Quantity)
     }} type="number"/>
    </div>
  );
};




export default Test;
