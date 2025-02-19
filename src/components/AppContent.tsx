import { MatchedTherapist } from './MatchedTherapist';
import { TypeformEmbed } from './TypeformEmbed';
import { useTherapistsService } from '../api/services';
import { Loader } from './ui';
import { Error } from './Error';
import { STEPS } from '../constants';

interface IProps {
  step: STEPS;
  onStepChange: (step: STEPS) => void;
}

export const AppContent = ({ step, onStepChange }: IProps) => {
  const { data, loading, error, getMatch } = useTherapistsService();

  const handleTypeformSubmit = async (responseId: string) => {
    try {
      await getMatch({ response_id: responseId });
      onStepChange(STEPS.MATCHED_THERAPIST);
    } catch (error) {
      console.error(error);
    }
  };

  const StepComponent = () => {
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
      <Error>
        <span>An error occurred while fetching the therapists</span>
      </Error>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return <StepComponent />;
};
