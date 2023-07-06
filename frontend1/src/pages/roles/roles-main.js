import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { toast } from "react-toastify"
import { APPCONFIG } from "../../app-config"
import { ALLICONS } from "../../assets"

import HeaderActionsBar from "../../components/header-actions-bar"
import { useAppContext } from "../../contexts/app-context"
import { fieldErrorMessages } from "../../utils/common"
import { useRoleMutation } from "../../utils/mutations"
import { useRolesContext } from "./context/roles-context"
import RoleItem from "./role-item"

const ScreenDashRolesMain = () => {
  const { selectedProduction } = useAppContext()
  const {
    roleCategoryTabs,
    activeRoleCategoryTab,
    setActiveRoleCategoryTab,

    dataRoles,
    isFetchingRoles,
    refetchRoles,

    dataRoleCategories,
    isFetchingRoleCategories,

    dataRolesApplicationStatus,
    isFetchingRolesApplicationStatus,
    refetchRolesApplicationStatus
  } = useRolesContext()

  const [activeRoleCatPublished, setActiveRoleCatPublished] = useState(false)

  useEffect(() => {
    if (!!dataRoles && !isFetchingRoles) {
      setActiveRoleCatPublished(
        dataRoles?.data?.[`is_${activeRoleCategoryTab?.slug}_published`]
      )
    }
  }, [dataRoles, isFetchingRoles, activeRoleCategoryTab])

  const addRoleMutation = useRoleMutation.useAddRoleMutation()
  const handleAddRole = () => {
    const firstRoleCategory = dataRoleCategories?.data?.find(
      roleCatItem => roleCatItem?.type === activeRoleCategoryTab?.slug
    )
    if (!!!firstRoleCategory) {
      toast.error(`No ${activeRoleCategoryTab?.slug} category available`)
      return
    }
    const addRoleParams = {
      name: APPCONFIG.apiConst.newRoleName,
      category: firstRoleCategory?.id,
      production: selectedProduction?.id
    }
    console.log(addRoleParams)
    addRoleMutation.mutate(addRoleParams, {
      onSuccess: ({ data, status }) => {
        if ([200, 201].indexOf(status) > -1) {
          toast.success(`The new role has been added.`)
          refetchRoles?.()
        } else {
          console.error(data)
        }
      },
      onError: axiosError => {
        toast.error(
          `Failed to add role. ${fieldErrorMessages(
            axiosError?.response?.data
          )}`
        )
        console.error(axiosError?.response?.data)
      }
    })
  }

  const publishRolesMutation = useRoleMutation.usePublishRolesMutation()
  const handlePublishRoles = () => {
    const memberIds = dataRoles?.data?.data
      ?.filter(
        roleItem =>
          roleItem?.role_category?.type === activeRoleCategoryTab?.slug
      )
      ?.reduce((total, roleItem) => {
        return [...total, ...roleItem?.members?.map(memItem => memItem?.id)]
      }, [])
      ?.filter((value, index, array) => array.indexOf(value) === index)
    const publishRolesParams = {
      rolesType: activeRoleCategoryTab?.slug,
      production: selectedProduction?.id,
      role: [
        ...dataRoles?.data?.data
          ?.filter(
            roleItem =>
              roleItem?.role_category?.type === activeRoleCategoryTab?.slug
          )
          .map(roleItem => roleItem?.id)
      ],
      group: {
        name: `${
          APPCONFIG.apiConst.RoleCategoryTitle?.[
            activeRoleCategoryTab?.slug?.toString()?.toUpperCase()
          ]
        }: ${selectedProduction?.title}`,
        description: selectedProduction?.description,
        members: memberIds,
        production: selectedProduction?.id
      },
      combined_group_name: selectedProduction?.title
    }
    publishRolesMutation.mutate(publishRolesParams, {
      onSuccess: ({ data, status }) => {
        if ([200, 201].indexOf(status) > -1) {
          toast.success(
            `The production ${activeRoleCategoryTab?.slug} roles have been published.`
          )
          refetchRoles?.()
          refetchRolesApplicationStatus?.()
        } else {
          console.error(data)
        }
      },
      onError: axiosError => {
        toast.error(
          `Failed to publish production ${activeRoleCategoryTab?.slug} roles.`
        )
        console.error(axiosError?.response?.data)
      }
    })
  }

  const updatePublishedRolesMutation =
    useRoleMutation.useUpdatePublishedRolesMutation()
  const handleUpdatePublishedRoles = () => {
    const roleGroup = dataRolesApplicationStatus?.data?.group?.find(
      groupItem =>
        groupItem?.name?.indexOf(
          `${
            APPCONFIG.apiConst.RoleCategoryTitle[
              activeRoleCategoryTab?.slug?.toString()?.toUpperCase()
            ]
          }`
        ) > -1
    )
    const roleMemberIds = dataRoles?.data?.data
      ?.filter(
        roleItem =>
          roleItem?.role_category?.type === activeRoleCategoryTab?.slug
      )
      ?.reduce((total, roleItem) => {
        return [...total, ...roleItem?.members?.map(memItem => memItem?.id)]
      }, [])
      ?.filter((value, index, array) => array.indexOf(value) === index)
    const combinedGroup = dataRolesApplicationStatus?.data?.group?.find(
      groupItem =>
        groupItem?.name?.indexOf(
          `${APPCONFIG.apiConst.RoleCategoryTitle.CAST}`
        ) < 0 &&
        groupItem?.name?.indexOf(
          `${APPCONFIG.apiConst.RoleCategoryTitle.CREW}`
        ) < 0
    )
    const combinedMemberIds = dataRoles?.data?.data
      ?.reduce((total, roleItem) => {
        return [...total, ...roleItem?.members?.map(memItem => memItem?.id)]
      }, [])
      ?.filter((value, index, array) => array.indexOf(value) === index)
    let groups = []
    if (!!roleGroup) {
      groups.push({
        group_id: roleGroup?.id,
        members: roleMemberIds
      })
    }
    if (!!combinedGroup) {
      groups.push({
        group_id: combinedGroup?.id,
        members: combinedMemberIds
      })
    }

    const updatePublishedRolesParams = {
      rolesType: activeRoleCategoryTab?.slug,
      publishId:
        dataRolesApplicationStatus?.data?.[`${activeRoleCategoryTab?.slug}_id`],
      production: selectedProduction?.id,
      role: [
        ...dataRoles?.data?.data
          ?.filter(
            roleItem =>
              roleItem?.role_category?.type === activeRoleCategoryTab?.slug
          )
          .map(roleItem => roleItem?.id)
      ],
      group: groups
    }
    console.log(updatePublishedRolesParams)
    updatePublishedRolesMutation.mutate(updatePublishedRolesParams, {
      onSuccess: ({ data, status }) => {
        if ([200, 201].indexOf(status) > -1) {
          toast.success(
            `The publication of production ${activeRoleCategoryTab?.slug} roles have been updated.`
          )
          refetchRoles?.()
          refetchRolesApplicationStatus?.()
        } else {
          console.error(data)
        }
      },
      onError: axiosError => {
        toast.error(`Failed to update production roles publication.`)
        console.error(axiosError?.response?.data)
      }
    })
  }

  return (
    <>
      <HeaderActionsBar
        className="roles-main-header"
        ButtonsLeft={() => (
          <>
            {roleCategoryTabs?.map((roleCatTab, i) => (
              <Button
                variant={
                  roleCatTab?.slug === activeRoleCategoryTab?.slug
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  setActiveRoleCategoryTab(roleCatTab)
                }}
                key={i}
              >
                {roleCatTab?.title}
              </Button>
            ))}
          </>
        )}
        ButtonsRight={() => (
          <>
            <Button
              variant="light"
              onClick={
                activeRoleCatPublished
                  ? handleUpdatePublishedRoles
                  : handlePublishRoles
              }
              disabled={
                isFetchingRoles ||
                isFetchingRolesApplicationStatus ||
                dataRoles?.data?.data?.filter(
                  roleItem =>
                    roleItem?.role_category?.type ===
                    activeRoleCategoryTab?.slug
                )?.length < 1
              }
            >
              {activeRoleCatPublished
                ? `Update ${
                    APPCONFIG.apiConst.RoleCategoryTitle[
                      activeRoleCategoryTab?.slug?.toString().toUpperCase()
                    ]
                  }`
                : `Publish`}
            </Button>
            <Button variant="light" disabled>
              Import
            </Button>
            <Button variant="light" disabled>
              Export
            </Button>
          </>
        )}
      ></HeaderActionsBar>

      <div className="roles-list">
        {!!dataRoles && !isFetchingRoles && (
          <>
            {dataRoles?.data?.data
              ?.sort((a, b) => b?.id - a?.id)
              ?.map((roleItem, i) => (
                <React.Fragment key={i}>
                  {roleItem?.role_category?.type ===
                    activeRoleCategoryTab?.slug && (
                    <RoleItem roleItemData={roleItem} />
                  )}
                </React.Fragment>
              ))}
          </>
        )}
      </div>

      {!isFetchingRoles && (
        <div
          className="role-add-button"
          data-rolecount={
            !!dataRoles
              ? dataRoles?.data?.data?.filter(
                  roleItem =>
                    roleItem?.role_category?.type ===
                    activeRoleCategoryTab?.slug
                )?.length
              : 0
          }
        >
          <p>
            Create the first {activeRoleCategoryTab?.slug} role for this
            production
          </p>
          <Button
            variant="light"
            className="d-flex align-items-center"
            title="Add role"
            onClick={handleAddRole}
            disabled={!!!dataRoleCategories || isFetchingRoleCategories}
          >
            <ALLICONS.Add className="me-3" /> Add Role
          </Button>
        </div>
      )}
    </>
  )
}
export default ScreenDashRolesMain
