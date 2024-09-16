import React,{useState,useEffect, useContext} from 'react'
import {Container, Row, Col, Dropdown, ButtonGroup, DropdownButton, Button} from "react-bootstrap"
import {LanguageContext} from "../Context/LanguageContext"
import { toast } from 'react-toastify'
const DtataDisplay=({globalState,setGlobal,Data})=>{
  const {Language,Togglelanguage}=useContext(LanguageContext)
  const [Disabled, SetDisabled] = useState(false);
  const [ChangePasswordData,SetChangePasswordData]=useState({
    Name:globalState.Name,
    Email:globalState.Email,
    Token:globalState.Token,
    OldPassword:"",
    NewPassword:"",
    ConfirmNewPassword:"",
    User:globalState.Client===true?"User":""
  })
 
    if (Data==="تغيير كلمة المرور"||Data==="Change Password") {
      return(
        <Container>
          <Row>
          <h3>{Data}</h3>
          </Row>
          <Row className=" align-items-center">
            <Col xs={12} md={4}>
              {Language==="ar"?"برجاء ادخال كلمه المرور القديمه":"Please enter old password"}
            </Col>
            <Col xs={12} md={8}>
              <input 
                 id="OldPassword"
                 type="password"
                 pattern="[0-9]{3}"
                 placeholder={Language==="ar"?"ادخل كلمه المرور": "Enter Password"}
                 name="psw"
                 disabled={Disabled}
                 onChange={(e)=>{
                  e.stopPropagation()
                  SetChangePasswordData({...ChangePasswordData,OldPassword:e.target.value})
                 }}
        required style={{ width: "100%" }} />
            </Col>
          </Row>
          <Row className=" align-items-center">
            <Col xs={12} md={4}>
              {Language==="ar"?"برجاء ادخال كلمه المرور الجديده":"Please enter new password"}
            </Col>
            <Col xs={12} md={8}>
              <input id="NewPassword"
                 type="password"
                 pattern="[0-9]{3}"
                 placeholder={Language==="ar"?"ادخل كلمه المرور": "Enter Password"}
                 name="psw"
                 disabled={Disabled}
                 onChange={(e)=>{
                  e.stopPropagation()
                  SetChangePasswordData({...ChangePasswordData,NewPassword:e.target.value})
                 }}
        required style={{ width: "100%" }} />
            </Col>
          </Row>
          <Row className=" align-items-center">
            <Col xs={12} md={4}>
              {Language==="ar"?"برجاء اعاده ادخال كلمه المرور الجديده":"Please confirm new password"}
            </Col>
            <Col xs={12} md={8}>
              <input id="ConfirmNewPassword"
                 type="password"
                 pattern="[0-9]{3}"
                 placeholder={Language==="ar"?"ادخل كلمه المرور": "Enter Password"}
                 name="psw"
                 disabled={Disabled}
                 onChange={(e)=>{
                  e.stopPropagation()
                  SetChangePasswordData({...ChangePasswordData,ConfirmNewPassword:e.target.value})
                 }}
        required style={{ width: "100%" }} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <button className="SignUpButton" onClick={async (e)=>{
                e.stopPropagation()
                console.log(ChangePasswordData)
                e.target.disabled=true
                e.target.innerText=Language==="ar"?"برجاء الانتظار...":"Please wait..."
                try {
                  if (ChangePasswordData.NewPassword.length===0 || ChangePasswordData.OldPassword.length===0 || ChangePasswordData.ConfirmNewPassword.length===0 || ChangePasswordData.Email.length===0 || ChangePasswordData.Token===0) {
                    toast.error(Language==="ar"?"برجاء ملئ كافه الحقول": "Please fill all fields")
                    e.target.disabled=false
                    e.target.innerText=Language==="ar"?"تاكيد":"confirm"
                  } else if(ChangePasswordData.ConfirmNewPassword!==ChangePasswordData.NewPassword) {
                    toast.error(Language==="ar"?"يجب مطابقه كلمه المرور الجديده مع اعادة ادخال كلمه المرور الجديده":"New Passwords Dosenot match")
                    e.target.disabled=false
                    e.target.innerText=Language==="ar"?"تاكيد":"confirm"
                  }else{
                    let RegTextVarify=false
                    let keys=Object.keys(ChangePasswordData)
                    for (let index = 0; index <keys.length ; index++) {
                     if(keys[index]==="NewPassword" || keys[index]==="ConfirmNewPassword"){
                      console.log(keys[index])
                      if (ChangePasswordData[keys[index]].match(/[a-z]/g) && ChangePasswordData[keys[index]].match(/[A-Z]/g) && ChangePasswordData[keys[index]].match(/[0-9]/g) && ChangePasswordData[keys[index]].length>=8   ) {
                      RegTextVarify=true
                      }else{
                        RegTextVarify=false
                       toast.error(Language==="ar"?"يجب ان تحتوي كلمه المرور على حرف صغير وحرف كبير ورقم ولا تقل عن 8 احرف" : "New password shall be at least 8 characters, 1 lower case letter, 1 number and 1 uppercase letter", {autoClose:5000})
                       e.target.disabled=false
                       e.target.innerText=Language==="ar"?"تاكيد":"confirm"
                       break
                      }
                     } 
                    }
                    if (RegTextVarify===true) {
                      console.log("Pdate password")
                      const ChangePassword = await fetch(
                        "http://localhost:5000/Users/ChangePassword",
                        {
                          method: "post",
                          body: JSON.stringify(ChangePasswordData),
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
                          return { resp: "Internal Error" };
                        });
                        console.log(ChangePassword)
                        if (typeof ChangePassword==="object" && ChangePassword.resp && typeof ChangePassword.resp==="string") {
                          if (ChangePassword.resp==="Password Updated successfully") {
                            toast.success(Language==="ar"?"تم تغيير كلمه المرور بنجاح":ChangePassword.resp)
                            e.target.disabled=false
                            e.target.innerText=Language==="ar"?"تاكيد":"confirm"

                            
                          } else {
                            toast.error(ChangePassword.resp)
                            e.target.disabled=false
                            e.target.innerText=Language==="ar"?"تاكيد":"confirm"
                            
                          }
                          
                        } else {
                          toast.error(Language==="ar"?"لم يتم تغيير كلمه المرور":"Password Not Updated")
                       e.target.disabled=false
                       e.target.innerText=Language==="ar"?"تاكيد":"confirm"
                          
                        }
                      
                    } else {
                      toast.error(Language==="ar"?"يجب ان تحتوي كلمه المرور على حرف صغير وحرف كبير ورقم ولا تقل عن 8 احرف" : "New password shall be at least 8 characters, 1 lower case letter, 1 number and 1 uppercase letter", {autoClose:5000})
                       e.target.disabled=false
                       e.target.innerText=Language==="ar"?"تاكيد":"confirm"
                      
                    }
                  }
                } catch (error) {
                  console.log(error)
                  toast.error(Language==="ar"?"خطا داخلي":"Internal Error")
                  e.target.disabled=false
                  e.target.innerText=Language==="ar"?"تاكيد":"confirm"
                }
              }} style={{ width: "100%" }}>
                {Language==="ar"?"تاكيد":"confirm"}
              </button>
            </Col>
          </Row>
        </Container>
      )
    } else if(Data==="تسجيل الخروج"|| Data==="LogOut") {
      return(
        <Container>
          <Row>
          <h3>{Data}</h3>
          </Row>
        </Container>
      )     
    }else if(Data==="الطلبات الجديده"|| Data==="New Orders") {
      return(
        <Container>
          <Row>
          <h3>{Data}</h3>
          </Row>
        </Container>
      )     
    }else if(Data==="جميع الطلبات"|| Data==="All Orders") {
      return(
        <Container>
          <Row>
          <h3>{Data}</h3>
          </Row>
        </Container>
      )     
    }else {
      return(
        <Container>
          <Row>
          <h3>{Language==="ar"?"برجاء تحديد اختيار":"Please select option"}</h3>
          </Row>
        </Container>
      )     
    }
  }
