import React, { useState, useEffect } from "react";

const Test = () => {
  let x = new Date().getTime();
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log(new Date());
          console.log(new Date().getTime());
          console.log(new Date().getSeconds());
          console.log(new Date().getTime() - x);
        }}
      >
        click
      </button>
    </>
  );
};

export default Test;
