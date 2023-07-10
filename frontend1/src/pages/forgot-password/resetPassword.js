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

const ResetPassword = () => {
  const nav = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)
  const resetPasswordResetdMutation =
    useOnboardingMutation.useResetPasswordResetMutation()
  const [uid, setUid] = useState("")
  const [token, setToken] = useState("")
  const [from, setFrom] = useState("")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    setUid(location.state?.uid)
    setToken(location.state?.token)
    setFrom(location.state?.from)
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleRetypePasswordVisibility = () => {
    setShowRetypePassword(!showRetypePassword)
  }

  const password = watch("password")
  const retypePassword = watch("retypePassword")

  const onSubmit = payload => {
    const verifyResetPayload = {
      new_password1: password,
      new_password2: retypePassword,
      u_id: uid,
      token
    }
    resetPasswordResetdMutation.mutate(verifyResetPayload, {
      onSuccess: ({ data, status }) => {
        if (status === 201) {
          toast.success("Password reset successful")
          nav(ALLROUTES.login)
        } else {
          console.error(data)
        }
      },
      onError: axiosError => {
        toast.error(axiosError?.response?.data.message)
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
                <p className="mb-4 fw-normal fs-6">Enter your new password</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-item-start">
                      New Password
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

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-item-start">
                      Confirm Password
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
                    Change Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default ResetPassword
