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
     
      SetData(PervData=>{
        let x=[]
        for (let index = 0; index < PervData.length; index++) {
          if(PervData[index]==="bb"){
            x.push("aqw")
          }else{
            x.push(PervData[index])

          }
          
        }
        PervData=x
        return PervData
      })
        console.log(Data)
      
    }}>
      Click
    </button>
    {Data.map((item,index)=>(
      <div key={index}>
        {item}
      </div>
    ))}
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
