import React, { useState, useEffect } from "react";

const Test = () => {
  const [Data, SetData] = { Name: "", Products: ["Pen"] };
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        click
      </button>
    </>
  );
};

export default Test;
