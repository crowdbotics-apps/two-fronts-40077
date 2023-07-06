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
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "../login/login.scss"
import ShowUpLogo from "../../assets/graphics/Show-Up-Logo.svg"
import { ReactComponent as EyeOn } from "../../assets/graphics/eye_on.svg"
import { ReactComponent as EyeOff } from "../../assets/graphics/eye_off.svg"
import { useOnboardingMutation } from "../../utils/mutations"
import { ALLROUTES } from "../../routes"

const VerifyOtp = () => {
  const nav = useNavigate()
  const resetPasswordVerifydMutation =
    useOnboardingMutation.useResetPasswordVerifyMutation()
  const resetPasswordSendMutation =
    useOnboardingMutation.useResetPasswordSendMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState(false)
  const location = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    setEmail(location.state?.email)
  }, [])

  const handleResendOtp = () => {
    resetPasswordSendMutation.mutate(
      { email },
      {
        onSuccess: ({ data, status }) => {
          if (status === 200) {
            toast.success("otp resent to your email")
          } else {
            console.error(data)
          }
        },
        onError: axiosError => {
          toast.error(axiosError?.response?.data.error)
          console.error(axiosError?.response?.data.error)
        }
      }
    )
  }

  const onSubmit = payload => {
    const verifyOtpPayload = {
      email,
      otp: payload.password
    }
    resetPasswordVerifydMutation.mutate(verifyOtpPayload, {
      onSuccess: ({ data, status }) => {
        if (status === 200) {
          nav(ALLROUTES.resetPassword, {
            state: { email, uid: data.u_id, token: data.token }
          })
        } else {
          console.error(data)
        }
      },
      onError: axiosError => {
        toast.error(axiosError?.response?.data.message)
        console.error(axiosError?.response?.data.message)
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
                <p className="mb-4 fw-normal fs-6">
                  Please enter the verification code that was sent to your email
                  address.
                </p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="d-flex align-item-start">
                      OTP
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Otp"
                        {...register("password", {
                          required: "Otp is required"
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
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3"
                    style={{
                      background: "#400201",
                      borderRadius: "7px",
                      width: "300px"
                    }}
                  >
                    Verify OTP
                  </Button>
                  <p className="mt-3 mb-0">
                    Didn't recieve yet?{" "}
                    <span
                      onClick={handleResendOtp}
                      style={{ color: "#400201", cursor: "pointer" }}
                      className="text-decoration-none fw-normal"
                    >
                      Resend Again
                    </span>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default VerifyOtp
