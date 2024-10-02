import React, { useState,useEffect, useRef,useContext} from "react";
import io from 'socket.io-client';
import {LanguageContext} from "../Context/LanguageContext";
import {Container,Row, Col} from "react-bootstrap"
const socket = io('https://gehazik-server.onrender.com'); // Connect to the Node.js server
const DisplayData=({Data, SetData})=>{
  return(
    <>
   <button onClick={(e)=>{
    e.stopPropagation()
    let x=5
    for (let index = 0; index < 5; index++) {
      console.log(index)
      if(index===1){
        return x
      }else{

      }
      
    }
   }}>
    click

   </button>
    </>
  )
}
const Test = ({globalState}) => {
  const {Language,ToggleLanguage}=useContext(LanguageContext)
  const [Data,SetData]=useState(["aa","bb","CC"])

  
 
 
  return (
   
     <>
     <DisplayData Data={Data} SetData={SetData}/>
     </>
    
 
  );
};
export default Test;
