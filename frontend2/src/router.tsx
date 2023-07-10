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
    {
      path: `${process.env.PUBLIC_URL}/` + APPCONFIG.routes.home,
      element: <Registration />,
      index: true
    },
    {
      path: `${process.env.PUBLIC_URL}/` + APPCONFIG.routes.login,
      element: <Login />
    },
    {
      path: `${process.env.PUBLIC_URL}/` + APPCONFIG.routes.verifyOtp,
      element: <VerifyOtp />
    },
    {
      // SCREEN PRIOR TO CREATE PASSWORD SCREEN
      path:
        `${process.env.PUBLIC_URL}/` + APPCONFIG.routes.continueRegistration,
      element: <ContinueRegistration />
    },
    {
      path:
        `${process.env.PUBLIC_URL}/` +
        `${APPCONFIG.routes.continueRegistration}/:publisherData`,
      element: <ContinueRegistration />
    },
    {
      path: `${process.env.PUBLIC_URL}/` + APPCONFIG.routes.createPassword,
      element: <CreatePassword />
    },
    {
      path:
        `${process.env.PUBLIC_URL}/` +
        `${APPCONFIG.routes.createPassword}/:publisherData`,
      element: <CreatePassword />
    },
    {
      path: `${process.env.PUBLIC_URL}/` + APPCONFIG.routes.logout,
      element: <Logout />
    },

    {
      path:
        `${process.env.PUBLIC_URL}/` +
        `${APPCONFIG.routes.registerWithPublisher}/:publisherData`,
      element: <Registration />
    },
    {
      path:
        `${process.env.PUBLIC_URL}/` +
        `${APPCONFIG.routes.loginWithPublisher}/:publisherData`,
      element: <Login />
    },
    {
      path: `${process.env.PUBLIC_URL}/` + APPCONFIG.routes.connectYourBank,
      element: <PlaidLink />
    },
    {
      path:
        `${process.env.PUBLIC_URL}/` +
        `${APPCONFIG.routes.connectYourBank}/:publisherData`,
      element: <PlaidLink />
    },
    {
      path: `${process.env.PUBLIC_URL}/` + APPCONFIG.routes.backToPublisher,
      element: <BackToPublisher />
    },
    {
      path: `${process.env.PUBLIC_URL}/` + APPCONFIG.routes.addFunds,
      element: <AddFunds />
    },
    {
      path: `${process.env.PUBLIC_URL}/` + APPCONFIG.routes.termsAndConditions,
      element: <TermsAndConditions />
    },
    {
      path: `${process.env.PUBLIC_URL}/` + APPCONFIG.routes.privacyPolicies,
      element: <PrivacyPolicies />
    }
  ])

  return element
}

export default AppRoutes
