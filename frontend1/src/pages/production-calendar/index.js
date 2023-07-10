import React from "react"

import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area"
import WrapperMainContentSidebar from "../../components/wrappers/dashboard/main-content-sidebar"
import ScreenDashProductionCalendarSidebar from "./production-calendar-sidebar"
import ScreenDashProductionCalendarMain from "./production-calendar-main"

import { ProductionCalendarContextProvider } from "./context/production-calendar-context"
import { ProductionCalendarUsersContextProvider } from "./context/production-calendar-users-context"

import "./production-calendar.scss"

const ScreenDashProductionCalendar = () => {
  return (
    <ProductionCalendarContextProvider>
      <ProductionCalendarUsersContextProvider>
        <WrapperMainContentArea>
          <ScreenDashProductionCalendarMain />
        </WrapperMainContentArea>
        <WrapperMainContentSidebar className="production-calendar-sidebar">
          <ScreenDashProductionCalendarSidebar />
        </WrapperMainContentSidebar>
      </ProductionCalendarUsersContextProvider>
    </ProductionCalendarContextProvider>
  )
}
export default ScreenDashProductionCalendar
