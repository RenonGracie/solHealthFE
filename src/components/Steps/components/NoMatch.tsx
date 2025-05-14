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
        <h4 className="text-center text-[24px] lg:text-[32px] leading-[90%] very-vogue-text">
          Try expanding or adjusting your answers to see more available options.
        </h4>
        <Button
          withArrow
          className="lg:max-w-fit rounded-4xl text-[16px] tracking-[-0.02em]"
          onClick={handleGoToQuestionnaireClick}
        >
          Update My Preferences
        </Button>
      </div>
      <Modal
        title="Restart Sign Up?"
        description="Restarting the sign up process will erase all your current data and preferences. Do you want to continue?"
        confirmButtonTitle="Yes, Restart"
        isOpen={isGoBackModalOpen}
        onClose={handleCloseGoBackModal}
        onConfirm={handleConfirmGoBack}
        confirmButtonWithArrow
        dialogPanelClassName="max-w-[700px]"
        descriptionClassName="leading-[1.2]"
      />
    </>
  );
};
