import React, { useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import "../login/login.scss"
import ShowUpLogo from "../../assets/graphics/Show-Up-Logo.svg"
import { ALLROUTES } from "../../routes"
import { useOnboardingMutation } from "../../utils/mutations"

const VerifyEmail = () => {
  const nav = useNavigate()
  const resetPasswordSendMutation =
    useOnboardingMutation.useResetPasswordSendMutation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = payload => {
    resetPasswordSendMutation.mutate(payload, {
      onSuccess: ({ data, status }) => {
        if (status === 200) {
          nav(ALLROUTES.verifyOtp, {
            state: { email: payload.email }
          })
        } else {
          console.error(data)
        }
      },
      onError: axiosError => {
        toast.error(axiosError?.response?.data.error)
        console.error(axiosError?.response?.data.error)
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
                  To reset your password, you need your email that can be
                  authenticated
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
                    Send OTP
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
export default VerifyEmail
