import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import svg from '../../assets/images/svg'
import PlaidContainer from '../PlaidContainer'
import './styles.scss'

export default function AddFunds() {
  return (
    <div className='add-funds'>
      <PlaidContainer hiddenHeader={true}>
        <p className='text-center mt-5'>
          <img src={svg.AddImage} alt='Add Image'/>
        </p>
        <Container className='p-horizontal-98 py-5'>
          <Row>
            <Col>Auto purchase articles</Col>
            <Col className='justify-content-end d-flex'>
              <Form.Check type='switch' className='switch-custom'></Form.Check>
            </Col>
          </Row>
          <Row className='py-4'>
            <Col>Auto purchase articles</Col>
            <Col className='justify-content-end d-flex'>
              <Form.Check type='switch' className='switch-custom'></Form.Check>
            </Col>
          </Row>
          <Row className='balance'>
            <p className='font-medium-16 text-white'>NBBL Balance</p>
            <p className='font-medium-35 text-white'>0</p>
          </Row>
          <p className='text-center py-3 font-medium-20'> Add funds</p>
          <Container>
            <Button variant='secondary' className='font-bold-14 text-dark rounded-pill add-funds-btn'>$5.00 = 500 NBBL </Button>
            <Button variant='secondary' className='font-bold-14 text-dark rounded-pill add-funds-btn'>$5.00 = 500 NBBL </Button>
            <Button variant='secondary' className='font-bold-14 text-dark rounded-pill add-funds-btn'>$5.00 = 500 NBBL </Button>
          </Container>
          <Container className='mt-4'>
            <Button className='font-bold-14 rounded-pill add-funds-btn'>Add funds now</Button>
            <Button className='font-bold-14 rounded-pill add-funds-btn'>Purchase History</Button>
          </Container>
        </Container>
      </PlaidContainer>
    </div>
  )
}
