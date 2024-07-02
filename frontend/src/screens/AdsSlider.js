import React, { useEffect } from "react";

const AdsSlider = () => {
  console.log(document.getElementsByClassName("Ads")[0]);
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
      // x = 0;
      // document.getElementsByClassName("AdsImages")[0].style.left = "0%";
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
          console.log(document.getElementsByClassName("Ads")[0].childNodes[1]);
        }}>
        <div className="AdsImages" style={{ width: "400%", height: "100%", top: "0px", left: "0%", position: "absolute" }}>
          <div className="Ads">
            <img alt="Laptop" src="./Images/ad1.jpg" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }} />
            <i
              className="fa-regular fa-heart"
              onClick={(e) => {
                e.stopPropagation();
                console.log(e.target);
                console.log(e.target.className);
                if (e.target.classList.contains("fa-regular")) {
                  e.target.classList.remove("fa-regular");
                  e.target.classList.add("fa-solid");
                  e.target.style.color = "red";
                } else {
                  e.target.classList.remove("fa-solid");
                  e.target.classList.add("fa-regular");
                  e.target.style.color = "black";
                }
              }}>
              1
            </i>
          </div>
          <div className="Ads">
            <img alt="Laptop" src="./Images/ad2.jpeg" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }} />
            <i
              className="fa-regular fa-heart"
              onClick={(e) => {
                e.stopPropagation();
                console.log(e.target);
                console.log(e.target.className);
                if (e.target.classList.contains("fa-regular")) {
                  e.target.classList.remove("fa-regular");
                  e.target.classList.add("fa-solid");
                  e.target.style.color = "red";
                } else {
                  e.target.classList.remove("fa-solid");
                  e.target.classList.add("fa-regular");
                  e.target.style.color = "black";
                }
              }}>
              2
            </i>
          </div>
          <div className="Ads">
            <img alt="Laptop" src="./Images/ad1.jpg" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }} />
            <i
              className="fa-regular fa-heart"
              onClick={(e) => {
                e.stopPropagation();
                console.log(e.target);
                console.log(e.target.className);
                if (e.target.classList.contains("fa-regular")) {
                  e.target.classList.remove("fa-regular");
                  e.target.classList.add("fa-solid");
                  e.target.style.color = "red";
                } else {
                  e.target.classList.remove("fa-solid");
                  e.target.classList.add("fa-regular");
                  e.target.style.color = "black";
                }
              }}>
              3
            </i>
          </div>
          <div className="Ads">
            <img alt="Laptop" src="./Images/ad2.jpeg" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }} />
            <i
              className="fa-regular fa-heart"
              onClick={(e) => {
                e.stopPropagation();
                console.log(e.target);
                console.log(e.target.className);
                if (e.target.classList.contains("fa-regular")) {
                  e.target.classList.remove("fa-regular");
                  e.target.classList.add("fa-solid");
                  e.target.style.color = "red";
                } else {
                  e.target.classList.remove("fa-solid");
                  e.target.classList.add("fa-regular");
                  e.target.style.color = "black";
                }
              }}>
              4
            </i>
          </div>
        </div>
        <i className="fa-solid fa-arrow-right fa-xl" style={{ position: "absolute", top: "50%", right: "0%", zIndex: "1", cursor: "pointer" }} onClick={(e) => NextSlide(e)}></i>

        <i className="fa-solid fa-arrow-left fa-xl" style={{ position: "absolute", top: "50%", left: "0%", zIndex: "1", cursor: "pointer" }} onClick={(e) => PrevSlide(e)}></i>
      </div>
    </div>
  );
};

export default AdsSlider;
