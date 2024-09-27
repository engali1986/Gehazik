import React,{useState,useEffect, useContext} from 'react'
import {Container, Row, Col, Dropdown, ButtonGroup, DropdownButton, Button} from "react-bootstrap"
import {LanguageContext} from "../Context/LanguageContext"
import { toast } from 'react-toastify'
const DtataDisplay=({globalState,setGlobal,Data,Orders,NewOrders, SetOrders})=>{
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
  const [CancelOrder,SetcancelOrder]=useState(null)
  const [CancelReason,SetCancelReason]=useState("")

  
  
 
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
                        "https://gehazik-server.onrender.com/Users/ChangePassword",
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
                      <th>{Language==="ar"?"حالة الطلب":"Status"}</th>
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
                    <td>{item.OrderStatus[item.OrderStatus.length-1].Status==="Waiting Payment"?Language==="ar"?"بانتظار الدفع":"Waiting Payment":item.OrderStatus[item.OrderStatus.length-1].Status==="Cancelled"?Language==="ar"?"تم الغاؤه":"Cancelled":item.OrderStatus[item.OrderStatus.length-1].Status==="On the way"?Language==="ar"?"جاري التوصيل":"On the way":Language==="ar"?"تم التوصيل":"Delivered"}</td>
                    </tr>)):(<tr><td>No Data</td></tr>)}
                 </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      )     
    }else if(Data==="الغاء طلب"|| Data==="Cancel Order") {
      return(
        <Container>
          <Row>
          <h3>{Data}</h3>
          </Row >
          <Row>
          <h4 className=" border-2 border-bottom">{Language==="ar"?"يرجى العلم انه يمكن فقط الغاء الطلبات اللتي لم يمر عليها اكثر من 24 ساعه ":"Please note you can only cancel orders that hase been ordered 24 hours earlier"}</h4>
          </Row>
          <Row>
            <div className='d-flex flex-row justify-content-start align-items-center flex-wrap'>
            <div className=' d-inline-block flex-fill'>
             <h4>{Language==="ar"?"برجاء تحديد الطلب المطلوب الغاؤه":"Please select order to cancel"}</h4>
            </div>
            <div className=' d-inline-block flex-fill'>
            <select onClick={(e)=>{
              e.stopPropagation(e)
              console.log("Selecting Order")
              if(e.target.value.length>0){
                console.log("Select first Order")
                let Order=Orders.find((order)=>order._id.toString()===e.target.value)
                SetcancelOrder(Order)
                console.log(CancelOrder)
              }
            }} onChange={(e)=>{
              console.log("OrderSelected")
              let Order=Orders.find((order)=>
                order._id.toString()===e.target.value
              )
              SetcancelOrder(Order)
              console.log(Order)
            }}>
              {Array.isArray(Orders)?Orders.map(item=>(
                new Date().getTime()-new Date(item.OrderedDate).getTime()<=86400000?<option key={item._id}>{item._id}</option>:""
              )):""}
            </select>
            </div>
            </div> 
          </Row>
         <Row className=' align-items-center'>
          <Col className=' mb-2' style={{overflow:'auto'}} xs={12}>
          <table border="1" style={{minWidth:'100%'}}>
                  <thead>
                    <tr>
                      <th>{Language==="ar"?"رقم الطلب":"Order ID"}</th>
                      <th>{Language==="ar"?"تاريخ الطلب":"Order Date"}</th>
                      <th>{Language==="ar"?"رقم المنتج":"Product ID"}</th>
                      <th>{Language==="ar"?"اسم المنتج":"Product Title"}</th>
                      <th>{Language==="ar"?"سعر الوحده":"Unit Price"}</th>
                      <th>{Language==="ar"?"الكميه المطلوبه":"Ordered Quantity"}</th>
                      <th>{Language==="ar"?"قيمه الطلب":"Order Value"}</th>
                      <th>{Language==="ar"?"حالة الطلب":"Status"}</th>
                    </tr>
                  </thead>
                 <tbody>
                  
                    {CancelOrder!==null?(<tr>
                      <td>{CancelOrder._id}</td>
                      <td>{new Date(CancelOrder.OrderedDate).toLocaleDateString("en-GB")}</td>
                      <td>{Array.isArray(CancelOrder.OrderedItems)?CancelOrder.OrderedItems.map(item=>(
                        <div key={item.ID}>{item.ID}</div>
                      )):""}</td>
                      <td>
                        {Array.isArray(CancelOrder.OrderedItems)?CancelOrder.OrderedItems.map((item)=>(
                          <div key={item.ProductTitle}>{item.ProductTitle}</div>
                        )):""}
                      </td>
                      <td>
                        {Array.isArray(CancelOrder.OrderedItems)?CancelOrder.OrderedItems.map((item)=>(
                          <div key={item.ProductUnitPrice}>{item.ProductUnitPrice}</div>
                        )):""}
                      </td>
                      <td>
                        {Array.isArray(CancelOrder.OrderedItems)?CancelOrder.OrderedItems.map((item)=>(
                          <div key={item.Qty}>{item.Qty}</div>
                        )):""}
                      </td>
                      <td>
                        {CancelOrder.OrderedValue}
                      </td>
                      <td>{CancelOrder.OrderedPaymentMethod==="Vodafone Cash"&& CancelOrder.OrderPayed===false ?Language==="ar"?"بانتظار الدفع ":"Waiting payment":CancelOrder.OrderDelivered===false?Language==="ar"?"جاري التوصيل ":"On the way":Language==="ar"?"تم التوصيل":"Delivered"}</td>
                      </tr>):<tr><td></td></tr>}
                  
                  
                 </tbody>
                </table>
          </Col>
          <Col xs={12} >
          <textarea  onChange={(e)=>{
            SetCancelReason(e.target.value)
          }} placeholder={Language==="ar"?"برجاء تحديد سبب الرفض ( اختياري )":"Please advice cancel reason (optional)"} style={{width:'100%'}}>

          </textarea>
          </Col>
          <Col xs={12}>
          <button onClick={async(e)=>{
            e.stopPropagation()
            console.log(CancelOrder)
           
            try {
              if (CancelOrder!==null && CancelOrder._id) {
                let CancelData={
                  Reason:CancelReason,
                  OrderId:CancelOrder._id,
                  Name:globalState.Name,
                  Email:globalState.Email,
                  Token:globalState.Token
                }
                e.target.disabled=true
                e.target.innerText=Language==="ar"?"برجاء الانتظار":"Please wait"
                console.log(CancelData)
                const DeleteOrder=await fetch(
                  "https://gehazik-server.onrender.com/Orders/DeleteOrder",
                  {
                    method: "post",
                    body: JSON.stringify(CancelData),
                    headers: {
                      "Content-Type": "application/json",
                    },
                    mode: "cors",
                  }
                ).then((res=>{
                  console.log(res)
                  return res.json()
                })).catch(err=>{
                  console.log(err)
                  return "Internal Error"
                })
                console.log(DeleteOrder)

                if (DeleteOrder.resp==="Order Deleted Successfully") {
                  let Arr=Orders.forEach(item => {
                    if (item._id.toString()!==CancelOrder._id) {
                      item.OrderStatus.push({Status:"Cancelled",Date:new Date(),Reason:CancelData.Reason})
                      
                    }
                    
                  });

                  // let Arr=Orders.filter((item)=>{
                  //   if (item._id.toString()!==CancelOrder._id) {
                  //     return item 
                  //   }
                    
                    
                  // })
                  SetOrders(Arr)
                  SetcancelOrder(null)
                  console.log(Orders)
                  e.target.disabled=false
                  e.target.innerText=Language==="ar"?"الغاء":"Cancel"
                  toast.success(Language==="ar"?"تم الغاء الطلب بنجاح":"Order cancelled suucessfully")

                } else {
                  e.target.disabled=false
                  e.target.innerText=Language==="ar"?"الغاء":"Cancel"
                  console.log(DeleteOrder)
                  toast.error(Language==="ar"?"لم يتم الغاء الطلب برجاء اعاده المحاوله لاحقا":"Order not cancelled Please try again later")
                  
                }
              } else {
                toast.warning(Language==="ar"?"برجاء اختيار الطلب المراد الغاؤه":"Please select order")
                e.target.disabled=false
                e.target.innerText=Language==="ar"?"الغاء":"Cancel"
                
              }
              
            } catch (error) {
              toast.error(error.toString())
            }
          }} className='SignUpButton mb-2 mt-0'>
            {Language==="ar"?"الغاء":"Cancel"}
          </button>
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
                "https://gehazik-server.onrender.com/Users/OrdersList",
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
                  if (item.OrderStatus[item.OrderStatus.length-1].Status==="Waiting Payment"||item.OrderStatus[item.OrderStatus.length-1].Status==="On the way") {
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
                "https://gehazik-server.onrender.com/Users/OrdersList",
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
                  if (item.OrderStatus[item.OrderStatus.length-1].Status==="Waiting Payment"||item.OrderStatus[item.OrderStatus.length-1].Status==="On the way") {
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
                  "https://gehazik-server.onrender.com/Users/OrdersList",
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
                    if (item.OrderStatus[item.OrderStatus.length-1].Status==="Waiting Payment"||item.OrderStatus[item.OrderStatus.length-1].Status==="On the way") {
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
          }}>{Language==="ar"?"الغاء طلب":"Cancel Order"}</Dropdown.Item>
      </Dropdown.Menu>
        </Dropdown>
    
        </Col>
        {/* the following Col will display the data after merchant select option from side menu */}
        <Col xs={12} md={10}>
        <DtataDisplay globalState={globalState} setGlobal={setGlobal} Data={Data} Orders={Orders} NewOrders={NewOrders} SetOrders={SetOrders}  />
        </Col>
      </Row>
    </Container>
  )
}
export default ClientPage