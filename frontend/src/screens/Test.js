import React, { useState,useEffect, useRef,useContext} from "react";
import io from 'socket.io-client';
import StaticData from "../Data/StaticData.js";
import {LanguageContext} from "../Context/LanguageContext";
import {Row, Col, Button, Form} from "react-bootstrap"
import { useParams, useNavigate, useLocation, UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { toast } from "react-toastify";
const socket = io('https://gehazik-server.onrender.com'); // Connect to the Node.js server


const Test = () => {
  const Arr=[
    {Color:"White",
      Size:"Large",
      Qty:10
    }
    
  ]

  return (
    <div>
      <button onClick={()=>{
        console.log("Clicked")
        console.log(Arr)
        for (let index = 0; index < Arr.length; index++) {
          for (let J = 0; J < Arr.length; J++) {
            if (J>index && Arr[J].Color===Arr[index].Color && Arr[J].Size===Arr[index].Size) {
              Arr[index].Qty=Arr[index].Qty+Arr[J].Qty
              Arr.splice(J,1)
            }
            
          }
          
        }
        console.log(Arr)
      }}>
        Test Me

      </button>
    </div>
  );
};




export default Test;
