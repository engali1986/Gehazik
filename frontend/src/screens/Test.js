import React, { useState, useEffect,useRef } from "react";
import jsPDF from"jspdf"
import {Dropdown, Toast, ToastHeader, ToastBody, ToastContainer,Row} from "react-bootstrap"
const Test = () => {
  const divRef = useRef();
  
  return (
    <>
    <div className=" d-flex flex-row justify-content-between flex-wrap gap-5">
      <div className=" flex-grow-1">
        hgjhgjh
      </div>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width:'100%'}}>
        a
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    </div>

    <div onClick={(e)=>{
      e.stopPropagation()
    }}>
      jhggkhkjhkj
    </div>
    <button type="button" className="btn btn-primary" id="liveToastBtn">Show live toast</button>

<div className="position-fixed bottom-0 end-0 p-3" style={{zIndex:'11'}}>
  <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      <img src="..." className="rounded me-2" alt="..."/>
      <strong className="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div className="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>
    
 
    
    </>
  );
};

export default Test;
