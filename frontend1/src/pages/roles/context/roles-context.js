import React, { createContext, useContext, useEffect, useState } from "react"

import { useAppContext } from "../../../contexts/app-context"
import { useProductionsQueries, useRolesQueries } from "../../../utils/queries"
import { APPCONFIG } from "../../../app-config"

const rolesContext = createContext({})

export const RolesContextProvider = ({ children }) => {
  const { isUserLoggedIn, selectedProduction } = useAppContext()

  const roleCategoryTabs = [
    { slug: APPCONFIG.apiConst.RoleCategory.CAST, title: "Cast" },
    { slug: APPCONFIG.apiConst.RoleCategory.CREW, title: "Crew" }
  ]
  const [activeRoleCategoryTab, setActiveRoleCategoryTab] = useState(
    roleCategoryTabs?.[0]
  )

  const {
    status: statusRoles,
    data: dataRoles,
    isFetching: isFetchingRoles,
    isError: isErrorRoles,
    refetch: refetchRoles
  } = useRolesQueries.useProductionRolesQuery({
    enabled: isUserLoggedIn && !!selectedProduction,
    productionId: selectedProduction?.id
  })

  const {
    status: statusRoleCategories,
    data: dataRoleCategories,
    isFetching: isFetchingRoleCategories,
    isError: isErrorRoleCategories
  } = useRolesQueries.useRoleCategoriesQuery({
    enabled: isUserLoggedIn
  })

  const {
    status: statusRolesApplicationStatus,
    data: dataRolesApplicationStatus,
    isFetching: isFetchingRolesApplicationStatus,
    isError: isErrorRolesApplicationStatus,
    refetch: refetchRolesApplicationStatus
  } = useProductionsQueries.useApplicationStatusByRoleQuery({
    enabled:
      isUserLoggedIn && !!selectedProduction?.id && !!activeRoleCategoryTab,
    productionId: selectedProduction?.id,
    rolesType: activeRoleCategoryTab?.slug
  })

  useEffect(() => {
    if (!!selectedProduction?.id) {
      refetchRoles()
    }
  }, [activeRoleCategoryTab])

  return (
    <rolesContext.Provider
      value={{
        roleCategoryTabs,
        activeRoleCategoryTab,
        setActiveRoleCategoryTab,

        statusRoles,
        dataRoles,
        isFetchingRoles,
        isErrorRoles,
        refetchRoles,

        statusRoleCategories,
        dataRoleCategories,
        isFetchingRoleCategories,
        isErrorRoleCategories,

        statusRolesApplicationStatus,
        dataRolesApplicationStatus,
        isFetchingRolesApplicationStatus,
        isErrorRolesApplicationStatus,
        refetchRolesApplicationStatus
      }}
    >
      {children}
    </rolesContext.Provider>
  )
}

export const useRolesContext = () => {
  const {
    roleCategoryTabs,
    activeRoleCategoryTab,
    setActiveRoleCategoryTab,

    statusRoles,
    dataRoles,
    isFetchingRoles,
    isErrorRoles,
    refetchRoles,

    statusRoleCategories,
    dataRoleCategories,
    isFetchingRoleCategories,
    isErrorRoleCategories,

    statusRolesApplicationStatus,
    dataRolesApplicationStatus,
    isFetchingRolesApplicationStatus,
    isErrorRolesApplicationStatus,
    refetchRolesApplicationStatus
  } = useContext(rolesContext)
  return {
    roleCategoryTabs,
    activeRoleCategoryTab,
    setActiveRoleCategoryTab,

    statusRoles,
    dataRoles,
    isFetchingRoles,
    isErrorRoles,
    refetchRoles,

    statusRoleCategories,
    dataRoleCategories,
    isFetchingRoleCategories,
    isErrorRoleCategories,

    statusRolesApplicationStatus,
    dataRolesApplicationStatus,
    isFetchingRolesApplicationStatus,
    isErrorRolesApplicationStatus,
    refetchRolesApplicationStatus
  }
}
