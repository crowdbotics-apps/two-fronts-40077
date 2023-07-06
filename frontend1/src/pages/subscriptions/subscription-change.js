import React, { useEffect, useState } from "react"
import { Button, Form, Card } from "react-bootstrap"
import { APPCONFIG } from "../../app-config"
import AppFormSelect from "../../components/form/select"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useSubscriptionMutation } from "../../utils/mutations"

const SubscriptionEditPayment = () => {
  const [paymentData, setPaymentData] = useState({
    payment_type: "credit card"
  })

  const [editPlan, setEditPlan] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState()
  const nav = useNavigate()
  const buySubscriptionPlan =
    useSubscriptionMutation.useBuySubscriptionPlanMutation()

  const location = useLocation()
  const handleEdit = () => {
    setEditPlan(true)
  }

  useEffect(() => {
    setSelectedPlan(location?.state?.selectedPlan)
  }, [])

  const handleInputChange = (fieldName, value) => {
    setPaymentData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const handleSubcribe = () => {
    if (
      paymentData &&
      paymentData.payment_type === "credit card" &&
      selectedPlan?.price_id
    ) {
      const payload = {
        price_tier: selectedPlan?.price_id
      }
      buySubscriptionPlan.mutate(payload, {
        onSuccess: ({ data, status }) => {
          if ([200, 201].indexOf(status) > -1) {
            toast.success("change subscription successfull")
            nav("/dashboard/subscription")
          } else {
            console.error(data)
          }
        },
        onError: axiosError => {
          console.error(axiosError?.response?.data)
        }
      })
    }
  }

  return (
    <>
      <div className="d-flex flex-column col-12 ms-3">
        <div className="row">
          <div className="col-12 mt-3 mb-3">
            <h6 className="mb-0">Change my subscription</h6>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-auto width-50">
              <div className="h-100">
                <Card>
                  <div className="d-flex flex-column p-3">
                    <Form.Group className="d-flex flex-column">
                      <Form.Label className="d-flex align-item-start mb-1 mt-2">
                        Payment Type
                      </Form.Label>
                      <AppFormSelect
                        ariaLabel="Payment Type"
                        className="payment-type-selector"
                        name={`payment-type`}
                        selectedItem={paymentData?.payment_type || ""}
                        onChangeCallback={event => {
                          handleInputChange(
                            "payment_type",
                            event?.target?.value
                          )
                        }}
                        options={APPCONFIG.paymentType}
                      />
                    </Form.Group>
                    {paymentData?.payment_type === "cheque" && (
                      <div>
                        <Form.Group className="d-flex flex-column mt-2">
                          <Form.Label className="d-flex align-item-start mb-1 mt-2">
                            Purchase order number (optional)
                          </Form.Label>
                          <Form.Control />
                        </Form.Group>
                        <Form.Group className="d-flex flex-column mt-2">
                          <Form.Label className="d-flex align-item-start mb-1 mt-2">
                            Organization name
                          </Form.Label>
                          <Form.Control />
                        </Form.Group>
                        <Form.Group className="d-flex flex-column mt-2">
                          <Form.Label className="d-flex align-item-start mb-1 mt-2">
                            Street address
                          </Form.Label>
                          <Form.Control />
                        </Form.Group>
                        <Form.Group className="d-flex flex-column mt-2">
                          <Form.Label className="d-flex align-item-start mb-1 mt-2">
                            City
                          </Form.Label>
                          <Form.Control />
                        </Form.Group>
                        <div className="row">
                          <div className="col-6">
                            <Form.Group className="d-flex flex-column mt-2">
                              <Form.Label className="d-flex align-item-start mb-1 mt-2">
                                State
                              </Form.Label>
                              <Form.Control />
                            </Form.Group>
                          </div>
                          <div className="col-6">
                            <Form.Group className="d-flex flex-column mt-2">
                              <Form.Label className="d-flex align-item-start mb-1 mt-2">
                                Zip
                              </Form.Label>
                              <Form.Control />
                            </Form.Group>
                          </div>
                        </div>
                        <b style={{ margin: "20px 0px 8px", fontSize: "16px" }}>
                          Invoices will be addressed to
                        </b>
                        <Form.Group className="d-flex flex-column mt-2">
                          <Form.Label className="d-flex align-item-start mb-1 mt-2">
                            Name
                          </Form.Label>
                          <Form.Control />
                        </Form.Group>
                        <Form.Group className="d-flex flex-column mt-2">
                          <Form.Label className="d-flex align-item-start mb-1 mt-2">
                            Title
                          </Form.Label>
                          <Form.Control />
                        </Form.Group>
                        <Form.Group className="d-flex flex-column mt-2">
                          <Form.Label className="d-flex align-item-start mb-1 mt-2">
                            Email
                          </Form.Label>
                          <Form.Control />
                        </Form.Group>
                        <Form.Group className="d-flex flex-column mt-2">
                          <Form.Label className="d-flex align-item-start mb-1 mt-2">
                            Phone
                          </Form.Label>
                          <Form.Control />
                        </Form.Group>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
            <div className="col-auto width-50">
              <div className="card border-hidden">
                <div className="card-body card-content">
                  <div className="container">
                    <div className="col">
                      {editPlan ? (
                        <div>
                          <div className="row">
                            <h6 className="card-title title-content">
                              Essentials Plan
                            </h6>
                          </div>
                          <div className="form-check radio-input">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              Monthly
                            </label>
                            <span>
                              $29.99/month
                              <Button
                                variant={"primary"}
                                style={{
                                  padding: "2px",
                                  height: "20px",
                                  fontSize: "12px"
                                }}
                              >
                                Upgrade
                              </Button>
                            </span>
                          </div>
                          <div className="form-check radio-input">
                            <input
                              className="form-check-input"
                              type="radio"
                              checked
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              Yearly
                            </label>
                            <span>
                              $299.99/year
                              <Button
                                variant={"primary"}
                                style={{
                                  background: "#E1C99D",
                                  padding: "2px",
                                  height: "20px",
                                  fontSize: "12px"
                                }}
                              >
                                Your Current Plan
                              </Button>
                            </span>
                          </div>
                          <div className="row mt-4">
                            <h6 className="card-title title-content">
                              Unlimited Plan
                            </h6>
                          </div>
                          <div className="form-check radio-input">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              Monthly
                            </label>
                            <span>
                              $39.99/month
                              <Button
                                variant={"primary"}
                                style={{
                                  padding: "2px",
                                  height: "20px",
                                  fontSize: "12px"
                                }}
                              >
                                Upgrade
                              </Button>
                            </span>
                          </div>
                          <div className="form-check radio-input">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              Yearly
                            </label>
                            <span>
                              $449.99/year
                              <Button
                                variant={"primary"}
                                style={{
                                  padding: "2px",
                                  height: "20px",
                                  fontSize: "12px"
                                }}
                              >
                                Upgrade
                              </Button>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="row">
                            <h6 className="card-title title-content">
                              {selectedPlan?.name || ""}
                            </h6>
                          </div>
                          <div className="form-check radio-input">
                            <input
                              className="form-check-input"
                              type="radio"
                              checked
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              {selectedPlan?.interval || ""}
                              {/* <a href="#" onClick={handleEdit}>
                              Edit
                            </a> */}
                            </label>
                            <span>
                              {selectedPlan?.price
                                ? `$${selectedPlan?.price}/${selectedPlan?.interval}`
                                : ""}
                            </span>
                          </div>
                        </div>
                      )}
                      <hr />
                      <div className="price">
                        <label>
                          <b>Total due today</b>
                        </label>
                        <span>
                          <b>
                            {selectedPlan?.price
                              ? `$${selectedPlan?.price}`
                              : ""}
                          </b>
                        </span>
                      </div>
                      <label>
                        *Because you are upgrading in the middle of your
                        previous billing cycle, you will receive a pro-rated
                        credit towards your new subscription.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button
              style={{
                margin: "12px 8px 0px auto",
                width: "auto"
              }}
              onClick={handleSubcribe}
              variant="light"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default SubscriptionEditPayment
