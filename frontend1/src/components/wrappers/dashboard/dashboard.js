import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { ALLROUTES } from "../../../routes"
import DashboardSidebar from "./dashboard-sidebar"
import DashboardMainTopBar from "./dashboard-main-top-bar"
import { useAppContext } from "../../../contexts/app-context"
import { checkAndSetUserLoggedIn, userTokenExists } from "../../../utils/common"

import "./dashboard.scss"
import "./main-content.scss"
import "./main-content-sidebar.scss"
import { APPCONFIG } from "../../../app-config"

const WrapperDashboard = ({ bodyClass = "wrapper-dashboard" }) => {
  const nav = useNavigate()
  const { setIsUserLoggedIn } = useAppContext()

  useEffect(() => {
    checkAndSetUserLoggedIn(setIsUserLoggedIn)
    const userTokenFound = userTokenExists()
    if (!userTokenFound) {
      if (APPCONFIG.debugGlobal)
        console.log("User session data not found, redirecting to login...")
      nav(ALLROUTES.login)
    }
  }, [])

  return (
    <div className={`app-wrapper ${bodyClass} flex-row`}>
      <DashboardSidebar />
      <main className="main d-flex flex-column flex-grow-1">
        <DashboardMainTopBar />
        <div className="main-content d-flex flex-grow-1">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  )
}

export default WrapperDashboard
