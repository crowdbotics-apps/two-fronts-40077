import React, { createContext, useContext, useRef, useState } from "react"

const applicationItemContext = createContext({})

export const ApplicationItemContextProvider = ({ children }) => {


  return (
    <applicationItemContext.Provider
      value={{

      }}
    >
      {children}
    </applicationItemContext.Provider>
  )
}

export const useApplicationItemContext = () => {
  const {
 
  } = useContext(applicationItemContext)
  return {

  }
}
