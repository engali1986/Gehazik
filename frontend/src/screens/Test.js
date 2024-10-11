import React, { useState,useEffect, useRef,useContext} from "react";
import io from 'socket.io-client';
import {LanguageContext} from "../Context/LanguageContext";
import {Row, Col, Button, Form} from "react-bootstrap"
const socket = io('https://gehazik-server.onrender.com'); // Connect to the Node.js server
const ProductOptions=({Options,SetOptions})=>{
  const addOption = () => {
    SetOptions([...Options, { Color: '', Size: '', Qty:0 }]);
  };

  const removeOption = (index) => {
    const NewOptions = [...Options];
    NewOptions.splice(index, 1);
    SetOptions(NewOptions);
  };

  const handleOptionChange = (index, field, value) => {
    const NewOptions = [...Options];
    NewOptions[index][field] = value;
    SetOptions(NewOptions);
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
        <Col xs={4} md={2}>
          <div onClick={addOption} style={{ cursor: 'pointer', color: 'blue' }}>
            Add Option
          </div>
        </Col>
      </Row>

      {Options.map((option, index) => (
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
  const [Options, SetOptions] = useState([]);

  return(
    <>
    <div onClick={(e)=>{
      e.stopPropagation()
      console.log(Options)
    }}>
      Optioned
    </div>
    <ProductOptions Options={Options} SetOptions={SetOptions}/>
    <select>
      {Options.length>0?Options.map(item=>(
        <option key={item.Color}>
          {item.Color}
        </option>
      )):""}
    </select>
    </>
   
  )

  
};
export default Test;
