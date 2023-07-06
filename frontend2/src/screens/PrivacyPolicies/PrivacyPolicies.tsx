import React, { useEffect, useState } from "react"
import { privacyPolicies } from "../../api/request"
import RegistrationHeader from "../../components/RegistrationHeader"
import RegisterContainer from "../../customComponents/RegisterContainer"
import { Container } from "react-bootstrap"
import "./PrivacyPolicies.scss"

export default function PrivacyPolicies() {
  const [data, setData] = useState("")

  async function getData() {
    const temp = await privacyPolicies()
    setData(temp?.payload.results[0].body)
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(data)

  return (
    <div className="PrivacyPolicies">
      <RegisterContainer>
        <RegistrationHeader />
        <h3 className="text-center my-3 text-danger">Privacy Policies</h3>
        <Container className="px-4 text-justify policiesData">
          <div
            className="html-text-content"
            dangerouslySetInnerHTML={{ __html: data }}
          ></div>
        </Container>
      </RegisterContainer>
    </div>
  )
}
