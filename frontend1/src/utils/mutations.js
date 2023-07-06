// ONBOARDING

import { useMutation } from "@tanstack/react-query"
import { APIhandler } from "./apis"

export const useOnboardingMutation = {
  useSignupMutation: () => {
    return useMutation(payload => APIhandler.onboarding.user_signup(payload))
  },
  useLoginMutation: () => {
    return useMutation(payload => APIhandler.onboarding.user_login(payload))
  },
  useResetPasswordSendMutation: () => {
    return useMutation(payload =>
      APIhandler.onboarding.resetPasswordSend(payload)
    )
  },
  useResetPasswordVerifyMutation: () => {
    return useMutation(payload =>
      APIhandler.onboarding.resetPasswordVerify(payload)
    )
  },
  useResetPasswordResetMutation: () => {
    return useMutation(payload =>
      APIhandler.onboarding.resetPasswordReset(payload)
    )
  }
}

export const useSettingsMutation = {
  useChangePasswordMutation: () => {
    return useMutation(payload => APIhandler.settings.changePassword(payload))
  }
}

// PRODUCTIONS

export const useProductionMutation = {
  useAddConflictMutation: () => {
    return useMutation(payload => APIhandler.productions.addConflict(payload))
  },
  useDeleteConflictMutation: () => {
    return useMutation(payload =>
      APIhandler.productions.deleteConflict(payload)
    )
  },
  useAddEventMutation: () => {
    return useMutation(payload => APIhandler.productions.addEvent(payload))
  },
  useCheckEventConflictsMutation: () => {
    return useMutation(payload =>
      APIhandler.productions.checkEventConflicts(payload)
    )
  }
}

// ROLES

export const useRoleMutation = {
  useAddRoleMutation: () => {
    return useMutation(payload => APIhandler.roles.addRole(payload))
  },
  useModifyRoleMutation: () => {
    return useMutation(payload => APIhandler.roles.modifyRole(payload))
  },
  useDeleteRoleMutation: () => {
    return useMutation(payload => APIhandler.roles.deleteRole(payload))
  },
  usePublishRolesMutation: () => {
    return useMutation(payload => APIhandler.roles.publishRoles(payload))
  },
  useUpdatePublishedRolesMutation: () => {
    return useMutation(payload =>
      APIhandler.roles.updatePublishedRoles(payload)
    )
  }
}

// APPLICATIONS

export const useApplicationMutation = {
  useAddCastApplicationMutation: () => {
    return useMutation(payload =>
      APIhandler.applications.addCastApplication(payload)
    )
  },
  useAddCrewApplicationMutation: () => {
    return useMutation(payload =>
      APIhandler.applications.addCrewApplication(payload)
    )
  },
  useUpdateCastApplicationMutation: () => {
    return useMutation(payload =>
      APIhandler.applications.updateCastApplication(payload)
    )
  },
  useUpdateCrewApplicationMutation: () => {
    return useMutation(payload =>
      APIhandler.applications.updateCrewApplication(payload)
    )
  }
}

// SUBSCRIPTIONS

export const useSubscriptionMutation = {
  useBuySubscriptionPlanMutation: () => {
    return useMutation(payload =>
      APIhandler.subscriptions.buySubscriptionPlan(payload)
    )
  }
}
