import logo from "./logo.svg";
import Home from "./screens/Home.js";
import "./App.css";

function App() {
  return (
    <div
      className="App container"
      style={{ border: "2px solid red", fontSize: "1rem" }}
    >
      <div className=" position-fixed w-100" style={{minHeight:'10vh', backgroundColor:'green',marginLeft:'inherit', marginRight:'inherit'}}>

      </div>
      

      
       
      <Home />
      
     
      <div style={{minHeight:'200vh',border:'2px solid green'}}>

      </div>

     
    </div>
  );
}

export default App;
