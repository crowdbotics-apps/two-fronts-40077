import React from "react"
import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area"
import { Button, Modal } from "react-bootstrap"

const ConfirmEndSubscriptionPopup = ({ handleCloseModal,handleYes }) => {

  return (
    <WrapperMainContentArea>
      <Modal show={true} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>We hate to see you go</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row mb-2 ms-3">
            If there's something we can do to make Show Up better, please email us at info@showuponstage.com
            </div>
            <div className="row ms-3">
            Are you sure you want to end your subscription?
            </div>
            </Modal.Body>
        <Modal.Footer>
        <div className="row mb-2 ms-3 d-flex justify-content-start">
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          </div>
          <div className="row mb-2 ms-3">
          <Button variant="primary" onClick={handleYes}>
            Yes
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </WrapperMainContentArea>
  )
}
export default ConfirmEndSubscriptionPopup
