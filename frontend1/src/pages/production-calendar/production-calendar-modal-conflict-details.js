import React from "react"
import { Button } from "react-bootstrap"

import VCenteredModal from "../../components/modal/vcentered-modal"
import { formatDateToFormat, getTimeAmPm } from "../../utils/date"
import { useProductionCalendarContext } from "./context/production-calendar-context"
import { useProductionMutation } from "../../utils/mutations"
import { toast } from "react-toastify"
import { fieldErrorMessages } from "../../utils/common"
import { getEntityFullName, getEntityInitials } from "../../utils/string"

const ProductionCalendarModalConflictDetails = () => {
  const {
    modalConflictDetails,
    showModalConflictDetails,
    setShowModalConflictDetails,
    refetchProductionConflicts
  } = useProductionCalendarContext()

  const userHavingConflict = modalConflictDetails?.user_detail?.[0]

  const deleteConflictMutation =
    useProductionMutation.useDeleteConflictMutation()
  const handleDeleteConflict = () => {
    deleteConflictMutation.mutate(
      { conflictId: modalConflictDetails?.id },
      {
        onSuccess: ({ data, status }) => {
          if ([204].includes(status)) {
            toast.success(`The conflict have been deleted.`)
            setShowModalConflictDetails(false)
            refetchProductionConflicts?.()
          } else {
            console.error(data)
          }
        },
        onError: axiosError => {
          console.log("err")
          console.log(fieldErrorMessages(axiosError?.response?.data?.[0]))
          toast.error(
            axiosError?.response?.data?.non_field_errors?.[0] ??
              `Failed to delete conflict. ${fieldErrorMessages(
                axiosError?.response?.data?.[0]
              ).join(", ")}`
          )
          console.error(axiosError?.response?.data)
        }
      }
    )
  }

  return (
    <>
      <VCenteredModal
        id={`production-calendar-conflict-details-modal`}
        modalProps={{
          className: `modal-production-calendar modal-production-calendar-conflict-details`,
          onHide: () => {
            setShowModalConflictDetails(false)
          },
          show: showModalConflictDetails,
          size: "md"
        }}
        modalTitle={`Conflict details ${formatDateToFormat(
          modalConflictDetails?.date,
          "MM.DD"
        )}`}
        ModalFooterButtonsOnRight={() => (
          <>
            <Button variant="light" onClick={handleDeleteConflict}>
              Remove
            </Button>
          </>
        )}
        closeButtonOnFooterText={"Cancel"}
      >
        {!!userHavingConflict && (
          <>
            <div className="user-list-item">
              <div
                className={`image${
                  !!!userHavingConflict?.profile_picture ? " no-image" : ""
                }`}
                data-initials={getEntityInitials(userHavingConflict)}
              >
                {!!userHavingConflict?.profile_picture && (
                  <img src={userHavingConflict?.profile_picture} alt="" />
                )}
              </div>
              <div className="details d-flex flex-column flex-grow-1">
                <div className="title">
                  {getEntityFullName(userHavingConflict)}
                </div>
                <div className="type">{userHavingConflict?.user_type}</div>
              </div>
            </div>
          </>
        )}
        <div className="events-list">
          <ConflictItem conflictItemData={modalConflictDetails} />
        </div>
      </VCenteredModal>
    </>
  )
}

const ConflictItem = ({ conflictItemData }) => {
  return (
    <div className="event-item">
      <div className="time">
        {getTimeAmPm(
          `${conflictItemData?.date} ${conflictItemData?.start_time}`
        )}
        <br />
        to
        <br />
        {getTimeAmPm(`${conflictItemData?.date} ${conflictItemData?.end_time}`)}
      </div>
      <div className="details">
        <h4>{conflictItemData?.title}</h4>
        <div className="tags">
          <span
            className={`tag${
              conflictItemData?.description ? "" : " invisible"
            }`}
          >
            {conflictItemData?.description}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductionCalendarModalConflictDetails
