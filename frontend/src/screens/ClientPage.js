import React from 'react'
import {Container, Row, Col, Dropdown, ButtonGroup, DropdownButton, Button} from "react-bootstrap"
const ClientPage = ({globalState,setGlobal}) => {
  return (
    <Container>
      {/* This will be the head of page */}
      <Row>
        <h2>
          Dashboard
        </h2>
      </Row>
      {/* This will be page body */}
      <Row>
        {/* the following Col will be the side menu for the merchant page */}
        <Col xs={12} md={2}>
        <Dropdown className=' d-inline-block w-100 my-2' size={{xs:"lg",md:"sm"}}>
      <Dropdown.Toggle className=' d-inline-block w-100 text-start ps-0' variant="success" id="dropdown-basic">
        Profile
      </Dropdown.Toggle>

      <Dropdown.Menu className=' w-100'>
        <Dropdown.Item as={Button}>Change Password</Dropdown.Item>
        <Dropdown.Item as={Button}>LogOut</Dropdown.Item>
      </Dropdown.Menu>
        </Dropdown>
        <Dropdown className=' d-inline-block w-100 my-2' size={{xs:"lg",md:"sm"}}>
      <Dropdown.Toggle className=' d-inline-block w-100 text-start ps-0' variant="success" id="dropdown-basic">
        Orders
      </Dropdown.Toggle>

      <Dropdown.Menu className=' w-100'>
        <Dropdown.Item as={Button}>New Orders</Dropdown.Item>
        <Dropdown.Item as={Button}>All Orders</Dropdown.Item>
      </Dropdown.Menu>
        </Dropdown>
    
        </Col>
        {/* the following Col will display the data after merchant select option from side menu */}
        <Col xs={12} md={10}>
        hjhjkhk
        </Col>
      </Row>
    </Container>
  )
}
export default ClientPage