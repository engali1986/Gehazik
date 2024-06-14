import React from 'react'
import {Container,Row,Col} from"react-bootstrap"

const ContactUs = () => {
  return (
    <Container>
        <Row style={{marginTop:'20%'}}>
            <Col xs={12} >
            <div style={{fontSize:'2rem', wordWrap:'break-word'}}>
                ContactUs
            </div>
            <a href='mailto:engaligulf@gmail.com'>Email us</a>

            </Col>
        </Row>
        
        
       
    </Container>
  )
}

export default ContactUs