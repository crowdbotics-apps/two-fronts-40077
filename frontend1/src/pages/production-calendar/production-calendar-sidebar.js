import React from "react"
import { Button } from "react-bootstrap"
import CalendarMonth from "../../components/calendar-month"
import HeaderActionsBar from "../../components/header-actions-bar"
import { formatDateToFormat, getTimeAmPm } from "../../utils/date"
import { useProductionCalendarContext } from "./context/production-calendar-context"

const EventItem = ({ eventItemData }) => {
  const { setShowModalAddEvent, setModalEditEventData } =
    useProductionCalendarContext()
  return (
    <div
      className="event-item cursor-pointer"
      onClick={() => {
        setModalEditEventData(eventItemData)
        setShowModalAddEvent(true)
      }}
    >
      <div className="time">
        {getTimeAmPm(`${eventItemData?.date} ${eventItemData?.start_time}`)}
        <br />
        to
        <br />
        {getTimeAmPm(`${eventItemData?.date} ${eventItemData?.end_time}`)}
      </div>
      <div className="details">
        <h4>{eventItemData?.name}</h4>
        <div className="tags">
          <span className="tag">{eventItemData?.entry}</span>
        </div>
      </div>
    </div>
  )
}

const ScreenDashProductionCalendarSidebar = () => {
  const {
    setCurrentMonth,
    monthDateRange,
    monthSelectedDate,
    setMonthSelectedDate,
    dataAllEvents,
    isFetchingAllEvents,
    setShowModalAddEvent
  } = useProductionCalendarContext()
  return (
    <>
      <HeaderActionsBar
        className="production-calendar-main-header d-flex align-items-center"
        ButtonsLeft={() => (
          <>
            <h4 className="mb-0">Production calendar</h4>
          </>
        )}
        ButtonsRight={() => (
          <>
            <Button
              variant="light"
              onClick={() => {
                setShowModalAddEvent(true)
              }}
            >
              Add event
            </Button>
          </>
        )}
      ></HeaderActionsBar>
      <CalendarMonth
        selectDateMode={true}
        selectDateModeDefaultSelectedDate={monthSelectedDate}
        selectDateCallback={date => {
          setMonthSelectedDate(date)
        }}
        startDate={monthDateRange[0]}
        refDateCallback={changeObject => {
          if (!!changeObject?.refDate) setCurrentMonth(changeObject?.refDate)
        }}
        showDotForDates={[
          ...new Set(dataAllEvents?.data?.map(eventItem => eventItem?.date))
        ]}
      />
      {!!dataAllEvents && !isFetchingAllEvents && (
        <div className="events-list">
          {dataAllEvents?.data
            ?.filter(
              eventItem =>
                eventItem?.date ===
                formatDateToFormat(monthSelectedDate.toString(), "YYYY-MM-DD")
            )
            ?.map((eventItem, i) => (
              <EventItem eventItemData={eventItem} key={i} />
            ))}
        </div>
      )}
    </>
  )
}
export default ScreenDashProductionCalendarSidebar
