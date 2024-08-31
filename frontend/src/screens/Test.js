import React, { useState} from "react";

const AddAdress=({ Address, SetAddress })=>{
  return(
    <>
    <input onChange={(e)=>{
      SetAddress({...Address,FirstName:e.target.value})
    }} type="text"  value={Address.FirstName} placeholder="Add First name" />
    </>
  )
 }

const Test = () => {
 const [Address,SetAddress]=useState({FirstName:''})

 
  
  return (
 <>
 <AddAdress Address={Address} SetAddress={SetAddress}/>
 </>
  );
};

export default Test;
