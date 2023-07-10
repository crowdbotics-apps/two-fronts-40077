import React from "react"
import { useOnBoardingQuery } from "../../utils/queries"
import { useNavigate } from "react-router-dom"
import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area"
import BasicModalContent from "../../components/modal/basic-modal-content"
import { ALLROUTES } from "../../routes"

const TermsAndConditions = () => {
  const nav = useNavigate()
  const { data } = useOnBoardingQuery.useTermsQuery({
    enabled: true
  })

  const handleClose = () => {
    nav(ALLROUTES.dashboardContainer)
  }

  return (
    <WrapperMainContentArea>
      <BasicModalContent
        title={"Terms and conditions"}
        content={data?.data[0]?.body}
        handleClose={handleClose}
      />
    </WrapperMainContentArea>
  )
}
export default TermsAndConditions
