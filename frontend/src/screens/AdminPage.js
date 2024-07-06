import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import { Link, useNavigate } from "react-router-dom";
import {Container,Row,Col} from "react-bootstrap"

//  the main Componebt is AdminPage and child Component is ControlPanel 
//  when user clicks on any item on the AdminPage component side items >SetData function will update the Data state > then the ControlPanel will be updated using useState
//  useeffect will be used to redirect unauthorized users away from the page 

const AdminPage = ({ globalState, setGlobal }) => {
    const {Name}=useParams()
    const navigate=useNavigate()
    const [Data,SelectData]=useState("")
//  ControlPanel Component Start
    const ControlPanel=({Data})=>{
      useEffect(()=>{
        console.log(Data)

      },[Data])
      if (Data==="Orders") {
        return(
          <Row>
            <Col xs={12} md={4}>
              All orders
            </Col>
            <Col xs={12} md={8}>
              25 orders
            </Col>
          </Row>
        )
        
      } else if(Data==="Merchants"){
        return(
          <Row>
            <Col xs={12}>
              50 Merchants
            </Col>
          </Row>
        )
      } else{
        return(
          <>
          <Row>
            <Col xs={12}>
             Please select data
            </Col>
          </Row>
          
          </>
        )

      }

      
    }
//  ControlPanel Component End

// SetData function start

const SetData=(e)=>{
  e.stopPropagation()
  console.log(e.target.innerText)
  SelectData(e.target.innerText)

}

// SetData function end

useEffect(() => {
  if (globalState.UserLogged===true) {
    if (globalState.Admin === true) {
     
    } else if( globalState.Client===true){
      navigate("/")
    } else if(globalState.Merchant===true){
      navigate("/Merchants/"+globalState.Name)
    }
    
  } else {
    navigate("/")
    
  }
  
});


  return (
    <>
    
      <Row style={{minHeight:"100%"}}>
        <Col xs={2} style={{borderRight:'5px solid', borderColor:'#a4d2f2'}}>
          <div onClick={(e)=>SetData(e)}>
            Orders
          </div>
          <div onClick={(e)=>SetData(e)}>
            Merchants
          </div>
        
        </Col>
        <Col xs={10}>
          <ControlPanel Data={Data}/>
        </Col>
      </Row>
   

    </>
  )
}

export default AdminPage