import React from "react"
import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area"
import { Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const SuccessPayment = () => {
    const nav = useNavigate()

    const handleCloseModal = () => {
        nav(-2)
        // nav('/dashboard/subscription')
    }

  return (
    <WrapperMainContentArea>
      <Modal show={true} onHide={handleCloseModal} centered>
        <Modal.Header>
          <Modal.Title>Payment Successfull</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </WrapperMainContentArea>
  )
}
export default SuccessPayment
