import React, { useState, useEffect } from "react";

const Test = () => {
  const [obj, Setobj] = useState({ a: "" });
  const [Arr, SetArr] = useState([]);
  useEffect(() => {
    console.log(Arr);
  }, [Arr]);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          Setobj({ ...obj, a: "Added" });
          SetArr([...Arr, obj]);
          console.log(Arr);
        }}
      >
        Click
      </button>
    </>
  );
};

export default Test;
