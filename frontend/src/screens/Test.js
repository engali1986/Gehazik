import React, { useState, useEffect } from "react";

const Test = () => {
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          let arr1 = [
            { ID: 1, b: 5 },
            { ID: 2, bb: 4 },
          ];
          let arr2 = arr1.filter((item) => {
            if (item.ID === 1) {
              return item;
            }
          });

          console.log(arr2);
        }}
      ></button>
    </>
  );
};

export default Test;
