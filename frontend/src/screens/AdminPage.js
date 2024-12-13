import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
//  the main Component is AdminPage and child Component is ControlPanel
//  when user clicks on any item on the AdminPage component side items >SetData function will update the Data state > then the ControlPanel will be updated using useState
//  useeffect will be used to redirect unauthorized users away from the page

//  ControlPanel Component Start
const ControlPanel = ({ Data, ProductsList, SetProductsList }) => {
  const ApproveProducts= async(e)=>{
    e.stopPropagation()
    e.target.disabled=true
    try {
      console.log("Approving Products")
      console.log(e.target)
      let Arr=[]
      for (let index = 0; index < ProductsList.length; index++) {
        if (ProductsList[index].ProductVisibility===true) {
          let obj={
            ID:ProductsList[index]._id,
            ProductVisibility:ProductsList[index].ProductVisibility
          }
          Arr.push(obj)
        }
        
      }
      console.log(Arr)
      if (Arr.length>0) {
        
      }
    } catch (error) {
      console.log("Error",error)
      e.target.disabled=false
    }
  }
  useEffect(() => {
    console.log(Data);
  }, []);
  // Handle checkbox toggle
  const handleCheckboxChange = (productId) => {
    SetProductsList((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, ProductVisibility: !product.ProductVisibility }
          : product
      )
    );
    console.log(ProductsList)
  };
  if (Data === "Approve Products") {
    return (
      <Container>
        <Row>
         <Col xs={12}>{Data}</Col>
        </Row>
        <Row>
          <Col xs={12}>
          {Array.isArray(ProductsList)&& ProductsList.length>0 ?
           <div style={{ overflowX: "auto" }}>
           <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "left" }}>
             <thead>
               <tr>
                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>Images</th>
                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>Approve</th>
               </tr>
             </thead>
             <tbody>
               {ProductsList.map((product) => (
                 <tr key={product._id}>
                   <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product._id}</td>
                   <td style={{ border: "1px solid #ddd", padding: "8px" }}><div style={{maxWidth:"200px", maxHeight:"100px", overflowY:"auto"}}>
                    {Array.isArray(product.ProductImagesIDs)?product.ProductImagesIDs.map((image)=>(
                      <img key={image} style={{maxWidth:"200px", aspectRatio:"1/1"}} src ={`https://drive.google.com/thumbnail?id=${image}`}/>
                    )):""}
                    </div>
                    </td>
                   <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.ProductTitle}</td>
                   <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                     <input type="checkbox" onChange={() => handleCheckboxChange(product._id)} />
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
           <button className="SignUpButton" onClick={(e)=>ApproveProducts(e)}>
            Confirm
           </button>
         </div>:<div>
          No Products Bending
         </div>}

          
          </Col>
        </Row>
      </Container>
      
    );
  } else if (Data === "Merchants") {
    return (
      <Row>
        <Col xs={12}>{Data}</Col>
      </Row>
    );
  } else if (Data === "Add Product") {
    return (
      <>
        <Row>
          <Col xs={12}>
            <Row className=" justify-content-center align-content-center">
              <div className=" w-auto">{Data}</div>
            </Row>
          </Col>
        </Row>
      </>
    );
  } else if (Data === "Add Category") {
    return (
      <Row>
        <Col xs={12}>{Data}</Col>
      </Row>
    );
  } else {
    return (
      <>
        <Row>
          <Col xs={12}>Please select an option</Col>
        </Row>
      </>
    );
  }
};
//  ControlPanel Component End
const AdminPage = ({ globalState, setGlobal }) => {
  const Category = useRef();
  const SubCategory = useRef();
  const [AllOrders, SetAllOrders] = useState([]);
  const [ProductsList,SetProductsList]=useState([])
  const [SelectedOrder, SetSelectedOrder] = useState([]);
  const [AllOrdersKeys, SetAllOrdersKeys] = useState([]);
  const { Name } = useParams();
  const navigate = useNavigate();
  const [Data, SelectData] = useState("");
  
  // SetData function start
  const Orders = async () => {
    console.log("Orders Selected");
    console.log(globalState);
    const Orders = await fetch(
      "http://localhost:5000/GetOrders",
      {
        method: "POST",
        body: JSON.stringify(globalState),
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
      });
    const Keys = Object.keys(Orders[0]);
    console.log(Keys);
    SetAllOrdersKeys(Keys);
    console.log(Orders);
    SetAllOrders(Orders);
    console.log(AllOrders);
  };

  const SetData = async (e) => {
    e.stopPropagation();
    console.log(e.target.innerText);
    SelectData(e.target.innerText);
    if (e.target.innerText === "Orders") {
      Orders();
    } else if (e.target.innerText==="Approve Products") {
      const Credentials={Email:globalState.Email, Token:globalState.Token}
      console.log(Credentials)
      const BendingProducts = await fetch(
        "http://localhost:5000/Admins/BendingProducts",
        {
          method: "Post",
          body: JSON.stringify(Credentials),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      ).then(res=>{
        return res.json()
      }).catch(err=>{
        console.log(err)
      })
      console.log(BendingProducts)
      if (Array.isArray(BendingProducts.resp)) {
        console.log("Array of products found")
        SetProductsList(BendingProducts.resp)
      } else {
        console.log("Connection error to get products")
      }
     
    }
  };
  // SetData function end
  useEffect(() => {
    if (globalState.UserLogged === true) {
      if (globalState.Admin === true) {
      } else if (globalState.Client === true) {
        navigate("/");
      } else if (globalState.Merchant === true) {
        navigate("/Merchants/" + globalState.Name);
      }
    } else {
      navigate("/");
    }
  });
  return (
    <>
      <Row>
        <Col
          xs={12}
          md={2}
          style={{ borderRight: "5px solid", borderColor: "#a4d2f2" }}
        >
          <div onClick={(e) => SetData(e)}>Approve Products</div>
          <div onClick={(e) => SetData(e)}>Merchants</div>
          <div onClick={(e) => SetData(e)}>Add Product</div>
          <div onClick={(e) => SetData(e)}>Add Category</div>
        </Col>
        <Col xs={12} md={10}>
          <ControlPanel Data={Data} ProductsList={ProductsList} SetProductsList={SetProductsList} />
        </Col>
      </Row>
    </>
  );
};
export default AdminPage;
