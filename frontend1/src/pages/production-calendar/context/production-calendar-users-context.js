import React, { createContext, useContext, useRef, useState } from "react"

const productionCalendarUsersContext = createContext({})

export const ProductionCalendarUsersContextProvider = ({ children }) => {
  const membersSelectable = useRef(true)
  const [roleNewMembersToAdd, setRoleNewMembersToAdd] = useState([])

  return (
    <productionCalendarUsersContext.Provider
      value={{
        membersSelectable,

        roleNewMembersToAdd,
        setRoleNewMembersToAdd
      }}
    >
      {children}
    </productionCalendarUsersContext.Provider>
  )
}

export const useProductionCalendarUsersContext = () => {
  const {
    membersSelectable,

    roleNewMembersToAdd,
    setRoleNewMembersToAdd
  } = useContext(productionCalendarUsersContext)
  return {
    membersSelectable,

    roleNewMembersToAdd,
    setRoleNewMembersToAdd
  }
}
