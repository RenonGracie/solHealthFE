import * as React from 'react';
import { TherapistContext } from '@/contexts/TherapistContext';

export const useTherapistContext = () => {
  const context = React.useContext(TherapistContext);

  if (!context) {
    throw new Error(
      'useTherapistContext must be used within TherapistProvider',
    );
  }

  return context;
};
