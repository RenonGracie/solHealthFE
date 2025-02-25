export const ENDPOINTS = {
  THERAPISTS: {
    GET_MATCH: '/therapists/match',
    GET_CALENDAR_EVENTS: '/therapists/calendar_events',
  },
  APPOINTMENTS: {
    BOOK_APPOINTMENT: '/appointments',
  },
  CLIENTS_SIGNUP_FORMS: {
    GET_FORM: '/clients_signup',
  },
} as const;
