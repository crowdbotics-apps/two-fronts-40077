import React from "react"
import { Button } from "react-bootstrap"

import HeaderActionsBar from "../../components/header-actions-bar"
import { useApplicationContext } from "./context/application-context"
import { APPCONFIG } from "../../app-config"

const ScreenDashApplicationMainCompleted = () => {
  const {
    applicationSubCategoryTabs,
    activeApplicationSubCategoryTab,
    setActiveApplicationSubCategoryTab,

    applicationsStatusCastList,
    applicationsStatusCrewList
  } = useApplicationContext()

  return (
    <>
      <HeaderActionsBar
        className="application-sub-header"
        ButtonsLeft={() => (
          <>
            {applicationSubCategoryTabs?.map((applicationSubCatTab, i) => (
              <Button
                variant={
                  applicationSubCatTab?.slug ===
                  activeApplicationSubCategoryTab?.slug
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  setActiveApplicationSubCategoryTab(applicationSubCatTab)
                }}
                key={i}
              >
                {applicationSubCatTab?.title}
              </Button>
            ))}
          </>
        )}
      ></HeaderActionsBar>
      <div>
        {activeApplicationSubCategoryTab.slug ===
        APPCONFIG.apiConst.ApplicationCategory.CAST ? (
          <div>
            {applicationsStatusCastList?.data.applied.map(item => (
              <div key={item.id}>
                {item?.answer?.map((answerItem, index) => (
                  <div key={index}>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginBottom: "8px"
                      }}
                    >
                      Question: {answerItem?.question}
                    </p>
                    <p style={{ fontSize: "16px", marginBottom: "16px" }}>
                      Answer: {answerItem?.answer}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        {activeApplicationSubCategoryTab.slug ===
        APPCONFIG.apiConst.ApplicationCategory.CREW ? (
          <div>
            {applicationsStatusCrewList?.data.applied.map(item => (
              <div key={item.id}>
                {item?.answer?.map((answerItem, index) => (
                  <div key={index}>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginBottom: "8px"
                      }}
                    >
                      Question: {answerItem?.question}
                    </p>
                    <p style={{ fontSize: "16px", marginBottom: "16px" }}>
                      Answer: {answerItem?.answer}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  )
}
export default ScreenDashApplicationMainCompleted
