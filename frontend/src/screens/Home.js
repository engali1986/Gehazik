import React from "react";

const Home = () => {
  return (
    <div
      className="menu position-fixed d-none d-md-flex container row align-items-start"
      style={{
        minHeight: "5vh",
        backgroundColor: "lightGray",
        borderRadius: "5px",
        fontSize:'100%'
      }}
    >
      <div
        className=" col-1 "
        style={{
          border: "2px solid black",
          marginTop: "0.5%",
          textAlign: "start",
        }}
      >
        Gehazek
      </div>
      <div
        className="  col-1 "
        style={{
          border: "2px solid black",
          marginTop: "0.5%",
          textAlign: "start",
        }}
      >
        Profile
      </div>
      <div
        className="  col-1"
        style={{
          border: "2px solid black",
          marginTop: "0.5%",
          textAlign: "start",
        }}
      >
        Discounts
      </div>

      <div className="DropMenu d-none d-md-flex container-fluid align-items-start" style={{top:'5vh'}}>

</div>

      
    </div>
  );
};

export default Home;
