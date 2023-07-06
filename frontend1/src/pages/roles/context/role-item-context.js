import React, { createContext, useContext, useRef, useState } from "react"

const roleItemContext = createContext({})

export const RoleItemContextProvider = ({ children }) => {
  const membersSelectable = useRef(true)
  const [roleNewMembersToAdd, setRoleNewMembersToAdd] = useState([])

  return (
    <roleItemContext.Provider
      value={{
        membersSelectable,

        roleNewMembersToAdd,
        setRoleNewMembersToAdd
      }}
    >
      {children}
    </roleItemContext.Provider>
  )
}

export const useRoleItemContext = () => {
  const {
    membersSelectable,

    roleNewMembersToAdd,
    setRoleNewMembersToAdd
  } = useContext(roleItemContext)
  return {
    membersSelectable,

    roleNewMembersToAdd,
    setRoleNewMembersToAdd
  }
}
