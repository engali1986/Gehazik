import React, { useState, useEffect } from "react";

const Test = () => {
  const [arr, SetArr] = useState(["aa", "bb"]);
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (arr.length === 2) {
            SetArr(["bb", "cc", "DD"]);
          } else {
            SetArr(["aa", "bb"]);
          }
        }}
      >
        click
      </button>
      {Array.isArray(arr) ? arr.map((item) => <div>{item}</div>) : "ghgj"}
    </>
  );
};

export default Test;
