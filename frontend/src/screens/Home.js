import React from "react";

const Home = () => {
  return (
    <div>
      <button
        onClick={() => {
          console.log("clicked");
        }}
        className="btn btn-primary"
        
      >
        click
      </button>
    </div>
  );
};

export default Home;
