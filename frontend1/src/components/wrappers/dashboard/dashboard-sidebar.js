import React from "react"

import { ALLROUTES } from "../../../routes"
import { ALLGRAPHICS, ALLICONS } from "../../../assets"
import AppFormSelect from "../../form/select"
import DashboardSidebarMenu from "./dashboard-sidebar-menu"
import DashboardSidebarProductionInfo from "./dashboard-sidebar-production-info"
import SimpleBar from "simplebar-react"
import { Button } from "react-bootstrap"

import { useAppContext } from "../../../contexts/app-context"

import "./dashboard-sidebar.scss"

const DashboardSidebar = () => {
  const {
    dataProductions,
    isFetchingProductions,
    selectedProduction,
    setSelectedProduction
  } = useAppContext()

  return (
    <aside className="sidebar d-flex flex-column align-items-center">
      <SimpleBar
        className="sidebar-simplebar w-100"
        style={{ maxHeight: "100%" }}
        autoHide={false}
      >
        <ALLGRAPHICS.GraphicLogoLight className="logo d-flex justify-content-center" />
        <AppFormSelect
          ariaLabel="Select production"
          className="production-selector w-100"
          name={`select-production`}
          placeholderText={isFetchingProductions ? "..." : null}
          options={[
            ...(dataProductions?.data
              ?.sort((a, b) => a?.title?.localeCompare(b?.title))
              ?.map((productionItem, i) => {
                return {
                  value: productionItem?.id,
                  label: productionItem?.title
                }
              }) || [])
          ]}
          selectedItem={selectedProduction?.value}
          onChangeCallback={event => {
            const selectedItem = dataProductions?.data?.find(
              productionItem =>
                productionItem?.id * 1 === (event.target.value || 0) * 1
            )
            setSelectedProduction(selectedItem)
          }}
        />
        <DashboardSidebarProductionInfo production={selectedProduction} />
        <DashboardSidebarMenu
          menuItems={[
            {
              title: "Roles",
              route: ALLROUTES.dashboardChildren.roles,
              Icon: props => <ALLICONS.Dynamic.Roles {...props} />
            },
            {
              title: "Applications",
              route: ALLROUTES.dashboardChildren.applications,
              Icon: props => <ALLICONS.Dynamic.Applications {...props} />
            },
            {
              title: "Production Calendar",
              route: ALLROUTES.dashboardChildren.productionCalendar,
              Icon: props => <ALLICONS.Dynamic.ProductionCalendar {...props} />
            } /*,
            {
              title: "Subscription",
              route: ALLROUTES.dashboardChildren.subscription,
              Icon: props => <ALLICONS.Dynamic.Subscription {...props} />
            }*/
          ]}
        />
        <div className="flex-grow-1"></div>
        <div className="button-new-production w-100">
          <Button className="w-100">+ New Production</Button>
        </div>
      </SimpleBar>
    </aside>
  )
}
export default DashboardSidebar
