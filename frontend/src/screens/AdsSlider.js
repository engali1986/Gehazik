import React from "react";

const AdsSlider = () => {
  let x = 0;
  const NextSlide = (e) => {
    e.stopPropagation();
    console.log(e.target);
    if (x <= 2) {
      x = x + 1;
      let y = x * 100;
      let left = "-" + y + "%";
      document.getElementsByClassName("AdsImages")[0].style.left = left;
      console.log(x);
    } else {
      x = 0;
      document.getElementsByClassName("AdsImages")[0].style.left = "0%";
    }
  };

  const PrevSlide = (e) => {
    e.stopPropagation();
    if (x > 0 && x <= 3) {
      x = x - 1;
      let y = x * 100;
      let left = "-" + y + "%";
      document.getElementsByClassName("AdsImages")[0].style.left = left;
    } else {
      x = 0;
      document.getElementsByClassName("AdsImages")[0].style.left = "0%";
    }
  };
  return (
    <div>
      <div
        className="AdSlider"
        style={{ width: "100%", height: "400px", position: "relative", overflow: "hidden" }}
        onClick={(e) => {
          e.stopPropagation();
          console.log("Image slider clicked");
        }}>
        <div className="AdsImages" style={{ width: "400%", height: "100%", top: "0px", left: "0%", position: "absolute" }}>
          <div className="Ads">
            <img alt="Laptop" src="./Images/ad1.jpg" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }} />
            <i className="fa-regular fa-heart"></i>
          </div>
          <div className="Ads" style={{ backgroundColor: "yellow" }}></div>
          <div className="Ads" style={{ backgroundColor: "red" }}></div>
          <div className="Ads" style={{ backgroundColor: "blue" }}></div>
        </div>
        <i className="fa-solid fa-arrow-right fa-xl" style={{ position: "absolute", top: "50%", right: "0%", zIndex: "1", cursor: "pointer" }} onClick={(e) => NextSlide(e)}></i>

        <i className="fa-solid fa-arrow-left fa-xl" style={{ position: "absolute", top: "50%", left: "0%", zIndex: "1", cursor: "pointer" }} onClick={(e) => PrevSlide(e)}></i>
      </div>
    </div>
  );
};

export default AdsSlider;
