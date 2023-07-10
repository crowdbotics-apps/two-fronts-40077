import React from "react"
import { useOnBoardingQuery } from "../../utils/queries"
import { useNavigate } from "react-router-dom"
import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area"
import BasicModalContent from "../../components/modal/basic-modal-content"
import { ALLROUTES } from "../../routes"

const PrivacyPolicy = () => {
  const nav = useNavigate()
  const { data } = useOnBoardingQuery.usePrivacyPolicyQuery({
    enabled: true
  })

  const handleClose = () => {
    nav(ALLROUTES.dashboardContainer)
  }

  return (
    <WrapperMainContentArea>
      <BasicModalContent
        title={"Privacy Policy"}
        content={data?.data[0]?.body}
        handleClose={handleClose}
      />
    </WrapperMainContentArea>
  )
}
export default PrivacyPolicy
