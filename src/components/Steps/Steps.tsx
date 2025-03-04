import * as React from 'react';
import { STEPS } from '@/constants';
import { MatchedTherapist, Confirmation, TypeformEmbed } from './components';
import { Layout } from '../ui';

interface IProps {
  step: STEPS;
  hideTitle: boolean;
  onTypeformSubmit: (responseId: string) => Promise<void>;
  onGoBack: () => void;
}

export const Steps: React.FC<IProps> = ({
  step,
  hideTitle,
  onTypeformSubmit,
  onGoBack,
}) => {
  switch (step) {
    case STEPS.TYPEFORM:
      return (
        <TypeformEmbed
          onSubmit={(responseId) => {
            void onTypeformSubmit(responseId);
          }}
        />
      );
    case STEPS.MATCHED_THERAPIST:
      return (
        <Layout hideTitle={hideTitle} onGoBack={onGoBack}>
          <MatchedTherapist />
        </Layout>
      );
    case STEPS.CONFIRMATION:
      return (
        <Layout hideTitle hideHeaderImage>
          <Confirmation />
        </Layout>
      );
    default:
      return null;
  }
};
