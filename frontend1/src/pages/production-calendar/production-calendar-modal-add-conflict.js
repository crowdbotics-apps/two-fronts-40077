import React, { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import DatePicker from "react-datepicker"

import VCenteredModal from "../../components/modal/vcentered-modal"
import WrapperMainContentSidebar from "../../components/wrappers/dashboard/main-content-sidebar"
import { formatDateToFormat } from "../../utils/date"
import { useProductionCalendarContext } from "./context/production-calendar-context"
import ScreenDashProductionCalendarUsersList from "./production-calendar-users-list"
import { useAppContext } from "../../contexts/app-context"
import { useProductionsQueries } from "../../utils/queries"
import { useProductionMutation } from "../../utils/mutations"
import { toast } from "react-toastify"
import { fieldErrorMessages } from "../../utils/common"

const ProductionCalendarModalAddConflict = () => {
  const { isUserLoggedIn, selectedProduction } = useAppContext()
  const {
    refetchProductionConflicts,
    showModalAddConflict,
    setShowModalAddConflict
  } = useProductionCalendarContext()

  const userTypeFilters = [
    /*{
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
    },
    {
      slug: "Group",
      title: "Groups"
    },*/
    {
      slug: "cast",
      title: "Cast"
    },
    {
      slug: "crew",
      title: "Crew"
    }
  ]
  const [activeUserTypeFilter, setActiveUserTypeFilter] = useState(
    userTypeFilters[0]
  )
  const formDataInitialValue = {
    user: [],
    production: selectedProduction?.id
  }
  const [formData, setFormData] = useState(formDataInitialValue)

  const {
    data: dataApplicationStatusByRole,
    isFetching: isFetchingApplicationStatusByRole
  } = useProductionsQueries.useApplicationStatusByRoleQuery({
    enabled: isUserLoggedIn && !!showModalAddConflict,
    productionId: selectedProduction?.id,
    rolesType: activeUserTypeFilter?.slug
  })

  useEffect(() => {
    if (showModalAddConflict === true) {
      setFormData(formDataInitialValue) // reset data on open/close of modal
    }
  }, [showModalAddConflict])

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

  const addConflictMutation = useProductionMutation.useAddConflictMutation()
  const handleAddConflict = () => {
    addConflictMutation.mutate([{ ...formData }], {
      onSuccess: ({ data, status }) => {
        if ([200, 201].includes(status)) {
          toast.success(`The conflict have been added.`)
          setShowModalAddConflict(false)
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
            `Failed to add conflict. ${fieldErrorMessages(
              axiosError?.response?.data?.[0]
            ).join(", ")}`
        )
        console.error(axiosError?.response?.data)
      }
    })
  }

  return (
    <VCenteredModal
      id={`production-calendar-add-conflict-modal`}
      modalProps={{
        className: `modal-production-calendar w-max modal-production-calendar-add-conflict`,
        onHide: () => {
          setShowModalAddConflict(false)
        },
        show: showModalAddConflict,
        size: "xl"
      }}
      ModalFooterButtonsOnRight={() => (
        <>
          <Button
            variant="light"
            /*disabled={roleNewMembersToAdd?.length < 1}*/
            onClick={handleAddConflict}
          >
            Create Conflict
          </Button>
        </>
      )}
      closeButtonOnFooterText={"Cancel"}
    >
      <Container fluid className="py-2">
        <Row>
          <Col md={5} className={"d-flex flex-column pe-4"}>
            <h3 className="fs-20 mb-0">Add new conflict</h3>
            <Form.Group className="form-group">
              <Form.Label>Conflict Name</Form.Label>
              <Form.Control
                name={`new-conflict-name`}
                onChange={event => {
                  setFormDataItem("title", event?.target?.value || "")
                }}
              />
            </Form.Group>
            <Form.Group className="form-group flex-grow-1 d-flex flex-column">
              <Form.Label>Description</Form.Label>
              <Form.Control
                className="flex-grow-1"
                name={`new-conflict-description`}
                as={"textarea"}
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
                    name={`new-conflict-start-date-time`}
                    showTimeSelect
                    dateFormat="Pp"
                    selected={formData?.start_date ?? null}
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
                    name={`new-conflict-end-date-time`}
                    showTimeSelect
                    dateFormat="Pp"
                    selected={formData?.end_date ?? null}
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
                  ...(dataApplicationStatusByRole?.data?.applied || []),
                  ...(dataApplicationStatusByRole?.data?.not_applied || [])
                ]}
                membersSelected={[...(formData.user || [])]}
                onMemberSelectCallback={(selected, memberId) => {
                  console.log(selected, memberId)
                  let userList = [...(formData.user || [])]
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
                  setFormDataItem("user", [...userList])
                }}
              />
            </WrapperMainContentSidebar>
          </Col>
        </Row>
      </Container>
    </VCenteredModal>
  )
}
export default ProductionCalendarModalAddConflict
