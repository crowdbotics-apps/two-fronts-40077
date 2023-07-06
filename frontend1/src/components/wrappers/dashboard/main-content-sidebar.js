import React from "react"
import SimpleBar from "simplebar-react"

const WrapperMainContentSidebar = ({
  className = "",
  children,
  simpleBarMaxHeight = "calc(100vh - (100vw * 96 / 1920))"
}) => {
  return (
    <div className={`main-content-sidebar d-flex flex-column ${className}`}>
      <SimpleBar
        className="main-content-sidebar-simplebar w-100"
        style={{ height: simpleBarMaxHeight, maxHeight: simpleBarMaxHeight }}
        autoHide={false}
      >
        {children}
      </SimpleBar>
    </div>
  )
}
export default WrapperMainContentSidebar
