import React, { useEffect, useState } from "react"
import { termsAndConditions } from "../../api/request"
import RegistrationHeader from "../../components/RegistrationHeader"
import RegisterContainer from "../../customComponents/RegisterContainer"
import { Container } from "react-bootstrap"
import "./TermsAndConditions.scss"

export default function TermsAndConditions() {
  const [data, setData] = useState("")

  async function getData() {
    const temp = await termsAndConditions()
    setData(temp?.payload.results[0].body)
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(data)

  return (
    <div className="TermsAndConditions">
      <RegisterContainer>
        <RegistrationHeader />
        <h3 className="text-center my-3 text-danger">Terms and Conditions</h3>
        <Container className="px-4 text-justify tncData">
          <div
            className="html-text-content"
            dangerouslySetInnerHTML={{ __html: data }}
          ></div>
        </Container>
      </RegisterContainer>
    </div>
  )
}
