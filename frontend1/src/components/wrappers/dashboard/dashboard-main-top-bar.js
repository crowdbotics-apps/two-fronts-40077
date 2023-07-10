import React, { useState } from "react"
import { Dropdown, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import { ALLICONS } from "../../../assets"
import { ALLMENUS, ALLROUTES } from "../../../routes"

const MainTopBarNavItems = [
  {
    title: "Home",
    Icon: () => <ALLICONS.Home />
  },
  {
    title: "Messages",
    Icon: () => <ALLICONS.Messages />
  },
  {
    title: "Checklist",
    Icon: () => <ALLICONS.Checklist />
  },
  {
    title: "Notifications",
    Icon: () => <ALLICONS.Notifications />
  },
  {
    title: "Account",
    Icon: () => <ALLICONS.Account />
  }
]

const DashboardMainTopBar = () => {
  const nav = useNavigate()
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)

  const handleNavItems = navItem => {
    if (navItem?.title === "Account") {
      setShowAccountDropdown(!showAccountDropdown)
    }
  }

  const handleOnClick = navItem => {
    if (!!navItem?.route) {
      nav(navItem?.route)
    }
    setShowAccountDropdown(!showAccountDropdown)
  }

  return (
    <div className="main-top-bar d-flex align-items-center">
      <Form.Control
        className="form-control--search flex-grow-1"
        placeholder="Search production"
        name={`Search production`}
      />

      {MainTopBarNavItems.map((navItem, i) =>
        navItem?.title === "Account" ? (
          <Dropdown key={i}>
            <Dropdown.Toggle className="nav-item cursor-pointer">
              {navItem?.Icon && <navItem.Icon />}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {ALLMENUS.loggedIn.map((navItem, j) => (
                <Dropdown.Item
                  key={j}
                  onClick={() => {
                    handleOnClick(navItem)
                  }}
                  disabled={navItem.disabled}
                >
                  <navItem.Icon />
                  {navItem.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <button
            className="nav-item cursor-pointer"
            title={navItem?.title}
            key={i}
            onClick={() => handleNavItems(navItem)}
          >
            {navItem?.Icon && <navItem.Icon />}
          </button>
        )
      )}
    </div>
  )
}
export default DashboardMainTopBar
