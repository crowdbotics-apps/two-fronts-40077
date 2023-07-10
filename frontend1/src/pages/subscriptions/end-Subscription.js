import React, { useState } from "react"
import { Button } from "react-bootstrap"
import "react-datepicker/dist/react-datepicker.css"
import ConfirmEndSubscriptionPopup from "./confirmEndSubscriptionPopup"
import EndSubscriptionReason from "./endSubscriptionReason"
import EndSubscriptionSuccess from "./endSubscriptionSuccess"
import { useNavigate } from "react-router-dom"

const EndSubscription = () => {
  const nav = useNavigate()
  const [confirmEndSubscription, SetConfirmEndSubscription] = useState(false)
  const [endSubscriptionReason, SetEndSubscriptionReason] = useState(false)
  const [endSubscriptionSuccess, SetEndSubscriptionSuccess] = useState(false)

  const handleCancel = () => {
    nav("/dashboard/subscription")
  }

  const handleEndSubscription = () => {
    SetConfirmEndSubscription(!confirmEndSubscription)
  }

  const handleYes = () => {
    SetConfirmEndSubscription(!confirmEndSubscription)
    SetEndSubscriptionReason(!endSubscriptionReason)
  }

  const handleWithoutReason = () => {
    //make api call
    SetEndSubscriptionReason(!endSubscriptionReason)
    SetEndSubscriptionSuccess(!endSubscriptionSuccess)
  }

  const handleWithReason = () => {
    // make api call
    SetEndSubscriptionReason(!endSubscriptionReason)
    SetEndSubscriptionSuccess(!endSubscriptionSuccess)
  }

  return (
    <>
      <h6>End Subscription</h6>
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <div className="card rounded-3">
              <div className="card-body card-content-brown">
                <div className="container">
                  <div className="row">
                    <div className="fst-italic">
                      If you end your subscription, you can continue to use Show
                      Up until your current billing period ends (we want you to
                      get what you paid for). Your school’s data will be saved
                      so you can re-subscribe anytime to pick up where you left
                      off. If you want to completely delete your school’s
                      account and data from Show Up, end your subscription below
                      and then click on delete school.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col mt-3">
            <div className="card">
              <div className="card-body card-content">
                <div className="container">
                  <div className="col">
                    <div className="row">
                      <h6 className="card-title title-content">
                        Essentials Plan
                      </h6>
                    </div>
                    <div className="row mt-2 mb-2">
                      <div className="col-10">
                        <label className="fw-medium">Yearly</label>
                      </div>
                      <div className="col-2 fw-medium">
                        <span>$299.99/year</span>
                      </div>
                    </div>
                    <div className="row">
                      <li className="">Access to all current features</li>
                    </div>
                    <div className="row">
                      <li className="">Unlimited student and parent users</li>
                    </div>
                    <div className="row">
                      <li className="">Two teacher users</li>
                    </div>
                    <div className="row">
                      <li className="">Two productions per school year</li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3 mb-3">
            <div className="col-6">
              <Button variant="light" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <Button variant="light" onClick={handleEndSubscription}>
                End my subscription now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {confirmEndSubscription ? (
        <ConfirmEndSubscriptionPopup
          handleCloseModal={() =>
            SetConfirmEndSubscription(!confirmEndSubscription)
          }
          handleYes={handleYes}
        />
      ) : null}
      {endSubscriptionReason ? (
        <EndSubscriptionReason
          handleWithoutReason={handleWithoutReason}
          handleWithReason={handleWithReason}
        />
      ) : null}
      {endSubscriptionSuccess ? (
        <EndSubscriptionSuccess
          handleContine={() =>
            SetEndSubscriptionSuccess(!endSubscriptionSuccess)
          }
        />
      ) : null}
    </>
  )
}
export default EndSubscription
