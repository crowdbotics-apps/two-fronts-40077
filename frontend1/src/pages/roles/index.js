import React from "react"

import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area"
import WrapperMainContentSidebar from "../../components/wrappers/dashboard/main-content-sidebar"
import ScreenDashRolesSidebar from "./roles-sidebar"
import ScreenDashRolesMain from "./roles-main"

import { RolesContextProvider } from "./context/roles-context"

import "./roles.scss"

const ScreenDashRoles = () => {
  return (
    <RolesContextProvider>
      <WrapperMainContentArea>
        <ScreenDashRolesMain />
      </WrapperMainContentArea>
      <WrapperMainContentSidebar className="roles-sidebar">
        <ScreenDashRolesSidebar />
      </WrapperMainContentSidebar>
    </RolesContextProvider>
  )
}
export default ScreenDashRoles
