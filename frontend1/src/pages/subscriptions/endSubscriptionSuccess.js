import React from "react"
import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area"
import { Button, Modal } from "react-bootstrap"

const EndSubscriptionSuccess = ({ handleContine }) => {

  return (
    <WrapperMainContentArea>
      <Modal show={true} centered>
        <Modal.Header>
          <Modal.Title>Your subscription has been ended!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row mb-2 ms-3 me-3">
            We hope to see you back here soon!
            </div>
            </Modal.Body>
        <Modal.Footer>
        <div className="row mb-2 ms-3 d-flex justify-content-start">
          <Button variant="secondary" onClick={handleContine}>
          Continue
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </WrapperMainContentArea>
  )
}
export default EndSubscriptionSuccess
