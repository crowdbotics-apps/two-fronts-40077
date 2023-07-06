import React, { createContext, useContext, useEffect, useState } from "react"

import { useAppContext } from "../../../contexts/app-context"
import {
  useAllParentsQuery,
  useGroupsQuery,
  useProductionsQueries
} from "../../../utils/queries"
import { APPCONFIG } from "../../../app-config"
import {
  firstLastDatesOfMonth,
  formatDateToFormat,
  formatDateToString
} from "../../../utils/date"

const productionCalendarContext = createContext({})

export const ProductionCalendarContextProvider = ({ children }) => {
  const { isUserLoggedIn, selectedProduction } = useAppContext()
  const [currentMonth, setCurrentMonth] = useState(formatDateToString())
  const [monthDateRange, setMonthDateRange] = useState(
    firstLastDatesOfMonth(new Date())
  )
  const [monthSelectedDate, setMonthSelectedDate] = useState(new Date())
  const [showModalAddConflict, setShowModalAddConflict] = useState(false)
  const [showModalAddEvent, setShowModalAddEvent] = useState(false)
  const [showModalAddEventOverConflicts, setShowModalAddEventOverConflicts] =
    useState(false)
  const [dataAddEventOverConflicts, setDataAddEventOverConflicts] = useState([])
  const [modalEditEventData, setModalEditEventData] = useState(null)

  const [showModalConflictDetails, setShowModalConflictDetails] =
    useState(false)
  const [modalConflictDetails, setModalConflictDetails] = useState(false)

  useEffect(() => {
    const todaysDate = new Date()
    const currentMonthDate = new Date(currentMonth)
    setMonthDateRange(firstLastDatesOfMonth(new Date(currentMonth)))
    setMonthSelectedDate(
      currentMonthDate.getMonth() === todaysDate.getMonth()
        ? formatDateToFormat(new Date().toString(), "YYYY-MM-DD")
        : new Date(firstLastDatesOfMonth(new Date(currentMonth))?.[0])
    )
  }, [currentMonth])

  const {
    status: statusAllEvents,
    data: dataAllEvents,
    isFetching: isFetchingAllEvents,
    isError: isErrorAllEvents,
    refetch: refetchAllEvents
  } = useProductionsQueries.useAllEventsQuery({
    enabled: isUserLoggedIn && !!selectedProduction
  })

  const {
    status: statusProductionConflicts,
    data: dataProductionConflicts,
    isFetching: isFetchingProductionConflicts,
    isError: isErrorProductionConflicts,
    refetch: refetchProductionConflicts
  } = useProductionsQueries.useProductionConflictsQuery({
    enabled: isUserLoggedIn && !!selectedProduction,
    production: selectedProduction?.id,
    start_date: monthDateRange[0],
    end_date: monthDateRange[1]
  })

  const {
    status: statusAllParents,
    data: dataAllParents,
    isFetching: isFetchingAllParents,
    isError: isErrorAllParents,
    refetch: refetchAllParents
  } = useAllParentsQuery({
    enabled: isUserLoggedIn && !!selectedProduction
  })

  const {
    status: statusGroups,
    data: dataGroups,
    isFetching: isFetchingGroups,
    isError: isErrorGroups,
    refetch: refetchGroups
  } = useGroupsQuery({
    enabled: isUserLoggedIn && !!selectedProduction
  })

  return (
    <productionCalendarContext.Provider
      value={{
        currentMonth,
        setCurrentMonth,

        monthDateRange,
        setMonthDateRange,

        monthSelectedDate,
        setMonthSelectedDate,

        statusAllEvents,
        dataAllEvents,
        isFetchingAllEvents,
        isErrorAllEvents,
        refetchAllEvents,

        statusAllParents,
        dataAllParents,
        isFetchingAllParents,
        isErrorAllParents,
        refetchAllParents,

        statusGroups,
        dataGroups,
        isFetchingGroups,
        isErrorGroups,
        refetchGroups,

        statusProductionConflicts,
        dataProductionConflicts,
        isFetchingProductionConflicts,
        isErrorProductionConflicts,
        refetchProductionConflicts,

        showModalAddConflict,
        setShowModalAddConflict,

        showModalAddEvent,
        setShowModalAddEvent,

        showModalAddEventOverConflicts,
        setShowModalAddEventOverConflicts,
        dataAddEventOverConflicts,
        setDataAddEventOverConflicts,
        modalEditEventData,
        setModalEditEventData,

        showModalConflictDetails,
        setShowModalConflictDetails,
        modalConflictDetails,
        setModalConflictDetails
      }}
    >
      {children}
    </productionCalendarContext.Provider>
  )
}

export const useProductionCalendarContext = () => {
  const {
    currentMonth,
    setCurrentMonth,

    monthDateRange,
    setMonthDateRange,

    monthSelectedDate,
    setMonthSelectedDate,

    statusAllEvents,
    dataAllEvents,
    isFetchingAllEvents,
    isErrorAllEvents,
    refetchAllEvents,

    statusAllParents,
    dataAllParents,
    isFetchingAllParents,
    isErrorAllParents,
    refetchAllParents,

    statusGroups,
    dataGroups,
    isFetchingGroups,
    isErrorGroups,
    refetchGroups,

    statusProductionConflicts,
    dataProductionConflicts,
    isFetchingProductionConflicts,
    isErrorProductionConflicts,
    refetchProductionConflicts,

    showModalAddConflict,
    setShowModalAddConflict,

    showModalAddEvent,
    setShowModalAddEvent,

    showModalAddEventOverConflicts,
    setShowModalAddEventOverConflicts,
    dataAddEventOverConflicts,
    setDataAddEventOverConflicts,
    modalEditEventData,
    setModalEditEventData,

    showModalConflictDetails,
    setShowModalConflictDetails,
    modalConflictDetails,
    setModalConflictDetails
  } = useContext(productionCalendarContext)
  return {
    currentMonth,
    setCurrentMonth,

    monthDateRange,
    setMonthDateRange,

    monthSelectedDate,
    setMonthSelectedDate,

    statusAllEvents,
    dataAllEvents,
    isFetchingAllEvents,
    isErrorAllEvents,
    refetchAllEvents,

    statusAllParents,
    dataAllParents,
    isFetchingAllParents,
    isErrorAllParents,
    refetchAllParents,

    statusGroups,
    dataGroups,
    isFetchingGroups,
    isErrorGroups,
    refetchGroups,

    statusProductionConflicts,
    dataProductionConflicts,
    isFetchingProductionConflicts,
    isErrorProductionConflicts,
    refetchProductionConflicts,

    showModalAddConflict,
    setShowModalAddConflict,

    showModalAddEvent,
    setShowModalAddEvent,

    showModalAddEventOverConflicts,
    setShowModalAddEventOverConflicts,
    dataAddEventOverConflicts,
    setDataAddEventOverConflicts,
    modalEditEventData,
    setModalEditEventData,

    showModalConflictDetails,
    setShowModalConflictDetails,
    modalConflictDetails,
    setModalConflictDetails
  }
}
