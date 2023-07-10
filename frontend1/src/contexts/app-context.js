import React, { createContext, useContext, useEffect, useState } from "react"
import { APPCONFIG } from "../app-config"
import {
  useAllStaffQuery,
  useAllStudentsQuery,
  useProductionsQueries
} from "../utils/queries"

const appContext = createContext({})

export const AppContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [selectedProduction, setSelectedProduction] = useState(null)

  const {
    status: statusProductions,
    data: dataProductions,
    isFetching: isFetchingProductions,
    isError: isErrorProductions
  } = useProductionsQueries.useProductionsQuery({
    enabled: isUserLoggedIn
  })

  const {
    status: statusAllStaff,
    data: dataAllStaff,
    isFetching: isFetchingAllStaff,
    isError: isErrorAllStaff
  } = useAllStaffQuery({
    enabled: isUserLoggedIn
  })

  const {
    status: statusAllStudents,
    data: dataAllStudents,
    isFetching: isFetchingAllStudents,
    isError: isErrorAllStudents
  } = useAllStudentsQuery({
    enabled: isUserLoggedIn
  })

  useEffect(() => {
    if (APPCONFIG.debugGlobal)
      console.log("selectedProduction", selectedProduction)
  }, [selectedProduction])

  useEffect(() => {
    if (
      !!dataProductions &&
      !isFetchingProductions &&
      selectedProduction === null
    ) {
      console.log("dataProductions", dataProductions)
      setSelectedProduction(dataProductions?.data?.[0] || null)
    }
  }, [dataProductions, isFetchingProductions])

  return (
    <appContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,

        statusProductions,
        dataProductions,
        isFetchingProductions,
        isErrorProductions,
        selectedProduction,
        setSelectedProduction,

        statusAllStaff,
        dataAllStaff,
        isFetchingAllStaff,
        isErrorAllStaff,

        statusAllStudents,
        dataAllStudents,
        isFetchingAllStudents,
        isErrorAllStudents
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export const useAppContext = () => {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,

    statusProductions,
    dataProductions,
    isFetchingProductions,
    isErrorProductions,
    selectedProduction,
    setSelectedProduction,

    statusAllStaff,
    dataAllStaff,
    isFetchingAllStaff,
    isErrorAllStaff,

    statusAllStudents,
    dataAllStudents,
    isFetchingAllStudents,
    isErrorAllStudents
  } = useContext(appContext)
  return {
    isUserLoggedIn,
    setIsUserLoggedIn,

    statusProductions,
    dataProductions,
    isFetchingProductions,
    isErrorProductions,
    selectedProduction,
    setSelectedProduction,

    statusAllStaff,
    dataAllStaff,
    isFetchingAllStaff,
    isErrorAllStaff,

    statusAllStudents,
    dataAllStudents,
    isFetchingAllStudents,
    isErrorAllStudents
  }
}
