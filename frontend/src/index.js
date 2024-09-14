import React,{useContext} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import GoogleTranslate from "./Context/GoogleTranslate.js";
import App from "./App";
import {
  BrowserRouter,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import {LanguageContext, LanguageProvider} from "./Context/LanguageContext.js"
import Main from "./screens/Main";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
