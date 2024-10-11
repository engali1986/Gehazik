import React, { useState,useEffect, useRef,useContext} from "react";
import io from 'socket.io-client';
import {LanguageContext} from "../Context/LanguageContext";
import {Row, Col, Button, Form} from "react-bootstrap"
const socket = io('https://gehazik-server.onrender.com'); // Connect to the Node.js server
const ProductOptions=({Options,SetOptions})=>{
  const addOption = () => {
    let NewArr=[...Options.POptions]
    console.log(Options)
    console.log(Options.POptions)
    console.log(NewArr)
    NewArr.push({ Color: '', Size: '', Qty:0 })
   
    SetOptions({...Options,POptions:NewArr });
  };

  const removeOption = (index) => {
    const NewOptions = [...Options.POptions];
    NewOptions.splice(index, 1);
    SetOptions({...Options,POptions:NewOptions});
  };

  const handleOptionChange = (index, field, value) => {
    const NewOptions = [...Options.POptions];
    NewOptions[index][field] = value;
    SetOptions({...Options,POptions:NewOptions});
  };

  return (
    <div className="OptionsContainer">
      <Row>
        <Col xs={8} md={10} onClick={(e)=>{
          e.stopPropagation()
          console.log(Options)
        }}>
          <div>Product Options</div>
        </Col>
        <Col xs={4} md={2} >
        
        <i onClick={addOption} 
                  className="fa-solid fa-square-plus fa-xl"
                  style={{ color: "#04aa6d", cursor:"pointer", width:'100%' }}
                ></i>
        </Col>
      </Row>

      {Options.POptions.map((option, index) => (
        <Row key={index} className="mt-3 align-items-center">
          
          <Col>
            <input
              type="text"
              placeholder="Color"
              value={option.Color}
              onChange={(e) => handleOptionChange(index, 'Color', e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              placeholder="Size"
              value={option.Size}
              onChange={(e) => handleOptionChange(index, 'Size', e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="number"
              placeholder="Qty"
              value={option.Qty}
              onChange={(e) => handleOptionChange(index, 'Qty', e.target.value)}
            />
          </Col>
          <Col>
            <Button variant="danger" onClick={() => removeOption(index)}>
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      
    </div>
  );

}

const Test = ({globalState}) => {
  const [Options, SetOptions] = useState({
    Total:0,
    POptions:[]
  });

  return(
    <>
    <div onClick={(e)=>{
      e.stopPropagation()
      console.log(Options)
    }}>
      Optioned
    </div>
    <ProductOptions Options={Options} SetOptions={SetOptions}/>
    
    </>
   
  )

  
};
export default Test;
