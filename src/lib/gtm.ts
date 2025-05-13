import TagManager from 'react-gtm-module';

import { getUtmParams } from './utm';

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
    const utmParams = getUtmParams();

    TagManager.dataLayer({
      dataLayer: {
        event: eventName,
        ...utmParams,
        ...eventData,
      },
    });
  }
};
