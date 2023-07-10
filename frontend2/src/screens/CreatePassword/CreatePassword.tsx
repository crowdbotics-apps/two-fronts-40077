import React, { useEffect } from "react"
import { Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import svg from "../../assets/images/svg"
import CreatePasswordForm from "../../components/CreatePasswordForm"
import FillerForContinueRegistration from "../../components/FillerForContinueRegistration"
import FillerForRegistration from "../../components/FillerForRegistration"
import RegistrationHeader from "../../components/RegistrationHeader"
import RegisterContainer from "../../customComponents/RegisterContainer"
import { savePublisherData } from "../../utils/common"
import "./CreatePassword.scss"

export default function CreatePassword() {
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
          <CreatePasswordForm />
        </Col>

        <Col className="registration-slider d-lg-block d-none" lg={4}>
          <FillerForContinueRegistration slider={svg.slide1}>
            <p className="text-center">
              The first article is <br/> on us!
            </p>
          </FillerForContinueRegistration>
        </Col>
      </RegisterContainer>
    </div>
  )
}
