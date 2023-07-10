import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import svg from '../../assets/images/svg'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

export default function PlaidContainer({children, hiddenHeader = false}) {
  const nav = useNavigate();
  return (
    <div className='plaid_container'>
      <Container className='plaid_card'>
        <Row className='mt-3 px-4 py-3' hidden = {hiddenHeader}>
          <Col xs={2}><Button variant='light' onClick={() => nav(-1)}>&lt;</Button></Col>
          <Col className='text-center'><img src={svg.NbblLogoBlack} alt='NBBL LOGO'/></Col>
          <Col xs={2} className=''></Col>
        </Row>
        {children}
      </Container>
    </div>
  )
}
