import React from "react"
import { useNavigate } from "react-router-dom"

import "./dashboard.scss"

const WrapperOnboarding = ({ children, bodyClass = "wrapper-onboarding" }) => {
  const nav = useNavigate()

  return (
    <div className={`app-wrapper ${bodyClass}`}>
      {children}
    </div>
  )
}

export default WrapperOnboarding
