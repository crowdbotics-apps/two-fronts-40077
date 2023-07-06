import React, { useEffect, useState } from "react"
import { Col } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import { registerByEmail, registerByPhone, registerOtpEmail, registerOtpPhone } from "../../api/request"
import { APPCONFIG } from "../../app-config"
import svg from "../../assets/images/svg"
import FillerForRegistration from "../../components/FillerForRegistration"
import OtpInput from "../../components/OtpInput"
import RegistrationHeader from "../../components/RegistrationHeader"
import RegisterContainer from "../../customComponents/RegisterContainer"
import "./VerifyOtp.scss"

export default function VerifyOtp() {
  const nav = useNavigate()

  const [code, setCode] = useState("")
  const { state: fwdState } = useLocation()

  const handleSubmit = async () => {
    console.log(fwdState)
    const data =
      fwdState.registrationBy === "email"
        ? await registerOtpEmail({ email: fwdState.identity.email, otp: code })
        : await registerOtpPhone({
            phone_number: fwdState.identity.phone_number,
            phone_otp: code
          })
    if (data?.success) {
      sessionStorage.setItem(APPCONFIG.sessVars.token, data.payload.token)
      nav(
        `/${
          fwdState?.is_password_set === false
            ? APPCONFIG.routes.createPassword
            : APPCONFIG.routes.backToPublisher
        }`
      )
    }
  }

  const resendOTP = async () => {
    fwdState.registrationBy === "email"
      ? await registerByEmail({ email: fwdState.identity.email })
      : await registerByPhone({ phone_number: fwdState.identity.phone_number })
  }

  return (
    <div className="verifyOtp">
      <RegisterContainer>
        <Col className="otp-form" lg={8}>
          <RegistrationHeader />
          <br />
          <OtpInput setCode={setCode} handleSubmit={handleSubmit} resendOtp = {resendOTP}/>
        </Col>

        <Col className="registration-slider d-lg-block d-none p-0" lg={4}>
          <FillerForRegistration slider={svg.slide2}>
            <p>
              The first article is <br /> on us!
            </p>
          </FillerForRegistration>
        </Col>
      </RegisterContainer>
    </div>
  )
}
