import TagManager from 'react-gtm-module';

export const GTM_EVENTS = {
  FORM_STARTED: 'FormStarted',
  FORM_SUBMITTED: 'FormSubmitted',
  MATCHMAKING_LOADING: 'MatchmakingLoadingScreen',
  RECOMMENDED_THERAPIST: 'RecommendedTherapistScreen',
  BOOKING_CONFIRMATION: 'BookingConfirmationScreen',
} as const;

export const trackEvent = (
  eventName: string,
  eventData?: Record<string, unknown>,
) => {
  if (typeof window !== 'undefined') {
    TagManager.dataLayer({
      dataLayer: {
        event: eventName,
        ...eventData,
      },
    });
  }
};
