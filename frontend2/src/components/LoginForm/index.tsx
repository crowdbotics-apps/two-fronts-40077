import React, { useState } from "react"
import { Button, Container, Tab, Tabs } from "react-bootstrap"
import TextInput from "../../customComponents/TextInput"
import AlreadyHaveAccount from "../AlreadyHaveAccount"
import { useFormik } from "formik"
import "./styles.scss"
import { login } from "../../api/request"
import english from "../../utils/english"
import { useLocation, useNavigate } from "react-router-dom"
import { APPCONFIG } from "../../app-config"
import ConditionsAndPolicies from "../ConditionsAndPolicies"

export default function LoginForm() {
  const regBySlug = {
    EMAIL: "email",
    PHONE: "phone"
  }
  const { state: fwdState } = useLocation()
  const [registrationBy, setRegistrationBy] = useState(
    fwdState?.registrationBy || regBySlug.EMAIL
  )
  const nav = useNavigate()
  if (APPCONFIG.debug.forms) console.log("fwdState", fwdState)

  const {
    resetForm,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting
  } = useFormik({
    initialValues: {
      username: fwdState?.identity?.email || "",
      phoneNumber: fwdState?.identity?.phone_number || "",
      password: ""
    },
    onSubmit: async values => {
      if (APPCONFIG.debug.forms) console.log("fwdState", fwdState)
      const data = await login(values)
      sessionStorage.setItem(APPCONFIG.sessVars.token, data.payload.token)
      if (fwdState?.redirectUri) {
        nav(fwdState?.redirectUri)
      } else {
        nav(`/${APPCONFIG.routes.backToPublisher}`)
      }
      resetForm()
    }
  })

  return (
    <Container className="w-75 on-mobile-w-100">
      <div className="text-center">
        <h4 className="w-100">Continue registration using your</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <Tabs
          variant="pills"
          defaultActiveKey={registrationBy}
          id="register-by"
          className="tabs"
          justify
        >
          <Tab
            eventKey="email"
            title="Email"
            onClick={() => setRegistrationBy("email")}
          >
            <TextInput
              label="Enter email"
              name={"username"}
              type={"text"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
            />
          </Tab>
          <Tab
            eventKey="phone"
            title="Phone Number"
            onClick={() => setRegistrationBy("phoneNumber")}
          >
            <TextInput
              label="Phone number"
              name={"phoneNumber"}
              type={"phone"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phoneNumber}
            />
          </Tab>
        </Tabs>

        <TextInput
          label="Password"
          name={"password"}
          type={"password"}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />

        <ConditionsAndPolicies />

        <Button className="rounded-pill w-100 mt-2 register-btn" type="submit">
          Login
        </Button>
      </form>
      <AlreadyHaveAccount text={english.createAccount} target={"/"} />
    </Container>
  )
}
