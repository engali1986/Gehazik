import React, { useState, useEffect,useRef } from "react";
import jsPDF from"jspdf"

const Test = () => {
  const divRef = useRef();
  return (
    <>
    <div>
      <div ref={divRef} style={{ padding: 20 }}>
        <h1>Hello, World!</h1>
        <p>This is the content of the div that will be saved as a PDF.</p>
      </div>
      <button onClick={()=>{
        const doc = new jsPDF();

        doc.html(divRef.current, {
          callback: function (doc) {
            doc.save('document.pdf');
          },
          x: 10,
          y: 10,
          width: 180, // Width of content on the page
          windowWidth: divRef.current.offsetWidth, // HTML width used for rendering
        });
      }}>Download as PDF</button>
    </div>
      
      <div className="AA">
        njhljlkjljk

      </div>
    </>
  );
};

export default Test;
