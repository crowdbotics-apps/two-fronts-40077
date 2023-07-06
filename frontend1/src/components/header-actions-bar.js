import React from "react"

import "./header-actions-bar.scss"

const HeaderActionsBar = ({
  className = "",
  ButtonsLeft = () => <></>,
  ButtonsRight = () => <></>
}) => {
  return (
    <header className={`actions-bar ${className}`}>
      <div className="actions-bar-left">
        <ButtonsLeft />
      </div>
      <div className="actions-bar-right">
        <ButtonsRight />
      </div>
    </header>
  )
}
export default HeaderActionsBar
