import React,{useState,useEffect, useContext} from 'react'
import {Container, Row, Col, Dropdown, ButtonGroup, DropdownButton, Button} from "react-bootstrap"
import {LanguageContext} from "../Context/LanguageContext"
import { toast } from 'react-toastify'
const DtataDisplay=({globalState,setGlobal,Data,Orders,NewOrders})=>{
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
        {/* Page head */}
          <Row>
            <h3>{Data}</h3>
          </Row>
        {/* Page Content */}
          <Row>
            <Col xs={12}>
              <div style={{ maxWidth:'100%', overflow:"auto", border: "1px solid black" }}>
              <table border="1">
                  <thead>
                    <tr>
                      <th>{Language==="ar"?"رقم الطلب":"Order ID"}</th>
                      <th>{Language==="ar"?"تاريخ الطلب":"Order Date"}</th>
                      <th>{Language==="ar"?"رقم المنتج":"Product ID"}</th>
                      <th>{Language==="ar"?"اسم المنتج":"Product Title"}</th>
                      <th>{Language==="ar"?"سعر الوحده":"Unit Price"}</th>
                      <th>{Language==="ar"?"الكميه المطلوبه":"Ordered Quantity"}</th>
                      <th>{Language==="ar"?"تم التوصيل":"Delivered"}</th>
                    </tr>
                  </thead>
                 <tbody>
                  {Array.isArray(NewOrders) && NewOrders.length>0? 
                  NewOrders.map((item,index)=>(<tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.OrderedDate.split("-")[2].split("T")[0]}/{item.OrderedDate.split("-")[1]}/{item.OrderedDate.split("-")[0]}</td>
                    <td>{item.OrderedItems.map((SubItem)=>(<div key={SubItem.ID}><a href={`/ProductDetails/${SubItem.ID.toString()}`}>{SubItem.ID}</a></div>))}</td>
                    <td>{item.OrderedItems.map((SubItem)=>(<div key={SubItem.ID}>{SubItem.ProductTitle}</div>))}</td>
                    <td>{item.OrderedItems.map(SubItem=>(<div key={SubItem.ProductUnitPrice}>{SubItem.ProductUnitPrice}</div>))}</td>
                    <td>{item.OrderedItems.map(SubItem=>(<div key={SubItem.ID}>{SubItem.Qty}</div>))}</td>
                    <td>{item.OrderedPaymentMethod==="Vodafone Cash"&& item.OrderPayed===false ?Language==="ar"?"بانتظار الدفع ":"Waiting payment":item.OrderDelivered===false?Language==="ar"?"جاري التوصيل ":"On the way":Language==="ar"?"تم التوصيل":"Delivered"}</td>
                    </tr>)):(<tr><td>No Data</td></tr>)}
                 </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      )     
    }else if(Data==="جميع الطلبات"|| Data==="All Orders") {
      return(
        <Container>
        {/* Page head */}
          <Row>
            <h3>{Data}</h3>
          </Row>
        {/* Page Content */}
          <Row>
            <Col xs={12}>
              <div style={{ maxWidth:'100%', overflow:"auto", border: "1px solid black" }}>
              <table border="1">
                  <thead>
                    <tr>
                      <th>{Language==="ar"?"رقم الطلب":"Order ID"}</th>
                      <th>{Language==="ar"?"تاريخ الطلب":"Order Date"}</th>
                      <th>{Language==="ar"?"رقم المنتج":"Product ID"}</th>
                      <th>{Language==="ar"?"اسم المنتج":"Product Title"}</th>
                      <th>{Language==="ar"?"سعر الوحده":"Unit Price"}</th>
                      <th>{Language==="ar"?"الكميه المطلوبه":"Ordered Quantity"}</th>
                      <th>{Language==="ar"?"تم التوصيل":"Delivered"}</th>
                    </tr>
                  </thead>
                 <tbody>
                  {Array.isArray(Orders) && Orders.length>0? 
                  Orders.map((item,index)=>(<tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.OrderedDate.split("-")[2].split("T")[0]}/{item.OrderedDate.split("-")[1]}/{item.OrderedDate.split("-")[0]}</td>
                    <td>{item.OrderedItems.map((SubItem)=>(<div key={SubItem.ID}><a href={`/ProductDetails/${SubItem.ID.toString()}`}>{SubItem.ID}</a></div>))}</td>
                    <td>{item.OrderedItems.map((SubItem)=>(<div key={SubItem.ID}>{SubItem.ProductTitle}</div>))}</td>
                    <td>{item.OrderedItems.map(SubItem=>(<div key={SubItem.ProductUnitPrice}>{SubItem.ProductUnitPrice}</div>))}</td>
                    <td>{item.OrderedItems.map(SubItem=>(<div key={SubItem.ID}>{SubItem.Qty}</div>))}</td>
                    <td>{item.OrderedPaymentMethod==="Vodafone Cash"&& item.OrderPayed===false ?Language==="ar"?"بانتظار الدفع ":"Waiting payment":item.OrderDelivered===false?Language==="ar"?"جاري التوصيل ":"On the way":Language==="ar"?"تم التوصيل":"Delivered"}</td>
                    </tr>)):(<tr><td>No Data</td></tr>)}
                 </tbody>
                </table>
              </div>
            </Col>
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
  const [NewOrders,SetNewOrders]=useState([]) // this will be used to store all NewOrders of User
  const [Orders,SetOrders]=useState([]) // this will be used to store all Orders of User
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
        <Dropdown className=' d-inline-block w-100 mb-1' size={{xs:"lg",md:"sm"}}>
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
        <Dropdown className=' d-inline-block w-100 mb-1' size={{xs:"lg",md:"sm"}}>
      <Dropdown.Toggle className=' d-inline-block w-100 text-start ps-0' variant="success" id="dropdown-basic">
        {Language==="ar"?"طلبات الشراء":"Orders"}
      </Dropdown.Toggle>

      <Dropdown.Menu className=' w-100'>
        <Dropdown.Item as={Button}
        onClick={async (e)=>{
          e.stopPropagation()
          
          try {
            SetData(e.target.innerText)
            e.target.parentElement.parentElement.children[0].click()
            console.log(e.target.innerText);
            if (Orders.length===0) {
              toast.info(Language==="ar"?"برجاء الانتظار جاري تحميل البيانات ":"Please wait while we get Your Orders")
              const MerchantCredentials={
                Email:globalState.Email,
                Name:globalState.Name,
                Token:globalState.Token
              }
              console.log(MerchantCredentials)
              const GetMerchantOrders=await fetch(
                "http://localhost:5000/Users/OrdersList",
                {
                  method: "post",
                  body: JSON.stringify(MerchantCredentials),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  mode: "cors",
                }
              ).then((res)=>{
                return res.json()
              }).catch(err=>{
                console.log(err)
                toast.error(err.toString(),{autoClose:false})
              })
              if (typeof GetMerchantOrders==="object" && GetMerchantOrders.resp && Array.isArray(GetMerchantOrders.resp)) {
                toast.success("Done!")
                SetOrders(GetMerchantOrders.resp)
                SetNewOrders(GetMerchantOrders.resp.filter((item)=>{
                  if (item.OrderDelivered===false) {
                    return item
                  }
                }))
                console.log(GetMerchantOrders.resp)
              }else{
                toast.error(GetMerchantOrders,{autoClose:false})
              }
            }
          } catch (error) {
            toast.error(error.toString(),{autoClose:false})
          }
        }}>{Language==="ar"?"الطلبات الجديده":"New Orders"}</Dropdown.Item>
        <Dropdown.Item as={Button}
        onClick={async (e)=>{
          e.stopPropagation()
          
          try {
            SetData(e.target.innerText)
            e.target.parentElement.parentElement.children[0].click()
            console.log(e.target.innerText);
            if (Orders.length===0) {
              toast.info(Language==="ar"?"برجاء الانتظار جاري تحميل البيانات ":"Please wait while we get Your Orders")
              const MerchantCredentials={
                Email:globalState.Email,
                Name:globalState.Name,
                Token:globalState.Token
              }
              console.log(MerchantCredentials)
              const GetMerchantOrders=await fetch(
                "http://localhost:5000/Users/OrdersList",
                {
                  method: "post",
                  body: JSON.stringify(MerchantCredentials),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  mode: "cors",
                }
              ).then((res)=>{
                return res.json()
              }).catch(err=>{
                console.log(err)
                toast.error(err.toString(),{autoClose:false})
              })
              if (typeof GetMerchantOrders==="object" && GetMerchantOrders.resp && Array.isArray(GetMerchantOrders.resp)) {
                toast.success("Done!")
                SetOrders(GetMerchantOrders.resp)
                SetNewOrders(GetMerchantOrders.resp.filter((item)=>{
                  if (item.OrderDelivered===false) {
                    return item
                  }
                }))
                console.log(GetMerchantOrders.resp)
              }else{
                toast.error(GetMerchantOrders,{autoClose:false})
              }
            }
          } catch (error) {
            toast.error(error.toString(),{autoClose:false})
          }
        }}>{Language==="ar"?"جميع الطلبات":"All Orders"}</Dropdown.Item>
      </Dropdown.Menu>
        </Dropdown>
    
        </Col>
        {/* the following Col will display the data after merchant select option from side menu */}
        <Col xs={12} md={10}>
        <DtataDisplay globalState={globalState} setGlobal={setGlobal} Data={Data} Orders={Orders} NewOrders={NewOrders}  />
        </Col>
      </Row>
    </Container>
  )
}
export default ClientPage