import React, { useEffect, useState } from "react"
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
import { Link, useNavigate } from "react-router-dom"
import "./login.scss"
import ShowUpLogo from "../../assets/graphics/Show-Up-Logo.svg"
import { ReactComponent as EyeOn } from "../../assets/graphics/eye_on.svg"
import { ReactComponent as EyeOff } from "../../assets/graphics/eye_off.svg"
import { useOnboardingMutation } from "../../utils/mutations"
import { ALLROUTES } from "../../routes"
import { APPCONFIG } from "../../app-config"
import { useAppContext } from "../../contexts/app-context"
import { carryOutLogout } from "../../utils/common"

const ScreenLogin = () => {
  const nav = useNavigate()

  const { setIsUserLoggedIn } = useAppContext()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    carryOutLogout(setIsUserLoggedIn)
    // Check if rememberMe is set in localStorage
    const rememberMeValue = localStorage.getItem("rememberMe")
    if (rememberMeValue === "true") {
      // Restore the saved email and password from localStorage
      const savedEmail = localStorage.getItem("savedEmail")
      const savedPassword = localStorage.getItem("savedPassword")
      if (savedEmail) {
        setValue("email", savedEmail)
        setValue("password", savedPassword)
      }
      // Update the rememberMe state
      setRememberMe(true)
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()
  const loginMutation = useOnboardingMutation.useLoginMutation()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleRememberMeChange = e => {
    const isChecked = e.target.checked
    setRememberMe(isChecked)

    // Save the rememberMe value in localStorage
    localStorage.setItem("rememberMe", isChecked)

    // If unchecked, remove the saved email and password from localStorage
    if (!isChecked) {
      localStorage.removeItem("savedEmail")
      localStorage.removeItem("savedPassword")
    }
  }

  const onSubmit = payload => {
    console.log("onSubmit")
    const loginParams = {
      username: payload.email,
      password: payload.password || ""
    }
    loginMutation.mutate(loginParams, {
      onSuccess: ({ data, status }) => {
        if (status === 200 && !!data?.token) {
          // Save the email and password in localStorage if rememberMe is checked
          if (rememberMe) {
            localStorage.setItem("savedEmail", payload.email)
            localStorage.setItem("savedPassword", payload.password)
          } else {
            // Remove the saved email and password from localStorage if rememberMe is unchecked
            localStorage.removeItem("savedEmail")
            localStorage.removeItem("savedPassword")
          }

          sessionStorage.setItem(
            APPCONFIG.sessionVariables.AUTH_TOKEN,
            data?.token
          )
          sessionStorage.setItem(
            APPCONFIG.sessionVariables.USER_DATA,
            JSON.stringify(data?.user)
          )
          setIsUserLoggedIn(true)
          nav(ALLROUTES.dashboardChildren.roles)
        } else {
          console.error(data)
        }
      },
      onError: axiosError => {
        toast.error(axiosError?.response?.data?.non_field_errors[0])
        console.error(axiosError?.response?.data)
      }
    })
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
                <img src={ShowUpLogo} alt="App Logo" className="mb-4" />
                <p className="mb-4 fw-semibold" style={{ color: "#400201" }}>
                  Teacher Workspace
                </p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="d-flex align-item-start w-100">
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

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="d-flex align-item-start">
                      Password
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        {...register("password", {
                          required: "Password is required"
                        })}
                        isInvalid={errors.password}
                      />
                      <InputGroup.Text
                        className="eye-button"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff /> : <EyeOn />}
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Row className="mb-3 align-items-start">
                    <Col xs={6} className="ps-1">
                      <Form.Check>
                          <Form.Check.Label className="remember-me-label" >
                          Remember me
                        </Form.Check.Label>
                        <Form.Check.Input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                      </Form.Check>
                    </Col>
                    <Col xs={6} className="text-end">
                      <Link
                        to={ALLROUTES.verifyEmail}
                        className="text-decoration-none fw-semibold"
                        style={{ color: "#400201" }}
                      >
                        Forgot password?
                      </Link>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      background: "#400201",
                      borderRadius: "7px",
                      width: "300px"
                    }}
                  >
                    Sign In
                  </Button>
                  {/* <p className="mt-3 mb-0">
                    New to Showup?{" "}
                    <Link
                      // to="/signup"
                      style={{ color: "#400201" }}
                      className="text-decoration-none fw-normal"
                    >
                      Signup
                    </Link>
                  </p> */}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default ScreenLogin
