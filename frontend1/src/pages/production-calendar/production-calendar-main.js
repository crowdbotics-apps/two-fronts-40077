import React from "react"
import { Button } from "react-bootstrap"
import CalendarMonth from "../../components/calendar-month"
import HeaderActionsBar from "../../components/header-actions-bar"
import { getEntityFullName, getEntityInitials } from "../../utils/string"
import { useProductionCalendarContext } from "./context/production-calendar-context"
import ProductionCalendarModalAddConflict from "./production-calendar-modal-add-conflict"
import ProductionCalendarModalAddEvent from "./production-calendar-modal-add-event"
import ProductionCalendarModalConflictDetails from "./production-calendar-modal-conflict-details"

const ScreenDashProductionCalendarMain = () => {
  const {
    monthSelectedDate,
    setMonthSelectedDate,
    setCurrentMonth,
    monthDateRange,
    setShowModalAddConflict,
    dataProductionConflicts,
    isFetchingProductionConflicts,
    setShowModalConflictDetails,
    setModalConflictDetails
  } = useProductionCalendarContext()

  return (
    <>
      <HeaderActionsBar
        className="production-calendar-main-header d-flex align-items-center"
        ButtonsLeft={() => (
          <>
            <h4 className="mb-0">Production conflicts</h4>
          </>
        )}
        ButtonsRight={() => (
          <>
            <Button
              variant="light"
              onClick={() => {
                setShowModalAddConflict(true)
              }}
            >
              Add conflict
            </Button>
          </>
        )}
      ></HeaderActionsBar>
      <CalendarMonth
        detailed={true}
        DetailedExtraDateContent={({ date }) => (
          <>
            {!!dataProductionConflicts && !isFetchingProductionConflicts && (
              <div className="date-conflicts">
                {dataProductionConflicts?.data?.data
                  ?.filter(conflictItem => conflictItem?.date === date)
                  ?.map((conflictItem, i) => (
                    <React.Fragment key={i}>
                      {conflictItem?.user_detail?.map((conflictItemUser, j) => (
                        <div
                          className={`date-conflict-item cursor-pointer${
                            !!conflictItemUser?.profile_picture
                              ? ""
                              : " initials"
                          }`}
                          key={j}
                          {...(!!conflictItemUser?.profile_picture
                            ? {
                                style: {
                                  backgroundImage: `url(${conflictItemUser?.profile_picture})`
                                }
                              }
                            : {})}
                          title={getEntityFullName(conflictItemUser)}
                          onClick={() => {
                            setShowModalConflictDetails(true)
                            setModalConflictDetails(conflictItem)
                          }}
                        >
                          {!!conflictItemUser?.profile_picture
                            ? ""
                            : `${getEntityInitials(conflictItemUser)}`}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
              </div>
            )}
          </>
        )}
        // selectDateMode={true}
        // selectDateModeDefaultSelectedDate={monthSelectedDate}
        selectDateCallback={date => {
          // setMonthSelectedDate(date)
        }}
        startDate={monthDateRange?.[0]}
        refDateCallback={changeObject => {
          if (!!changeObject?.refDate) setCurrentMonth(changeObject?.refDate)
        }}
      />
      <ProductionCalendarModalConflictDetails />
      <ProductionCalendarModalAddConflict />
      <ProductionCalendarModalAddEvent />
    </>
  )
}
export default ScreenDashProductionCalendarMain