const ClientPage = ({globalState,setGlobal}) => {
  const {Language,Togglelanguage}=useContext(LanguageContext)
  const [Data, SetData] = useState(""); // this state will be used to store the selected menu items to display data
  return (
    <Container>
      {/* This will be the head of page */}
      <Row>
        <h2>
          {Language==="ar"?"لوحه التحكم":"Dashboard"}
        </h2>
      </Row>
      {/* This will be page body */}
      <Row>
        {/* the following Col will be the side menu for the merchant page */}
        <Col xs={12} md={2}>
        <Dropdown className=' d-inline-block w-100 my-2' size={{xs:"lg",md:"sm"}}>
      <Dropdown.Toggle className=' d-inline-block w-100 text-start ps-0' variant="success" id="dropdown-basic">
        {Language==="ar"?"الصفحه الشخصيه":"Profile"}
      </Dropdown.Toggle>

      <Dropdown.Menu className=' w-100'>
        <Dropdown.Item as={Button}
        onClick={(e)=>{
          e.stopPropagation()
          SetData(e.target.innerText)
          e.target.parentElement.parentElement.children[0].click()
        }}>{Language==="ar"?"تغيير كلمة المرور":"Change Password"}</Dropdown.Item>
        <Dropdown.Item as={Button}
        onClick={(e)=>{
          e.stopPropagation()
          SetData(e.target.innerText)
          e.target.parentElement.parentElement.children[0].click()
        }}>{Language==="ar"?"تسجيل الخروج":"LogOut"}</Dropdown.Item>
      </Dropdown.Menu>
        </Dropdown>
        <Dropdown className=' d-inline-block w-100 my-2' size={{xs:"lg",md:"sm"}}>
      <Dropdown.Toggle className=' d-inline-block w-100 text-start ps-0' variant="success" id="dropdown-basic">
        {Language==="ar"?"طلبات الشراء":"Orders"}
      </Dropdown.Toggle>

      <Dropdown.Menu className=' w-100'>
        <Dropdown.Item as={Button}
        onClick={(e)=>{
          e.stopPropagation()
          SetData(e.target.innerText)
          e.target.parentElement.parentElement.children[0].click()
        }}>{Language==="ar"?"الطلبات الجديده":"New Orders"}</Dropdown.Item>
        <Dropdown.Item as={Button}
        onClick={(e)=>{
          e.stopPropagation()
          SetData(e.target.innerText)
          e.target.parentElement.parentElement.children[0].click()
        }}>{Language==="ar"?"جميع الطلبات":"All Orders"}</Dropdown.Item>
      </Dropdown.Menu>
        </Dropdown>
    
        </Col>
        {/* the following Col will display the data after merchant select option from side menu */}
        <Col xs={12} md={10}>
        <DtataDisplay globalState={globalState} setGlobal={setGlobal} Data={Data}  />
        </Col>
      </Row>
    </Container>
  )
}
export default ClientPage