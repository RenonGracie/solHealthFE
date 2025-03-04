import * as React from 'react';

import { Loader, Error } from './components/ui';
import { STEPS } from './constants';
import { usePollFormAndRequestMatch } from './hooks';
import { BookAppointmentResponse } from './api/services';
import { TherapistProvider } from './providers/TherapistProvider';
import { Steps } from './components/Steps';

function App() {
  const [step, setStep] = React.useState<STEPS>(STEPS.TYPEFORM);
  const [hideTitle, setHideTitle] = React.useState(false);
  const [clientResponseId, setClientResponseId] = React.useState<string | null>(
    null,
  );
  const [bookingData, setBookingData] =
    React.useState<BookAppointmentResponse | null>(null);

  const { matchData, loading, error, pollFormAndRequestMatch } =
    usePollFormAndRequestMatch();

  const handleConfirmGoBack = () => {
    setStep(STEPS.TYPEFORM);
  };

  const handleShowBookingSection = React.useCallback(() => {
    setHideTitle(true);
  }, []);

  const handleTypeformSubmit = React.useCallback(
    async (responseId: string) => {
      setClientResponseId(responseId);

      try {
        await pollFormAndRequestMatch(responseId);
        setStep(STEPS.MATCHED_THERAPIST);
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

  // TEMPORARY SOLUTION:
  // This effect is added to simplify application testing by allowing direct access
  // through URL parameters. It should be removed before deploying to production
  // as it bypasses the normal Typeform flow and could pose security risks.
  React.useEffect(() => {
    const responseIdFromUrl = window.location.pathname
      .split('/')
      .filter(Boolean)
      .pop();

    if (responseIdFromUrl) {
      void handleTypeformSubmit(responseIdFromUrl);
    }
  }, [handleTypeformSubmit]);

  if (error) {
    return (
      <Error className="min-h-screen min-w-screen">
        <span>An error occurred while fetching the therapists</span>
      </Error>
    );
  }

  if (loading) {
    return <Loader className="min-h-screen min-w-screen" />;
  }

  return (
    <TherapistProvider
      initialTherapist={matchData?.therapists?.[0]}
      therapists={matchData?.therapists || []}
      clientResponseId={clientResponseId}
      bookingData={bookingData}
      onBookSession={handleBookSession}
      onShowBooking={handleShowBookingSection}
    >
      <Steps
        step={step}
        hideTitle={hideTitle}
        onTypeformSubmit={handleTypeformSubmit}
        onGoBack={handleConfirmGoBack}
      />
    </TherapistProvider>
  );
}

export default App;
