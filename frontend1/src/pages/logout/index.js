import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ALLROUTES } from "../../routes"
import { useAppContext } from "../../contexts/app-context"
import { carryOutLogout } from "../../utils/common"

const ScreenLogout = () => {
  const nav = useNavigate()
  const { setIsUserLoggedIn } = useAppContext()

  useEffect(() => {
    carryOutLogout(setIsUserLoggedIn)
    nav(ALLROUTES.login)
  }, [])

  return <></>
}
export default ScreenLogout
