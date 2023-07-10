import React from "react"

import { ReactComponent as GrLogoLight } from "./graphics/showup-logo-light.svg"
import { ReactComponent as GrNoImageProduction } from "./graphics/noimage-production.svg"

import { ReactComponent as IconAccount } from "./graphics/icon-account.svg"
import { ReactComponent as IconAdd } from "./graphics/icon-add.svg"
import { ReactComponent as IconChecklist } from "./graphics/icon-checklist.svg"
import { ReactComponent as IconChevronLeft } from "./graphics/icon-chevron-left.svg"
import { ReactComponent as IconChevronRight } from "./graphics/icon-chevron-right.svg"
import { IconDelete } from "./graphics/icon-delete.js"
import { ReactComponent as IconEdit } from "./graphics/icon-edit.svg"
import { ReactComponent as IconHome } from "./graphics/icon-home.svg"
import { ReactComponent as IconMessages } from "./graphics/icon-messages.svg"
import { ReactComponent as IconNotifications } from "./graphics/icon-notifications.svg"
import { ReactComponent as IconSortHandle } from "./graphics/icon-sort-handle.svg"

import { IconNavRoles } from "./graphics/icon-nav-roles"
import { IconNavApplications } from "./graphics/icon-nav-applications"
import { IconNavProductionCalendar } from "./graphics/icon-nav-production-calendar"
import { IconNavSubscription } from "./graphics/icon-nav-subscription"

const defaultIconColor = "#FFFFFF"

export const ALLGRAPHICS = {
  GraphicLogoLight: ({ className = "" }) => (
    <div className={`graphic-wrap ${className}`}>
      <GrLogoLight />
    </div>
  ),
  NoImage: {
    Production: ({ className = "" }) => (
      <div className={`graphic-wrap noimage production ${className}`}>
        <GrNoImageProduction />
      </div>
    )
  }
}

export const ALLICONS = {
  Account: ({ className = "" }) => (
    <span className={`icon-wrap ${className}`}>
      <IconAccount />
    </span>
  ),
  Add: ({ className = "" }) => (
    <span className={`icon-wrap ${className}`}>
      <IconAdd />
    </span>
  ),
  Checklist: ({ className = "" }) => (
    <span className={`icon-wrap ${className}`}>
      <IconChecklist />
    </span>
  ),
  ChevronLeft: ({ className = "" }) => (
    <span className={`icon-wrap ${className}`}>
      <IconChevronLeft />
    </span>
  ),
  ChevronRight: ({ className = "" }) => (
    <span className={`icon-wrap ${className}`}>
      <IconChevronRight />
    </span>
  ),
  Delete: ({ className = "", fillColor = "black" }) => (
    <span className={`icon-wrap ${className}`}>
      <IconDelete fillColor={fillColor} />
    </span>
  ),
  Edit: ({ className = "" }) => (
    <span className={`icon-wrap ${className}`}>
      <IconEdit />
    </span>
  ),
  Home: ({ className = "" }) => (
    <span className={`icon-wrap ${className}`}>
      <IconHome />
    </span>
  ),
  Messages: ({ className = "" }) => (
    <span className={`icon-wrap ${className}`}>
      <IconMessages />
    </span>
  ),
  Notifications: ({ className = "" }) => (
    <span className={`icon-wrap ${className}`}>
      <IconNotifications />
    </span>
  ),
  SortHandle: ({ className = "" }) => (
    <span className={`icon-wrap ${className}`}>
      <IconSortHandle />
    </span>
  ),
  Dynamic: {
    Roles: ({ className = "", fillColor = defaultIconColor }) => (
      <span className={`icon-wrap dynamic ${className}`}>
        <IconNavRoles fillColor={fillColor} />
      </span>
    ),
    Applications: ({ className = "", fillColor = defaultIconColor }) => (
      <span className={`icon-wrap dynamic ${className}`}>
        <IconNavApplications fillColor={fillColor} />
      </span>
    ),
    ProductionCalendar: ({ className = "", fillColor = defaultIconColor }) => (
      <span className={`icon-wrap dynamic ${className}`}>
        <IconNavProductionCalendar fillColor={fillColor} />
      </span>
    ),
    Subscription: ({ className = "", fillColor = defaultIconColor }) => (
      <span className={`icon-wrap dynamic ${className}`}>
        <IconNavSubscription fillColor={fillColor} />
      </span>
    )
  }
}
