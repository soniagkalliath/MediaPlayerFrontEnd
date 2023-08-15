import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Landingpage() {
  const navigate = useNavigate()

  const handleNavigate = ()=>{
    //navigate to home
    navigate('/home')
  }
  return (
    <Row className='align-items-center '>
      <Col></Col>
      <Col lg={6}> 
      <h1>Welcome Veedio.com</h1>
      <p style={{textAlign:'justify'}}><b>Where user can manage their favorite videos.</b> User can upload any youtube videos by copy and paste their URL. Veedio.com will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop. It's free, try it now!</p>
      <button onClick={handleNavigate} className="btn btn-success">Click here to know More!!!</button>
      </Col>
      <Col></Col>
      <Col lg={5}>
      <img width={'500px'} height={'500px'} className='img-fluid' src="https://adndigital.com.br/wp-content/uploads/2019/10/landing-page.png" alt="landing page" />
      </Col>
    </Row>
  )
}

export default Landingpage