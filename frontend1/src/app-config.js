export const APPCONFIG = {
  appNameSlug: "show-up-36400",
  baseWebApiUrl:
    window.location.href.indexOf("staging") > -1 ||
    window.location.hostname === "localhost"
      ? "https://show-up-36400-staging.botics.co"
      : "https://theater-management--36400.botics.co",

  debugGlobal: true,

  sessionVariables: {
    AUTH_TOKEN: "authToken",
    USER_DATA: "userData"
  },

  apiConst: {
    RoleCategory: {
      CAST: "cast",
      CREW: "crew"
    },
    RoleCategoryTitle: {
      CAST: "Cast",
      CREW: "Crew"
    },
    newRoleName: "New Role",
    ApplicationCategory: {
      CAST: "cast",
      CREW: "crew",
      COMPLETED_APPLICATIONS: "completedApplications"
    },
    EntryOptions: {
      OPEN_TO_ALL: "Open to All",
      INVITATION_ONLY: "Invitation Only"
    },
    productionLengths: {
      ONE_ACT: "One Act",
      FULL_LENGTH: "Full length"
    },
    castCatNames: {
      SUPPORTING: "Supporting",
      LEAD: "Lead"
    },
    crewCatNames: {
      NON_PRINCIPAL: "Non-Principal",
      PRINCIPAL: "Principal"
    },
    thespianPoints: {
      CAST: {
        ONE_ACT: {
          SUPPORTING: 3,
          LEAD: 4
        },
        FULL_LENGTH: {
          SUPPORTING: 5,
          LEAD: 8
        }
      },
      CREW: {
        ONE_ACT: {
          NON_PRINCIPAL: 3,
          PRINCIPAL: 4
        },
        FULL_LENGTH: {
          NON_PRINCIPAL: 5,
          PRINCIPAL: 8
        }
      }
    }
  },

  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],

  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],

  selectOptionsAnswerType: [
    { value: "Short text", label: "Short text" },
    { value: "Long text", label: "Long text" }
  ],

  selectOptionsYesNo: [
    { value: true, label: "Yes" },
    { value: false, label: "No" }
  ],

  paymentType: [
    { id: 1, label: "credit card" },
    { id: 2, label: "cheque" }
  ]
}
