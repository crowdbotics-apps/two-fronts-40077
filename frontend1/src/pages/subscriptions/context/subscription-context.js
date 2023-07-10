import React, { createContext, useContext } from "react"

import { useAppContext } from "../../../contexts/app-context"
import { useSubscriptionQuery } from "../../../utils/queries"

const subscriptionContext = createContext({})

export const SubscriptionContextProvider = ({ children }) => {
  const { isUserLoggedIn } = useAppContext()
 
  const {
    data: subscriptionPlan,
    refetch: refetchSubscriptionPlan,
  } = useSubscriptionQuery.useGetSubscriptionPlansQuery({
    enabled: isUserLoggedIn,
  })

  const {
    data: userSubDetails,
    refetch: refetchUserSubDetails
  } = useSubscriptionQuery.useUserSubDetailsQuery({
    enabled: isUserLoggedIn,
  })

  return (
    <subscriptionContext.Provider
      value={{
        subscriptionPlan,
        refetchSubscriptionPlan,
        userSubDetails,
        refetchUserSubDetails
      }}
    >
      {children}
    </subscriptionContext.Provider>
  )
}

export const useSubscriptionContext = () => {
  const {
    subscriptionPlan,
    refetchSubscriptionPlan,
    userSubDetails,
    refetchUserSubDetails
  } = useContext(subscriptionContext)
  return {
    subscriptionPlan,
    refetchSubscriptionPlan,
    userSubDetails,
    refetchUserSubDetails
  }
}
