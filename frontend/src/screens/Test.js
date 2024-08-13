import React, { useState, useEffect } from "react";

const Test = () => {
  return (
    <>
      <img src="http://localhost:5000/aa.jpeg" />
      <button
        onClick={(e) => {
          e.stopPropagation();
          let arr = ["a", 2, 5, "6", "b"];

          let chunks = [];
          for (let i = 0; i < arr.length; i += 2) {
            chunks.push(arr.slice(i, i + 2));
          }
          console.log(chunks);
        }}
      >
        click
      </button>
    </>
  );
};

export default Test;
