import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, FormControl, Row } from 'react-bootstrap'
import { APPCONFIG } from '../../app-config'
import english from '../../utils/english'
import AlreadyHaveAccount from '../AlreadyHaveAccount'
import './styles.scss'

const OtpInput = ({setCode, handleSubmit, resendOtp}) => {

  const [code0, setCode0] = useState('')
  const [code1, setCode1] = useState('')
  const [code2, setCode2] = useState('')
  const [code3, setCode3] = useState('')
  const [error, setError] = useState('')
  
  const code0Ref = useRef<HTMLInputElement>(null)
  const code1Ref = useRef<HTMLInputElement>(null)
  const code2Ref = useRef<HTMLInputElement>(null)
  const code3Ref = useRef<HTMLInputElement>(null)

  useEffect( () => {
    let otp = code0+code1+code2+code3
    setCode(otp)
  },[code0,code1,code2,code3])

  useEffect( () => {
    if(code0 !== '') code1Ref?.current?.focus()
  },[code0])
  
  useEffect( () => {
    if(code1 !== '') code2Ref?.current?.focus()
  },[code1])

  useEffect( () => {
    if(code2 !== '') code3Ref?.current?.focus()
  },[code2])
  
  const onKeyDown = (e?: any) => {
    if (e.keyCode === 8) {
        console.log('delete');
        return true;
    }
    return false;
  }


  return (
    <div className='otp-input'>
      <Container className='w-75 on-mobile-w-100'>
        <div className='text-center'>
          <h4 className='w-100'>Enter OTP Verification <br/> code</h4>
        </div>
        <Container>
        <Row className='justify-content-center mb-2'>
          <FormControl
            onChange={(event) => {
              setCode0(event.target.value);
            }}
            value={code0}
            onBlur={() => {}}
            maxLength = {1}
            ref = {code0Ref}
            onError = {(error) => setError}
            className = 'otp-input-box'
          />
          <FormControl
            onChange={(event) => {
              setCode1(event.target.value);
            }}
            value={code1}
            onBlur={() => {}}
            maxLength = {1}
            ref = {code1Ref}
            onError = {(error) => setError}
            className = 'otp-input-box'
            onKeyDown={(e) => {
              if(onKeyDown(e) && code1 === '')
                code0Ref.current?.focus()
            }}
          />
          <FormControl
            onChange={(event) => {
              setCode2(event.target.value);
            }}
            value={code2}
            onBlur={() => {}}
            maxLength = {1}
            ref = {code2Ref}
            onError = {(error) => setError}
            className = 'otp-input-box'
            onKeyDown={(e) => {
              if(onKeyDown(e) && code2 === '')
                code1Ref.current?.focus()
            }}
          />
          <FormControl
            onChange={(event) => {
              setCode3(event.target.value);
            }}
            value={code3}
            onBlur={() => {}}
            maxLength = {1}
            ref = {code3Ref}
            onError = {(error) => setError}
            className = 'otp-input-box'
            onKeyDown={(e) => {
              if(onKeyDown(e) && code3 === '')
                code2Ref.current?.focus()
            }}
          />
        </Row>
        
        <Container className='text-center'>
          <Button className='rounded-pill w-75 otp-btn' onClick={handleSubmit}>Verify Now</Button>
          <Button variant='dark' className='rounded-pill w-75 otp-btn btn-dark' onClick={() => resendOtp()}>Resend Code</Button>
        </Container>

        <div className='text-center'>
          <h6>YOUR ARTICLE WILL BE UNLOCKED.</h6>
          <small>Look for the NBBL Pop-out control tab. It appears along the left side of any NBBL enabled page.</small>
        </div>

        </Container>
        <AlreadyHaveAccount text={english.haveAccount} target={`/${APPCONFIG.routes.login}`}/>
      </Container>
    </div>
  )
}

export default OtpInput;