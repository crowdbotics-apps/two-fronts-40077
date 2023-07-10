import React from "react"

const BasicModalContent = props => {
  const { title, handleClose, content } = props
  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close mt-3"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        <div className="modal-body">
          <p>{content}</p>
        </div>
      </div>
    </div>
  )
}
export default BasicModalContent
