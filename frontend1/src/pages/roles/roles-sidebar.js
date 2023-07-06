import React, { useEffect, useState } from "react"
import { Accordion, Form } from "react-bootstrap"
import { APPCONFIG } from "../../app-config"
import { ALLICONS } from "../../assets"
import { useAppContext } from "../../contexts/app-context"
import { getEntityFullName, getEntityInitials } from "../../utils/string"
import { useRoleItemContext } from "./context/role-item-context"

const RolesSidebarMemberListItem = ({
  listItem,
  membersSelectable = false
}) => {
  const { roleNewMembersToAdd, setRoleNewMembersToAdd } = useRoleItemContext()
  const memberId = listItem?.id * 1
  return (
    <div
      className="user-list-item"
      data-selected={JSON.stringify(roleNewMembersToAdd)}
    >
      {membersSelectable && (
        <Form.Check
          type={`checkbox`}
          id={`role-member-to-add-${memberId}`}
          className={`me-4 ms-3`}
          checked={roleNewMembersToAdd?.indexOf(memberId) > -1}
          onChange={event => {
            if (event?.target?.checked) {
              if (roleNewMembersToAdd?.indexOf(memberId) < 0)
                setRoleNewMembersToAdd?.([...roleNewMembersToAdd, memberId])
            } else {
              const memberIndex = roleNewMembersToAdd?.indexOf(memberId)
              if (memberIndex > -1) {
                let newSelectedMembersList = [...roleNewMembersToAdd]
                newSelectedMembersList.splice(memberIndex, 1)
                setRoleNewMembersToAdd?.([...newSelectedMembersList])
              }
            }
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
      {!!!membersSelectable &&
        false /* Handle icon disabled per client request */ && (
          <div className="handle">
            <ALLICONS.SortHandle />
          </div>
        )}
    </div>
  )
}

const ScreenDashRolesSidebar = ({ preselectMembers = [] }) => {
  const { dataAllStaff, dataAllStudents } = useAppContext()
  const { membersSelectable, roleNewMembersToAdd, setRoleNewMembersToAdd } =
    useRoleItemContext()

  const [listItemsApplied, setListItemsApplied] = useState([])
  const [listItemsNotApplied, setListItemsNotApplied] = useState([])

  const [searchKeyword, setSearchKeyword] = useState("")

  const filterStudents = () => {
    if (!!!dataAllStaff || !!!dataAllStudents) return
    console.log("[filterStudents]")
    setListItemsApplied(
      [...(dataAllStaff?.data || []), ...(dataAllStudents?.data || [])]
        ?.filter(
          studRecord =>
            !!studRecord?.is_school_join_requested &&
            (!!searchKeyword
              ? getEntityFullName(studRecord)
                  .toLowerCase()
                  .indexOf(searchKeyword.toLowerCase()) > -1
              : true)
        )
        ?.sort((a, b) =>
          getEntityFullName(a)
            ?.toLowerCase()
            .localeCompare(getEntityFullName(b)?.toLowerCase())
        ) || []
    )
    setListItemsNotApplied(
      [...(dataAllStaff?.data || []), ...(dataAllStudents?.data || [])]?.filter(
        studRecord =>
          !!!studRecord?.is_school_join_requested &&
          (!!searchKeyword
            ? getEntityFullName(studRecord)
                .toLowerCase()
                .indexOf(searchKeyword.toLowerCase()) > -1
            : true)
      ) || []
      // add sort
    )
  }

  useEffect(() => {
    if (APPCONFIG.debugGlobal) console.log("[useEffect] searchKeyword")
    filterStudents()
  }, [searchKeyword])

  useEffect(() => {
    if (!!dataAllStaff && !!dataAllStudents) {
      if (APPCONFIG.debugGlobal)
        console.log("[useEffect] dataAllStaff/dataAllStudents")
      filterStudents()
    }
  }, [dataAllStaff, dataAllStudents])

  useEffect(() => {
    setRoleNewMembersToAdd?.([])
  }, [searchKeyword])

  useEffect(() => {
    setRoleNewMembersToAdd?.(preselectMembers.map(memberItem => memberItem?.id))
  }, [])

  return (
    <>
      <Form.Group className="form-group px-1 pt-1">
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
      <Accordion defaultActiveKey="0" className="px-1 mt-3 pt-1">
        {/* `px-1` to accommodate the box-shadow */}
        {[listItemsApplied, listItemsNotApplied].map((memberList, i) => (
          <React.Fragment key={i}>
            {memberList?.length > 0 && (
              <Accordion.Item eventKey={`${i}`}>
                <Accordion.Header
                  data-selectedcount={
                    !!membersSelectable
                      ? memberList?.filter(
                          memItem =>
                            roleNewMembersToAdd?.indexOf(memItem?.id * 1) > -1
                        ).length
                      : 0
                  }
                >
                  {i === 0 ? `Applied` : `Did not apply`} ({memberList.length})
                </Accordion.Header>
                <Accordion.Body>
                  <div className={`user-list ${i > 0 ? "not-" : ""}applied`}>
                    {memberList.map((listItem, j) => (
                      <RolesSidebarMemberListItem
                        listItem={listItem}
                        membersSelectable={membersSelectable}
                        key={j}
                      />
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            )}
          </React.Fragment>
        ))}
        {listItemsApplied.length === 0 && listItemsNotApplied.length === 0 && (
          <p className="my-4">No results</p>
        )}
      </Accordion>
      <div className="flex-grow-1"></div>
    </>
  )
}
export default ScreenDashRolesSidebar
