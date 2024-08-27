import React, { useState, useEffect,useRef } from "react";
import jsPDF from"jspdf"
import {Dropdown} from "react-bootstrap"
const Test = () => {
  const divRef = useRef();
  
  return (
    <>
    <div className=" d-flex flex-row justify-content-between flex-wrap">
      <div className=" flex-grow-1">
        hgjhgjh
      </div>
    <Dropdown>
    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#"><Dropdown>
    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul className="dropdown-menu">
  <li><a className="dropdown-item" href="#">Action</a></li>

  </ul>

      </Dropdown></a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
    </Dropdown>

    </div>
    
 
    
    </>
  );
};

export default Test;
