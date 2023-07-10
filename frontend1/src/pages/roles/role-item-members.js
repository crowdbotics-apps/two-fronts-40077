import React, { useState } from "react"
import { Button } from "react-bootstrap"

import { ALLICONS } from "../../assets"
import VCenteredModal from "../../components/modal/vcentered-modal"
import { useRolesContext } from "./context/roles-context"
import { useRoleMutation } from "../../utils/mutations"
import { getEntityFullName } from "../../utils/string"
import WrapperMainContentSidebar from "../../components/wrappers/dashboard/main-content-sidebar"
import ScreenDashRolesSidebar from "./roles-sidebar"
import { useRoleItemContext } from "./context/role-item-context"
import { toast } from "react-toastify"

const RoleItemMembers = ({ className = "", roleItemData = {} }) => {
  const { refetchRoles } = useRolesContext()
  const { roleNewMembersToAdd } = useRoleItemContext()
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)

  const { id: roleId, members, name, role_category } = roleItemData

  const modifyRoleMutation = useRoleMutation.useModifyRoleMutation()
  const handleRemoveMember = memberItem => {
    if (!window.confirm("Are you sure you wish to remove this member?"))
      return false
    const removeMemberParams = {
      roleId,
      members: [
        ...((members || [])
          ?.map(memItem => {
            return memItem?.id
          })
          ?.filter(memItemId => memItemId !== memberItem?.id) || [])
      ]
    }
    modifyRoleMutation.mutate(removeMemberParams, {
      onSuccess: ({ data, status }) => {
        if (status === 200) {
          toast.success(`The member has been removed`)
          refetchRoles?.()
        } else {
          console.error(data)
        }
      },
      onError: axiosError => {
        toast.error(`Failed to remove member.`)
        console.error(axiosError?.response?.data)
      }
    })
  }
  const handleAddMembers = () => {
    const modifyRoleParams = {
      roleId,
      members: [
        ...(members || [])?.map(memItem => {
          return memItem?.id
        }),
        ...roleNewMembersToAdd
      ]
    }
    modifyRoleMutation.mutate(modifyRoleParams, {
      onSuccess: ({ data, status }) => {
        if (status === 200) {
          toast.success(`The members have been added.`)
          setShowAddMemberModal(false)
          refetchRoles?.()
        } else {
          console.error(data)
        }
      },
      onError: axiosError => {
        toast.error(`Failed to add members.`)
        console.error(axiosError?.response?.data)
      }
    })
  }

  const handleAddMemberToRole = () => {
    setShowAddMemberModal(true)
  }

  return (
    <>
      <div className={`role-item-users d-flex flex-column ${className}`}>
        {(members || [])
          ?.sort((a, b) =>
            `${a?.first_name} ${a?.last_name}`?.localeCompare(
              `${b?.first_name} ${b?.last_name}`
            )
          )
          ?.map((memberItem, i) => (
            <div className="role-item-user" key={i}>
              <div className="avatar" title={getEntityFullName(memberItem)}>
                {!!memberItem?.profile_picture && (
                  <img src={memberItem?.profile_picture} alt="" />
                )}
              </div>
              <div className="title" title={getEntityFullName(memberItem)}>
                {getEntityFullName(memberItem)}
              </div>
              {i === (members || []).length - 1 && (
                <Button
                  variant="light"
                  className="sq add"
                  title="Add member"
                  onClick={handleAddMemberToRole}
                >
                  <ALLICONS.Add />
                </Button>
              )}
              <Button
                variant="primary"
                className="sq delete"
                title="Remove"
                onClick={() => {
                  handleRemoveMember(memberItem)
                }}
              >
                <ALLICONS.Delete fillColor={"#FFF"} />
              </Button>
            </div>
          ))}
        {(members || []).length === 0 && (
          <div className="role-item-user">
            <Button
              variant="light"
              className="d-flex align-items-center justify-content-center flex-grow-1"
              onClick={handleAddMemberToRole}
            >
              <ALLICONS.Add className="me-3" /> Add member
            </Button>
          </div>
        )}
      </div>
      <VCenteredModal
        id={`role-${roleId}-add-member-modal`}
        modalProps={{
          className: `modal-role-add-member`,
          onHide: () => {
            console.log("hide")
            setShowAddMemberModal(false)
          },
          show: showAddMemberModal,
          size: "md"
        }}
        modalTitle={`Add member to "${name}" ${role_category?.type} role`}
        /*ModalContentDeprecated*/
        ModalFooterButtonsOnRight={() => (
          <>
            <Button
              variant="primary"
              disabled={roleNewMembersToAdd?.length < 1}
              onClick={handleAddMembers}
            >
              Add
            </Button>
          </>
        )}
        closeButtonOnFooterText={"Cancel"}
      >
        <WrapperMainContentSidebar
          className="px-1"
          simpleBarMaxHeight="calc(100vh - (100vw * 220 / 1920))"
        >
          {showAddMemberModal && (
            <ScreenDashRolesSidebar preselectMembers={members} />
          )}
        </WrapperMainContentSidebar>
      </VCenteredModal>
    </>
  )
}
export default RoleItemMembers
