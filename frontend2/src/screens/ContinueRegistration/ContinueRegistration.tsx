import React, { useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { APPCONFIG } from "../../app-config"
import svg from "../../assets/images/svg"
import AlreadyHaveAccount from "../../components/AlreadyHaveAccount"
import FillerForContinueRegistration from "../../components/FillerForContinueRegistration"
import FillerForRegistration from "../../components/FillerForRegistration"
import RegistrationHeader from "../../components/RegistrationHeader"
import RegisterContainer from "../../customComponents/RegisterContainer"
import { savePublisherData } from "../../utils/common"
import english from "../../utils/english"
import "./ContinueRegistration.scss"

export default function ContinueRegistration() {
  const nav = useNavigate()
  const { state: fwdState } = useLocation()

  const { publisherData } = useParams()
  useEffect(() => {
    savePublisherData(publisherData)
  }, [publisherData])

  return (
    <RegisterContainer>
      <Col className="registration-form" lg={8}>
        <RegistrationHeader />
        <div className="w-100 text-center mt-5 d-sm-none">
          <img src={svg.welcomeBack} alt="sliderFillerForMobile" />
          <p className="text-center mt-3">
            <p className="font-normal-20">Welcome back!</p>
            <p className="font-normal-20 mt-0">Completing your registration is fast <br/>  and  easy!</p>
          </p>
        </div>
        <Container className="w-75 mt-4">
          <div className="text-center font-sm-small">
            <h3>
              Continue registration using
              <br /> <span className="text-primary"> {fwdState}</span> as your
              login ID
            </h3>
            <Button
              className="rounded-pill px-4 w-100 mt-3 mb-180"
              onClick={() => {
                nav(`/${APPCONFIG.routes.createPassword}`)
              }}
            >
              Continue to registration
            </Button>
          </div>
          <div className="have-account-container">
            <AlreadyHaveAccount
              text={english.haveAccount}
              target={`/${APPCONFIG.routes.login}`}
            />
          </div>
        </Container>
      </Col>

      <Col className="registration-slider d-lg-block d-none p-0" lg={4}>
        <FillerForContinueRegistration slider={undefined}>
          <p className="text-center">
            <p className="font-normal-32">Welcome back!</p>
            <p className="font-normal-20 mt-0">Completing your registration is fast and  easy!</p>
          </p>
        </FillerForContinueRegistration>
      </Col>
    </RegisterContainer>
  )
}
