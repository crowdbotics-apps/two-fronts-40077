import React from "react"
import { useRoutes } from "react-router-dom"
import AddFunds from "./components/AddFunds"
import BackToPublisher from "./components/BackToPublisher"
import PlaidLink from "./components/PlaidLink"
import ContinueRegistration from "./screens/ContinueRegistration/ContinueRegistration"
import CreatePassword from "./screens/CreatePassword/CreatePassword"
import Login from "./screens/Login/Login"
import Logout from "./screens/Logout/Logout"
import Registration from "./screens/Registration/Registration"
import VerifyOtp from "./screens/VerifyOtp/VerifyOtp"
import { APPCONFIG } from "./app-config"
import TermsAndConditions from "./screens/TermsAndConditions/TermsAndConditions"
import PrivacyPolicies from "./screens/PrivacyPolicies/PrivacyPolicies"

const AppRoutes = () => {
  const element = useRoutes([
    { path: APPCONFIG.routes.home, element: <Registration />, index: true },
    { path: APPCONFIG.routes.login, element: <Login /> },
    { path: APPCONFIG.routes.verifyOtp, element: <VerifyOtp /> },
    {
      // SCREEN PRIOR TO CREATE PASSWORD SCREEN
      path: APPCONFIG.routes.continueRegistration,
      element: <ContinueRegistration />
    },
    {
      path: `${APPCONFIG.routes.continueRegistration}/:publisherData`,
      element: <ContinueRegistration />
    },
    { path: APPCONFIG.routes.createPassword, element: <CreatePassword /> },
    {
      path: `${APPCONFIG.routes.createPassword}/:publisherData`,
      element: <CreatePassword />
    },
    { path: APPCONFIG.routes.logout, element: <Logout /> },

    {
      path: `${APPCONFIG.routes.registerWithPublisher}/:publisherData`,
      element: <Registration />
    },
    {
      path: `${APPCONFIG.routes.loginWithPublisher}/:publisherData`,
      element: <Login />
    },
    {
      path: APPCONFIG.routes.connectYourBank,
      element: <PlaidLink />
    },
    {
      path: `${APPCONFIG.routes.connectYourBank}/:publisherData`,
      element: <PlaidLink />
    },
    { path: APPCONFIG.routes.backToPublisher, element: <BackToPublisher /> },
    { path: APPCONFIG.routes.addFunds, element: <AddFunds /> },
    {
      path: APPCONFIG.routes.termsAndConditions,
      element: <TermsAndConditions />
    },
    { path: APPCONFIG.routes.privacyPolicies, element: <PrivacyPolicies /> }
  ])

  return element
}

export default AppRoutes
