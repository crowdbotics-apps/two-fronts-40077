import React, { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import DatePicker from "react-datepicker"

import VCenteredModal from "../../components/modal/vcentered-modal"
import WrapperMainContentSidebar from "../../components/wrappers/dashboard/main-content-sidebar"
import { formatDateToFormat, getTimeAmPm } from "../../utils/date"
import { useProductionCalendarContext } from "./context/production-calendar-context"
import ScreenDashProductionCalendarUsersList from "./production-calendar-users-list"
import { useAppContext } from "../../contexts/app-context"
import { useProductionsQueries } from "../../utils/queries"
import { useProductionMutation } from "../../utils/mutations"
import { toast } from "react-toastify"
import { fieldErrorMessages } from "../../utils/common"
import AppFormSelect from "../../components/form/select"
import { APPCONFIG } from "../../app-config"
import { getEntityFullName, getEntityInitials } from "../../utils/string"

const ProductionCalendarModalAddEvent = () => {
  const { dataAllStaff, dataAllStudents, dataProductions, selectedProduction } =
    useAppContext()
  const {
    refetchAllEvents,
    dataAllParents,
    dataGroups,
    showModalAddEvent,
    setShowModalAddEvent,
    showModalAddEventOverConflicts,
    setShowModalAddEventOverConflicts,
    dataAddEventOverConflicts,
    setDataAddEventOverConflicts,
    modalEditEventData,
    setModalEditEventData
  } = useProductionCalendarContext()

  const entryOptions = [
    APPCONFIG.apiConst.EntryOptions.OPEN_TO_ALL,
    APPCONFIG.apiConst.EntryOptions.INVITATION_ONLY
  ].map(entryItem => ({
    label: entryItem,
    value: entryItem
  }))

  const userTypeFilters = [
    {
      slug: "Student",
      title: "Students"
    },
    {
      slug: "Parent",
      title: "Parents"
    },
    {
      slug: "Teacher",
      title: "Teachers"
    } /*,
    {
      slug: "Group",
      title: "Groups"
    },
    {
      slug: "cast",
      title: "Cast"
    },
    {
      slug: "crew",
      title: "Crew"
    }*/
  ]
  const [activeUserTypeFilter, setActiveUserTypeFilter] = useState(
    userTypeFilters[0]
  )
  const formDataInitialValue = {
    user: [],
    production: selectedProduction?.id,
    entry: entryOptions?.[0]?.value
  }
  const [formData, setFormData] = useState(formDataInitialValue)

  useEffect(() => {
    if (showModalAddEvent === true) {
      setFormData(formDataInitialValue) // reset data on open/close of modal
    } else {
      setModalEditEventData(null)
    }
  }, [showModalAddEvent])

  const setFormDataItem = (fieldName, value) => {
    setFormData?.(prevData => ({
      ...prevData,
      [fieldName]: value,
      ...(fieldName === "start_date"
        ? {
            date: formatDateToFormat(value, "YYYY-MM-DD"),
            start_time: formatDateToFormat(value, "hh:mm")
          }
        : {}),
      ...(fieldName === "end_date"
        ? {
            end_time: formatDateToFormat(value, "hh:mm")
          }
        : {})
    }))
  }

  const addEventMutation = useProductionMutation.useAddEventMutation()
  const checkEventConflictsMutation =
    useProductionMutation.useCheckEventConflictsMutation()
  const confirmedCreateEvent = () => {
    addEventMutation.mutate(
      { ...formData },
      {
        onSuccess: ({ data, status }) => {
          if ([200, 201].includes(status)) {
            toast.success(`The event have been added.`)
            setShowModalAddEvent(false)
            setShowModalAddEventOverConflicts(false)
            refetchAllEvents?.()
          } else {
            console.error(data)
          }
        },
        onError: axiosError => {
          const errorMessage =
            axiosError?.response?.data?.non_field_errors?.[0] ??
            `Failed to add event. ${fieldErrorMessages(
              axiosError?.response?.data
            ).join(", ")}`
          toast.error(errorMessage?.toString())
        }
      }
    )
  }
  const handleAddEvent = () => {
    checkEventConflictsMutation.mutate(
      { ...formData },
      {
        onSuccess: ({ data, status }) => {
          if (status === 200) {
            if ((data?.conflict_data || [])?.length > 0) {
              setShowModalAddEventOverConflicts(true)
              setDataAddEventOverConflicts(data?.conflict_data)
            } else {
              confirmedCreateEvent()
            }
          }
        },
        onError: axiosError => {}
      }
    )
  }

  return (
    <>
      <VCenteredModal
        id={`production-calendar-add-event-over-conflicts-modal`}
        modalProps={{
          className: `modal-production-calendar modal-production-calendar-add-event-over-conflicts`,
          onHide: () => {
            setShowModalAddEventOverConflicts(false)
          },
          show: showModalAddEventOverConflicts,
          size: "md"
        }}
        modalTitle={`Scheduling over conflicts`}
        ModalFooterButtonsOnRight={() => (
          <>
            <Button variant="light" onClick={confirmedCreateEvent}>
              Save
            </Button>
          </>
        )}
        closeButtonOnFooterText={"Cancel"}
      >
        {!!dataAddEventOverConflicts && (
          <>
            {dataAddEventOverConflicts?.map((addEventConflictMemberItem, i) => (
              <AddEventConflictMemberItem
                conflictData={addEventConflictMemberItem}
                key={i}
              />
            ))}
          </>
        )}
      </VCenteredModal>
      <VCenteredModal
        id={`production-calendar-add-event-modal`}
        modalProps={{
          className: `modal-production-calendar w-max modal-production-calendar-add-event`,
          onHide: () => {
            setShowModalAddEvent(false)
          },
          show: showModalAddEvent,
          size: "xl"
        }}
        ModalFooterButtonsOnRight={() => (
          <>
            <Button
              variant="light"
              /*disabled={roleNewMembersToAdd?.length < 1}*/
              onClick={handleAddEvent}
            >
              {!!modalEditEventData ? `Update` : `Create`} Event
            </Button>
          </>
        )}
        closeButtonOnFooterText={"Cancel"}
      >
        <Container fluid className="py-2">
          <Row>
            <Col md={5} className={"d-flex flex-column pe-4"}>
              <h3 className="fs-20 mb-0">
                {!!modalEditEventData ? `Edit` : `Add new`} event
              </h3>
              <Form.Group className="form-group">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  name={`new-event-name`}
                  defaultValue={modalEditEventData?.name ?? ""}
                  onChange={event => {
                    setFormDataItem("name", event?.target?.value || "")
                  }}
                />
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label>Production</Form.Label>
                <AppFormSelect
                  ariaLabel="Select production"
                  name={`new-event-production`}
                  options={[
                    ...(dataProductions?.data
                      ?.sort((a, b) => a?.title?.localeCompare(b?.title))
                      ?.map((productionItem, i) => {
                        return {
                          value: productionItem?.id,
                          label: productionItem?.title
                        }
                      }) || [])
                  ]}
                  selectedItem={modalEditEventData?.production?.id ?? null}
                  onChangeCallback={event => {
                    const selectedItem = dataProductions?.data?.find(
                      productionItem =>
                        productionItem?.id * 1 === (event.target.value || 0) * 1
                    )
                    setFormDataItem("production", selectedItem?.id)
                  }}
                  selectFieldClassName={`form-control`}
                />
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label>Entry</Form.Label>
                <AppFormSelect
                  ariaLabel="Select entry option"
                  name={`new-event-entry`}
                  options={entryOptions}
                  selectedItem={
                    modalEditEventData?.entry ??
                    formData?.entry ??
                    entryOptions?.[0]?.value
                  }
                  onChangeCallback={event => {
                    setFormDataItem("entry", event.target.value)
                  }}
                  selectFieldClassName={`form-control`}
                />
              </Form.Group>
              <Form.Group className="form-group flex-grow-1 d-flex flex-column">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  className="flex-grow-1"
                  name={`new-event-description`}
                  as={"textarea"}
                  defaultValue={modalEditEventData?.description ?? ""}
                  onChange={event => {
                    setFormDataItem("description", event?.target?.value || "")
                  }}
                />
              </Form.Group>
              <Row>
                <Col xl={6} className={"ps-2"}>
                  <Form.Group className="form-group">
                    <Form.Label>Start date and time</Form.Label>
                    <DatePicker
                      className="form-control"
                      name={`new-event-start-date-time`}
                      showTimeSelect
                      dateFormat="Pp"
                      selected={
                        !!modalEditEventData
                          ? new Date(
                              `${modalEditEventData?.date} ${modalEditEventData?.start_time}`
                            )
                          : formData?.start_date ?? null
                      }
                      onChange={date => {
                        setFormDataItem("start_date", date)
                        let endDate = new Date(date)
                        endDate.setMinutes(endDate.getMinutes() + 30)
                        setFormDataItem("end_date", endDate)
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>End date and time</Form.Label>
                    <DatePicker
                      className="form-control"
                      name={`new-event-end-date-time`}
                      showTimeSelect
                      dateFormat="Pp"
                      selected={
                        !!modalEditEventData
                          ? new Date(
                              `${modalEditEventData?.date} ${modalEditEventData?.end_time}`
                            )
                          : formData?.end_date ?? null
                      }
                      maxDate={formData?.start_date ?? null}
                      minDate={formData?.start_date ?? null}
                      disabled={!!!formData?.start_date}
                      onChange={date => {
                        setFormDataItem("end_date", date)
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col md={7} className="col-right ps-4">
              <div className="user-filters mb-4">
                {userTypeFilters.map((userTypeFilterItem, i) => (
                  <Button
                    className="flex-grow-1"
                    variant={
                      userTypeFilterItem?.slug === activeUserTypeFilter?.slug
                        ? "primary"
                        : "light"
                    }
                    key={i}
                    onClick={() => {
                      setActiveUserTypeFilter(userTypeFilterItem)
                    }}
                  >
                    {userTypeFilterItem?.title}
                  </Button>
                ))}
              </div>
              <WrapperMainContentSidebar simpleBarMaxHeight="calc(100vh - (100vw * 220 / 1920))">
                <ScreenDashProductionCalendarUsersList
                  memberList={[
                    ...(dataAllStaff?.data || []),
                    ...(dataAllStudents?.data || []),
                    ...(dataAllParents?.data || [])
                  ].filter(memberItem =>
                    ["Parent", "Student", "Teacher"].includes(
                      activeUserTypeFilter?.slug
                    )
                      ? memberItem?.user_type === activeUserTypeFilter?.slug
                      : false
                  )}
                  membersSelected={[
                    ...(modalEditEventData?.participants?.map(
                      memberItem => memberItem?.id
                    ) ?? []),
                    ...(formData.participants || [])
                  ]}
                  onMemberSelectCallback={(selected, memberId) => {
                    console.log(selected, memberId)
                    let userList = [...(formData.participants || [])]
                    const index = userList.indexOf(memberId)
                    if (selected) {
                      if (index < 0) {
                        userList.push(memberId)
                      }
                    } else {
                      if (index > -1) {
                        userList.splice(index, 1)
                      }
                    }
                    setFormDataItem("participants", [...userList])
                  }}
                />
              </WrapperMainContentSidebar>
            </Col>
          </Row>
        </Container>
      </VCenteredModal>
    </>
  )
}

const AddEventConflictMemberItem = ({ conflictData }) => {
  const listItem = conflictData?.user_detail?.[0] ?? {}
  return (
    <div className="add-event-conflict-member-item">
      <div className="user-list-item">
        <div
          className={`image${!!!listItem?.profile_picture ? " no-image" : ""}`}
          data-initials={getEntityInitials(listItem)}
        >
          {!!listItem?.profile_picture && (
            <img src={listItem?.profile_picture} alt="" />
          )}
        </div>
        <div className="details d-flex flex-column flex-grow-1">
          <div className="title">{getEntityFullName(listItem)}</div>
          <div className="type">{listItem?.user_type}</div>
        </div>
      </div>
      <div className="conflict-details">
        <div className="time">
          {getTimeAmPm(`${conflictData?.date} ${conflictData?.start_time}`)} to{" "}
          {getTimeAmPm(`${conflictData?.date} ${conflictData?.end_time}`)}
        </div>
        <div className="title">{conflictData?.title}</div>
      </div>
      <div className="conflict-details descr">{conflictData?.description}</div>
      {[`Ignore conflict`, `Mark as excused absence`].map((checkboxItem, i) => (
        <Form.Group className="d-flex align-items-center form-group" key={i}>
          <Form.Check type={`checkbox`} className={`me-2`} />
          <Form.Label className="my-0">{checkboxItem}</Form.Label>
        </Form.Group>
      ))}
    </div>
  )
}

export default ProductionCalendarModalAddEvent
