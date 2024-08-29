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
    
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
 
    
    </>
  );
};

export default Test;
