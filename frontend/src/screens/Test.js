import React, { useState,useEffect, useRef,useContext} from "react";
import io from 'socket.io-client';
import StaticData from "../Data/StaticData.js";
import {LanguageContext} from "../Context/LanguageContext";
import {Row, Col, Button, Form} from "react-bootstrap"
import { useParams, useNavigate, useLocation, UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { toast } from "react-toastify";
const socket = io('https://gehazik-server.onrender.com'); // Connect to the Node.js server


const Test = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    // Only run if we are on the /test page
    if (location.pathname === "/test") {
      const unblock = navigator.block((tx) => {
        // Custom confirmation dialog
        const userConfirmed = window.confirm("Do you really want to leave this page?");
        if (userConfirmed) {
          unblock();
          tx.retry(); // Proceed with navigation
        }
      });

      return () => unblock(); // Cleanup block when the component unmounts
    }
  }, [location.pathname, navigator]);

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is the test page. Click the back button to trigger the alert.</p>
    </div>
  );
};




export default Test;
