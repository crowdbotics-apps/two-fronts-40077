import React from "react"
import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area"
import { Button, Modal } from "react-bootstrap"

const EndSubscriptionReason = ({ handleWithoutReason, handleWithReason }) => {
  return (
    <WrapperMainContentArea>
      <Modal show={true} centered>
        <Modal.Header>
          <Modal.Title> Why are you ending your subscription?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-2 ms-3 me-3">
            <input
              className="form-control"
              type="text"
              placeholder="Enter a reason"
              aria-label="Enter a reason"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row mb-2 ms-3 d-flex justify-content-start">
            <Button variant="secondary" onClick={handleWithoutReason}>
              Never mind
            </Button>
          </div>
          <div className="row mb-2 ms-3">
            <Button variant="primary" onClick={handleWithReason}>
              End subscription
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </WrapperMainContentArea>
  )
}
export default EndSubscriptionReason
