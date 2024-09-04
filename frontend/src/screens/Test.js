import React, { useState} from "react";
import Staticdata from "../Data/StaticData"
import StaticData from "../Data/StaticData";



const Test = () => {
 const [Address,SetAddress]=useState({FirstName:''})

 
  
  return (
 <>
 <button onClick={(e)=>{
  e.stopPropagation()
  StaticData.AA="bbcc"
 }}>
  click
 </button>
 </>
  );
};

export default Test;
