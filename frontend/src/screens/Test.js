import React, { useState, useEffect } from "react";

const Test = () => {
  return (
    <>
    <div className="bb">
      jhjkhljkj
    </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          window.print("avf")
        }}
      > print</button>
      <div className="AA">
        njhljlkjljk

      </div>
    </>
  );
};

export default Test;
