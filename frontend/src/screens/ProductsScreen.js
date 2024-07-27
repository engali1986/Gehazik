import React from 'react'
import {useParams} from "react-router-dom"
import {Container, Row, Col} from "react-bootstrap"

const ProductsScreen = () => {
  const params=useParams()
  return (
    <Container onClick={(e)=>{
      e.stopPropagation()
      console.log(params)
    }}>
      <Row style={{borderBottom:'1px solid gray', textAlign:'start'}}>
        <h3 >
          {Object.values(params)[0].replace(/-/g," ")}
        </h3 >
      </Row>
      <Row className=' justify-content-center align-content-start'style={{borderBottom:'1px solid gray', textAlign:'start'}}>
        <Col xs={4}>
          aa
        </Col>
        <Col xs={8}>
        
        </Col>
      </Row>
      
    </Container>
  )
}

export default ProductsScreen