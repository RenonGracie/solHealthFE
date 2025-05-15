import TagManager from 'react-gtm-module';

import { getUtmParams } from './utm';

export const GTM_EVENTS = {
  FORM_STARTED: 'FormStarted',
  FORM_SUBMITTED: 'FormSubmitted',
  MATCHMAKING_LOADING: 'MatchmakingLoadingScreen',
  RECOMMENDED_THERAPIST: 'RecommendedTherapistScreen',
  BOOKING_CONFIRMATION: 'BookingConfirmationScreen',
} as const;

export enum GTM_EVENT_DATA {
  USER_ID = 'user_id',
  CUSTOM_USER_ID = 'custom_user_id',
}

export const trackEvent = (
  eventName: string,
  eventData?: Record<GTM_EVENT_DATA | string, unknown>,
) => {
  if (typeof window !== 'undefined') {
    const utmParams = getUtmParams();

    const utmParamsWithoutPrefix = Object.fromEntries(
      Object.entries(utmParams).map(([key, value]) => [
        key.replace(/^utm_/, ''),
        value,
      ]),
    );

    TagManager.dataLayer({
      dataLayer: {
        event: eventName,
        ...utmParamsWithoutPrefix,
        ...eventData,
      },
    });
  }
};
