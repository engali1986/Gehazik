import React, { useEffect, useRef } from "react";

const AdsSlider = () => {
  const NextArrow = useRef();
  const PrevArrow = useRef();
  let x = 0;

  const NextSlide = (e) => {
    e.stopPropagation();
    if (x < 3) { // Assuming there are 4 slides, index from 0 to 3
      x = x + 1;
    } else {
      x = 0;
    }
    document.getElementsByClassName("AdsImages")[0].style.left = `-${x * 100}%`;
  };

  const PrevSlide = (e) => {
    e.stopPropagation();
    if (x > 0) {
      x = x - 1;
    } else {
      x = 0;
    }
    document.getElementsByClassName("AdsImages")[0].style.left = `-${x * 100}%`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      NextArrow.current.click();
    }, 4000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);
  return (
    <div>
      <div
        className="AdSlider"
        style={{ width: "100%", height: "400px", position: "relative", overflow: "hidden" }}
        onClick={(e) => {
          e.stopPropagation();
          console.log("Image slider clicked");
        }}
      >
        <div className="AdsImages" style={{ width: "400%", height: "100%", top: "0px", left: "0%", position: "absolute" }}>
          <div className="Ads">
            <img alt="Laptop" src="./Images/ad1.jpg" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }} />
            <i
              className="fa-regular fa-heart"
              onClick={(e) => {
                e.stopPropagation();
                const target = e.target;
                if (target.classList.contains("fa-regular")) {
                  target.classList.remove("fa-regular");
                  target.classList.add("fa-solid");
                  target.style.color = "red";
                } else {
                  target.classList.remove("fa-solid");
                  target.classList.add("fa-regular");
                  target.style.color = "black";
                }
              }}
            >
              1
            </i>
          </div>
          <div className="Ads">
            <img alt="Laptop" src="./Images/ad2.jpeg" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }} />
            <i
              className="fa-regular fa-heart"
              onClick={(e) => {
                e.stopPropagation();
                const target = e.target;
                if (target.classList.contains("fa-regular")) {
                  target.classList.remove("fa-regular");
                  target.classList.add("fa-solid");
                  target.style.color = "red";
                } else {
                  target.classList.remove("fa-solid");
                  target.classList.add("fa-regular");
                  target.style.color = "black";
                }
              }}
            >
              2
            </i>
          </div>
          <div className="Ads">
            <img alt="Laptop" src="./Images/ad1.jpg" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }} />
            <i
              className="fa-regular fa-heart"
              onClick={(e) => {
                e.stopPropagation();
                const target = e.target;
                if (target.classList.contains("fa-regular")) {
                  target.classList.remove("fa-regular");
                  target.classList.add("fa-solid");
                  target.style.color = "red";
                } else {
                  target.classList.remove("fa-solid");
                  target.classList.add("fa-regular");
                  target.style.color = "black";
                }
              }}
            >
              3
            </i>
          </div>
          <div className="Ads">
            <img alt="Laptop" src="./Images/ad2.jpeg" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }} />
            <i
              className="fa-regular fa-heart"
              onClick={(e) => {
                e.stopPropagation();
                const target = e.target;
                if (target.classList.contains("fa-regular")) {
                  target.classList.remove("fa-regular");
                  target.classList.add("fa-solid");
                  target.style.color = "red";
                } else {
                  target.classList.remove("fa-solid");
                  target.classList.add("fa-regular");
                  target.style.color = "black";
                }
              }}
            >
              4
            </i>
          </div>
        </div>
        <i
          ref={NextArrow}
          className="fa-solid fa-arrow-right fa-xl"
          style={{ position: "absolute", top: "50%", right: "0%", zIndex: "1", cursor: "pointer" }}
          onClick={(e) => NextSlide(e)}
        ></i>

        <i
          ref={PrevArrow}
          className="fa-solid fa-arrow-left fa-xl"
          style={{ position: "absolute", top: "50%", left: "0%", zIndex: "1", cursor: "pointer" }}
          onClick={(e) => PrevSlide(e)}
        ></i>
      </div>
    </div>
  );
};

export default AdsSlider;
