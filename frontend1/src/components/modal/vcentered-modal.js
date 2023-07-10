import React from "react"
import { Button, Modal } from "react-bootstrap"

const VCenteredModal = ({
  id = "contained-modal-title-vcenter",
  modalProps = {},
  modalTitle = "",
  ModalContentDeprecated = () => <></>, // deprecated, causes content to reload
  ModalFooterButtonsOnRight = () => <></>,
  showCloseButtonOnFooter = true,
  closeButtonOnFooterText = "Close",
  children
}) => {
  const { className, ...restModalProps } = modalProps
  return (
    <Modal
      size="lg"
      aria-labelledby={id}
      centered
      {...restModalProps}
      className={`modal-vcentered ${className}`}
    >
      {modalTitle && (
        <Modal.Header closeButton>
          <Modal.Title id={id}>{modalTitle}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>
        {/*<ModalContentDeprecated />*/}
        {children}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        {showCloseButtonOnFooter && (
          <Button variant="light" onClick={modalProps.onHide}>
            {closeButtonOnFooterText}
          </Button>
        )}
        <div className="modal-footer-buttons-on-right">
          <ModalFooterButtonsOnRight />
        </div>
      </Modal.Footer>
    </Modal>
  )
}
export default VCenteredModal
