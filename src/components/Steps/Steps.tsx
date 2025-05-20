import * as React from 'react';
import { STEPS } from '@/constants';
import {
  MatchedTherapist,
  Confirmation,
  TypeformEmbed,
  NoMatch,
} from './components';
import { Layout } from '../ui';

interface IProps {
  step: STEPS;
  hideTitle: boolean;
  onTypeformSubmit: (responseId: string) => Promise<void>;
  onGoBack: () => void;
  showTimeoutModal: boolean;
  onConfirmTimeoutModal: () => void;
  onCancelTimeoutModal: () => void;
}

export const Steps: React.FC<IProps> = ({
  step,
  hideTitle,
  onTypeformSubmit,
  onGoBack,
  showTimeoutModal,
  onConfirmTimeoutModal,
  onCancelTimeoutModal,
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
    case STEPS.NO_MATCH:
      return (
        <Layout
          title={
            <span className="text-[32px] lg:text-[48px] leading-[90%]">
              We couldn&apos;t find any therapists who match your current
              preferences.
            </span>
          }
          onGoBack={onGoBack}
        >
          <NoMatch onGoToQuestionnaire={onGoBack} />
        </Layout>
      );
    case STEPS.MATCHED_THERAPIST:
      return (
        <Layout hideTitle={hideTitle} onGoBack={onGoBack}>
          <MatchedTherapist
            showTimeoutModal={showTimeoutModal}
            onConfirmTimeoutModal={onConfirmTimeoutModal}
            onCancelTimeoutModal={onCancelTimeoutModal}
            onGoBack={onGoBack}
          />
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
