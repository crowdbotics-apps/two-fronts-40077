import React, { useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import HeaderActionsBar from "../../components/header-actions-bar"
import { APPCONFIG } from "../../app-config"
import { useNavigate } from "react-router-dom"
import AppFormSelect from "../../components/form/select"
import { ALLROUTES } from "../../routes"
import { useSubscriptionContext } from "./context/subscription-context"
import { useSubscriptionMutation } from "../../utils/mutations"

const defaultPlans = [
  {
    cycle: "Monthly",
    price: 29.99
  },
  {
    cycle: "Yearly",
    price: 299.99
  },
  {
    cycle: "Monthly",
    price: 39.99
  },
  {
    cycle: "Yearly",
    price: 449.99
  }
]

const ScreenDashSubscriptionMain = () => {
  const { subscriptionPlan, refetchSubscriptionPlan } = useSubscriptionContext()
  const [paymentData, setPaymentData] = useState({
    payment_type: "credit card"
  })
  const [essentialsPlans, setEssentialPlans] = useState([])
  const [unlimitedPlans, setUnlimitedPlans] = useState([])
  const [subscribedPlan, setSubscribedPlan] = useState()
  const buySubscriptionPlan =
    useSubscriptionMutation.useBuySubscriptionPlanMutation()

  const nav = useNavigate()

  const [plan, setPlan] = useState(0)
  const [priceId, setPriceId] = useState("")

  useEffect(() => {
    refetchSubscriptionPlan()
  }, [])

  useEffect(() => {
    const essentialsPlans = subscriptionPlan?.data?.result?.filter(
      plan => plan.name === "Essentials Plan"
    )
    const unlimitedPlans = subscriptionPlan?.data?.result?.filter(
      plan => plan.name === "Unlimited Plan"
    )
    const subscribedPlan = subscriptionPlan?.data?.result?.filter(
      plan => plan.is_subscribed === true
    )
    setEssentialPlans(essentialsPlans)
    setUnlimitedPlans(unlimitedPlans)
    if (subscribedPlan && subscribedPlan.length) {
      setSubscribedPlan(subscribedPlan[0])
    }
  }, [subscriptionPlan])

  const handleInputChange = (fieldName, value) => {
    setPaymentData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const handleClick = (selectedPlan, price_id) => () => {
    setPlan(selectedPlan)
    setPriceId(price_id)
  }

  const handleEdit = selectedPlan => {
    nav(ALLROUTES.dashboardChildren.changeSubscription, {
      state: {
        selectedPlan
      }
    })
  }

  const descriptionPoints = plan => {
    if (plan && plan[0] && plan[0].description) {
      return plan[0]?.description
        ?.split("\n")
        ?.map((point, index) => <li key={index}>{point}</li>)
    }
  }

  const handleSubscribe = () => {
    if (paymentData && paymentData.payment_type === "credit card" && priceId) {
      const payload = {
        price_tier: priceId
      }
      buySubscriptionPlan.mutate(payload, {
        onSuccess: ({ data, status }) => {
          if ([200, 201].indexOf(status) > -1) {
            window.location.href = data?.url
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

  const checkedFirst = () => {
    if (
      subscribedPlan &&
      essentialsPlans &&
      essentialsPlans[0] &&
      essentialsPlans[0]?.id
    ) {
      if (subscribedPlan.id === essentialsPlans[0]?.id) {
        return true
      } else if (plan === essentialsPlans[0]?.id) {
        return true
      }
    }
  }

  const checkedSecond = () => {
    if (
      subscribedPlan &&
      essentialsPlans &&
      essentialsPlans[1] &&
      essentialsPlans[1]?.id
    ) {
      if (subscribedPlan.id === essentialsPlans[1]?.id) {
        return true
      } else if (plan === essentialsPlans[1]?.id) {
        return true
      }
    }
  }

  const checkedThird = () => {
    if (
      subscribedPlan &&
      unlimitedPlans &&
      unlimitedPlans[0] &&
      unlimitedPlans[0]?.id
    ) {
      if (subscribedPlan.id === unlimitedPlans[0]?.id) {
        return true
      } else if (plan === unlimitedPlans[0]?.id) {
        return true
      }
    }
  }

  const checkedFourth = () => {
    if (
      subscribedPlan &&
      unlimitedPlans &&
      unlimitedPlans[1] &&
      unlimitedPlans[1]?.id
    ) {
      if (subscribedPlan.id === unlimitedPlans[1]?.id) {
        return true
      } else if (plan === unlimitedPlans[1]?.id) {
        return true
      }
    }
  }

  return (
    <>
      <HeaderActionsBar className="application-main-header"></HeaderActionsBar>
      <h6>Subscription Type</h6>
      <div className="container">
        <div className="row">
          <div className="col auto pt-2">
            <div className="card">
              <div className="card-body card-content">
                <div className="container">
                  <div className="col">
                    <div className="row">
                      <h6 className="card-title title-content">
                        {(essentialsPlans &&
                          essentialsPlans[0] &&
                          essentialsPlans[0]?.name) ||
                          ""}
                      </h6>
                    </div>
                    <div className="col">
                      <div className="row">
                        <div className="form-check">
                          <div className="row">
                            <div className="col-4">
                              <input
                                className="form-check-input"
                                type="radio"
                                checked={checkedFirst()}
                                disabled={subscribedPlan && subscribedPlan?.id}
                                onClick={handleClick(
                                  essentialsPlans &&
                                    essentialsPlans[0] &&
                                    essentialsPlans[0],
                                  (essentialsPlans &&
                                    essentialsPlans[0] &&
                                    essentialsPlans[0]?.price_id) ||
                                    ""
                                )}
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                              >
                                {(essentialsPlans &&
                                  essentialsPlans[0] &&
                                  essentialsPlans[0]?.interval) ||
                                  ""}
                              </label>
                            </div>
                            <div className="col-4 fw-medium">
                              $
                              {(essentialsPlans &&
                                essentialsPlans[0] &&
                                essentialsPlans[0]?.price) ||
                                ""}
                              /
                              {(essentialsPlans &&
                                essentialsPlans[0] &&
                                essentialsPlans[0]?.interval) ||
                                ""}
                            </div>
                            {subscribedPlan?.id ? (
                              <div className="col-4">
                                {" "}
                                {subscribedPlan &&
                                  essentialsPlans &&
                                  essentialsPlans[0] &&
                                  essentialsPlans[0]?.id &&
                                  subscribedPlan.id ===
                                    essentialsPlans[0]?.id && (
                                    <Button
                                      variant={"primary"}
                                      onClick={() =>
                                        handleEdit(
                                          essentialsPlans && essentialsPlans[0]
                                        )
                                      }
                                      disabled={true}
                                      style={{
                                        padding: "2px",
                                        height: "20px",
                                        fontSize: "12px",
                                        backgroundColor: "#E1C99DCC",
                                        color: "#4D3A17"
                                      }}
                                    >
                                      {"Your Active Plan"}
                                    </Button>
                                  )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row pb-3">
                      <div className="form-check">
                        <div className="row">
                          <div className="col-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              checked={checkedSecond()}
                              disabled={subscribedPlan && subscribedPlan?.id}
                              onClick={handleClick(
                                essentialsPlans &&
                                  essentialsPlans[1] &&
                                  essentialsPlans[1],
                                (essentialsPlans &&
                                  essentialsPlans[1] &&
                                  essentialsPlans[1]?.price_id) ||
                                  ""
                              )}
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            >
                              {(essentialsPlans &&
                                essentialsPlans[0] &&
                                essentialsPlans[1]?.interval) ||
                                ""}
                            </label>
                          </div>
                          <div className="col-4 fw-medium">
                            $
                            {(essentialsPlans &&
                              essentialsPlans[0] &&
                              essentialsPlans[1].price) ||
                              ""}
                            /
                            {(essentialsPlans &&
                              essentialsPlans[0] &&
                              essentialsPlans[1]?.interval) ||
                              ""}
                          </div>
                          {subscribedPlan?.id ? (
                            <div className="col-4">
                              {" "}
                              {subscribedPlan &&
                                essentialsPlans &&
                                essentialsPlans[1] &&
                                essentialsPlans[1]?.id &&
                                subscribedPlan.id ===
                                  essentialsPlans[1]?.id && (
                                  <Button
                                    variant={"primary"}
                                    onClick={() =>
                                      handleEdit(
                                        essentialsPlans && essentialsPlans[1]
                                      )
                                    }
                                    disabled={true}
                                    style={{
                                      backgroundColor: "#E1C99DCC",
                                      color: "#4D3A17",
                                      padding: "2px",
                                      height: "20px",
                                      fontSize: "12px"
                                    }}
                                  >
                                    {"Your Active Plan"}
                                  </Button>
                                )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {descriptionPoints(essentialsPlans)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col auto pt-2">
            <div className="card">
              <div className="card-body card-content">
                <div className="container">
                  <div className="col">
                    <div className="row">
                      <h6 className="card-title title-content">
                        {(unlimitedPlans &&
                          unlimitedPlans[0] &&
                          unlimitedPlans[0]?.name) ||
                          ""}
                      </h6>
                    </div>
                    <div className="col">
                      <div className="row">
                        <div className="form-check">
                          <div className="row">
                            <div className="col-4">
                              <input
                                className="form-check-input"
                                type="radio"
                                checked={checkedThird()}
                                disabled={subscribedPlan && subscribedPlan?.id}
                                onClick={() =>
                                  handleClick(
                                    unlimitedPlans &&
                                      unlimitedPlans[0] &&
                                      unlimitedPlans[0],
                                    unlimitedPlans &&
                                      unlimitedPlans[0] &&
                                      unlimitedPlans[0]?.price_id
                                  )
                                }
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                              >
                                {(unlimitedPlans &&
                                  unlimitedPlans[0] &&
                                  unlimitedPlans[0]?.interval) ||
                                  ""}
                              </label>
                            </div>
                            <div className="col-4 fw-medium">
                              $
                              {(unlimitedPlans &&
                                unlimitedPlans[0] &&
                                unlimitedPlans[0].price) ||
                                ""}
                              /
                              {(unlimitedPlans &&
                                unlimitedPlans[0] &&
                                unlimitedPlans[0]?.interval) ||
                                ""}
                            </div>
                            {subscribedPlan?.id ? (
                              <div className="col-4">
                                {" "}
                                {unlimitedPlans &&
                                  unlimitedPlans &&
                                  unlimitedPlans[0] &&
                                  unlimitedPlans[0]?.id &&
                                  subscribedPlan?.id ===
                                    unlimitedPlans[0]?.id && (
                                    <Button
                                      variant={"primary"}
                                      onClick={() =>
                                        handleEdit(
                                          unlimitedPlans && unlimitedPlans[0]
                                        )
                                      }
                                      disabled={true}
                                      style={{
                                        padding: "2px",
                                        height: "20px",
                                        fontSize: "12px",
                                        backgroundColor: "#E1C99DCC",
                                        color: "#4D3A17"
                                      }}
                                    >
                                      {"Your Active Plan"}
                                    </Button>
                                  )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row pb-3">
                      <div className="form-check">
                        <div className="row">
                          <div className="col-4">
                            <input
                              className="form-check-input"
                              checked={checkedFourth()}
                              disabled={subscribedPlan && subscribedPlan?.id}
                              onClick={handleClick(
                                unlimitedPlans &&
                                  unlimitedPlans[1] &&
                                  unlimitedPlans[1],
                                unlimitedPlans &&
                                  unlimitedPlans[1] &&
                                  unlimitedPlans[1]?.price_id
                              )}
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            >
                              {(unlimitedPlans &&
                                unlimitedPlans[1] &&
                                unlimitedPlans[1]?.interval) ||
                                ""}
                            </label>
                          </div>
                          <div className="col-4 fw-medium">
                            $
                            {(unlimitedPlans &&
                              unlimitedPlans[1] &&
                              unlimitedPlans[1].price) ||
                              ""}
                            /
                            {(unlimitedPlans &&
                              unlimitedPlans[1] &&
                              unlimitedPlans[1]?.interval) ||
                              ""}
                          </div>
                          {subscribedPlan?.id ? (
                            <div className="col-4">
                              {" "}
                              {unlimitedPlans &&
                                unlimitedPlans &&
                                unlimitedPlans[1] &&
                                unlimitedPlans[1]?.id &&
                                subscribedPlan?.id ===
                                  unlimitedPlans[1]?.id && (
                                  <Button
                                    variant={"primary"}
                                    onClick={() =>
                                      handleEdit(
                                        unlimitedPlans && unlimitedPlans[1]
                                      )
                                    }
                                    disabled={true}
                                    style={{
                                      padding: "2px",
                                      height: "20px",
                                      fontSize: "12px",
                                      backgroundColor: "#E1C99DCC",
                                      color: "#4D3A17"
                                    }}
                                  >
                                    {"Your Active Plan"}
                                  </Button>
                                )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {descriptionPoints(unlimitedPlans)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {plan?.id && !subscribedPlan?.id ? (
        <div className="container" style={{ marginTop: "24px" }}>
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
                      <div className="row">
                        <h6 className="card-title title-content">
                          {plan?.name || ""}
                        </h6>
                      </div>
                      <div className="form-check radio-input">
                        <input
                          className="form-check-input"
                          checked
                          readOnly
                          name="selected"
                          type="radio"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label fw-bold"
                          htmlFor="flexRadioDefault1"
                        >
                          {plan?.interval || ""}
                        </label>
                        <span>
                          {plan?.price
                            ? `$${plan?.price}/${plan?.interval}`
                            : null}
                        </span>
                      </div>
                      <hr />
                      <div className="price">
                        <label>
                          <b>Total</b>
                        </label>
                        <span>
                          <b>{plan?.price ? `$${plan?.price}` : null}</b>
                        </span>
                      </div>
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
              onClick={handleSubscribe}
              variant="light"
            >
              Subscribe
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}
export default ScreenDashSubscriptionMain
