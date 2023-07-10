import React, { useState } from "react"
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from "react-bootstrap"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import ShowUpLogo from "../../assets/graphics/Show-Up-Logo.svg"
import { ReactComponent as EyeOn } from "../../assets/graphics/eye_on.svg"
import { ReactComponent as EyeOff } from "../../assets/graphics/eye_off.svg"
import { Link, useNavigate } from "react-router-dom"
import { useOnboardingMutation } from "../../utils/mutations"
import { ALLROUTES } from "../../routes"
import { useOnBoardingQuery } from "../../utils/queries"
import BasicModalContent from "../../components/modal/basic-modal-content"

const ScreenSignUp = () => {
  const nav = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)
  const [showTermsOfUse, setShowTermsOfUse] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()
  const { data: termsData } = useOnBoardingQuery.useTermsQuery({
    enabled: true
  })
  const { data: policyData } = useOnBoardingQuery.usePrivacyPolicyQuery({
    enabled: true
  })
  const signupMutation = useOnboardingMutation.useSignupMutation()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleRetypePasswordVisibility = () => {
    setShowRetypePassword(!showRetypePassword)
  }

  const password = watch("password")
  const retypePassword = watch("retypePassword")

  const onSubmit = payload => {
    const signUpParams = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email || "",
      password: payload.password || "",
      user_type: "Teacher"
    }
    signupMutation.mutate(signUpParams, {
      onSuccess: ({ data, status }) => {
        if (status === 201) {
          toast.success("user successfully registered")
          nav(ALLROUTES.login)
        } else {
          console.error(data)
        }
      },
      onError: axiosError => {
        toast.error(axiosError?.response?.data?.error)
        console.error(axiosError?.response?.data)
      }
    })
  }

  const handleTermsOfUse = () => {
    setShowTermsOfUse(!showTermsOfUse)
  }

  const handlePrivacyPolicy = () => {
    setShowPrivacyPolicy(!showPrivacyPolicy)
  }

  return (
    <div className="app-background">
      <Container
        fluid
        className="container-fluid d-flex align-items-center justify-content-center vh-100"
      >
        <Row className="grid-container">
          <Col className="mx-auto">
            <Card className="p-1">
              <Card.Body className="text-center">
                <img src={ShowUpLogo} alt="App Logo" className="mb-2" />
                <p
                  className="mb-2 fw-semibold fs-6"
                  style={{ color: "#400201" }}
                >
                  Please sign up in the mobile app if you are a student or
                  parent user.
                </p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-1">
                    <Form.Label className="d-flex align-item-start">
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      {...register("firstName", {
                        required: "First name is required"
                      })}
                      isInvalid={errors.firstName}
                    />
                    {errors.firstName && (
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <Form.Label className="d-flex align-item-start">
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      {...register("lastName", {
                        required: "Last name is required"
                      })}
                      isInvalid={errors.lastName}
                    />
                    {errors.lastName && (
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <Form.Label className="d-flex align-item-start">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      isInvalid={errors.email}
                    />
                    {errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <Form.Label className="d-flex align-item-start">
                      Password
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password should be at least 6 characters long"
                          }
                        })}
                        isInvalid={errors.password}
                      />
                      <InputGroup.Text onClick={togglePasswordVisibility}>
                        {showPassword ? <EyeOff /> : <EyeOn />}
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <Form.Label className="d-flex align-item-start">
                      Retype Password
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showRetypePassword ? "text" : "password"}
                        {...register("retypePassword", {
                          required: "Retype password is required",
                          validate: value =>
                            value === password || "Passwords do not match"
                        })}
                        isInvalid={errors.retypePassword}
                      />
                      <InputGroup.Text onClick={toggleRetypePasswordVisibility}>
                        {showRetypePassword ? <EyeOff /> : <EyeOn />}
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.retypePassword && (
                      <Form.Control.Feedback type="invalid">
                        {errors.retypePassword.message}
                      </Form.Control.Feedback>
                    )}
                    {retypePassword !== password && (
                      <Form.Text className="text-danger">
                        Passwords do not match
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Check
                      type="checkbox"
                      label={
                        <span>
                          I have read and agree with the{" "}
                          <Link
                            onClick={handlePrivacyPolicy}
                            style={{ color: "#400201", fontWeight: 500 }}
                            className="text-decoration-none"
                          >
                            privacy policy
                          </Link>{" "}
                          and{" "}
                          <Link
                            onClick={handleTermsOfUse}
                            style={{ color: "#400201", fontWeight: 500 }}
                            className="text-decoration-none"
                          >
                            terms of use
                          </Link>
                          .
                        </span>
                      }
                      {...register("agree", {
                        required: "You must agree to the terms and conditions"
                      })}
                      isInvalid={errors.agree}
                    />
                    {errors.agree && (
                      <Form.Control.Feedback type="invalid">
                        {errors.agree.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-1"
                    style={{
                      background: "#400201",
                      borderRadius: "7px"
                    }}
                  >
                    Sign up
                  </Button>
                  <p className="mt-3 mb-0">
                    Already have an account?{" "}
                    <Link
                      to={`${process.env.PUBLIC_URL}/login`}
                      style={{ color: "#400201", fontWeight: 500 }}
                      className="text-decoration-none"
                    >
                      Sign in
                    </Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {showPrivacyPolicy ? (
          <div className="modal d-flex" tabIndex="-1">
            <BasicModalContent
              title={"Privacy Policy"}
              handleClose={handlePrivacyPolicy}
              content={policyData?.data[0]?.body}
            />
          </div>
        ) : null}
        {showTermsOfUse ? (
          <div className="modal d-flex" tabIndex="-1">
            <BasicModalContent
              title={"Terms and conditions"}
              handleClose={handleTermsOfUse}
              content={termsData?.data[0]?.body}
            />
          </div>
        ) : null}
      </Container>
    </div>
  )
}
export default ScreenSignUp
