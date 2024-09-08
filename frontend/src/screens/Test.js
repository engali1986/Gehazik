import React, { useState,useEffect,useContext,useCallback} from "react";
import Staticdata from "../Data/StaticData"
import StaticData from "../Data/StaticData";
import {SocketContext} from "../Context/Socket.js"

const Test = () => {
 const [Massage,SetMassage]=useState("")
 const [Massages,SetMassages]=useState([])
 const socket=useContext(SocketContext)
 const fun=useCallback(()=>{
  console.log("aassww")
 })
 

 
 
  useEffect(()=>{
    socket.on("Massages",fun)
   
    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off("Massage");
    };

  },[Massage])
  return (
 <>
 <button onClick={(e)=>{
  e.stopPropagation()
  socket.emit("Massage",Massage)
  
 

 }}>
  click
 </button>
 <button onClick={(e)=>{
  e.stopPropagation()
 
 }}>
  Click2
 </button>
 <div>
  <div>
    <input type="text" onChange={(e)=>{
      SetMassage(e.target.value)
    }}/>
  </div>
  {Massages.map(item=>(
    <div key={item}>
      {item}
      </div>
  ))}
 </div>
 </>
  );
};
export default Test;
