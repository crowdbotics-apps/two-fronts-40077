import React from 'react'
import { Col, Container } from 'react-bootstrap'
import svg from '../../assets/images/svg'
import './styles.scss'

export default function FillerForRegistration({slider,children}: {slider?: string, children: any}) {
  
  return (
    <Container className='continue-registration-filler'>
      <div className='text-center'>
        <img src={svg.welcomeBack} alt='article' className='slider-img'></img>
        <br/>
        {children}
      </div>
      <div className='sliders'>
        {(slider != null) ?<img src={slider} alt='slider'/> : ''}
      </div>
    </Container>
  )
}
