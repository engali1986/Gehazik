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
            

            </Col>
        </Row>
        <Row style={{minHeight:'20vh'}}>
          <Col className=' p-1' xs={12} md={6} style={{display:'flex', flexDirection:'column' ,alignContent:'space-around', justifyContent:'space-around', borderRadius:'5%'}}>
            <div  style={{border:'1px solid gray', borderRadius:'5px'}}  >
              <h1>
              <i class="fa-solid fa-envelope"></i>
              </h1>
              <h2>
                Send E-mail
              </h2>
            <a href='mailto:engaligulf@gmail.com'>Email us</a>

            </div>
          
          </Col>

          <Col className=' p-1' xs={12} md={6} style={{display:'flex', flexDirection:'column' ,alignContent:'space-around', justifyContent:'space-around', borderRadius:'5%'}}>
            <div  style={{border:'1px solid gray', borderRadius:'5px'}}  >
              <h1>
              <i class="fa-solid fa-phone"></i>
              </h1>
              <h2>
                Call us
              </h2>
            <a href='tel:+201101806523'>+201101806523</a>

            </div>
          
          </Col>
          

        </Row>
        
        
       
    </Container>
  )
}

export default ContactUs