import React, { useState,useEffect, useRef,useContext} from "react";
import io from 'socket.io-client';
import StaticData from "../Data/StaticData.js";
import {LanguageContext} from "../Context/LanguageContext";
import {Row, Col, Button, Form} from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const socket = io('https://gehazik-server.onrender.com'); // Connect to the Node.js server


const Test = () => {
  const [select1Value, setSelect1Value] = useState("");
  const [select2Value, setSelect2Value] = useState("11"); // Initialize with the first option value

  const handleSelect1Change = (event) => {
    setSelect1Value(event.target.value);
    setSelect2Value("11"); // Reset select 2 to the first option when select 1 changes
  };

  return (
    <>
      <select id="1" value={select1Value} onChange={handleSelect1Change}>
        <option value="aa">aa</option>
        <option value="bb">bb</option>
        <option value="cc">cc</option>
      </select>

      <select id="2" value={select2Value} onChange={(e) => setSelect2Value(e.target.value)}>
        <option value="11">11</option>
        <option value="22">22</option>
        <option value="33">33</option>
      </select>
    </>
  );
};

export default Test;
