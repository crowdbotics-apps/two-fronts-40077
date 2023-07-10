import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

const DashboardSidebarMenu = ({ menuItems = [] }) => {
  const nav = useNavigate()
  const location = useLocation()
  const iconColors = {
    regular: "#FFFFFF",
    active: "#4D3A17"
  }

  return (
    <div className="sidebar-menu d-flex flex-column w-100">
      <nav className="d-flex flex-column">
        {menuItems.map((menuItem, i) => (
          <button
            className={`nav-item cursor-pointer ${
              location.pathname === menuItem?.route ? "current-page" : ""
            }`}
            onClick={() => {
              nav(menuItem?.route)
            }}
            title={menuItem?.title}
            key={i}
          >
            {menuItem?.Icon && (
              <menuItem.Icon
                fillColor={
                  iconColors?.[
                    location.pathname === menuItem?.route ? "active" : "regular"
                  ]
                }
              />
            )}
            <span className="link-title">{menuItem?.title}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
export default DashboardSidebarMenu
