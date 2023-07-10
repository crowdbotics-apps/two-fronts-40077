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
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "../login/login.scss"
import { ReactComponent as EyeOn } from "../../assets/graphics/eye_on.svg"
import { ReactComponent as EyeOff } from "../../assets/graphics/eye_off.svg"
import { useSettingsMutation } from "../../utils/mutations"
import { ALLROUTES } from "../../routes"

const ChangePassword = () => {
  const nav = useNavigate()
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)
  const changePasswordMutation = useSettingsMutation.useChangePasswordMutation()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleRetypePasswordVisibility = () => {
    setShowRetypePassword(!showRetypePassword)
  }

  const oldPassword = watch("oldPassword")
  const password = watch("password")
  const retypePassword = watch("retypePassword")

  const onSubmit = payload => {
    const changePasswordPayload = {
      old_password: payload.oldPassword,
      new_password1: password,
      new_password2: retypePassword
    }
    changePasswordMutation.mutate(changePasswordPayload, {
      onSuccess: ({ data, status }) => {
        if (status === 201) {
          toast.success("Password change successful")
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

  const handleCancel = () => {
    nav(ALLROUTES.dashboardContainer)
  }

  return (
    <Container
      fluid
      className="container-fluid d-flex align-items-center justify-content-center"
    >
      <Row className="grid-container">
        <Col className="mx-auto">
          <Card.Body className="text-center">
            <h6>Change Password</h6>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-item-start">
                  Old Password
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showOldPassword ? "text" : "password"}
                    {...register("oldPassword", {
                      required: "Old Password is required",
                      minLength: {
                        value: 6,
                        message: "Password should be at least 6 characters long"
                      }
                    })}
                    isInvalid={errors.oldPassword}
                  />
                  <InputGroup.Text onClick={toggleOldPasswordVisibility}>
                    {showOldPassword ? <EyeOff /> : <EyeOn />}
                  </InputGroup.Text>
                </InputGroup>
                {errors.oldPassword && (
                  <Form.Control.Feedback type="invalid">
                    {errors.oldPassword.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

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
                        message: "Password should be at least 6 characters long"
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
                  width: "50%",
                  marginRight: "1rem"
                }}
              >
                Change Password
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                onClick={handleCancel}
                style={{
                  background: "#400201",
                  borderRadius: "7px",
                  width: "40%"
                }}
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  )
}
export default ChangePassword
