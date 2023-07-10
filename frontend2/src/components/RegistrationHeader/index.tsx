import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import svg from '../../assets/images/svg'

function RegistrationHeader() {
  const nav = useNavigate();
  return (
    <Row className='mt-3 reg-header'>
      <Col xs={2} sm={6}><Button variant='light' onClick={() => nav(-1)}>&lt;</Button></Col>
      <Col className='text-center d-sm-none'><img src={svg.NbblLogoBlack} alt='NBBL LOGO'/></Col>
      <Col xs={2} className='d-sm-none'></Col>
      <Col sm={6} className='text-end d-sm-block d-none'><img src={svg.logo} alt='logo' height={55} width={53}/></Col>
    </Row>
  )
}

export default RegistrationHeader