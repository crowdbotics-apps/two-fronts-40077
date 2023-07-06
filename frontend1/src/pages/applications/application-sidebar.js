import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"
import { useApplicationContext } from "./context/application-context"
import { useEffect } from "react"

const ScreenDashApplicationSidebar = ({}) => {
  const {
    additionalData,
    setAdditionalData,
    activeApplicationCategoryTab,

    applicationItems,
    setApplicationItems,
    applicationRecord,
    setApplicationRecord
  } = useApplicationContext()

  const handleCollectConflict = event => {
    const value = event.target.value === "1" ? true : false
    setAdditionalData?.({ ...additionalData, collect_conflict: value })
    if (!value) {
      const {
        from_date,
        to_date,
        application_deadline,
        ...restOfAdditionalData
      } = additionalData
      setAdditionalData({ ...restOfAdditionalData, collect_conflict: value })
    }
  }

  const onChange = dates => {
    const [start, end] = dates
    setAdditionalData?.(prevData => ({
      ...prevData,
      from_date: start ? format(start, "yyyy-MM-dd") : "",
      to_date: end ? format(end, "yyyy-MM-dd") : ""
    }))
  }

  const handleDateChange = (fieldName, value) => {
    const formattedDate = value ? format(value, "yyyy-MM-dd") : ""
    setAdditionalData?.(prevData => ({
      ...prevData,
      [fieldName]: formattedDate
    }))
  }

  return (
    <>
      {activeApplicationCategoryTab.slug !== "completedApplications" ? (
        <>
          <label className="d-flex align-item-start mb-1">
            Collect Conflicts
          </label>
          <select
            className="form-select"
            aria-label="collect-conflicts"
            onChange={handleCollectConflict}
            defaultValue={additionalData?.collect_conflict === true ? "1" : "0"}
          >
            {/* <option selected>Collect Conflicts</option> */}
            <option value={"1"}>Yes</option>
            <option value={"0"}>No</option>
          </select>
          <div>
            {additionalData?.collect_conflict === true && (
              <>
                <label className="d-flex align-item-start mb-1 mt-3">
                  Date range for Conflicts
                </label>
                <DatePicker
                  selected={
                    additionalData?.from_date
                      ? new Date(additionalData.from_date)
                      : ""
                  }
                  onChange={onChange}
                  startDate={
                    additionalData?.from_date
                      ? new Date(additionalData.from_date)
                      : ""
                  }
                  endDate={
                    additionalData?.to_date
                      ? new Date(additionalData.to_date)
                      : ""
                  }
                  selectsRange
                />
              </>
            )}
            <label className="d-flex align-item-start mb-1 mt-3">
              Application deadline
            </label>
            <DatePicker
              selected={
                additionalData?.application_deadline
                  ? new Date(additionalData.application_deadline)
                  : applicationRecord?.application_deadline
                  ? new Date(applicationRecord?.application_deadline)
                  : ""
              }
              onChange={date => handleDateChange("application_deadline", date)}
            />
          </div>
        </>
      ) : null}
    </>
  )
}
export default ScreenDashApplicationSidebar
