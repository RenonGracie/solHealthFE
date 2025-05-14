import * as React from 'react';

import { useTherapistContext } from '@/hooks/useTherapistContext';
import { GTM_EVENTS, trackEvent } from '@/lib/gtm';
import {
  Tag,
  VideoPlayer,
  ExpandableList,
  Button,
  ImageWithPlaceholder,
  Modal,
} from '@/components/ui';
import profileImagePlaceholderSrc from '@/assets/images/profile-image-placeholder.svg?url';
import WarningCircleIcon from '@/assets/icons/warning-circle-icon.svg';
import {
  TherapyStyleSection,
  TherapistInfoSection,
  BookingSection,
  PreviousTherapistCard,
} from './components';

interface IProps {
  showTimeoutModal: boolean;
  onConfirmTimeoutModal: () => void;
  onCancelTimeoutModal: () => void;
}

export const MatchedTherapist: React.FC<IProps> = ({
  showTimeoutModal,
  onConfirmTimeoutModal,
  onCancelTimeoutModal,
}) => {
  const {
    bookingState,
    onShowBooking,
    onFindAnotherTherapist,
    currentTherapist: therapistData,
    previousTherapistsList,
    onViewPreviousTherapist,
    setIsSearchingAnotherTherapist,
  } = useTherapistContext();

  const therapistIdentification = React.useMemo(
    () => (
      <span className="tracking-[-0.02em]">
        {therapistData?.therapist?.ethnicity?.map((ethnicity, key) => (
          <span key={ethnicity}>
            {ethnicity}
            {key !== (therapistData?.therapist?.ethnicity?.length || 0) - 1 &&
              ', '}
          </span>
        ))}
        , {therapistData?.therapist?.identities_as}
      </span>
    ),
    [therapistData?.therapist],
  );

  const matchedExpertise = React.useMemo(() => {
    const firstThreeMatchedExpertise =
      therapistData?.matched_diagnoses_specialities.slice(0, 3);

    return firstThreeMatchedExpertise?.filter(Boolean) || [];
  }, [therapistData]);

  const triggerLoading = () => {
    setIsSearchingAnotherTherapist(true);

    setTimeout(() => {
      setIsSearchingAnotherTherapist(false);
    }, 500);
  };

  const handleFindAnotherTherapist = () => {
    onFindAnotherTherapist();
    triggerLoading();
  };

  const handleViewPreviousTherapist = (therapistId: string) => {
    onViewPreviousTherapist(therapistId);
    triggerLoading();
  };

  React.useEffect(() => {
    trackEvent(GTM_EVENTS.RECOMMENDED_THERAPIST);
  }, []);

  if (bookingState.showSection) {
    return <BookingSection />;
  }

  return (
    <div>
      <div className="lg:flex lg:flex-col max-w-7xl w-full h-full mx-auto pb-[100px]">
        <div className="lg:flex lg:gap-6">
          <div className="rounded-[8px] border border-[var(--brand-brown)] px-4 py-8 lg:px-6 bg-transparent lg:w-full lg:h-fit">
            <div className="flex flex-col gap-4 pb-4 lg:pb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto]">
                <div className="flex items-center gap-4 mb-5 order-1">
                  <ImageWithPlaceholder
                    src={therapistData?.therapist?.image_link}
                    alt={`${therapistData?.therapist?.intern_name} photo`}
                    containerClassName="w-[80px] h-[80px] rounded-full shrink-0"
                    placeholderSrc={profileImagePlaceholderSrc}
                  />
                  <div>
                    <h2 className="text-[32px] very-vogue-text">
                      {therapistData?.therapist?.intern_name}
                    </h2>
                    <p className="text-base font-light leading-6 tracking-[-0.02em]">
                      Therapist-in-Training
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mb-5 lg:mb-0 lg:row-span-2 order-3 lg:order-2">
                  <VideoPlayer
                    videoUrl={therapistData?.therapist?.welcome_video_link}
                    className="w-full lg:w-[240px] lg:h-[140px] lg:rounded-[4px]"
                  />
                </div>

                <ExpandableList
                  items={matchedExpertise}
                  renderItem={(item) => <Tag>{item}</Tag>}
                  className="mb-5 lg:mb-0 w-full order-2 lg:order-3"
                />
              </div>

              <div className="space-y-2">
                <TherapistInfoSection title="Identifies as:">
                  {therapistIdentification}
                </TherapistInfoSection>
                <TherapistInfoSection title="Age:">
                  <span className="tracking-[-0.02em]">
                    {therapistData?.therapist?.age}
                  </span>
                </TherapistInfoSection>
                <TherapistInfoSection title="Works in States:">
                  {therapistData?.therapist?.states?.map((state, index) => (
                    <span key={state} className="tracking-[-0.02em]">
                      {state}
                      {index !==
                        (therapistData?.therapist?.states?.length || 0) - 1 &&
                        ', '}
                    </span>
                  ))}
                </TherapistInfoSection>
              </div>

              <p className="text-sm font-light leading-5 tracking-[-0.02em]">
                {therapistData?.therapist?.biography}
              </p>
            </div>
            <div className="relative pt-8 before:absolute before:top-0 before:-left-4 before:-right-4 lg:before:-left-6 lg:before:-right-6 before:h-[1px] before:bg-[var(--brand-brown)]">
              <h2 className="text-[32px] very-vogue-text mb-6">
                Skills and Experience
              </h2>
              <div className="flex flex-col gap-8">
                <TherapyStyleSection
                  title="Specializes in"
                  items={therapistData?.therapist?.diagnoses_specialities}
                  matchedItems={therapistData?.matched_diagnoses_specialities}
                />
                <TherapyStyleSection
                  title="Therapeutic orientation"
                  items={therapistData?.therapist?.therapeutic_orientation}
                  matchedItems={therapistData?.matched_diagnoses_specialities}
                />
                <TherapyStyleSection
                  title="Has experience working with religions"
                  items={therapistData?.therapist?.religion}
                  matchedItems={therapistData?.matched_diagnoses_specialities}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-8 lg:hidden">
            <h3 className="text-center very-vogue-text text-[32px] leading-7">
              This therapist isn&apos;t right for you?
            </h3>
            <Button
              withArrow
              className="rounded-4xl bg-transparent hover:bg-[var(--brand-coffee)] hover:opacity-100 mt-6"
              onClick={handleFindAnotherTherapist}
            >
              Find Another Therapist
            </Button>
            {(previousTherapistsList?.length || 0) > 0 && (
              <>
                <h3 className="text-center very-vogue-text text-[32px] leading-7 mt-8">
                  Previously Viewed Therapists
                </h3>
                <div className="flex gap-4 w-full pb-2 overflow-x-auto mt-5 [&::-webkit-scrollbar]:h-[1px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--brand-brown)]">
                  {previousTherapistsList?.map((therapistInfo) => (
                    <PreviousTherapistCard
                      key={therapistInfo.therapist.id}
                      name={therapistInfo.therapist.intern_name}
                      photoSrc={therapistInfo.therapist.image_link}
                      onClick={() =>
                        handleViewPreviousTherapist(therapistInfo.therapist.id)
                      }
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="lg:h-fit hidden lg:block">
            <BookingSection />
            <div className="flex flex-col items-center gap-6 mt-10.5">
              <h3 className="text-center very-vogue-text text-[32px] leading-7">
                This therapist isn&apos;t right for you?
              </h3>
              <Button
                withArrow
                className="rounded-4xl bg-transparent hover:bg-[var(--brand-coffee)] hover:opacity-100"
                onClick={handleFindAnotherTherapist}
              >
                Find Another Therapist
              </Button>
            </div>
          </div>
        </div>
        {(previousTherapistsList?.length || 0) > 0 && (
          <div className="hidden lg:block mt-10">
            <h3 className="very-vogue-text text-[32px] leading-7">
              Previously Viewed Therapists
            </h3>
            <div className="flex gap-6 w-full pb-2 overflow-x-auto mt-5 [&::-webkit-scrollbar]:h-[1px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--brand-brown)]">
              {previousTherapistsList?.map((therapistInfo) => (
                <PreviousTherapistCard
                  key={therapistInfo.therapist.id}
                  name={therapistInfo.therapist.intern_name}
                  photoSrc={therapistInfo.therapist.image_link}
                  onClick={() =>
                    handleViewPreviousTherapist(therapistInfo.therapist.id)
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 shadow-[0_-2px_10.6px_0_rgba(0,0,0,0.15)] grainy-background lg:hidden">
        <div className="p-4 pb-6 relative h-full w-full">
          <div className="relative w-full h-full px-3">
            <Button
              withArrow
              onClick={onShowBooking}
              className="w-full h-12 rounded-4xl"
            >
              Select This Therapist
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title={
          <div className="flex flex-col items-center gap-2">
            <WarningCircleIcon />
            Page Session Expired
          </div>
        }
        description="You've been on this page for a while, and the therapist availability may have changed. To make sure you're seeing the most accurate matches, we'll need to refresh the results."
        confirmButtonTitle="Refresh Page"
        confirmButtonWithArrow
        isOpen={showTimeoutModal}
        onClose={onCancelTimeoutModal}
        onConfirm={onConfirmTimeoutModal}
        hideCancelButton
      />
    </div>
  );
};
