import React, { useState,useEffect, useRef,useContext} from "react";
import io from 'socket.io-client';
import StaticData from "../Data/StaticData.js";
import {LanguageContext} from "../Context/LanguageContext";
import {Row, Col, Button, Form} from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const socket = io('http://localhost:5000'); // Connect to the Node.js server


const Test = ({GlobalState}) => {
  const [Product, setProduct] = useState({ ProductImages: [] }); // this will store product details
 
  const [Colors,SetColors]=useState([])
  
  const Navigate = useNavigate();
  let prod;
  useEffect(() => { 
    
    const GetProductDetails = async (ProductID) => {
      try {
        const Productdetails = await fetch(
          "http://localhost:5000/Users/GetProductDetails",
          {
            method: "post",
            body: JSON.stringify({ Data: ProductID }),
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
          }
        )
          .then((res) => {
            return res.json();
          })
          .catch((err) => {
            console.log(err);
            return { resp: "Connection error" };
          });
        console.log(Productdetails);
        console.log(Productdetails.resp);
        console.log(Productdetails.resp.resp);
        if (typeof Productdetails.resp === "object") {
          console.log(Productdetails.resp);
         
          prod = Productdetails.resp;
          console.log(prod);
          setProduct((Perv) => ({
            ...Perv,
            ProductOptions:prod.ProductOptions,
          }));
          // next we will make color arrays to group duplicate colors
          let InitialColors=[]
          for (let index = 0; index < prod.ProductOptions.length; index++) {
            let obj={
              Color:prod.ProductOptions[index].Color,
              Hex:prod.ProductOptions[index].Hex
            }
            InitialColors.push(obj) 
          }
          const uniqueColorsByColor = InitialColors.filter((item, index, self) =>
            index === self.findIndex(t => t.Color === item.Color)
          ); 
          SetColors(uniqueColorsByColor)
          // Colors Array finished
          // next we will make sizes array
          let InitialSizes=[]
          for (let index = 0; index < prod.ProductOptions.length; index++) {
            if (prod.ProductOptions[index].Color===prod.ProductOptions[0].Color) {
              InitialSizes.push(prod.ProductOptions[index].Size)
            }
            
          }
         
          

         
          console.log(Product);
        } else {
          Navigate("/ProductNotFound");
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error)
        
      }
      
    };
    GetProductDetails("670bb289af6b3dd5149b4acc");
    if (GlobalState.UserLogged===false || GlobalState.Client===false|| GlobalState.Name.length===0) {
      toast.warn((<div>Please <a href="/LogIn">LogIn/Signup</a> to add product </div>), {
        autoClose:false
      })
      
    } else {
      
    }
    console.log(Product);
  }, []);

  return(
    <>
    <select onChange={(e)=>{
                  e.target.style.backgroundColor=Colors[e.target.selectedIndex].Hex
                }} style={{backgroundColor:Array.isArray(Colors)?Colors[0].Hex:"white"}}>
                  {Array.isArray(Colors)?Colors.map((item,index)=>(
                    <option data-index={index} style={{backgroundColor:item.Hex}} key={index}>
                      {item.Color}
                    </option>
                  )):""}
                  </select>
   
    </>
   
  )

  
};
export default Test;
