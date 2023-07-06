import { useEffect, useRef, useState } from "react"
import { APPCONFIG } from "../app-config"

export const userTokenExists = () => {
  const savedSessionToken = sessionStorage.getItem(
    APPCONFIG.sessionVariables.AUTH_TOKEN
  )
  return !!savedSessionToken
}

export const checkAndSetUserLoggedIn = setIsUserLoggedIn => {
  if (APPCONFIG.debugGlobal) console.log("check of user is logged in...")
  const userTokenFound = userTokenExists()
  if (userTokenFound) {
    setIsUserLoggedIn(true)
  }
}

export const carryOutLogout = setIsUserLoggedIn => {
  if (APPCONFIG.debugGlobal) console.log("carrying out logout...")
  sessionStorage.clear()
  setIsUserLoggedIn(false)
}

export const useEffectOnce = effect => {
  const destroyFunc = useRef()
  const effectCalled = useRef(false)
  const renderAfterCalled = useRef(false)
  const [val, setVal] = useState(0)

  if (effectCalled.current) {
    renderAfterCalled.current = true
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = effect()
      effectCalled.current = true
    }

    // this forces one render after the effect is run
    setVal(val => val + 1)

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return
      }
      if (destroyFunc.current) {
        destroyFunc.current()
      }
    }
  }, [])
}

export const fieldErrorMessages = axiosErrorData => {
  let errorsList = []
  Object.keys(axiosErrorData).forEach((key, i) => {
    errorsList.push(`${key}: ${axiosErrorData?.[key]?.join(", ")}`)
  })
  return errorsList
}

export const applicableThespianPoints = ({
  selectedProduction,
  dataRoleCategories,
  activeRoleCategoryTab,
  categoryId
}) => {
  const catItemData = dataRoleCategories?.data?.find(
    roleCatItem =>
      roleCatItem?.type === activeRoleCategoryTab?.slug &&
      roleCatItem?.id === categoryId
  )
  const thespianPointsCatObject =
    APPCONFIG.apiConst.thespianPoints?.[
      activeRoleCategoryTab?.slug?.toString()?.toUpperCase()
    ]?.[
      selectedProduction?.length == APPCONFIG.apiConst.productionLengths.ONE_ACT
        ? "ONE_ACT"
        : "FULL_LENGTH"
    ]
  if (activeRoleCategoryTab?.slug === APPCONFIG.apiConst.RoleCategory.CAST) {
    return thespianPointsCatObject?.[
      catItemData?.name === APPCONFIG.apiConst.castCatNames.SUPPORTING
        ? "SUPPORTING"
        : "LEAD"
    ]
  } else {
    return thespianPointsCatObject?.[
      catItemData?.name === APPCONFIG.apiConst.crewCatNames.NON_PRINCIPAL
        ? "NON_PRINCIPAL"
        : "PRINCIPAL"
    ]
  }
}
