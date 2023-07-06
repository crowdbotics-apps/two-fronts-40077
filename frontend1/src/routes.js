import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import WrapperDashboard from "./components/wrappers/dashboard/dashboard"
import ScreenLogin from "./pages/login"
import ScreenLogout from "./pages/logout"
import ScreenDashApplications from "./pages/applications"
import ScreenDashProductionCalendar from "./pages/production-calendar"
import ScreenDashRoles from "./pages/roles"
import ScreenSignUp from "./pages/signUp"
import VerifyEmail from "./pages/forgot-password/verify-email"
import VerifyOtp from "./pages/forgot-password/verify-otp"
import ResetPassword from "./pages/forgot-password/resetPassword"
import ChangePassword from "./pages/ChangePassword/changePassword"
import TermsAndConditions from "./pages/account-settings/terms-and-conditions"
import PrivacyPolicy from "./pages/account-settings/privacy-policy"
import LogoutPopup from "./pages/logout/logoutPopup"
import ScreenDashSubscriptions from "./pages/subscriptions"
import ScreenChangeSubscriptions from "./pages/subscriptions/subscriptionChange"
import SubscriptionEditPayment from "./pages/subscriptions/subscriptionEditPayment"
import ScreenDashEndSubscription from "./pages/subscriptions/endSubscription"
import ScreenEditPayment from "./pages/subscriptions/screenEditPayment"
import FailurePayment from "./pages/subscriptions/failurePayment"
import SuccessPayment from "./pages/subscriptions/successPayment"

export const ALLROUTES = {
  home: `/`,

  login: `/login`,
  signup: `/signup`,
  verifyEmail: `/verify-email`,
  verifyOtp: `/verify-otp`,
  resetPassword: `/reset-password`,
  successPayment: "/success",
  failurePayment: "/failure",

  dashboardContainer: `/dashboard`,
  dashboardChildren: {
    roles: `/dashboard`, // roles
    applications: `/dashboard/applications`,
    productionCalendar: `/dashboard/production-calendar`,
    subscription: `/dashboard/subscription`,
    changeSubscription: `/dashboard/change-subscription`,
    editPayment: `/dashboard/subscription/edit-payment`,
    endSubscription: `/dashboard/end-subscription`,
    changePassword: `/dashboard/change-password`, // token
    termsAndConditions: `/dashboard/terms-and-conditions`,
    privacyPolicy: `/dashboard/privacy-policy`,
    logout: `/dashboard/logout`
  }

  // supportEmailLink: `mailto:${APPCONFIG.supportEmail}`
}

const RouteNotFound = () => {
  return <p>The page that you're looking for was not found.</p>
}

export const RouteElements = () => {
  const routeConfig = [
    {
      path: ALLROUTES.home,
      index: true,
      element: <Navigate to={ALLROUTES.login} />
    },
    { path: ALLROUTES.login, element: <ScreenLogin /> },
    { path: ALLROUTES.signup, element: <ScreenSignUp /> },
    { path: ALLROUTES.verifyEmail, element: <VerifyEmail /> },
    { path: ALLROUTES.verifyOtp, element: <VerifyOtp /> },
    { path: ALLROUTES.resetPassword, element: <ResetPassword /> },
    { path: ALLROUTES.successPayment, element: <SuccessPayment /> },
    { path: ALLROUTES.failurePayment, element: <FailurePayment /> },
    {
      path: ALLROUTES.dashboardContainer,
      element: <WrapperDashboard />,
      children: [
        {
          path: ALLROUTES.dashboardChildren.roles,
          index: true,
          element: <ScreenDashRoles />
        },
        {
          path: ALLROUTES.dashboardChildren.applications,
          element: <ScreenDashApplications />
        },
        {
          path: ALLROUTES.dashboardChildren.productionCalendar,
          element: <ScreenDashProductionCalendar />
        },
        {
          path: ALLROUTES.dashboardChildren.subscription,
          element: <ScreenDashSubscriptions />
        },
        {
          path: ALLROUTES.dashboardChildren.changeSubscription,
          element: <ScreenChangeSubscriptions />
        },
        {
          path: ALLROUTES.dashboardChildren.editPayment,
          element: <ScreenEditPayment />
        },
        {
          path: ALLROUTES.dashboardChildren.endSubscription,
          element: <ScreenDashEndSubscription />
        },
        {
          path: ALLROUTES.dashboardChildren.changePassword,
          element: <ChangePassword />
        },
        {
          path: ALLROUTES.dashboardChildren.termsAndConditions,
          element: <TermsAndConditions />
        },
        {
          path: ALLROUTES.dashboardChildren.privacyPolicy,
          element: <PrivacyPolicy />
        },
        { path: ALLROUTES.dashboardChildren.logout, element: <LogoutPopup /> }
      ]
    },
    { path: "*", element: <RouteNotFound /> }
  ]

  return (
    <Routes>
      {routeConfig?.map((rcItem, i) => (
        <Route
          path={rcItem?.path}
          element={rcItem?.element}
          index={rcItem?.index}
          key={i}
        >
          {rcItem?.children?.map((rcItemChild, j) => (
            <Route
              path={rcItemChild?.path}
              element={rcItemChild?.element}
              index={rcItemChild?.index}
              key={j}
            >
              {rcItemChild?.children?.map((rcItemSubChild, k) => (
                <Route
                  path={rcItemSubChild?.path}
                  element={rcItemSubChild?.element}
                  index={rcItemSubChild?.index}
                  key={k}
                ></Route>
              ))}
            </Route>
          ))}
        </Route>
      ))}
    </Routes>
  )
}

export default RouteElements

export const ALLMENUS = {
  loggedIn: [
    {
      name: "Manage Subscription",
      Icon: () => <div className="icon-wrap icon--subscription"></div>,
      route: ALLROUTES.dashboardChildren.subscription
    },
    {
      name: "Change Password",
      Icon: () => <div className="icon-wrap icon--change-password"></div>,
      route: ALLROUTES.dashboardChildren.changePassword
    },
    {
      name: "Terms and Conditions",
      Icon: () => <div className="icon-wrap icon--terms-and-conditions"></div>,
      route: ALLROUTES.dashboardChildren.termsAndConditions
    },
    {
      name: "Privacy Policy",
      Icon: () => <div className="icon-wrap icon--pivacy-policy"></div>,
      route: ALLROUTES.dashboardChildren.privacyPolicy
    },
    {
      name: "Sign Out",
      Icon: () => <div className="icon-wrap icon--signout"></div>,
      route: ALLROUTES.dashboardChildren.logout
    }
  ]
}
