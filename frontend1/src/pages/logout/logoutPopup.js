import React, { useState } from "react"
import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area"
import { Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ScreenLogout from "."
import { ALLROUTES } from "../../routes"

const LogoutPopup = () => {
  const nav = useNavigate()
  const [logout, setLogout] = useState(false)

  const handleCloseModal = () => {
    nav(ALLROUTES.dashboardContainer)
  }

  const handleLogout = () => {
    setLogout(true)
  }

  return (
    <WrapperMainContentArea>
      <Modal show={true} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {logout && <ScreenLogout />}
    </WrapperMainContentArea>
  )
}
export default LogoutPopup
