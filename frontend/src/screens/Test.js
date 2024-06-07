import React from "react";

const Test = () => {
  let x = 0;
  return (
    <div>
      <div
        className="AdSlider"
        style={{ width: "100%", height: "400px", position: "relative", overflow: "hidden" }}
        onClick={(e) => {
          e.stopPropagation();
          console.log("Image slider clicked");

          if (x <= 2) {
            x = x + 1;
            let y = x * 100;
            let left = "-" + y + "%";
            document.getElementsByClassName("AdsImages")[0].style.left = left;
          } else {
          }
        }}>
        <div className="AdsImages" style={{ width: "400%", height: "100%", top: "0px", left: "0%", position: "absolute" }}>
          <div style={{ display: "inline-block", top: "0px", width: "25%", height: "100%", backgroundColor: "green" }}></div>
          <div style={{ display: "inline-block", top: "0px", width: "25%", height: "100%", backgroundColor: "yellow" }}></div>
          <div style={{ display: "inline-block", top: "0px", width: "25%", height: "100%", backgroundColor: "red" }}></div>
          <div style={{ display: "inline-block", top: "0px", width: "25%", height: "100%", backgroundColor: "blue" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Test;
