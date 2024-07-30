import React, {useEffect,useState,useRef} from 'react'
import {useNavigate,useParams} from "react-router-dom"
import {Container, Row, Col} from "react-bootstrap"

const MerchantPage = ({ globalState, setGlobal }) => {
    const navigate=useNavigate()
    const params=useParams()
    useEffect(()=>{
        if (globalState.UserLogged===true) {
            if (globalState.Admin === true) {
              navigate("/Admins/"+globalState.Name);
            } else if( globalState.Client===true){
              navigate("/")
            } else if(globalState.Merchant===true){
              navigate("/Merchants/"+globalState.Name)
            }
            
          } else {
            navigate("/")
            
          }

    },[])
  return (
    <Container onClick={(e)=>{
        e.stopPropagation()
        console.log(params)
    }}>
        <Row>
            <h2>
                Merchant Page
            </h2>
        </Row>
        <Row>
            <Col xs={2} style={{fontSize:'2vw', overflowWrap:'break-word' ,textAlign:'start'}}>
                <Row>
                    <Col xs={12} className=' d-flex flex-wrap'>
                        <div   style={{width:'fit-content'}}>
                            <span>Welcome, </span>
                            
                            <span>{params.Name}</span>
                            <span id="arrow" style={{cursor:'pointer'}} onClick={(e)=>{
                                e.stopPropagation()
                                if (document.getElementById("MerchantProfile").style.maxHeight==="0px") {
                                    document.getElementById(e.target.id).innerHTML="&#11205;"
                                    document.getElementById("MerchantProfile").style.maxHeight="500px"

                                    
                                } else {
                                    document.getElementById("MerchantProfile").style.maxHeight="0px"
                                    document.getElementById(e.target.id).innerHTML="&#11206;"
                                    
                                }
                            }} >
                                &#11206;
                            </span>
                            
                        </div>
                        <div id='MerchantProfile'  className=' d-flex flex-column' style={{fontSize:'1.7vw',maxHeight:'0px',transition:'all 0.3s ease-in-out', overflow:'hidden'}}>
                            <div>
                                Change Password
                            </div>
                            <div>
                               Log Out
                            </div>
                            

                        </div>
                    </Col>
                </Row>
                <Row>
                    <div>
                        <span>Orders</span>
                        <span id="OrdersArrow" style={{cursor:'pointer'}} onClick={(e)=>{
                                e.stopPropagation()
                                if (document.getElementById("MerchantOrders").style.maxHeight==="0px") {
                                    document.getElementById(e.target.id).innerHTML="&#11205;"
                                    document.getElementById("MerchantOrders").style.maxHeight="500px"

                                    
                                } else {
                                    document.getElementById("MerchantOrders").style.maxHeight="0px"
                                    document.getElementById(e.target.id).innerHTML="&#11206;"
                                    
                                }
                            }} >
                                &#11206;
                            </span>

                            <div id='MerchantOrders'  className=' d-flex flex-column' style={{fontSize:'1.7vw',maxHeight:'0px',transition:'all 0.3s ease-in-out', overflow:'hidden'}}>
                            <div>
                                New Orders
                            </div>
                            <div>
                               Orders History
                            </div>
                            

                        </div>
                    </div>
                </Row>
            </Col>
            <Col xs={10}>
                asw
            </Col>
        </Row>
    </Container>
  )
}

export default MerchantPage