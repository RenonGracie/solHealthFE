import * as React from 'react';

import { useTherapistsService } from './api/services';
import { Loader, Layout } from './components/ui';
import { Error } from './components/Error';
import { STEPS } from './constants';
import { TypeformEmbed } from './components/TypeformEmbed';
import { MatchedTherapist } from './components/MatchedTherapist';

function App() {
  const [step, setStep] = React.useState<STEPS>(STEPS.TYPEFORM);
  const [hideTitle, setHideTitle] = React.useState(false);

  const {
    match: { data, loading, error, makeRequest: getMatch },
  } = useTherapistsService();

  const handleConfirmGoBack = () => {
    setStep(STEPS.TYPEFORM);
  };

  const handleShowBookingSection = React.useCallback(() => {
    setHideTitle(true);
  }, []);

  const handleTypeformSubmit = React.useCallback(
    async (responseId: string) => {
      try {
        await getMatch({
          params: { response_id: responseId },
        });
        setStep(STEPS.MATCHED_THERAPIST);
      } catch (error) {
        console.error(error);
      }
    },
    [getMatch],
  );

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
            therapists={data?.therapists}
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
