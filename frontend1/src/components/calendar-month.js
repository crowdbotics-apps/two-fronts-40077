import React, { useEffect, useRef, useState } from "react"
import { Overlay, Tooltip } from "react-bootstrap"

import { APPCONFIG } from "../app-config"
import { daysInMonth, formatDateToString } from "../utils/date"
import { zPad } from "../utils/number"

import "./calendar-month.scss"

export const CalendarMonthDays = ({ compact }) => {
  return (
    <div className="calendar-month__days">
      {APPCONFIG.dayNames.map((dayName, i) => (
        <div className="date" key={i}>
          <div className="h3 date-display">
            {dayName?.substring(0, compact ? 1 : 3)}
          </div>
        </div>
      ))}
    </div>
  )
}

export const WrappedCalendarMonthDays = ({ compact }) => {
  return (
    <div className={`calendar-month${compact ? " compact" : ""}`}>
      <CalendarMonthDays compact={compact} />
    </div>
  )
}

const CalendarMonth = ({
  compact = false,
  detailed = false,
  DetailedExtraDateContent = () => <></>,
  hideDays = false,
  paymentDates,
  holidayDates,
  restrictMonthNav = false,
  startDate,
  selectDateMode,
  selectDateModeDefaultSelectedDate,
  selectDateModeAvailableDates = "all",
  selectDateCallback,
  showHelpIcon,
  showDotForDates = [],
  refDateCallback
}) => {
  useEffect(() => {
    if (APPCONFIG.debugCalendar) {
      console.log("%cCalendarMonth", "background-color:red")
      console.log("paymentDates", paymentDates)
      console.log("startDate", startDate)
    }
  })

  useEffect(() => {
    if (selectDateMode && !!selectDateModeDefaultSelectedDate) {
      setSelectedDate(new Date(selectDateModeDefaultSelectedDate))
    }
  }, [selectDateModeDefaultSelectedDate])

  const [showCalendarTooltip, setShowCalendarTooltip] = useState(false)
  const calendarTooltipTarget = useRef(null)

  const [refDate, setRefDate] = useState(
    !!startDate ? new Date(startDate) : new Date()
  )

  const [selectedDate, setSelectedDate] = useState(
    selectDateMode
      ? !!selectDateModeDefaultSelectedDate
        ? new Date(selectDateModeDefaultSelectedDate)
        : null
      : !!startDate
      ? new Date(startDate)
      : new Date()
  )
  const dateIsSelectedDate = (date, month, year) => {
    return (
      selectDateMode &&
      selectedDate?.getDate() === date &&
      selectedDate?.getMonth() === month &&
      selectedDate?.getFullYear() === year
    )
  }

  const todaysDate = new Date()
  const dateIsTodaysDate = (date, month, year) => {
    return (
      todaysDate.getDate() === date &&
      todaysDate.getMonth() === month &&
      todaysDate.getFullYear() === year
    )
  }

  const dateIsSelectableDate = (date, month, year) => {
    return (
      selectDateMode &&
      (selectDateModeAvailableDates === "all" ||
        selectDateModeAvailableDates.find(
          d =>
            d.substring(0, 10) ===
            `${year}-${zPad(month + 1, 2)}-${zPad(date, 2)}`
        ))
    )
  }

  const dateIsHoliday = (date, month, year) => {
    return (
      holidayDates?.filter(
        item =>
          item.indexOf(`${year}-${zPad(month + 1, 2)}-${zPad(date, 2)}`) > -1
      ).length == 1
    )
  }

  const blankDaysBeforeMonthStarts = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  const monthNavAvailable = monthChange => {
    if (!restrictMonthNav) return true
    let available = false
    if (refDate) {
      let newRefDate = new Date(refDate.getTime())
      newRefDate.setMonth(refDate.getMonth() + monthChange)
      newRefDate = formatDateToString(newRefDate)
      const datesPool = selectDateMode
        ? selectDateModeAvailableDates
        : paymentDates
      datesPool?.forEach(paymentDate => {
        if (paymentDate.substring(0, 8) === newRefDate.substring(0, 8))
          available = true
      })
    }
    return available
  }

  const handleMonthNav = monthChange => {
    if (refDate) {
      let newRefDate = new Date(
        refDate.setMonth(refDate.getMonth() + monthChange)
      )
      setRefDate(newRefDate)
      if (!!refDateCallback) {
        refDateCallback({ refDate: formatDateToString(newRefDate) })
      }
    }
  }

  useEffect(() => {
    if (APPCONFIG.debugCalendar) {
      console.log("[Calendar] paymentDates")
      console.log(paymentDates)
    }
  }, [])

  useEffect(() => {
    if (!!startDate) {
      setRefDate(new Date(startDate))
    }
  }, [startDate])

  return (
    <div
      className={`calendar-month${compact ? " compact" : ""}${
        detailed ? " detailed" : ""
      }${selectDateMode ? " select-date" : ""}`}
    >
      <div className="calendar-month__title d-flex align-items-center">
        <div className="month-nav-wrap d-flex">
          <div
            className={`month-nav prev${
              monthNavAvailable(-1) ? "" : " unavailable"
            }`}
            onClick={() => {
              handleMonthNav(-1)
            }}
          ></div>
          <h3 className="h1">{`${APPCONFIG.monthNames[
            refDate.getMonth()
          ]?.substring(0, 3)} ${refDate.getFullYear()}`}</h3>
          <div
            className={`month-nav next${
              monthNavAvailable(1) ? "" : " unavailable"
            }`}
            onClick={() => {
              handleMonthNav(1)
            }}
          ></div>
        </div>
        {showHelpIcon ? (
          <>
            <span
              className="icon-help"
              ref={calendarTooltipTarget}
              onClick={() => {
                setShowCalendarTooltip(!showCalendarTooltip)
              }}
            ></span>
            <Overlay
              target={calendarTooltipTarget.current}
              show={showCalendarTooltip}
              placement="bottom-end"
            >
              {props => (
                <Tooltip id={`calendar-tooltip`} {...props}>
                  Purple dates indicate scheduled payment dates according to the
                  selected schedule.
                  <br />
                  <br />
                  Payments that fall on weekends or bank holidays will process
                  the following business day.
                  <span
                    className="close"
                    onClick={() => {
                      setShowCalendarTooltip(false)
                    }}
                  ></span>
                </Tooltip>
              )}
            </Overlay>
          </>
        ) : (
          ""
        )}
      </div>
      {hideDays === false && <CalendarMonthDays compact={compact} />}
      <div className="calendar-month__dates">
        {"0"
          .repeat(
            blankDaysBeforeMonthStarts(
              refDate.getMonth(),
              refDate.getFullYear()
            )
          )
          .split("")
          .map((blank, i) => (
            <div className="date blank" key={i}></div>
          ))}
        {"0"
          .repeat(daysInMonth(refDate.getMonth() + 1, refDate.getFullYear()))
          .split("")
          .map((monthDate, iMonthDate) => {
            const dayOfWeek = new Date(
              refDate.getFullYear(),
              refDate.getMonth(),
              iMonthDate + 1
            ).getDay()
            return (
              <div
                className={`date${
                  selectDateMode
                    ? dateIsSelectableDate(
                        iMonthDate + 1,
                        refDate.getMonth(),
                        refDate.getFullYear()
                      )
                      ? " selectable"
                      : " notselectable"
                    : ""
                }${
                  !!showDotForDates &&
                  showDotForDates.includes(
                    `${refDate.getFullYear()}-${zPad(
                      refDate.getMonth() + 1,
                      2
                    )}-${zPad(iMonthDate + 1, 2)}`
                  )
                    ? " dot"
                    : ""
                }${
                  dateIsSelectedDate(
                    iMonthDate + 1,
                    refDate.getMonth(),
                    refDate.getFullYear()
                  )
                    ? " selected"
                    : ""
                }${
                  dateIsTodaysDate(
                    iMonthDate + 1,
                    refDate.getMonth(),
                    refDate.getFullYear()
                  )
                    ? " today"
                    : ""
                }${
                  paymentDates?.filter(
                    item =>
                      item.indexOf(
                        `${refDate.getFullYear()}-${zPad(
                          refDate.getMonth() + 1,
                          2
                        )}-${zPad(iMonthDate + 1, 2)}`
                      ) > -1
                  ).length == 1
                    ? " selected"
                    : ""
                }${
                  dateIsHoliday(
                    iMonthDate + 1,
                    refDate.getMonth(),
                    refDate.getFullYear()
                  )
                    ? " holiday"
                    : ""
                }`}
                data-imonthdate={iMonthDate}
                data-day={dayOfWeek}
                key={iMonthDate}
                onClick={() => {
                  if (selectDateMode) {
                    if (
                      dateIsSelectableDate(
                        iMonthDate + 1,
                        refDate.getMonth(),
                        refDate.getFullYear()
                      )
                    ) {
                    } else {
                      return
                    }
                  }
                  const selectedDateObj = new Date(
                    `${refDate.getFullYear()}-${refDate.getMonth() + 1}-${
                      iMonthDate + 1
                    }`
                  )
                  setSelectedDate(selectedDateObj)
                  selectDateCallback?.(selectedDateObj)
                }}
              >
                <div className="date-display">{iMonthDate + 1}</div>
                {detailed && (
                  <DetailedExtraDateContent
                    date={`${refDate.getFullYear()}-${zPad(
                      refDate.getMonth() + 1,
                      2
                    )}-${zPad(iMonthDate + 1, 2)}`}
                  />
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CalendarMonth
