export const APPCONFIG = {
  backend: `https://hamiltons-33335${
    window.location.href.indexOf("staging") > -1 ? "-staging" : ""
  }.botics.co/`,
  routes: {
    home: "",
    login: "login",
    verifyOtp: "verify-opt",
    continueRegistration: "continue-registration",
    createPassword: "create-password",
    logout: "logout",

    registerWithPublisher: "register-with-publisher",
    loginWithPublisher: "login-with-publisher",
    connectYourBank: "connect-your-bank",
    backToPublisher: "back-to-publisher",
    addFunds: "add-funds",
    termsAndConditions: "terms-and-conditions",
    privacyPolicies: "privacy-policies"
  },
  responseStatuses: {
    SIGNUP_USER_EXISTS: 422
  },
  sessVars: {
    token: "Token"
  },
  debug: {
    global: true,
    forms: false
  }
}
