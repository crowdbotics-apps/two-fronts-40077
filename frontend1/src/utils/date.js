import { APPCONFIG } from "../app-config"
import { numberOrdinal, zPad } from "./number"

export const formatDateToString = dateStringObject => {
  const dateObject = !!dateStringObject
    ? typeof dateStringObject === "string"
      ? new Date(dateStringObject)
      : dateStringObject // is object
    : new Date()
  return `${dateObject.getFullYear()}-${zPad(
    dateObject.getMonth() + 1,
    2
  )}-${zPad(dateObject.getDate(), 2)}`
}
export const formatDateToStringUS = dateString => {
  const dateObject = new Date(dateString)
  let d = formatDateToString(dateObject)
  d = d.split("-")
  return `${d[1]}/${d[2]}/${d[0]}`
}
export const formatDateToFormat = (dateString, format = "MMM D") => {
  const dateObject = new Date(dateString)
  const d = formatDateToString(dateObject).split("-")
  return format
    .replace("DAY", APPCONFIG.dayNames[dateObject.getDay()])
    .replace("DD", zPad(d[2], 2))
    .replace("D", d[2] * 1)
    .replace("O", numberOrdinal(d[2]))
    .replace("MMMM", APPCONFIG.monthNames[d[1] - 1])
    .replace("MMM", APPCONFIG.monthNames[d[1] - 1]?.substring(0, 3))
    .replace("MM", zPad(d[1], 2))
    .replace("YYYY", d[0])
    .replace("hh", dateObject.getHours())
    .replace("mm", zPad(dateObject.getMinutes(), 2))
}

export const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate()
}

export const firstLastDatesOfMonth = dateObject => {
  const firstDateObject = new Date(dateObject)
  firstDateObject.setDate(1)
  const lastDateObject = new Date(
    dateObject.getFullYear(),
    dateObject.getMonth() + 1,
    0
  )
  return [
    formatDateToString(firstDateObject),
    formatDateToString(lastDateObject)
  ]
}

export const getTimeAmPm = dateTimeString => {
  const t = new Date(dateTimeString)
  return `${t.getHours() % 12}:${zPad(t.getMinutes(), 2)} ${
    t.getHours() >= 12 ? "pm" : "am"
  }`
}
