import React from "react"

import { ALLGRAPHICS, ALLICONS } from "../../../assets"
import { formatDateToFormat } from "../../../utils/date"

const DashboardSidebarProductionInfo = ({ production }) => {
  return (
    <div className="sidebar-production-info d-flex flex-column align-items-center text-center">
      <div className="avatar">
        {!!production?.image ? (
          <img src={production?.image} alt="" />
        ) : (
          <ALLGRAPHICS.NoImage.Production className="flex-grow-1" />
        )}
        <ALLICONS.Edit className="cursor-pointer" />
      </div>
      <div className="info">
        <h4 className="title">{production?.title}</h4>
        <div className="date">
          {production?.date?.[0]?.date_time
            ? formatDateToFormat(
                production?.date?.[0]?.date_time,
                "MMMM D, YYYY"
              )
            : ""}
        </div>
        <div className="theatre">{production?.venue}</div>
      </div>
    </div>
  )
}
export default DashboardSidebarProductionInfo
