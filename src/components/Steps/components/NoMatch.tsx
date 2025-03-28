import * as React from 'react';

import { Button, Modal } from '@/components/ui';

interface IProps {
  onGoToQuestionnaire: () => void;
}

export const NoMatch = ({ onGoToQuestionnaire }: IProps) => {
  const [isGoBackModalOpen, setIsGoBackModalOpen] = React.useState(false);

  const handleGoToQuestionnaireClick = () => {
    setIsGoBackModalOpen(true);
  };

  const handleConfirmGoBack = () => {
    setIsGoBackModalOpen(false);
    onGoToQuestionnaire();
  };

  const handleCloseGoBackModal = () => {
    setIsGoBackModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-stretch lg:items-center  gap-[100px] lg:gap-[80px]">
        <h4 className="text-center text-[24px] lg:text-[32px] leading-[22px] lg:leading-[28px] very-vogue-text">
          Please try to expand your answers in the form
        </h4>
        <Button
          withArrow
          className="lg:max-w-fit rounded-4xl"
          onClick={handleGoToQuestionnaireClick}
        >
          Go to Questionnaire
        </Button>
      </div>
      <Modal
        title="Are you sure?"
        description="Are you sure you want to restart the onboarding process? All your data will be lost."
        isOpen={isGoBackModalOpen}
        onClose={handleCloseGoBackModal}
        onConfirm={handleConfirmGoBack}
      />
    </>
  );
};
