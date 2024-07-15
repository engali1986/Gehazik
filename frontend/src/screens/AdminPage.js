import React, { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"


//  the main Componebt is AdminPage and child Component is ControlPanel 
//  when user clicks on any item on the AdminPage component side items >SetData function will update the Data state > then the ControlPanel will be updated using useState
//  useeffect will be used to redirect unauthorized users away from the page 

const AdminPage = ({ globalState, setGlobal }) => {
  const Category=useRef()
  const SubCategory=useRef()

  const [AllOrders, SetAllOrders] = useState([])
  const [SelectedOrder, SetSelectedOrder] = useState([])
  const [AllOrdersKeys, SetAllOrdersKeys] = useState([])
  const { Name } = useParams()
  const navigate = useNavigate()
  const [Data, SelectData] = useState("")
  //  ControlPanel Component Start

  const ControlPanel = ({ Data }) => {
    useEffect(() => {
      console.log(Data)

    }, [])
    if (Data === "Orders") {
      return (
        <Row>
          <Col xs={12}>
            <select id='OrdersList' onChange={(e) => {
              e.stopPropagation()
              console.log(e.target.value)
              let OrderArr = []

              for (let index = 0; index < AllOrders.length; index++) {
                if (AllOrders[index]._id === e.target.value) {
                  OrderArr.push(AllOrders[index])
                  SetSelectedOrder(OrderArr)
                  console.log(AllOrders[index])
                  break;

                } else {

                }


              }


            }}>
              {AllOrders.map(option => (
                <option key={option._id} value={option._id}>
                  {option._id}

                </option>
              ))}

            </select>
            <div style={{ overflow: 'scroll' }}>


              {SelectedOrder.map(Order => (
                <div style={{ display: 'flex' }} key={Order._id}>
                  {AllOrdersKeys.map((Key, i) => (
                    <div style={{ width: 'fit-content' }} key={Key}>
                      <div>
                        {AllOrdersKeys[i]}
                      </div>
                      {String(Order[Key])}

                    </div>
                  ))}

                </div>
              ))}




            </div>
            {/* {AllOrders.map(Order=>(
                <div style={{display:'flex'}} key={Order._id}>
                  {AllOrdersKeys.map(Key=>(
                    <span style={{width:'fit-content'}} key={Key}>
                      {String(Order[Key])}

                    </span>
                  ))}

                </div>
              ))} */}

          </Col>
        </Row>
      )

    } else if (Data === "Merchants") {
      return (
        <Row>
          <Col xs={12}>
            {Data}
          </Col>
        </Row>
      )
    } else if (Data === "Add Product") {
      return (
        <>
          <Row>
            <Col xs={12}>
              <Row className=' justify-content-center align-content-center' >
                <div className=' w-auto' >
                  {Data}

                </div>

              </Row>
            </Col>
          </Row>
        </>
      )

    } else if (Data === "Add Category") {
      return (
        <>
          <Row>
            <Col xs={12}>
              <Row className=' justify-content-center align-content-center' >
                <div className=' w-auto' >
                  {Data}

                </div>

              </Row>
              <Row className=' justify-content-center align-content-center' >
                <Col className=' d-flex align-items-center justify-content-center' sm={12} md={3}>
                  <div>
                    Add Category
                  </div>
                </Col>
                <Col sm={12} md={3}>
                  <textarea ref={Category}>

                  </textarea>
                </Col>
                <Col className=' d-flex align-items-center justify-content-center' sm={12} md={3}>
                  <div>
                    Add Sub Category
                  </div>
                </Col>
                <Col sm={12} md={3}>
                  <textarea ref={SubCategory}>

                  </textarea>
                </Col>

              </Row>
              <Row>
                <button onClick={(e)=>{
                  e.stopPropagation()
                  let Obj={}
                  console.log(Category.current.value)
                  let SubCategories=SubCategory.current.value.split(/\n/)
                  let SubCategories2=SubCategories.pop()
                  Obj[Category.current.value]=SubCategories
                  console.log(Obj)
                }}>
                  Add to DB
                </button>
              </Row>
            </Col>
          </Row>
        </>

      )


    } else {
      return (
        <>
          <Row>
            <Col xs={12}>
              Please select an option
            </Col>
          </Row>

        </>
      )

    }


  }
  //  ControlPanel Component End

  // SetData function start

  const Orders = async () => {
    console.log("Orders Selected")
    const Orders = await fetch("http://localhost:5000/GetOrders", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors"
    }).then(res => {
      return res.json()
    }).catch(err => {
      console.log(err)
    })

    const Keys = Object.keys(Orders[0])
    console.log(Keys)
    SetAllOrdersKeys(Keys)



    console.log(Orders)
    SetAllOrders(Orders)
    console.log(AllOrders)




  }

  const SetData = (e) => {
    e.stopPropagation()
    console.log(e.target.innerText)
    SelectData(e.target.innerText)
    if (e.target.innerText === Data) {
      console.log("innertext equal data")

    } else {

    }
    if (e.target.innerText === "Orders") {
      Orders()


    } else {

    }

  }

  // SetData function end

  useEffect(() => {
    if (globalState.UserLogged === true) {
      if (globalState.Admin === true) {

      } else if (globalState.Client === true) {
        navigate("/")
      } else if (globalState.Merchant === true) {
        navigate("/Merchants/" + globalState.Name)
      }

    } else {
      navigate("/")

    }

  });


  return (
    <>

      <Row >
        <Col xs={12} md={2} style={{ borderRight: '5px solid', borderColor: '#a4d2f2' }}>
          <div onClick={(e) => SetData(e)}>
            Orders
          </div>
          <div onClick={(e) => SetData(e)}>
            Merchants
          </div>
          <div onClick={(e) => SetData(e)}>
            Add Product
          </div>
          <div onClick={(e) => SetData(e)}>
            Add Category
          </div>


        </Col>
        <Col xs={12} md={10}>
          <ControlPanel Data={Data} />
        </Col>
      </Row>


    </>
  )
}

export default AdminPage