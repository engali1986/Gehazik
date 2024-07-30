import React, { useRef, useState } from "react";
import StaticData from "../Data/StaticData.js";

const Test = () => {
  const [Cities, SetCities] = useState([]);
  const [Town, SetTown] = useState([]);

  return (
    <>
      <button
        onClick={() => {
          console.log(StaticData.Categories);
        }}
      >
        awsde
      </button>
    </>
  );
};

export default Test;
