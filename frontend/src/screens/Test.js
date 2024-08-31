import React, { useState, useEffect,useRef } from "react";
import jsPDF from"jspdf"
import {Dropdown,Row} from "react-bootstrap"
import { toast} from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
const Test = () => {
  const divRef = useRef();
  
  return (
    <>
    <div id="Printed">
      jhkljkjlkjlkk
      <div style={{color:'red'}}>
        jkoo099999
      </div>

    </div>
    <button onClick={(e)=>{
      e.stopPropagation()
      let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

  // mywindow.document.write(`<html><head><title>aaa</title>`);
  // mywindow.document.write('</head><body >');
  mywindow.document.write(document.getElementById("Printed").innerHTML);
  // mywindow.document.write('</body></html>');
  // mywindow.document.close();
  console.log(mywindow)
  console.log(mywindow.document)
  // mywindow.print();
  // mywindow.close();
  console.log(window.btoa(mywindow.document))
  console.log(window.atob(window.btoa(mywindow.document)))
  let File= new Blob([mywindow.document],{type:'application/pdf'})
  console.log(File)
  const downloadLink = document.createElement("a")
downloadLink.href = 'data:application/octet-stream;base64,' + window.btoa(mywindow.document)
downloadLink.download = "convertedPDFFile.pdf"
downloadLink.click()
    }}>
      Print
    </button>
  
    
    </>
  );
};

export default Test;
