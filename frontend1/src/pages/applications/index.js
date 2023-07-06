import React from "react"

import { ApplicationContextProvider } from "./context/application-context"
import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area"
import WrapperMainContentSidebar from "../../components/wrappers/dashboard/main-content-sidebar"
import ScreenDashApplicationSidebar from "./application-sidebar"
import ScreenDashApplicationMain from "./application-main"
import "./application.scss"

const ScreenDashApplications = () => {
  return (
    <ApplicationContextProvider>
      <WrapperMainContentArea>
        <ScreenDashApplicationMain />
      </WrapperMainContentArea>
      <WrapperMainContentSidebar className="application-sidebar">
        <ScreenDashApplicationSidebar />
      </WrapperMainContentSidebar>
    </ApplicationContextProvider>
  )
}
export default ScreenDashApplications
