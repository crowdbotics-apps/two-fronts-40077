import React, { createContext, useContext, useState } from "react"

import { useAppContext } from "../../../contexts/app-context"
import { APPCONFIG } from "../../../app-config"
import { useApplicationQuery } from "../../../utils/queries"

const applicatonContext = createContext({})

export const ApplicationContextProvider = ({ children }) => {
  const { isUserLoggedIn, selectedProduction } = useAppContext()

  const applicationCategoryTabs = [
    { slug: APPCONFIG.apiConst.ApplicationCategory.CAST, title: "Cast" },
    { slug: APPCONFIG.apiConst.ApplicationCategory.CREW, title: "Crew" },
    {
      slug: APPCONFIG.apiConst.ApplicationCategory.COMPLETED_APPLICATIONS,
      title: "Completed applicatons"
    }
  ]

  const applicationSubCategoryTabs = [
    { slug: APPCONFIG.apiConst.ApplicationCategory.CAST, title: "Cast" },
    { slug: APPCONFIG.apiConst.ApplicationCategory.CREW, title: "Crew" }
  ]

  const { data: dataCastApplication, refetch: refetchCastApplicationList } =
    useApplicationQuery.useCastApplicationQuery({
      enabled: isUserLoggedIn && !!selectedProduction
      // productionId: selectedProduction?.id
    })

  const { data: dataCrewApplication, refetch: refetchCrewApplicationList } =
    useApplicationQuery.useCrewApplicationQuery({
      enabled: isUserLoggedIn && !!selectedProduction
      // productionId: selectedProduction?.id
    })

  const {
    data: applicationsStatusCastList,
    refetch: refetchCastApplicationStatusList
  } = useApplicationQuery.useCastApplicationStatusQuery({
    enabled: isUserLoggedIn && !!selectedProduction,
    productionId: selectedProduction?.id
  })

  const {
    data: applicationsStatusCrewList,
    refetch: refetchCrewApplicationStatusList
  } = useApplicationQuery.useCrewApplicationStatusQuery({
    enabled: isUserLoggedIn && !!selectedProduction,
    productionId: selectedProduction?.id
  })

  const [activeApplicationCategoryTab, setActiveApplicationCategoryTab] =
    useState(applicationCategoryTabs?.[0])
  const [activeApplicationSubCategoryTab, setActiveApplicationSubCategoryTab] =
    useState(applicationSubCategoryTabs?.[0])
  const [additionalData, setAdditionalData] = useState()

  const [applicationItems, setApplicationItems] = useState([])
  const [applicationRecord, setApplicationRecord] = useState({})

  return (
    <applicatonContext.Provider
      value={{
        applicationCategoryTabs,
        activeApplicationCategoryTab,
        setActiveApplicationCategoryTab,
        applicationSubCategoryTabs,
        activeApplicationSubCategoryTab,
        setActiveApplicationSubCategoryTab,
        additionalData,
        setAdditionalData,
        selectedProduction,
        applicationsStatusCastList,
        refetchCastApplicationStatusList,
        applicationsStatusCrewList,
        refetchCrewApplicationStatusList,
        dataCastApplication,
        refetchCastApplicationList,
        dataCrewApplication,
        refetchCrewApplicationList,

        applicationItems,
        setApplicationItems,
        applicationRecord,
        setApplicationRecord
      }}
    >
      {children}
    </applicatonContext.Provider>
  )
}

export const useApplicationContext = () => {
  const {
    applicationCategoryTabs,
    activeApplicationCategoryTab,
    setActiveApplicationCategoryTab,
    applicationSubCategoryTabs,
    activeApplicationSubCategoryTab,
    setActiveApplicationSubCategoryTab,
    additionalData,
    setAdditionalData,
    selectedProduction,
    applicationsStatusCastList,
    refetchCastApplicationStatusList,
    applicationsStatusCrewList,
    refetchCrewApplicationStatusList,
    dataCastApplication,
    refetchCastApplicationList,
    dataCrewApplication,
    refetchCrewApplicationList,

    applicationItems,
    setApplicationItems,
    applicationRecord,
    setApplicationRecord
  } = useContext(applicatonContext)
  return {
    applicationCategoryTabs,
    activeApplicationCategoryTab,
    setActiveApplicationCategoryTab,
    applicationSubCategoryTabs,
    activeApplicationSubCategoryTab,
    setActiveApplicationSubCategoryTab,
    additionalData,
    setAdditionalData,
    selectedProduction,
    applicationsStatusCastList,
    refetchCastApplicationStatusList,
    applicationsStatusCrewList,
    refetchCrewApplicationStatusList,
    dataCastApplication,
    refetchCastApplicationList,
    dataCrewApplication,
    refetchCrewApplicationList,

    applicationItems,
    setApplicationItems,
    applicationRecord,
    setApplicationRecord
  }
}
