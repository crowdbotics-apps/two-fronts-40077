import React, { useEffect, useRef } from "react"
import { Button, Form } from "react-bootstrap"

import { ALLICONS } from "../../assets"
import AppFormSelect from "../../components/form/select"
import { useRolesContext } from "./context/roles-context"
import { useRoleMutation } from "../../utils/mutations"
import RoleItemMembers from "./role-item-members"
import { RoleItemContextProvider } from "./context/role-item-context"
import { APPCONFIG } from "../../app-config"
import { toast } from "react-toastify"
import {
  applicableThespianPoints,
  fieldErrorMessages
} from "../../utils/common"
import { useAppContext } from "../../contexts/app-context"

const RoleItem = ({ roleItemData = {} }) => {
  const {
    activeRoleCategoryTab,
    dataRoleCategories,
    isFetchingRoleCategories,
    refetchRoles
  } = useRolesContext()
  const fieldNameRef = useRef()

  const { selectedProduction } = useAppContext()

  const { id: roleId, category, members, name, thespian_point } = roleItemData

  useEffect(() => {
    if (name === APPCONFIG.apiConst.newRoleName) {
      console.log("Select name for field", roleId)
      fieldNameRef?.current?.select()
    }
  }, [])

  const modifyRoleMutation = useRoleMutation.useModifyRoleMutation()
  const handleModifyRoleSpec = (spec, newValue) => {
    const modifyRoleParams = {
      roleId
    }
    modifyRoleParams[spec] = newValue
    modifyRoleMutation.mutate(modifyRoleParams, {
      onSuccess: ({ data, status }) => {
        if (status === 200) {
        } else {
          refetchRoles?.()
          console.error(data)
        }
      },
      onError: axiosError => {
        toast.error(
          `Update failed. ${fieldErrorMessages(axiosError?.response?.data)}`
        )
        console.error(axiosError?.response?.data)
        refetchRoles?.()
      }
    })
  }

  const deleteRoleMutation = useRoleMutation.useDeleteRoleMutation()
  const handleDeleteRole = () => {
    if (window.confirm("Are you sure you wish to delete this role?")) {
      deleteRoleMutation.mutate(
        { roleId },
        {
          onSuccess: ({ data, status }) => {
            if (status === 204) {
              toast.success(`The role has been deleted`)
              refetchRoles?.()
            } else {
              console.error(data)
            }
          },
          onError: axiosError => {
            toast.error(`Failed to delete role.`)
            console.error(axiosError?.response?.data)
          }
        }
      )
    }
  }

  return (
    <RoleItemContextProvider>
      <div className="role-item" data-userscount={members?.length || 0}>
        <div className="role-item-contents-wrap">
          <Button
            variant="light"
            className="sq"
            title="Delete role"
            onClick={handleDeleteRole}
          >
            <ALLICONS.Delete />
          </Button>
          <Form.Group className="d-flex">
            <Form.Control
              ref={fieldNameRef}
              name={`role-name`}
              placeholder="Title"
              defaultValue={name}
              onChange={event => {
                handleModifyRoleSpec("name", event?.target?.value)
              }}
            />
          </Form.Group>
          <AppFormSelect
            ariaLabel="Category"
            className="category-selector"
            name={`role-category`}
            options={
              !!dataRoleCategories && !isFetchingRoleCategories
                ? dataRoleCategories?.data
                    ?.filter(
                      roleCatItem =>
                        roleCatItem?.type === activeRoleCategoryTab?.slug
                    )
                    ?.map(roleCatItem => {
                      return {
                        value: roleCatItem?.id,
                        label: roleCatItem?.name
                      }
                    })
                : []
            }
            selectedItem={category}
            onChangeCallback={event => {
              handleModifyRoleSpec("category", event?.target?.value)
            }}
          />
          <Form.Group className="d-flex">
            <Form.Control
              placeholder="Points"
              name={`role-points`}
              defaultValue={
                thespian_point ??
                applicableThespianPoints({
                  selectedProduction,
                  dataRoleCategories,
                  activeRoleCategoryTab,
                  categoryId: category
                })
              }
              onChange={event => {
                handleModifyRoleSpec("thespian_point", event?.target?.value)
              }}
            />
          </Form.Group>
          <RoleItemMembers
            roleItemData={{
              ...roleItemData,
              ...(!!fieldNameRef?.current?.value
                ? { name: fieldNameRef?.current?.value }
                : {})
            }}
          />
        </div>
      </div>
    </RoleItemContextProvider>
  )
}
export default RoleItem
