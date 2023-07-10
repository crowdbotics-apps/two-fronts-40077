import React, { useState } from "react"
import { Button, Container, Tab, Tabs } from "react-bootstrap"
import svg from "../../assets/images/svg"
import TextInput from "../../customComponents/TextInput"
import AlreadyHaveAccount from "../AlreadyHaveAccount"
import { useFormik } from "formik"
import "./styles.scss"
import { registerByEmail, registerByPhone } from "../../api/request"
import { useNavigate } from "react-router-dom"
import EndPoints from "../../api/endPoints"
import { registrationSchema } from "../../utils/validations"
import english from "../../utils/english"
import { APPCONFIG } from "../../app-config"
import ConditionsAndPolicies from "../ConditionsAndPolicies"

export default function RegistrationForm() {
  const nav = useNavigate()

  const [registrationBy, setRegistrationBy] = useState("email")

  const registerSubmit = async values => {
    if (registrationBy === "phone_number" && values.phone_number === "") {
      errors.phone_number = "Required"
      return
    }

    try {
      const data =
        registrationBy === "email"
          ? await registerByEmail(values)
          : await registerByPhone(values)

      if (data?.success) {
        nav(`/${APPCONFIG.routes.verifyOtp}`, {
          state: { identity: values, registrationBy: registrationBy, ...data?.payload?.data } // sending is_password_set forward
        })
      }
      resetForm()
    } catch (e:any) {
      console.log("ERR", e)
      switch(e?.response?.status) {
        case APPCONFIG.responseStatuses.SIGNUP_USER_EXISTS:
          nav(`/${APPCONFIG.routes.login}`, {
            state: { identity: values, registrationBy: registrationBy }
          })
        break;/*
        case APPCONFIG.responseStatuses.PASSWORD_NOT_SET:
          nav(`/${APPCONFIG.routes.verifyOtp}`, {
            state: { identity: values, registrationBy: registrationBy, passwordNotSet: true }
          })
        break;*/
      }
    }
  }

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
      email: "",
      phone_number: ""
    },
    validationSchema: registrationSchema,
    onSubmit: registerSubmit
  })
  if (APPCONFIG.debug.forms) console.log("[RegistrationForm]", errors)
  return (
    <Container className="w-75 on-mobile-w-100">
      <div className="text-center">
        <h4 className="w-100">Continue registration using your</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <Tabs
          variant="pills"
          defaultActiveKey="email"
          id="register-by"
          className="tabs"
          justify
          onClick={() => resetForm}
        >
          <Tab
            eventKey="email"
            title="Email"
            onClick={() => {
              setRegistrationBy("email")
            }}
          >
            <TextInput
              label="Enter email"
              name={"email"}
              type={"email"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
            />
          </Tab>
          <Tab
            eventKey="phone"
            title="Phone Number"
            onClick={() => setRegistrationBy("phone_number")}
          >
            <TextInput
              label="Phone number"
              name={"phone_number"}
              type={"phone"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone_number}
            />
          </Tab>
        </Tabs>

        <ConditionsAndPolicies />

        <Button className="rounded-pill w-100 mt-2 register-btn" type="submit">
          Register now
        </Button>
      </form>
      <AlreadyHaveAccount
        text={english.haveAccount}
        target={`/${APPCONFIG.routes.login}`}
      />
    </Container>
  )
}
