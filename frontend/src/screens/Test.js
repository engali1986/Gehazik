import React, { useState} from "react";
import Staticdata from "../Data/StaticData"
import StaticData from "../Data/StaticData";



const Test = () => {
 const [Address,SetAddress]=useState({FirstName:''})

 

 
  
  return (
 <>
 <button onClick={(e)=>{
  e.stopPropagation()
  let x=10
  if (x>5) {
    console.log(x)
    console.log(Address)
   return
    
  }
  

  if (x>0) {
    console.log("aass")
    return
  }
 }}>
  click
 </button>
 </>
  );
};

export default Test;
