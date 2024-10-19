import React, { useEffect, useState, useRef,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col,Button } from "react-bootstrap";
import StaticData from "../Data/StaticData.js";
import {toast} from "react-toastify"
import { LanguageContext } from "../Context/LanguageContext.js"

// This will be merchant page for merchant controls
const MerchantPage = ({ globalState, setGlobal }) => {
  const Navigate=useNavigate()
  const {Language,SetLanguage}=useContext(LanguageContext)
  const [ShowAlert, SetShowAlert] = useState({
    Success: false,
    Show: false,
    Massage: "",
  });
  const [Data, SetData] = useState(""); // this state will be used to store the selected menu items to display data
  const [NewOrders,SetNewOrders]=useState([]) // this will be used to store all NewOrders of merchant
  const [Orders,SetOrders]=useState([]) // this will be used to store all Orders of merchant
  const [RecievedPayments,SetRecievedPayments]=useState([]) // This will be used to store all Recieved payments of merchant
  const [AllPayments,SetAllPayments]=useState([]) // This will be used to store all All Payments of merchant
  const [ProductsList, SetProductsList] = useState([]); // this will be used to store all products of merchant
  const [UpdateProductsList, SetUpdateProductsList] = useState([]); // Removed from inside DataDisplay component to save product updates
  const [UpdateProduct, SetUpdateProduct] = useState({
    UpdateProductID: "",
    UpdateProductUnitPrice: 0,
    UpdateProductInStockQty: 0,
  });
 
  
  const navigate = useNavigate();
  const params = useParams();
  // The following function will be used to calculate payment for each order
  const PaymentOrderValue=({Ordered})=>{
    let x=0
    for (let index = 0; index < Ordered.length; index++) {
      let y=Ordered[index].Qty*Ordered[index].ProductUnitPrice
      x=x+y
    }
    return x.toString()
  }
  // The following function will be used to mange Product Options
  const ProductOptions=({AddProductData,SetAddProductData})=>{
    const addOption = () => {
      if (AddProductData.ProductOptions.length===0) {
        let NewArr=[...AddProductData.ProductOptions]
       console.log(AddProductData)
       console.log(AddProductData.ProductOptions)
       console.log(NewArr)
       NewArr.push({ Color: StaticData.Colors[0].Name, Size: '', Qty:0, OrderedQty:0 })
       SetAddProductData({...AddProductData,ProductOptions:NewArr });
        
      } else {
        if (AddProductData.ProductOptions[AddProductData.ProductOptions.length-1].Color.length===0 || AddProductData.ProductOptions[AddProductData.ProductOptions.length-1].Size.length===0 || AddProductData.ProductOptions[AddProductData.ProductOptions.length-1].Qty===0) {
          toast.error(Language==="ar"?"برجاء اضافه اللون والمقاس و العدد":"Please add color, size and qty")
        } else {
         let NewArr=[...AddProductData.ProductOptions]
         console.log(AddProductData)
         console.log(AddProductData.ProductOptions)
         console.log(NewArr)
         NewArr.push({ Color: StaticData.Colors[0].Name, Hex:StaticData.Colors[0].Hex, Size: '', Qty:0, OrderedQty:0 })
         SetAddProductData({...AddProductData,ProductOptions:NewArr });
        }
        
      }
      
      
    };
    const handleOptionChange = (index, field, value) => {
      if (field==="Qty") {
        if (Number.isInteger(parseInt(value,10)) && parseInt(value,10)>0) {
          const NewOptions = [...AddProductData.ProductOptions];
          NewOptions[index][field] = parseInt(value,10);
          SetAddProductData({...AddProductData,ProductOptions:NewOptions});
        } else {
          toast.error(Language==="ar"?"يجب ان تكون العدد رقم صحيح اكبر من صفر":"Qty must be integer >0")
          const NewOptions = [...AddProductData.ProductOptions];
          NewOptions[index][field] = 0;
          SetAddProductData({...AddProductData,ProductOptions:NewOptions});
        }
        
      } else {
        if (field==="Color") {
          console.log("Changing Color")
          let hex=""
          for (let index = 0; index < StaticData.Colors.length; index++) {
            if(StaticData.Colors[index].Name===value){
              hex=StaticData.Colors[index].Hex
              break;
            }  
          }
          const NewOptions = [...AddProductData.ProductOptions];
          NewOptions[index]["Color"] = value;
          NewOptions[index]["Hex"] = hex;
          SetAddProductData({...AddProductData,ProductOptions:NewOptions});  
        } else {
          const NewOptions = [...AddProductData.ProductOptions];
          NewOptions[index][field] = value;
          SetAddProductData({...AddProductData,ProductOptions:NewOptions}); 
        } 
      }
    };
    const removeOption = (index) => {
      const NewOptions = [...AddProductData.ProductOptions];
      NewOptions.splice(index, 1);
      SetAddProductData({...AddProductData,ProductOptions:NewOptions});
    };
  
    return(
      <Row className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}>
        <Col xs={12}>
        <Row>
        <Col onClick={(e)=>{
          e.stopPropagation()
          console.log(AddProductData)
        }} xs={8} md={10}style={{ color: "white" }} >
              {Language==="ar"?"برجاء اضافه خيارات المنتج":"Please add product options"}
              </Col>
              <Col xs={4} md={2} style={{ color: "white" }} >
              <Button variant="success" onClick={addOption} >
              {Language==="ar"?"أضافه":"Add"}
              </Button>
              </Col>
        </Row>
        {AddProductData.ProductOptions.length>0?AddProductData.ProductOptions.map((option, index) => (
        <Row key={index} className="mt-3 align-items-center">
          
          <Col>
          <div style={{color:'white'}}>
            {Language==="ar"?"اختر اللون":"Color"}
          </div>
          <select onChange={(e)=>{
            let Color
            for (let index = 0; index < StaticData.Colors.length; index++) {
              if (StaticData.Colors[index].Name===e.target.value) {
                Color=StaticData.Colors[index].Hex
                break;
              } else {
                
              }
              
            }
            e.target.style.backgroundColor=Color
            handleOptionChange(index, 'Color', e.target.value)
          }} key={index} style={{width:'100%', backgroundColor:StaticData.Colors[0].Hex}} >
            {StaticData.Colors.map(item=>(
              <option style={{color:item.Hex, backgroundColor:item.Hex}}  key={item.Name}>
                {item.Name}
              </option>
            ))}
          </select>
            
          </Col>
          <Col>
            <input style={{width:'100%'}}
              type="text"
              placeholder={Language==="ar"?"المقاس":"Size"}
              
              onChange={(e) => handleOptionChange(index, 'Size', e.target.value)}
            />
          </Col>
          <Col>
            <input

              type="number"
              style={{width:'100%'}}
              placeholder={Language==="ar"?"الكميه":"Qty"}
              
              onChange={(e) => handleOptionChange(index, 'Qty', e.target.value)}
            />
          </Col>
          <Col>
            <Button variant="danger" onClick={() => removeOption(index)}>
              Remove
            </Button>
          </Col>
        </Row>
      )):""}
        
        </Col>
      </Row>
    )
  }
  // The following function will be used to display Data inside page
  const DtataDisplay = () => {
    const [ChangePasswordData,SetChangePasswordData]=useState({
      Name:globalState.Name,
      Email:globalState.Email,
      Token:globalState.Token,
      OldPassword:"",
      NewPassword:"",
      ConfirmNewPassword:"",
      User:globalState.Merchant===true?"Merchant":""
    })
    // const [ShowAlert, SetShowAlert] = useState({
    //   Success: false,
    //   Show: false,
    //   Massage: "",
    // });
    const [ProductImageFiles, SetProductImageFiles] = useState([]);
    const [AddProductData, SetAddProductData] = useState({
      ProductCategory: "",
      ProductSubCategory: "",
      ProductFeature: "",
      ProductQtyUnit: "",
      ProductUnitPrice: 0,
      ProductTitle: "",
      ProductOptions:[],
      ProductAdditionalFeatures: [],
      Token: globalState.Token,
      Name: globalState.Name,
      Email: globalState.Email,
      EgyptDelivery:true,
      GovernorateDelivery:true,
      CityDelivery:true
    });
    const [editProductId, setEditProductId] = useState(null);
    // const [UpdateProduct, SetUpdateProduct] = useState({
    //   UpdateProductID: "",
    //   UpdateProductUnitPrice: 0,
    //   UpdateProductInStockQty: 0,
    // });
    const [Disabled, SetDisabled] = useState(false);
    const ProductTitle = useRef();
    const Alert = useRef();
    const LoginButtonRef = useRef();
    const PasswordValue=useRef()
    //  AddProduct function will be initiated when user clicks on Add Product button to add products to data base
    const AddProduct = async (e) => {
      e.stopPropagation();
      console.log("Adding new product");
      console.log(AddProductData);
      SetDisabled(true);
      // Next we will check for any missing data
      let Keyes = Object.keys(AddProductData);
      console.log(Keyes);
      let ProductDataChecked = false;
      for (let index = 0; index < Keyes.length; index++) {
        if (
          AddProductData[Keyes[index]] === "" ||
          AddProductData[Keyes[index]] === 0 
        ) {
          console.log("Product not added " + Keyes[index]);
          Alert.current.classList.replace("alert-success", "alert-danger");
          Alert.current.innerText = "Please add " + Keyes[index];
          Alert.current.style.maxHeight = "500px";
          SetDisabled(false);
          ProductDataChecked = false;
          break;
        } else {
          ProductDataChecked = true;
        }
      }
      if (ProductDataChecked === true && AddProductData.ProductOptions.length>0) {
        let ProductOptionsCheck=false
        for (let index = 0; index < AddProductData.ProductOptions.length; index++) {
          if (Number.isInteger(AddProductData.ProductOptions[index].Qty)  &&AddProductData.ProductOptions[index].Qty>0 && AddProductData.ProductOptions[index].Size.length>0 && AddProductData.ProductOptions[index].Color.length>0 ) {
            ProductOptionsCheck=true
          } else {
            ProductOptionsCheck=false 
            break;
          }
          
        }
        if (ProductOptionsCheck===true) {
          if (AddProductData.CityDelivery===true || AddProductData.GovernorateDelivery===true || AddProductData.EgyptDelivery===true) {
            if (ProductImageFiles.length > 0) {
              const formData = new FormData();
              formData.append("Data", JSON.stringify(AddProductData));
              ProductImageFiles.forEach((file) => {
                formData.append("Files", file);
              });
              console.log(formData);
             
              console.log(AddProductData)
              console.log("Submitting data");
              const ProductAdded = await fetch(
                "https://gehazik-server.onrender.com/Merchants/AddProduct",
                {
                  method: "POST",
                  body: formData,
    
                  mode: "cors",
                }
              )
                .then((res) => {
                  console.log(res);
                  SetDisabled(false);
                  return res.json();
                })
                .catch((err) => {
                  console.log(err);
                  SetDisabled(false);
                });
    
              console.log(ProductAdded);
              Alert.current.classList.replace("alert-danger", "alert-success");
              Alert.current.innerText = ProductAdded.resp;
              Alert.current.style.maxHeight = "500px";
              SetDisabled(false);
            } else {
              Alert.current.classList.replace("alert-success", "alert-danger");
              Alert.current.innerText =Language==="ar"?"برجاء اضافه صور للمنتج":"Please add product image";
              Alert.current.style.maxHeight = "500px";
              SetDisabled(false);
            }
            
          } else {
            console.log(AddProductData)
            Alert.current.classList.replace("alert-success", "alert-danger");
            Alert.current.innerText = Language==="ar"?"برجاء تحديد خيارات التوصيل":"Please select Delivery option ";
            Alert.current.style.maxHeight = "500px";
            SetDisabled(false);
            ProductDataChecked = false;
            
          }
        } else {
          console.log("Product not added ");
          toast.error(Language==="ar"?"برجاء اضافه خيارات المنتج":"Please add product Options")
          SetDisabled(false);
          ProductDataChecked = false;
          ProductOptionsCheck=false
          
        }
        
        
      } else {

        console.log("Product not added ");
          toast.error(Language==="ar"?"برجاء اضافه خيارات المنتج":"Please add product Options")
          SetDisabled(false);
          ProductDataChecked = false;
      }
    };
    // will be used to list sub Categories in addProduct section
    const Subcategories = () => {
      for (
        let index = 0;
        index < StaticData.ProductCategories.length;
        index++
      ) {
        if (
          Object.keys(StaticData.ProductCategories[index])[0].replace(
            /_/g,
            " "
          ) === AddProductData.ProductCategory
        ) {
          console.log("ProductCategory found");
          console.log(Object.keys(StaticData.ProductCategories[index])[0]);
          let Arr = StaticData.ProductCategories[index];
          console.log(Arr);
          console.log(Arr[Object.keys(StaticData.ProductCategories[index])[0]]);
          let Arr2 = Arr[Object.keys(StaticData.ProductCategories[index])[0]];
          console.log(Arr2.length);
          const Arr3 = [];
          for (let index = 0; index < Arr2.length; index++) {
            console.log(Object.keys(Arr2[index])[0]);
            Arr3.push(Object.keys(Arr2[index])[0]);
          }
          return Arr3.map((item) => (
            <option key={item.replace(/_/g, " ")}>
              {item.replace(/_/g, " ")}
            </option>
          ));
        } else {
        }
      }
    };
    // Will be used to list Features in add product section
    const Features = () => {
      console.log(AddProductData);
      for (
        let index = 0;
        index < StaticData.ProductCategories.length;
        index++
      ) {
        if (
          Object.keys(StaticData.ProductCategories[index])[0].replace(
            /_/g,
            " "
          ) === AddProductData.ProductCategory
        ) {
          console.log(Object.keys(StaticData.ProductCategories[index])[0]);
          console.log(
            StaticData.ProductCategories[index][
              Object.keys(StaticData.ProductCategories[index])[0]
            ]
          );
          let arr =
            StaticData.ProductCategories[index][
              Object.keys(StaticData.ProductCategories[index])[0]
            ];
          console.log(arr);
          console.log(arr.length);
          for (let index = 0; index < arr.length; index++) {
            console.log(arr[index][Object.keys(arr[index])[0]]);
            console.log(Object.keys(arr[index])[0]);
            if (
              Object.keys(arr[index])[0].replace(/_/g, " ") ===
              AddProductData.ProductSubCategory
            ) {
              console.log(arr[index][Object.keys(arr[index])[0]]);
              let FeaturesArr = arr[index][Object.keys(arr[index])[0]];
              console.log(FeaturesArr);
              console.log(FeaturesArr.length);
              return FeaturesArr.map((item) => (
                <option key={item}>{item}</option>
              ));
            } else {
            }
          }
        } else {
        }
      }
    };
    useEffect(() => {
      console.log(UpdateProductsList);
    }, [UpdateProductsList]);
    if (Data === "تغيير كلمة المرور"||Data==="Change Password") {
      return (
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
                        "https://gehazik-server.onrender.com/Merchants/ChangePassword",
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
                          toast.error("Password Not Updated")
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
                  toast.error("Internal Error")
                  e.target.disabled=false
                  e.target.innerText=Language==="ar"?"تاكيد":"confirm"
                }
              }} style={{ width: "100%" }}>
                {Language==="ar"?"تاكيد":"confirm"}
              </button>
            </Col>
          </Row>
        </Container>
      );
    } else if (Data === "الطلبات الجديده"||Data==="New Orders") {
      return (
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
                      <th>{Language==="ar"?"رقم المنتج":"Product ID"}</th>
                      <th>{Language==="ar"?"اسم المنتج":"Product Title"}</th>
                      <th>{Language==="ar"?"سعر القطعه":"Unit Price"}</th>
                      <th>{Language==="ar"?"الكميه المطلوبه":"Ordered Quantity"}</th>
                      <th>{Language==="ar"?"حالة الطلب":"Status"}</th>
                    </tr>
                  </thead>
                 <tbody>
                  {Array.isArray(NewOrders) && NewOrders.length>0? 
                  NewOrders.map((item,index)=>(<tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.OrderedItems.map((SubItem)=>(<div key={SubItem.ID}><a href={`/ProductDetails/${SubItem.ID.toString()}`}>{SubItem.ID}</a></div>))}</td>
                    <td>{item.OrderedItems.map((SubItem)=>(<div key={SubItem.ID}>{SubItem.ProductTitle}</div>))}</td>
                    <td>{item.OrderedItems.map(SubItem=>(<div key={SubItem.ProductUnitPrice}>{SubItem.ProductUnitPrice}</div>))}</td>
                    <td>{item.OrderedItems.map(SubItem=>(<div key={SubItem.ID}>{SubItem.Qty}</div>))}</td>
                    <td>{item.OrderStatus[item.OrderStatus.length-1].Status}</td>
                    </tr>)):(<tr><td>{Language==="ar"?"لا توجد طلبات":"No Data"}</td></tr>)}
                 </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else if (Data === "جميع الطلبات"||Data==="All Orders") {
      return (
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
                      <th>{Language==="ar"?"رقم المنتج":"Product ID"}</th>
                      <th>{Language==="ar"?"اسم المنتج":"Product Title"}</th>
                      <th>{Language==="ar"?"سعر القطعه":"Unit Price"}</th>
                      <th>{Language==="ar"?"الكميه المطلوبه":"Ordered Quantity"}</th>
                      <th>{Language==="ar"?"حالة الطلب":"Status"}</th>
                      <th>{Language==="ar"?"تم الدفع":"Payment Released"}</th>
                      <th>{Language==="ar"?"تم اكمال الطلب":"Order Completed"}</th>
                    </tr>
                  </thead>
                 <tbody>
                  {Array.isArray(Orders) && Orders.length>0? 
                  Orders.map((item,index)=>(<tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.OrderedItems.map((SubItem)=>(<div key={SubItem.ID}><a href={`/ProductDetails/${SubItem.ID.toString()}`}>{SubItem.ID}</a></div>))}</td>
                    <td>{item.OrderedItems.map((SubItem)=>(<div key={SubItem.ID}>{SubItem.ProductTitle}</div>))}</td>
                    <td>{item.OrderedItems.map(SubItem=>(<div key={SubItem.ProductUnitPrice}>{SubItem.ProductUnitPrice}</div>))}</td>
                    <td>{item.OrderedItems.map(SubItem=>(<div key={SubItem.ID}>{SubItem.Qty}</div>))}</td>
                    <td>{item.OrderStatus[item.OrderStatus.length-1].Status}</td>
                    <td>{item.MerchantPaymentSent.toString()}</td>
                    <td>{item.OrderCompleted.toString()}</td>
                    </tr>)):(<tr><td>No Data</td></tr>)}
                 </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      ); 
      
    } else if (Data === "جميع المنتجات"||Data==="All Products") {
      return (
        <Container>
          <Row>
            <h3
              onClick={(e) => {
                e.stopPropagation();
                console.log(ProductsList);
                console.log(ProductsList.length);
              }}
            >
              {Data}
            </h3>
          </Row>
          <Row>
            <Col xs={12}>
              <div
                style={{
                  maxWidth: "100%",
                  overflow: "auto",
                  border: "1px solid black",
                }}
              >
                <table border="1">
                  <thead>
                    <tr>
                      <th>{Language==="ar"?"رقم المنتج":"Product ID"}</th>
                      <th>{Language==="ar"?"اسم المنتج":"Product Title"}</th>
                      <th>{Language==="ar"?"سعر القطعه":"Unit Price"}</th>
                      <th>{Language==="ar"?"المخزون":"In Stock Quantity"}</th>
                      <th>{Language==="ar"?"الكميه المطلوبه":"Ordered Quantity"}</th>
                      <th>{Language==="ar"?"تعديل":"Edit"}</th>
                      <th>{Language==="ar"?"تحديث":"Update"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ProductsList.map((product, index) => (
                      <tr
                        key={product._id}
                        data-id={product._id}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                          border: "1px solid black",
                        }}
                      >
                        <td><a href={`/ProductDetails/${product._id}`}>{product._id}</a></td>
                        <td>{product.ProductTitle}</td>
                        <td>
                          <input
                            type="number"
                            defaultValue={product.ProductUnitPrice}
                            disabled={editProductId !== product._id}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            defaultValue={product.InStockQty}
                            disabled={editProductId !== product._id}
                          />
                        </td>
                        <td>{product.OrderedQty}</td>
                        <td
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditProductId(product._id);
                          }}
                          style={{cursor:"pointer"}}
                        >
                          {Language==="ar"?"تعديل":"Edit"}
                        </td>
                        <td>
                          <button
                            disabled={editProductId !== product._id}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Updated");
                              SetShowAlert({
                                ...ShowAlert,
                                Show: false,
                                Success: false,
                              });
                              setEditProductId(null);
                              console.log(
                                e.target.parentElement.parentElement.children[0]
                                  .innerText
                              );
                              console.log(
                                e.target.parentElement.parentElement.children[3]
                                  .children[0].value
                              );
                              console.log(
                                parseInt(
                                  e.target.parentElement.parentElement
                                    .children[2].children[0].value,
                                  10
                                ) >= 0
                              );
                              if (
                                parseInt(
                                  e.target.parentElement.parentElement
                                    .children[2].children[0].value,
                                  10
                                ) >= 0 &&
                                parseInt(
                                  e.target.parentElement.parentElement
                                    .children[3].children[0].value,
                                  10
                                ) >= 0
                              ) {
                                console.log("Values updated");
                                console.log(UpdateProductsList)
                                if (UpdateProductsList.length === 0) {
                                  console.log(UpdateProductsList)
                                  const UpdatedProductObj = {
                                    UpdateProductID:
                                      e.target.parentElement.parentElement
                                        .children[0].innerText,
                                    UpdateProductInStockQty: parseInt(
                                      e.target.parentElement.parentElement
                                        .children[3].children[0].value,
                                      10
                                    ),
                                    UpdateProductUnitPrice: parseInt(
                                      e.target.parentElement.parentElement
                                        .children[2].children[0].value,
                                      10
                                    ),
                                  };
                                  SetUpdateProduct(UpdatedProductObj);
                                  SetUpdateProductsList((Perv) => [
                                    ...Perv,
                                    UpdatedProductObj,
                                  ]);
                                } else {
                                  console.log(UpdateProductsList)
                                  let Duplicate = false;
                                  for (
                                    let index = 0;
                                    index < UpdateProductsList.length;
                                    index++
                                  ) {
                                    if (
                                      UpdateProductsList[index]
                                        .UpdateProductID ===
                                      e.target.parentElement.parentElement
                                        .children[0].innerText
                                    ) {
                                      console.log("Duplicate found");
                                      console.log(UpdateProductsList);
                                      UpdateProductsList[
                                        index
                                      ].UpdateProductID =
                                        e.target.parentElement.parentElement.children[0].innerText;
                                      UpdateProductsList[
                                        index
                                      ].UpdateProductInStockQty = parseInt(
                                        e.target.parentElement.parentElement
                                          .children[3].children[0].value,
                                        10
                                      );
                                      UpdateProductsList[
                                        index
                                      ].UpdateProductUnitPrice = parseInt(
                                        e.target.parentElement.parentElement
                                          .children[2].children[0].value,
                                        10
                                      );
                                      Duplicate = true;
                                      break;
                                    } else {
                                    }
                                  }
                                  if (Duplicate === false) {
                                    const UpdatedProductObj = {
                                      UpdateProductID:
                                        e.target.parentElement.parentElement
                                          .children[0].innerText,
                                      UpdateProductInStockQty: parseInt(
                                        e.target.parentElement.parentElement
                                          .children[3].children[0].value,
                                        10
                                      ),
                                      UpdateProductUnitPrice: parseInt(
                                        e.target.parentElement.parentElement
                                          .children[2].children[0].value,
                                        10
                                      ),
                                    };
                                    SetUpdateProduct(UpdatedProductObj);
                                    SetUpdateProductsList((Perv) => [
                                      ...Perv,
                                      UpdatedProductObj,
                                    ]);
                                  }
                                }
                              } else {
                                console.log("Values Not updated");
                                SetShowAlert({
                                  ...ShowAlert,
                                  Show: true,
                                  Massage:
                                    "Please add integer positive numbers",
                                  Success: false,
                                });
                              }
                            }}
                            style={{
                              backgroundColor:
                                editProductId !== product._id
                                  ? "#cacbc9"
                                  : "#94f48c",
                            }}
                          >
                            {Language==="ar"?"تحديث":"Update"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  console.log(UpdateProductsList);
                  e.target.disabled = true;
                  e.target.innerText = "Please wait";
                  const MerchantCredentials = {
                    Name: globalState.Name,
                    Email: globalState.Email,
                    Token: globalState.Token,
                  };
                  const UploadProductListData = {
                    Credentials: MerchantCredentials,
                    UpdateData: UpdateProductsList,
                  };
                  console.log(UploadProductListData);
                  const UpdateProduct = await fetch(
                    "https://gehazik-server.onrender.com/Merchants/UpdateProduct",
                    {
                      method: "post",
                      body: JSON.stringify(UploadProductListData),
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
                      console.log(err)
                      return { resp:Language==="ar"?"حدث خطا برجاء المحاوله لاحقا":"Internal Error" };
                    });
                  console.log(UpdateProduct);
                  if (UpdateProduct.resp === "Products Updated Successfully") {
                    e.target.innerText = Language==="ar"?"تاكيد":"Confirm";
                    e.target.disabled = false;
                    SetShowAlert({
                      ...ShowAlert,
                      Massage: UpdateProduct.resp,
                      Success: true,
                      Show: true,
                    });
                    SetUpdateProductsList([])
                  } else {
                    e.target.disabled = false;
                    e.target.innerText = Language==="ar"?"تاكيد":"Confirm";
                    SetShowAlert({
                      ...ShowAlert,
                      Massage: UpdateProduct.resp,
                      Success: false,
                      Show: true,
                    });
                  }
                  setTimeout(() => {
                    SetShowAlert({
                      ...ShowAlert,
                      Success: false,
                      Show: false,
                    });
                  }, 3000);
                }}
                disabled={UpdateProductsList.length === 0 ? true : false}
                style={{
                  width: "100%",
                  backgroundColor:
                    UpdateProductsList.length === 0 ? "#cacbc9" : "#94f48c",
                }}
              >
                {Language==="ar"?"تاكيد":"Confirm"}
              </button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {ProductsList.length === 0 ? (
                <div
                ref={Alert}
                className={
                  ShowAlert.Success === false
                    ? " alert alert-danger text-start"
                    : " alert alert-success text-start"
                }
                style={{
                  boxSizing: "border-box",
                  marginBottom: "0",
                  width: "100%",
                  overflow: "hidden",
                  padding: "0px",
                  border: "0px",
                  maxHeight: ShowAlert.Show === true ? "500px" : "0px",
                  transition: "all 0.3s ease-in-out",
                }}
                role="alert"
              >
                {ShowAlert.Massage.length>0?ShowAlert.Massage:"Please wait"}
              </div>
              ) : (
                <div
                  ref={Alert}
                  className={
                    ShowAlert.Success === false
                      ? " alert alert-danger text-start"
                      : " alert alert-success text-start"
                  }
                  style={{
                    boxSizing: "border-box",
                    marginBottom: "0",
                    width: "100%",
                    overflow: "hidden",
                    padding: "0px",
                    border: "0px",
                    maxHeight: ShowAlert.Show === true ? "500px" : "0px",
                    transition: "all 0.3s ease-in-out",
                  }}
                  role="alert"
                >
                  {ShowAlert.Massage}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      );
    } else if (Data === "اضافه منتج"||Data==="Add Products") {
      return (
        <Container style={{ backgroundColor: "gray" }}>
          <Row>
            <h3
              onClick={(e) => {
                e.stopPropagation();
                console.log(StaticData.ProductCategories.length);
                console.log(AddProductData);
                console.log(ProductImageFiles);
                let ard = ["aa", "bb", "cc"];
                for (const item of ard) {
                  console.log(item);
                }
                let brd = { a: "aa", b: "bb" };
                for (const key in brd) {
                  console.log(brd[key]);
                }
              }}
            >
              {Data}
            </h3>
          </Row>
          <Row className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}>
            <Col xs={12}>
              <select
                style={{ width: "100%" }}
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  if (e.target.value === "Please select Category" || e.target.value==="برجاء اختيار القسم الرئيسي") {
                    SetAddProductData({
                      ...AddProductData,
                      ProductCategory: "",
                      ProductFeature: "",                   
                      ProductQtyUnit: "",
                      ProductSubCategory: "",
                      EgyptDelivery:true
                    });
                  } else {
                    if (e.target.value==="Grocery") {
                      SetAddProductData({
                        ...AddProductData,
                        ProductCategory: e.target.value,
                        ProductFeature: "",                       
                        ProductQtyUnit: "",
                        ProductSubCategory: "",
                        EgyptDelivery:false
                      });
                     
                      
                    } else {
                      SetAddProductData({
                        ...AddProductData,
                        ProductCategory: e.target.value,
                        ProductFeature: "",                     
                        ProductQtyUnit: "",
                        ProductSubCategory: "",
                        EgyptDelivery:true
                      });
                      
                    }
                    
                  }
                  console.log(e.target.value);
                }}
              >
                <option>{Language==="ar"?"برجاء اختيار القسم الرئيسي":"Please select Category"}</option>
                {StaticData.ProductCategories.map((Item, Index) => (
                  <option key={Object.keys(Item)[0].replace(/_/g, " ")}>
                    {Object.keys(Item)[0].replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}>
            <Col xs={12}>
              <select
                style={{ width: "100%" }}
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  if (e.target.value === "Please select Subcategory"|| e.target.value==="برجاء اختيار القسم الفرعي") {
                    SetAddProductData({
                      ...AddProductData,
                      ProductSubCategory: "",
                    });
                  } else {
                    SetAddProductData({
                      ...AddProductData,
                      ProductSubCategory: e.target.value,
                    });
                  }
                  console.log(e.target.value);
                }}
              >
                <option>{Language==="ar"?"برجاء اختيار القسم الفرعي":"Please select Subcategory"}</option>
                {Subcategories()}
              </select>
            </Col>
          </Row>
          <Row className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}>
            <Col xs={12}>
              <select
                style={{ width: "100%" }}
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  if (e.target.value === "Please select Main Feature"|| e.target.value==="برجاء اضافه الصفه الرئيسيه") {
                    SetAddProductData({
                      ...AddProductData,
                      ProductFeature: "",
                    });
                  } else {
                    SetAddProductData({
                      ...AddProductData,
                      ProductFeature: e.target.value,
                    });
                  }
                  console.log(e.target.value);
                }}
              >
                <option>{Language==="ar"?"برجاء اضافه الصفه الرئيسيه":"Please select Main Feature"}</option>
                {Features()}
              </select>
            </Col>
          </Row>
          <Row className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}>
            <Col xs={8} md={10}>
              <div style={{ color: "white" }}>{Language==="ar"?"برجاء اضافه وحده الكميه":"Please add quantity unit"}</div>
            </Col>
         
            <Col xs={4} md={2}>
              <select
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  if (e.target.value==="Unit"||e.target.value==="الوحده") {
                    SetAddProductData({
                      ...AddProductData,
                      ProductQtyUnit:"",
                    });
                    Alert.current.classList.replace(
                      "alert-success",
                      "alert-danger"
                    );
                    Alert.current.innerText = Language==="ar"?"برجاء اختيار وحده":"Please select unit";
                    Alert.current.style.maxHeight = "500px";
                    
                  } else {
                    SetAddProductData({
                      ...AddProductData,
                      ProductQtyUnit: e.target.value,
                    });
                    
                  }
                 
                }}
                style={{ width: "100%" }}
              >
                <option>{Language==="ar"?"الوحده":"Unit"}</option>
                {StaticData.Units.map((Unit) => (
                  <option key={Unit}>{Unit}</option>
                ))}
              </select>
            </Col>
          </Row>
          <Row className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}>
            <Col xs={4} md={8}>
              <div style={{ color: "white" }}>{Language==="ar"?"برجاء اضافه سعر الوحده":"Please add Unit Price"}</div>
            </Col>
            <Col xs={4} md={2}>
              <input
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  console.log(e.target.value)
                  console.log(typeof e.target.value)
                  if (parseInt(e.target.value,10)<=0) {
                    toast.error(Language==="ar"?"سعر الوحده يجب ان يكون اكبر من صفر":"Unit price shall be > 0")
                    SetAddProductData({
                      ...AddProductData,
                      ProductUnitPrice: 0,
                    });
                    
                  } else {
                    if (e.target.value.length===0) {
                      SetAddProductData({
                        ...AddProductData,
                        ProductUnitPrice: 0,
                      });

                    }
                    if(parseInt(e.target.value,10)>0){
                      SetAddProductData({
                        ...AddProductData,
                        ProductUnitPrice: parseInt(e.target.value,10),
                      });
                    } 
                  }       
                }}
                style={{ width: "100%" }}
                type="number"
              />
            </Col>
            <Col xs={4} md={2}>
              <div style={{ color: "white" }}>EGP</div>
            </Col>
          </Row>
          <Row className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}>
            <Col style={{ color: "white" }} xs={6}>
              {Language==="ar"?"برجاء اضافه اسم المنتج":"Add product title"}
            </Col>
            <Col xs={6}>
              <input
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  SetAddProductData({
                    ...AddProductData,
                    ProductTitle: e.target.value,
                  });
                }}
                type="text"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          {/* Product Options */}
          <ProductOptions AddProductData={AddProductData} SetAddProductData={SetAddProductData}/>
          <Row
            style={{ color: "white" }}
            className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}
          >
            <Col xs={6}>{Language==="ar"?"برجاء اضافه وصف المنتج مفصولا بعلامه (,)":"Add product aditional features separated by comma"} </Col>
            <Col xs={6}>
              <input
                onChange={(e) => {
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  console.log(e.target.value.split(","));
                  let Arr = e.target.value.split(",");
                  SetAddProductData({
                    ...AddProductData,
                    ProductAdditionalFeatures: Arr,
                  });
                }}
                type="text"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          {/* <Row
            style={{ color: "white" }}
            className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}
          >
            <Col xs={6}> Egypt Delivery</Col>
            <Col xs={6}>
             <select onChange={(e)=>{
              console.log(e.target.value)
              console.log(AddProductData)
              if (e.target.value==="Yes") {
                console.log("Egypt Delivery")
                SetAddProductData({...AddProductData,EgyptDelivery:true, GovernorateDelivery:true,CityDelivery:true})
                
              } else {
                SetAddProductData({...AddProductData,EgyptDelivery:false})
                
              }
             }} >
              <option>
                No
              </option>
              <option>
                Yes
              </option>
             </select>
            </Col>
          </Row>
          <Row
            style={{ color: "white" }}
            className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}
          >
            <Col xs={6}> Goverorate Delivery</Col>
            <Col xs={6}>
             <select onChange={(e)=>{
              console.log(e.target.value)
              if (e.target.value==="Yes") {
                SetAddProductData({...AddProductData,GoverorateDelivery:true, CityDelivery:true})
                
              } else {
                SetAddProductData({...AddProductData,GoverorateDelivery:false})
                
              }
             }} >
              <option>
                No
              </option>
              <option>
                Yes
              </option>
             </select>
            </Col>
          </Row>
          <Row
            style={{ color: "white" }}
            className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}
          >
            <Col xs={6}> City Delivery</Col>
            <Col xs={6}>
             <select onChange={(e)=>{
              console.log(e.target.value)
              if (e.target.value==="Yes") {
                SetAddProductData({...AddProductData,CityDelivery:true})
                
              } else {
                SetAddProductData({...AddProductData,CityDelivery:false})
                
              }
             }} >
              <option>
                No
              </option>
              <option>
                Yes
              </option>
             </select>
            </Col>
          </Row> */}
          <Row
            style={{ color: "white" }}
            className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}
          >
            <Col xs={6}>{Language==="ar"?"برجاء اضافه صور للمنتج":"Please add product photos"}</Col>
            <Col xs={6}>
              <input
                onChange={(e) => {
                  e.stopPropagation();
                  Alert.current.classList.replace(
                    "alert-success",
                    "alert-danger"
                  );
                  Alert.current.innerText = "";
                  Alert.current.style.maxHeight = "0px";
                  console.log(e.target.files);
                  if (e.target.files.length <= 4) {
                    let arr = e.target.files.length - 1;
                    for (let index = arr; index >= 0; index--) {
                      if (
                        e.target.files[index] &&
                        e.target.files[index].size > 540000
                      ) {
                        console.log("Large images");
                        SetProductImageFiles([]);
                        Alert.current.classList.replace(
                          "alert-success",
                          "alert-danger"
                        );
                        Alert.current.innerText =Language==="ar"?" 512 KBبرجاء حجم الصوره الواحده لايزيد عن":"Please upload file less than 512 KB";
                        Alert.current.style.maxHeight = "500px";
                      } else if (
                        e.target.files[index] &&
                        e.target.files[index].size <= 540000
                      ) {
                        console.log("Images added");
                        const files = Array.from(e.target.files);
                        SetProductImageFiles(files);
                      } else {
                        console.log("Images not added");
                        SetProductImageFiles([]);
                        Alert.current.classList.replace(
                          "alert-success",
                          "alert-danger"
                        );
                        Alert.current.innerText =Language==="ar"?" 512 KBبرجاء حجم الصوره الواحده لايزيد عن":"Please upload file less than 512 KB";
                        Alert.current.style.maxHeight = "500px";
                      }
                    }
                  } else {
                    console.log("Images selected >4");
                    SetProductImageFiles([]);
                    Alert.current.classList.replace(
                      "alert-success",
                      "alert-danger"
                    );
                    Alert.current.innerText =Language==="ar"?"برجاء اضافه بحد اقصى 4 صور":"Please upload maximum 4 images";
                    Alert.current.style.maxHeight = "500px";
                  }
                }}
                type="file"
                multiple
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row className={Language==="ar"?" pb-2 align-items-center text-end":" pb-2 align-items-center text-start"}>
            <Col xs={12}>
              <div
                ref={Alert}
                className=" alert alert-danger text-start"
                style={{
                  boxSizing: "border-box",
                  marginBottom: "0",
                  width: "100%",
                  overflow: "hidden",
                  padding: "0px",
                  border: "0px",
                  maxHeight: "0px",
                  transition: "all 0.3s ease-in-out",
                }}
                role="alert"
              ></div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <button
                ref={LoginButtonRef}
                className="LogInButton"
                disabled={Disabled}
                onClick={(e) => AddProduct(e)}
              >
                {Language==="ar"?"اضف منتج":"Add Product"}
              </button>
            </Col>
          </Row>
        </Container>
      );
    } else if (Data === "تعديل منتج"||Data==="Update Product") {
      return (
        <Container>
          <Row>
            <h3>{Data}</h3>
          </Row>
        </Container>
      );
    } else if (Data === "الدفعات المستلمه"||Data==="Recieved Payments") {
      return (
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
                      <th>Order ID</th>
                      <th>Order Value</th>
                      <th>Payment Sent</th>
                      <th>Payment Sent Date</th>
                    </tr>
                  </thead>
                 <tbody>
                  {Array.isArray(RecievedPayments) && RecievedPayments.length>0? 
                  RecievedPayments.map((item,index)=>(<tr key={item._id}>
                    <td>{item._id}</td>
                    <td><PaymentOrderValue Ordered={item.OrderedItems} /></td>
                    <td>{item.MerchantPaymentSent.toString()}</td>
                    <td>{item.MerchantPaymentDate.toString()}</td>
                    </tr>)):(<tr><td>No Data</td></tr>)}
                 </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else if (Data === "جميع الدفعات"||Data==="All Payments") {
      return (
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
                      <th>Order ID</th>
                      <th>Order Value</th>
                      <th>Payment Sent</th>
                      <th>Payment Sent Date</th>
                    </tr>
                  </thead>
                 <tbody>
                  {Array.isArray(AllPayments) && AllPayments.length>0? 
                  AllPayments.map((item,index)=>(<tr key={item._id}>
                    <td>{item._id}</td>
                    <td><PaymentOrderValue Ordered={item.OrderedItems} /></td>
                    <td>{item.MerchantPaymentSent.toString()}</td>
                    <td>{item.MerchantPaymentDate.toString()}</td>
                    </tr>)):(<tr><td>No Data</td></tr>)}
                 </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return <Container>{Data}</Container>;
    }
  };
  useEffect(() => {
    // The following code will check if the looged user is merchant or not
    if (globalState.UserLogged === true) {
      if (globalState.Admin === true) {
        navigate("/Admins/" + globalState.Name);
      } else if (globalState.Client === true) {
        navigate("/");
      } else if (globalState.Merchant === true) {
        navigate("/Merchants/" + globalState.Name);
      }
    } else {
      navigate("/");
    }
  }, []);
  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        console.log(params);
      }}
    >
    {/* This will be the head of page */}
      <Row>
        <h2 onClick={(e)=>{
          e.stopPropagation()
          console.log(ShowAlert)
        }}>{Language==="ar"?"صفحه التاجر":"Merchant page"}</h2>
      </Row>
{/* This will be page body */}
      <Row>
        {/* the following Col will be the side menu for the merchant page */}
        <Col
          xs={12} md={2}
          style={{
            overflowWrap: "break-word",
            textAlign: "start",
          }}
        >
          <Row>
            <Col xs={12} className=" d-flex flex-wrap">
              <div className="MenuArrow"
                  id="arrow" style={{ width: "fit-content", cursor:"pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    if (
                      document
                        .getElementById("MerchantProfile")
                        .classList.contains("MerchantMenuActive")
                    ) {
                      document
                        .getElementById("MerchantProfile")
                        .classList.remove("MerchantMenuActive");
                      
                    } else {
                      for (let index = 0; index < Menues.length; index++) {
                        if (
                          Menues[index].classList.contains("MerchantMenuActive")
                        ) {
                          Menues[index].classList.remove("MerchantMenuActive");
                          
                        } else {
                        }
                      }
                      document
                        .getElementById("MerchantProfile")
                        .classList.add("MerchantMenuActive");
                      
                    }
                  }}>
                <span>{Language==="ar"?"مرحبا":"Hi"}, </span>
                <span>{params.Name}</span>
                <i className="fa-solid fa-chevron-down"></i>
                
              </div>
              <div
                id="MerchantProfile"
                className="MerchantMenu d-flex flex-column"
                style={{ width: "100%" }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  {Language==="ar"?"تغيير كلمة المرور":"Change Password"}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                        
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                    setGlobal("",false,"",false,false,false,0,"","")
                    localStorage.clear()
                    sessionStorage.clear()
                    Navigate("/")
                  }}
                >
                  {Language==="ar"?"تسجيل الخروج":"Log Out"}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="MenuArrow"
                id="OrdersArrow"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  let Menues = document.querySelectorAll(".MerchantMenu");
                  let MenuArrows = document.querySelectorAll(".MenuArrow");
                  if (
                    document
                      .getElementById("MerchantOrders")
                      .classList.contains("MerchantMenuActive")
                  ) {
                    document
                      .getElementById("MerchantOrders")
                      .classList.remove("MerchantMenuActive");
                    
                  } else {
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                       
                      } else {
                      }
                    }
                    document
                      .getElementById("MerchantOrders")
                      .classList.add("MerchantMenuActive");
                    
                  }
                }}>
              <span>{Language==="ar"?"طلبات الشراء":"Orders"}</span>
              <i className="fa-solid fa-chevron-down"></i>
              
              <div
                id="MerchantOrders"
                className="MerchantMenu d-flex flex-column"
              >
                <div
                  onClick={async(e) => {
                    e.stopPropagation();
                    try {
                      console.log(e.target.innerText);
                      let Menues = document.querySelectorAll(".MerchantMenu");
                      let MenuArrows = document.querySelectorAll(".MenuArrow");
                      for (let index = 0; index < Menues.length; index++) {
                        if (
                          Menues[index].classList.contains("MerchantMenuActive")
                        ) {
                          Menues[index].classList.remove("MerchantMenuActive");
                         
                        } else {
                        }
                      }
                      SetData(e.target.innerText);
                     
                      if (Orders.length===0) {
                        toast.info("Please wait while we get Your Orders")
                        const MerchantCredentials={
                          Email:globalState.Email,
                          Name:globalState.Name,
                          Token:globalState.Token
                        }
                        console.log(MerchantCredentials)
                        const GetMerchantOrders=await fetch(
                          "https://gehazik-server.onrender.com/Merchants/OrdersList",
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
                            if (item.OrderStatus[item.OrderStatus.length-1].Status==="Waiting Payment"||"On the way") {
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
                   
                  }}
                >
                  {Language==="ar"?"الطلبات الجديده":"New Orders"}
                </div>
                <div
                  onClick={async(e) => {
                    e.stopPropagation();
                    try {
                      console.log(e.target.innerText);
                      let Menues = document.querySelectorAll(".MerchantMenu");
                      let MenuArrows = document.querySelectorAll(".MenuArrow");
                      for (let index = 0; index < Menues.length; index++) {
                        if (
                          Menues[index].classList.contains("MerchantMenuActive")
                        ) {
                          Menues[index].classList.remove("MerchantMenuActive");
                         
                        } else {
                        }
                      }
                      SetData(e.target.innerText);
                      
                      if (Orders.length===0) {
                        toast.info("Please wait while we get Your Orders")
                        const MerchantCredentials={
                          Email:globalState.Email,
                          Name:globalState.Name,
                          Token:globalState.Token
                        }
                        console.log(MerchantCredentials)
                        const GetMerchantOrders=await fetch(
                          "https://gehazik-server.onrender.com/Merchants/OrdersList",
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
                            if (item.OrderStatus[item.OrderStatus.length-1].Status==="Waiting Payment"||"On the way") {
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
                   
                  }}
                >
                  {Language==="ar"?"جميع الطلبات":"All Orders"}
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <div className="MenuArrow"
                id="ProductsArrow"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  let Menues = document.querySelectorAll(".MerchantMenu");
                  let MenuArrows = document.querySelectorAll(".MenuArrow");
                  if (
                    document
                      .getElementById("MerchantProducts")
                      .classList.contains("MerchantMenuActive")
                  ) {
                    document
                      .getElementById("MerchantProducts")
                      .classList.remove("MerchantMenuActive");
                    
                  } else {
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                       
                      } else {
                      }
                    }
                    document
                      .getElementById("MerchantProducts")
                      .classList.add("MerchantMenuActive");
                    
                  }
                }}>
              <span>{Language==="ar"?"المنتجات":"Products"}</span>
              <i className="fa-solid fa-chevron-down"></i>
              <div
                id="MerchantProducts"
                className="MerchantMenu d-flex flex-column"
              >
                <div
                  onClick={async (e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    SetShowAlert({...ShowAlert,Show:true,Success:true,Massage:"Please wait"})
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                       
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                    console.log(globalState);
                    const ProductsListCredentials = {
                      Name: globalState.Name,
                      Email: globalState.Email,
                      Token: globalState.Token,
                    };
                    console.log(ProductsListCredentials);
                    console.log("ProductsList submitted");
                    const GetProductsList = await fetch(
                      "https://gehazik-server.onrender.com/Merchants/ProductsList",
                      {
                        method: "post",
                        body: JSON.stringify(ProductsListCredentials),
                        headers: {
                          "Content-Type": "application/json",
                        },
                        mode: "cors",
                      }
                    )
                      .then((res) => {
                        console.log(res);
                        return res.json();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    console.log(GetProductsList.resp);
                    if (Array.isArray(GetProductsList.resp)) {
                      SetProductsList(GetProductsList.resp);
                      SetShowAlert({...ShowAlert,Show:false, Success:true, Massage:''})
                    } else {
                      SetShowAlert({...ShowAlert,Show:true, Success:false, Massage:"No Products Found"})
                      setTimeout(()=>{
                        SetShowAlert({...ShowAlert,Show:false, Success:false, Massage:""})
                      }, 3000)
                      
                      
                    }
                  }}
                >
                  {Language==="ar"?"جميع المنتجات":"All Products"}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                       
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  {Language==="ar"?"اضافه منتج":"Add Products"}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target.innerText);
                    let Menues = document.querySelectorAll(".MerchantMenu");
                    let MenuArrows = document.querySelectorAll(".MenuArrow");
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                       
                      } else {
                      }
                    }
                    SetData(e.target.innerText);
                  }}
                >
                  {Language==="ar"?"تعديل منتج":"Update Product"}
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <div className="MenuArrow"
                id="PaymentsArrow"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  let Menues = document.querySelectorAll(".MerchantMenu");
                  let MenuArrows = document.querySelectorAll(".MenuArrow");
                  if (
                    document
                      .getElementById("MerchantPayments")
                      .classList.contains("MerchantMenuActive")
                  ) {
                    document
                      .getElementById("MerchantPayments")
                      .classList.remove("MerchantMenuActive");
                    
                  } else {
                    for (let index = 0; index < Menues.length; index++) {
                      if (
                        Menues[index].classList.contains("MerchantMenuActive")
                      ) {
                        Menues[index].classList.remove("MerchantMenuActive");
                       
                      } else {
                      }
                    }
                    document
                      .getElementById("MerchantPayments")
                      .classList.add("MerchantMenuActive");
                    
                  }
                }}>
              <span>{Language==="ar"?"الدفعات":"Payments"}</span>
              <i className="fa-solid fa-chevron-down"></i>
              <div
                id="MerchantPayments"
                className="MerchantMenu d-flex flex-column"
              >
                <div
                  onClick={async(e) => {
                    e.stopPropagation();
                    try {
                      console.log(e.target.innerText);
                      let Menues = document.querySelectorAll(".MerchantMenu");
                      let MenuArrows = document.querySelectorAll(".MenuArrow");
                      for (let index = 0; index < Menues.length; index++) {
                        if (
                          Menues[index].classList.contains("MerchantMenuActive")
                        ) {
                          Menues[index].classList.remove("MerchantMenuActive");
                         
                        } else {
                        }
                      }
                      SetData(e.target.innerText);
                      if (AllPayments.length===0) {
                        toast.info("Please wait while we get Your Orders")
                        const MerchantCredentials={
                          Email:globalState.Email,
                          Name:globalState.Name,
                          Token:globalState.Token
                        }
                        console.log(MerchantCredentials)
                        const GetMerchantOrders=await fetch(
                          "https://gehazik-server.onrender.com/Merchants/OrdersList",
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
                          SetAllPayments(GetMerchantOrders.resp)
                          SetRecievedPayments(GetMerchantOrders.resp.filter((item)=>{
                            if (item.MerchantPaymentSent===true) {
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
                  }}
                >
                  {Language==="ar"?"الدفعات المستلمه":"Recieved Payments"}
                </div>
                <div
                    onClick={async(e) => {
                      e.stopPropagation();
                      try {
                        console.log(e.target.innerText);
                        let Menues = document.querySelectorAll(".MerchantMenu");
                        let MenuArrows = document.querySelectorAll(".MenuArrow");
                        for (let index = 0; index < Menues.length; index++) {
                          if (
                            Menues[index].classList.contains("MerchantMenuActive")
                          ) {
                            Menues[index].classList.remove("MerchantMenuActive");
                           
                          } else {
                          }
                        }
                        SetData(e.target.innerText);
                        if (AllPayments.length===0) {
                          toast.info("Please wait while we get Your Orders")
                          const MerchantCredentials={
                            Email:globalState.Email,
                            Name:globalState.Name,
                            Token:globalState.Token
                          }
                          console.log(MerchantCredentials)
                          const GetMerchantOrders=await fetch(
                            "https://gehazik-server.onrender.com/Merchants/OrdersList",
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
                            SetAllPayments(GetMerchantOrders.resp)
                            SetRecievedPayments(GetMerchantOrders.resp.filter((item)=>{
                              if (item.MerchantPaymentSent===true) {
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
                    }}
                >
                  {Language==="ar"?"جميع الدفعات":"All Payments"}
                </div>
              </div>
            </div>
          </Row>
        </Col>
        {/* the following Col will display the data after merchant select option from side menu */}
        <Col xs={12} md={10}>
          <DtataDisplay  />
        </Col>
      </Row>
    </Container>
  );
};
export default MerchantPage;
