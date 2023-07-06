import React, { useEffect, useState } from "react"
import { Accordion, Form } from "react-bootstrap"
import { APPCONFIG } from "../../app-config"
import { ALLICONS } from "../../assets"
import { useAppContext } from "../../contexts/app-context"
import { getEntityFullName, getEntityInitials } from "../../utils/string"
import { useProductionCalendarUsersContext } from "./context/production-calendar-users-context"

const ProductionCalendarUserItem = ({
  listItem,
  membersSelected = [],
  onMemberSelectCallback
}) => {
  const { membersSelectable } = useProductionCalendarUsersContext()
  const memberId = listItem?.id * 1
  return (
    <div className="user-list-item">
      {membersSelectable && (
        <Form.Check
          type={`checkbox`}
          id={`role-member-to-add-${memberId}`}
          className={`me-4 ms-3`}
          checked={membersSelected?.indexOf(memberId) > -1}
          onChange={event => {
            onMemberSelectCallback?.(event?.target?.checked, memberId)
          }}
        />
      )}
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
      {!!!membersSelectable && (
        <div className="handle">
          <ALLICONS.SortHandle />
        </div>
      )}
    </div>
  )
}

const ScreenDashProductionCalendarUsersList = ({
  memberList = [],
  membersSelected = [],
  onMemberSelectCallback
}) => {
  const { setRoleNewMembersToAdd } = useProductionCalendarUsersContext()

  const [listItems, setListItems] = useState(memberList)

  const [searchKeyword, setSearchKeyword] = useState("")

  const filterStudents = () => {
    if (!!!memberList) return
    console.log("[filterStudents]")
    setListItems(
      memberList
        ?.filter(studRecord =>
          !!searchKeyword
            ? getEntityFullName(studRecord)
                .toLowerCase()
                .indexOf(searchKeyword.toLowerCase()) > -1
            : true
        )
        ?.sort((a, b) =>
          getEntityFullName(a)
            ?.toLowerCase()
            .localeCompare(getEntityFullName(b)?.toLowerCase())
        ) || []
    )
  }

  useEffect(() => {
    if (APPCONFIG.debugGlobal) console.log("[useEffect] searchKeyword")
    filterStudents()
  }, [searchKeyword])

  useEffect(() => {
    if (APPCONFIG.debugGlobal) console.log("[useEffect] memberList")
    filterStudents()
  }, [memberList])

  useEffect(() => {
    setRoleNewMembersToAdd?.([])
  }, [searchKeyword])

  return (
    <>
      <Form.Group className="form-group">
        <Form.Control
          className="form-control--search"
          name={`role-search-members-to-add`}
          placeholder="Search students"
          defaultValue={searchKeyword}
          onKeyUp={event => {
            console.log("Typing keyword...")
            setSearchKeyword(event?.target?.value || "")
          }}
        />
      </Form.Group>
      {listItems?.length === 0 ? (
        <p className="my-4">No results</p>
      ) : (
        <div className={`user-list`}>
          {listItems.map((listItem, j) => (
            <ProductionCalendarUserItem
              listItem={listItem}
              key={j}
              membersSelected={membersSelected}
              onMemberSelectCallback={onMemberSelectCallback}
            />
          ))}
        </div>
      )}
      <div className="flex-grow-1"></div>
    </>
  )
}
export default ScreenDashProductionCalendarUsersList
