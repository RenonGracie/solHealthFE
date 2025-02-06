import React from 'react';

import { MatchedTherapist } from './components/MatchedTherapist';
import { TypeformEmbed } from './components/TypeformEmbed';
import { useTherapistsService } from './api/services';
import { Loader } from './components/ui';

enum STEPS {
  TYPEFORM = 'TYPEFORM',
  MATCHED_THERAPIST = 'MATCHED_THERAPIST',
}

function App() {
  const [step, setStep] = React.useState<STEPS>(STEPS.TYPEFORM);

  const { data, loading, error, getMatch } = useTherapistsService();

  const handleTypeformSubmit = async (responseId: string) => {
    try {
      await getMatch({ response_id: responseId });
      setStep(STEPS.MATCHED_THERAPIST);
    } catch (error) {
      console.error(error);
    }
  };

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
        return <MatchedTherapist therapists={data?.therapists} />;
      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-2xl font-bold">
          An error occurred while fetching the therapists
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/background.png')] before:bg-cover before:bg-center before:opacity-10">
      <div className="relative w-full h-full px-3">
        {loading ? <Loader /> : renderStep()}
      </div>
    </div>
  );
}

export default App;
