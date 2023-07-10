import { useQuery } from "@tanstack/react-query"
import { APIhandler } from "./apis"

// ----- PRODUCTIONS -----

export const useProductionsQueries = {
  useProductionsQuery: ({ config = {}, enabled }) => {
    return useQuery(
      ["productions"],
      () => APIhandler.productions.getProductions(),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  },
  useProductionConflictsQuery: ({
    config = {},
    enabled,
    production,
    start_date,
    end_date
  }) => {
    return useQuery(
      ["production-conflicts", production, start_date, end_date],
      () =>
        APIhandler.productions.getProductionConflicts({
          production,
          start_date,
          end_date
        }),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  },
  useApplicationStatusByRoleQuery: ({
    config = {},
    enabled,
    productionId,
    rolesType
  }) => {
    return useQuery(
      ["production-application-status-by-role", productionId, rolesType],
      () =>
        APIhandler.productions.getApplicationStatusByRole({
          productionId,
          rolesType
        }),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  },
  useAllEventsQuery: ({ config = {}, enabled }) => {
    return useQuery(
      ["all-events"],
      () => APIhandler.productions.getAllEvents(),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  }
}

// ----- ROLES -----

export const useRolesQueries = {
  useRoleCategoriesQuery: ({ config = {}, enabled }) => {
    return useQuery(
      ["role-categories"],
      () => APIhandler.roles.getRoleCategories(),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  },
  useProductionRolesQuery: ({ config = {}, enabled, productionId }) => {
    return useQuery(
      ["production-roles", productionId],
      () => APIhandler.roles.getProductionRoles(productionId),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  }
}

// ----- ALL STAFF -----

export const useAllStaffQuery = ({ config = {}, enabled }) => {
  return useQuery(["all-staff"], () => APIhandler.getAllStaff(), {
    retry: false,
    refetchOnMount: false,
    enabled,
    ...config
  })
}

// ----- ALL STUDENTS -----

export const useAllStudentsQuery = ({ config = {}, enabled }) => {
  return useQuery(["all-students"], () => APIhandler.getAllStudents(), {
    retry: false,
    refetchOnMount: false,
    enabled,
    ...config
  })
}

// ----- ALL PARENTS -----

export const useAllParentsQuery = ({ config = {}, enabled }) => {
  return useQuery(["all-parents"], () => APIhandler.getAllParents(), {
    retry: false,
    refetchOnMount: false,
    enabled,
    ...config
  })
}

// ----- GROUPS -----

export const useGroupsQuery = ({ config = {}, enabled }) => {
  return useQuery(["groups"], () => APIhandler.getGroups(), {
    retry: false,
    refetchOnMount: false,
    enabled,
    ...config
  })
}

// ----- onBoarding -----

export const useOnBoardingQuery = {
  useTermsQuery: ({ config = {}, enabled }) => {
    return useQuery(["terms"], () => APIhandler.onboarding.getTermsOfUse(), {
      retry: false,
      refetchOnMount: false,
      enabled,
      ...config
    })
  },
  usePrivacyPolicyQuery: ({ config = {}, enabled }) => {
    return useQuery(["policy"], () => APIhandler.onboarding.getPrivacyPlicy(), {
      retry: false,
      refetchOnMount: false,
      enabled,
      ...config
    })
  }
}

// ----- applications -----

export const useApplicationQuery = {
  useCastApplicationQuery: ({ config = {}, enabled }) => {
    return useQuery(
      ["castAppliction"],
      () => APIhandler.applications.getCastApplication(),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  },
  useCrewApplicationQuery: ({ config = {}, enabled }) => {
    return useQuery(
      ["crewApplication"],
      () => APIhandler.applications.getCrewApplication(),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  },
  useCastApplicationStatusQuery: ({ config = {}, enabled, productionId }) => {
    return useQuery(
      ["castApplictionStatus", productionId],
      () => APIhandler.applications.getCastApplicationStatus({ productionId }),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  },
  useCrewApplicationStatusQuery: ({ config = {}, enabled, productionId }) => {
    return useQuery(
      ["crewApplicationStatus", productionId],
      () => APIhandler.applications.getCrewApplicationStatus({ productionId }),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  }
}

// ----- subscriptions -----

export const useSubscriptionQuery = {
  useGetSubscriptionPlansQuery: ({ config = {}, enabled }) => {
    return useQuery(
      ["subscription-plans"],
      () => APIhandler.subscriptions.getSubscriptionPlans(),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  },
  useUserSubDetailsQuery: ({ config = {}, enabled }) => {
    return useQuery(
      ["user-sub-details"],
      () => APIhandler.subscriptions.getUserSubDetails(),
      {
        retry: false,
        refetchOnMount: false,
        enabled,
        ...config
      }
    )
  }
}
