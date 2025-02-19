import React from 'react';

import { Layout } from './components/ui';
import { AppContent } from './components/AppContent';
import { STEPS } from './constants';

function App() {
  const [step, setStep] = React.useState<STEPS>(STEPS.TYPEFORM);

  const handleConfirmGoBack = () => {
    setStep(STEPS.TYPEFORM);
  };

  return (
    <Layout
      unstyled={step === STEPS.TYPEFORM}
      onConfirmGoBack={handleConfirmGoBack}
    >
      <AppContent step={step} onStepChange={setStep} />
    </Layout>
  );
}

export default App;
