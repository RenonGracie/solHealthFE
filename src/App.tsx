import * as React from 'react';
import { GTM_EVENTS, trackEvent } from '@/lib/gtm';

import { Error } from './components/ui';
import { MatchingLoader } from './components/MatchingLoader';
import { STEPS } from './constants';
import { usePollFormAndRequestMatch } from './hooks';
import { BookAppointmentResponse } from './api/services';
import { TherapistProvider } from './providers/TherapistProvider';
import { Steps } from './components/Steps';
import { setSentryUser } from './lib/sentryUtils';

function App() {
  const [step, setStep] = React.useState<STEPS | null>(null);
  const [hideTitle, setHideTitle] = React.useState(false);
  const [clientResponseId, setClientResponseId] = React.useState<string | null>(
    null,
  );
  const [bookingData, setBookingData] =
    React.useState<BookAppointmentResponse | null>(null);
  const [isSearchingAnotherTherapist, setIsSearchingAnotherTherapist] =
    React.useState(false);

  const { matchData, loading, error, pollFormAndRequestMatch } =
    usePollFormAndRequestMatch();

  const handleConfirmGoBack = () => {
    setStep(STEPS.TYPEFORM);
  };

  const handleShowBookingSection = React.useCallback(() => {
    setHideTitle(true);
  }, []);

  const handleHideBookingSection = React.useCallback(() => {
    setHideTitle(false);
  }, []);

  const handleTypeformSubmit = React.useCallback(
    async (responseId: string) => {
      setStep(null);
      setClientResponseId(responseId);
      trackEvent(GTM_EVENTS.MATCHMAKING_LOADING);

      try {
        await pollFormAndRequestMatch(responseId);
      } catch (error) {
        console.error(error);
      }
    },
    [pollFormAndRequestMatch],
  );

  const handleBookSession = React.useCallback(
    (bookedSessionData: BookAppointmentResponse) => {
      setBookingData(bookedSessionData);
      setStep(STEPS.CONFIRMATION);
    },
    [],
  );

  React.useEffect(() => {
    if (matchData?.therapists) {
      if (matchData.therapists.length > 0) {
        setStep(STEPS.MATCHED_THERAPIST);
      } else {
        setStep(STEPS.NO_MATCH);
      }
    }
  }, [matchData?.therapists]);

  React.useEffect(() => {
    if (clientResponseId) {
      setSentryUser({
        responseId: clientResponseId,
      });
    }
  }, [clientResponseId]);

  React.useEffect(() => {
    const responseIdFromUrl = window.location.pathname
      .split('/')
      .filter(Boolean)
      .pop();

    if (responseIdFromUrl) {
      void handleTypeformSubmit(responseIdFromUrl);
    } else {
      setStep(STEPS.TYPEFORM);
    }
  }, [handleTypeformSubmit]);

  if (error) {
    return (
      <Error
        className="min-h-screen min-w-screen"
        title="An error occurred while fetching the therapists"
        error={error}
      />
    );
  }

  if (loading) {
    return <MatchingLoader />;
  }

  return (
    <TherapistProvider
      initialTherapistsList={matchData?.therapists || []}
      clientResponseId={clientResponseId}
      bookingData={bookingData}
      onBookSession={handleBookSession}
      onShowBooking={handleShowBookingSection}
      onHideBooking={handleHideBookingSection}
      setIsSearchingAnotherTherapist={setIsSearchingAnotherTherapist}
    >
      {isSearchingAnotherTherapist ? (
        <MatchingLoader />
      ) : (
        step && (
          <Steps
            step={step}
            hideTitle={hideTitle}
            onTypeformSubmit={handleTypeformSubmit}
            onGoBack={handleConfirmGoBack}
          />
        )
      )}
    </TherapistProvider>
  );
}

export default App;
