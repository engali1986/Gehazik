import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
//  the main Component is AdminPage and child Component is ControlPanel
//  when user clicks on any item on the AdminPage component side items >SetData function will update the Data state > then the ControlPanel will be updated using useState
//  useeffect will be used to redirect unauthorized users away from the page

//  ControlPanel Component Start
const ControlPanel = ({ Data }) => {
  useEffect(() => {
    console.log(Data);
  }, []);
  if (Data === "Approve Products") {
    return (
      <Row>
        <Col xs={12}>{Data}</Col>
      </Row>
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
        "http://localhost:5000/Admins/ApproveProducts",
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
          <ControlPanel Data={Data} />
        </Col>
      </Row>
    </>
  );
};
export default AdminPage;
