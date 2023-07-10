import { del, get, patch, post, put } from "./web-api-handler.js"

export const APIhandler = {
  // ONBOARDING
  onboarding: {
    user_login: payload => post(`/api/v1/login/`, payload),
    user_signup: payload => post("/api/v1/signup/", payload),
    getPrivacyPlicy: () => get(`/modules/privacy-policy/`),
    getTermsOfUse: () => get(`/modules/terms-and-conditions/`),
    resetPasswordSend: payload => post("/users/reset-password/send/", payload),
    resetPasswordVerify: payload =>
      post("/users/reset-password/verify/", payload),
    resetPasswordReset: payload => post("/users/reset-password/reset/", payload)
  },

  // PRODUCTIONS
  productions: {
    getProductions: () => get(`/api/v1/production/`),
    getProductionConflicts: payload =>
      post(`/api/v1/production-conflict/`, payload),
    getApplicationStatusByRole: ({ rolesType, productionId }) =>
      get(`/api/v1/${rolesType}-application-status/${productionId}/`),
    addConflict: payload => post(`/api/v1/conflict/`, payload),
    deleteConflict: ({ conflictId }) => del(`/api/v1/conflict/${conflictId}/`),
    getAllEvents: () => get(`/api/v1/event/`),
    addEvent: payload => post(`/api/v1/event/`, payload),
    checkEventConflicts: payload =>
      post(`/api/v1/check-event-conflicts/`, payload)
  },

  // ROLES
  roles: {
    getRoles: () => get(`/api/v1/roles/`), // deprecated
    getRoleCategories: () => get(`/api/v1/role-category/`),
    getProductionRoles: productionId =>
      get(`/api/v1/production-roles/${productionId}/`),
    addRole: payload => post(`/api/v1/roles/`, payload),
    modifyRole: ({ roleId, ...payload }) =>
      patch(`/api/v1/roles/${roleId}/`, payload),
    deleteRole: ({ roleId }) => del(`/api/v1/roles/${roleId}/`),
    publishRoles: ({ rolesType, ...payload }) =>
      post(`/api/v1/${rolesType}/`, payload), // rolesType = cast | crew
    updatePublishedRoles: ({ rolesType, publishId, ...payload }) =>
      put(`/api/v1/${rolesType}/${publishId}/`, payload) // rolesType = cast | crew
  },

  getAllStaff: () => get(`/users/all-school-staff/`),

  getAllStudents: () => get(`/users/all-school-student/`),

  getAllParents: () => get(`/users/all-school-parent/`),

  getGroups: () => get(`/api/v1/groups/`),

  // APPLICATIONS
  applications: {
    addCastApplication: payload => post(`/api/v1/cast-application/`, payload),
    addCrewApplication: payload => post(`/api/v1/crew-application/`, payload),
    updateCastApplication: ({ id, ...payload }) =>
      put(`/api/v1/cast-application/${id}/`, payload),
    updateCrewApplication: ({ id, ...payload }) =>
      put(`/api/v1/crew-application/${id}/`, payload),
    getCastApplication: () => get(`/api/v1/cast-application/`),
    getCrewApplication: () => get(`/api/v1/crew-application/`),
    getCastApplicationStatus: ({ productionId }) =>
      get(`/api/v1/cast-application-status/${productionId}/`),
    getCrewApplicationStatus: ({ productionId }) =>
      get(`/api/v1/crew-application-status/${productionId}/`)
  },

  // SUBSCRIPTIONS
  subscriptions: {
    getSubscriptionPlans: () => {
      return get("/api/v1/get_subscription_plans/")
    },
    buySubscriptionPlan: payload =>
      post(`/api/v1/buy_subscription_plan/`, payload),
    getUserSubDetails: () => {
      return get("/api/v1/user_sub_details/")
    }
  },

  // SETTINGS
  settings: {
    changePassword: payload => post("/users/password/change/", payload)
  }
}
