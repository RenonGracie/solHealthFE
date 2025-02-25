import * as React from 'react';

import { Loader, Layout, Error } from './components/ui';
import { STEPS } from './constants';
import { TypeformEmbed } from './components/TypeformEmbed';
import { MatchedTherapist } from './components/MatchedTherapist';
import { usePollFormAndRequestMatch } from './hooks';

function App() {
  const [step, setStep] = React.useState<STEPS>(STEPS.TYPEFORM);
  const [hideTitle, setHideTitle] = React.useState(false);
  const [clientResponseId, setClientResponseId] = React.useState<string | null>(
    null,
  );

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

  const renderStep = () => {
    switch (step) {
      case STEPS.TYPEFORM:
        return (
          <TypeformEmbed
            onSubmit={(responseId) => {
              void handleTypeformSubmit(responseId);
            }}
          />
        );
      case STEPS.MATCHED_THERAPIST:
        return (
          <MatchedTherapist
            therapists={matchData?.therapists}
            clientResponseId={clientResponseId}
            onShowBookingSection={handleShowBookingSection}
          />
        );
      default:
        return null;
    }
  };

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
    <Layout
      hideTitle={hideTitle}
      unstyled={step === STEPS.TYPEFORM}
      onConfirmGoBack={handleConfirmGoBack}
    >
      {renderStep()}
    </Layout>
  );
}

export default App;
