import React, { useState, useEffect,useRef } from "react";
import jsPDF from"jspdf"
import {Dropdown,Row} from "react-bootstrap"
import { toast} from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
const Test = () => {
  const divRef = useRef();
  
  return (
    <>
    <div className=" d-flex flex-row justify-content-between flex-wrap gap-5">
      <div className="flex-grow-1" onClick={(e)=>{
        e.stopPropagation()
        toast.success("Success Notification !");
        toast((<div style={{color:'red'}}> jhjhjkkj
          </div>),{
          autoClose:2000
        })
      }}>
        hgjhgjh
      </div>
      <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>

    </div>

    <div onClick={(e)=>{
      e.stopPropagation()
    }}>
      jhggkhkjhkj
    </div>
    
   <input type="email" onChange={(e)=>{
    console.log(e.target.value)
   }}/>
 
    
    </>
  );
};

export default Test;
