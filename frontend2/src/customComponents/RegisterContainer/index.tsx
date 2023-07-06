import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './styles.scss'

export default function RegisterContainer({children}: {children:any}) {
  return (
    <div className='register-container'>
      <Container className='align-content-center rounded register-card'>
        <Row className='h-100'>
          {children}
        </Row>
      </Container>
    </div>
  )
}