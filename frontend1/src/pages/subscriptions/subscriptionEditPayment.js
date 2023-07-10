import React, { useState } from "react"
import { Button, Form, Card } from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { APPCONFIG } from "../../app-config"
import AppFormSelect from "../../components/form/select"
import { useNavigate } from "react-router-dom"

const SubscriptionEditPayment = () => {
  const nav = useNavigate()
  const [paymentData, setPaymentData] = useState()

  const handleSave = () => {}

  const handleCancel = () => {
    setPaymentData({})
    nav('/dashboard/subscription')
  }

  const handleInputChange = (fieldName, value) => {
    setPaymentData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const handleDateChange = (fieldName, value) => {
    setPaymentData?.(prevData => ({
      ...prevData,
      [fieldName]: value
    }))
  }

  return (
    <>
      <div className="d-flex flex-column col-8 ms-3">
        <div className="row">
          <div className="col-12 mt-3 mb-3">
            <h6 className="mb-0">Edit Payment mode</h6>
          </div>
        </div>
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
                  options={APPCONFIG.paymentType}
                  selectedItem={paymentData?.payment_type || ""}
                  onChangeCallback={event => {
                    handleInputChange("payment_type", event?.target?.value)
                  }}
                />
              </Form.Group>

              <Form.Group className="d-flex flex-column mt-2">
                <Form.Label className="d-flex align-item-start mb-1 mt-2">
                  Name on card
                </Form.Label>
                <Form.Control
                  name={`name`}
                  value={paymentData?.name || ""}
                  onChange={event => {
                    handleInputChange("name", event?.target?.value)
                  }}
                />
              </Form.Group>
              <Form.Group className="d-flex flex-column mt-2">
                <Form.Label className="d-flex align-item-start mb-1 mt-2">
                  Card Number
                </Form.Label>
                <Form.Control
                  name={`cardNumber`}
                  value={paymentData?.card_number || ""}
                  onChange={event => {
                    handleInputChange("card_number", event?.target?.value)
                  }}
                />
              </Form.Group>
              <div className="d-flex align-items-start mt-2">
                <div className="d-flex flex-column col-6 mt-2 me-2">
                  <Form.Label className="mb-1">Expires</Form.Label>
                  <DatePicker
                    selected={paymentData?.expire_date}
                    onChange={date => handleDateChange("expire_date", date)}
                  />
                </div>
                <div className="d-flex flex-column col-6 mt-2">
                  <Form.Group className="mb-2">
                    <Form.Label className="mb-1">CVV</Form.Label>
                    <Form.Control
                      name="cvv"
                      value={paymentData?.cvv || ""}
                      onChange={event =>
                        handleInputChange("cvv", event.target.value)
                      }
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col-6">
            <Button variant="light" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <div className="col-6 d-flex">
            <Button variant="light" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default SubscriptionEditPayment
