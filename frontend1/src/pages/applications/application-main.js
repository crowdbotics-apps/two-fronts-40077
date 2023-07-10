import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { ALLICONS } from "../../assets"

import HeaderActionsBar from "../../components/header-actions-bar"
import { useApplicationContext } from "./context/application-context"
import ApplicationQuestionItem from "./application-question-item"
import { useApplicationMutation } from "../../utils/mutations"
import { APPCONFIG } from "../../app-config"
import { toast } from "react-toastify"
import { fieldErrorMessages } from "../../utils/common"
import ScreenDashApplicationMainCompleted from "./application-main-completed"

const ScreenDashApplicationMain = () => {
  const {
    applicationCategoryTabs,
    activeApplicationCategoryTab,
    setActiveApplicationCategoryTab,
    applicationSubCategoryTabs,
    activeApplicationSubCategoryTab,
    setActiveApplicationSubCategoryTab,

    setAdditionalData,
    additionalData,
    selectedProduction,
    applicationsStatusCastList,
    refetchCastApplicationStatusList,
    applicationsStatusCrewList,
    refetchCrewApplicationStatusList,
    dataCastApplication,
    refetchCastApplicationList,
    dataCrewApplication,
    refetchCrewApplicationList,

    applicationItems,
    setApplicationItems,
    applicationRecord,
    setApplicationRecord
  } = useApplicationContext()

  const savedUserData = sessionStorage.getItem(
    APPCONFIG.sessionVariables.USER_DATA
  )
  const userData = JSON.parse(savedUserData)

  useEffect(() => {
    // setApplicationItems([])
    setAdditionalData()
    if (activeApplicationCategoryTab?.slug === "cast") {
      refetchCastApplicationList()
    } else if (activeApplicationCategoryTab?.slug === "crew") {
      refetchCrewApplicationList()
    }
  }, [activeApplicationCategoryTab])

  useEffect(() => {
    console.log(`ITEMS (${applicationItems?.length})`, applicationItems)
  }, [applicationItems])

  useEffect(() => {
    let applicationRecord = {}
    if (
      activeApplicationCategoryTab?.slug === "cast" &&
      !!dataCastApplication
    ) {
      applicationRecord =
        dataCastApplication?.data?.find(
          applicationItem =>
            applicationItem?.production === selectedProduction?.id
        ) ?? {}
      setApplicationItems(
        (applicationRecord?.question ?? []).map((item, i) => ({
          ...item,
          index: i
        }))
      )
    }
    if (
      activeApplicationCategoryTab?.slug === "crew" &&
      !!dataCrewApplication
    ) {
      applicationRecord =
        dataCrewApplication?.data?.find(
          applicationItem =>
            applicationItem?.production === selectedProduction?.id
        ) ?? {}
      setApplicationItems(
        (applicationRecord?.question ?? []).map((item, i) => ({
          ...item,
          index: i
        }))
      )
    }
    setApplicationRecord(applicationRecord)
  }, [dataCastApplication, dataCrewApplication, selectedProduction])

  useEffect(() => {
    if (
      activeApplicationSubCategoryTab.slug ===
      APPCONFIG.apiConst.ApplicationCategory.CAST
    ) {
      refetchCastApplicationStatusList()
    } else if (
      activeApplicationSubCategoryTab.slug ===
      APPCONFIG.apiConst.ApplicationCategory.CREW
    ) {
      refetchCrewApplicationStatusList()
    }
  }, [activeApplicationSubCategoryTab])

  useEffect(() => {
    if (dataCrewApplication?.data) {
      setAdditionalData({
        ...additionalData,
        application_deadline: dataCrewApplication?.data?.application_deadline,
        collect_conflict: dataCrewApplication?.data?.collect_conflict,
        from_date: dataCrewApplication?.data?.from_date,
        to_date: dataCrewApplication?.data?.to_date
      })
    }
  }, [dataCrewApplication])

  const handleAddQuestion = () => {
    setApplicationItems(prevItems => [
      ...prevItems,
      {
        index: applicationItems.length,
        question: "",
        answer_type: APPCONFIG.selectOptionsAnswerType[0].value,
        question_required: APPCONFIG.selectOptionsYesNo[0].value
      } // Generate a unique ID for the new item
    ])
  }

  const handleDeleteQuestion = itemIndex => {
    setApplicationItems(prevItems =>
      prevItems.filter(item => item.index !== itemIndex)
    )
  }

  const handleInputChange = (itemIndex, fieldName, value) => {
    setApplicationItems(prevItems =>
      prevItems.map(item => {
        if (item.index === itemIndex) {
          console.log("value", value)
          return {
            ...item,
            [fieldName]: value
          }
        }
        return item
      })
    )
  }

  const addCastApplicationMutation =
    useApplicationMutation.useAddCastApplicationMutation()
  const addCrewApplicationMutation =
    useApplicationMutation.useAddCrewApplicationMutation()
  const updateCastApplicationMutation =
    useApplicationMutation.useUpdateCastApplicationMutation()
  const updateCrewApplicationMutation =
    useApplicationMutation.useUpdateCrewApplicationMutation()
  const handleSaveChanges = () => {
    const applicationParams = {
      ...(Object.keys(applicationRecord).length > 0
        ? { id: applicationRecord?.id }
        : {}),
      collect_conflict: additionalData?.collect_conflict,
      from_date: additionalData?.from_date,
      to_date: additionalData?.to_date,
      application_deadline: additionalData?.application_deadline,
      question: applicationItems,
      production: selectedProduction?.id,
      user: userData?.id
    }
    console.log(
      activeApplicationCategoryTab?.slug,
      Object.keys(applicationRecord).length
    )
    const applicableMutation =
      activeApplicationCategoryTab?.slug ===
      APPCONFIG.apiConst.ApplicationCategory.CAST
        ? Object.keys(applicationRecord).length > 0
          ? updateCastApplicationMutation
          : addCastApplicationMutation
        : Object.keys(applicationRecord).length > 0
        ? updateCrewApplicationMutation
        : addCrewApplicationMutation

    applicableMutation.mutate(applicationParams, {
      onSuccess: ({ data, status }) => {
        if ([200, 201].indexOf(status) > -1) {
          toast.success(`Application has been saved.`)
          // setApplicationItems([])
          setAdditionalData()
        } else {
          console.error(data)
        }
        refetchCastApplicationList()
        refetchCrewApplicationList()
      },
      onError: axiosError => {
        toast.error(
          `Failed to save application. ${fieldErrorMessages(
            axiosError?.response?.data
          )}`
        )
        console.error(axiosError?.response?.data)
      }
    })
  }

  const handleCancel = () => {
    refetchCastApplicationList()
    refetchCrewApplicationList()
  }

  return (
    <>
      <HeaderActionsBar
        className="application-main-header"
        ButtonsLeft={() => (
          <>
            {applicationCategoryTabs?.map((applicationCatTab, i) => (
              <Button
                variant={
                  applicationCatTab?.slug === activeApplicationCategoryTab?.slug
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  setActiveApplicationCategoryTab(applicationCatTab)
                }}
                key={i}
              >
                {applicationCatTab?.title}
              </Button>
            ))}
          </>
        )}
        ButtonsRight={() => (
          <>
            <Button
              variant="light"
              hidden={
                activeApplicationCategoryTab.slug === "completedApplications"
              }
              onClick={handleSaveChanges}
            >
              Save changes
            </Button>
            <Button
              variant="light"
              hidden={
                activeApplicationCategoryTab.slug === "completedApplications"
              }
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        )}
      ></HeaderActionsBar>
      {activeApplicationCategoryTab?.slug ===
      APPCONFIG.apiConst.ApplicationCategory.COMPLETED_APPLICATIONS ? (
        <ScreenDashApplicationMainCompleted />
      ) : (
        <>
          <h3 className="application-questions-heading">
            Application questions
          </h3>
          <div className="application-list">
            {applicationItems.map((item, i) => (
              <ApplicationQuestionItem
                applicationIndex={i}
                key={i}
                applicationItemData={item}
                onDelete={() => handleDeleteQuestion(item.index)}
                handleInputChange={(fieldName, value) => {
                  console.log("item.index", item.index)
                  handleInputChange(item.index, fieldName, value)
                }}
              />
            ))}
          </div>
          {applicationItems.length < 3 && (
            <div className="application-add-button">
              <Button
                variant="light"
                className="d-flex align-items-center justify-content-center w-100 mt-3"
                title="Add Question"
                onClick={handleAddQuestion}
              >
                <ALLICONS.Add className="me-3" /> Add Question
              </Button>
            </div>
          )}
        </>
      )}
    </>
  )
}
export default ScreenDashApplicationMain
