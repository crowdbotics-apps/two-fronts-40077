import React, { useEffect } from "react"
import { Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import svg from "../../assets/images/svg"
import FillerForRegistration from "../../components/FillerForRegistration"
import RegistrationForm from "../../components/RegistrationForm"
import RegistrationHeader from "../../components/RegistrationHeader"
import RegisterContainer from "../../customComponents/RegisterContainer"
import { savePublisherData } from "../../utils/common"

import "./Registration.scss"

export default function Registration() {
  const { publisherData } = useParams()
  useEffect(() => {
    savePublisherData(publisherData)
  }, [publisherData])

  return (
    <div className="registration">
      <RegisterContainer>
        <Col className="registration-form" lg={8}>
          <RegistrationHeader />
          <div className="w-100 text-center my-4 d-sm-none">
            <img src={svg.sliderFillerForMobile} alt="sliderFillerForMobile" />
          </div>
          <RegistrationForm />
        </Col>

        <Col className="registration-slider d-lg-block d-none" lg={4}>
          <FillerForRegistration slider={svg.slide1}>
            <p>
              The first article is <br /> on us!
            </p>
          </FillerForRegistration>
        </Col>
      </RegisterContainer>
    </div>
  )
}
