import * as React from 'react';
import { useTherapistContext } from '@/hooks/useTherapistContext';
import { Tag, VideoPlayer, ExpandableList, Button } from '../../../ui';
import {
  TherapyStyleSection,
  TherapistInfoSection,
  BookingSection,
  PreviousTherapistCard,
} from './components';
import ArrowRightIcon from '@/assets/icons/arrow-right-icon.svg';
import { PLACEHOLDER_IMAGE_PATH } from '@/constants';

export const MatchedTherapist: React.FC = () => {
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

  const generalExpertise = React.useMemo(() => {
    return [
      ...(therapistData?.matched_diagnoses || []),
      ...(therapistData?.matched_specialities || []),
    ];
  }, [therapistData]);

  const matchedExpertise = React.useMemo(() => {
    const [firstMatchedDiagnose] = therapistData?.matched_diagnoses || [];
    const [firstMatchedSpeciality, secondMatchedSpeciality] =
      therapistData?.matched_specialities || [];

    return [
      firstMatchedDiagnose,
      firstMatchedSpeciality,
      secondMatchedSpeciality,
    ];
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

  if (bookingState.showSection) {
    return <BookingSection />;
  }

  return (
    <div>
      <div className="lg:flex lg:flex-col max-w-7xl w-full h-full mx-auto pb-[100px]">
        <div className="lg:flex lg:gap-6">
          <div className="rounded-[8px] border border-[#7B4720] px-4 py-8 lg:px-6 bg-transparent lg:w-full lg:h-fit">
            <div className="flex flex-col gap-4 pb-4 lg:pb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto]">
                <div className="flex items-center gap-4 mb-5 order-1">
                  <img
                    src={
                      therapistData?.therapist?.image_link ||
                      PLACEHOLDER_IMAGE_PATH
                    }
                    alt={`${therapistData?.therapist?.intern_name} photo`}
                    className="w-[80px] h-[80px] rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-[32px] font-normal font-['Very_Vogue_Text']">
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
            <div className="relative pt-8 before:absolute before:top-0 before:-left-4 before:-right-4 lg:before:-left-6 lg:before:-right-6 before:h-[1px] before:bg-[#7B4720]">
              <h2 className="text-[32px] font-normal font-['Very_Vogue_Text'] mb-6">
                Skills and Experience
              </h2>
              <div className="flex flex-col gap-8">
                <TherapyStyleSection
                  title="Specializes in"
                  items={therapistData?.therapist?.specialities}
                  matchedItems={generalExpertise}
                />
                <TherapyStyleSection
                  title="Works with diagnoses"
                  items={therapistData?.therapist?.diagnoses}
                  matchedItems={generalExpertise}
                />
                <TherapyStyleSection
                  title="Therapeutic orientation"
                  items={therapistData?.therapist?.therapeutic_orientation}
                  matchedItems={generalExpertise}
                />
                <TherapyStyleSection
                  title="Has experience working with religions"
                  items={therapistData?.therapist?.religion}
                  matchedItems={generalExpertise}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-8 lg:hidden">
            <h3 className="text-center font-['Very_Vogue_Text'] text-[32px] leading-7 font-normal">
              This therapist isn&apos;t right for you?
            </h3>
            <Button
              className="rounded-4xl bg-transparent mt-6"
              onClick={handleFindAnotherTherapist}
            >
              Find Another Therapist <ArrowRightIcon />
            </Button>
            {(previousTherapistsList?.length || 0) > 0 && (
              <>
                <h3 className="text-center font-['Very_Vogue_Text'] text-[32px] leading-7 font-normal mt-8">
                  Previously Viewed Therapists
                </h3>
                <div className="flex gap-4 w-full pb-2 overflow-x-auto mt-5 [&::-webkit-scrollbar]:h-[1px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#7B4720]">
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
              <h3 className="text-center font-['Very_Vogue_Text'] text-[32px] leading-7 font-normal">
                This therapist isn&apos;t right for you?
              </h3>
              <Button
                className="rounded-4xl bg-transparent"
                onClick={handleFindAnotherTherapist}
              >
                Find Another Therapist <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
        {(previousTherapistsList?.length || 0) > 0 && (
          <div className="hidden lg:block mt-10">
            <h3 className="font-['Very_Vogue_Text'] text-[32px] leading-7 font-normal">
              Previously Viewed Therapists
            </h3>
            <div className="flex gap-6 w-full pb-2 overflow-x-auto mt-5 [&::-webkit-scrollbar]:h-[1px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#7B4720]">
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

      <div className="fixed bottom-0 left-0 right-0 shadow-[0_-2px_10.6px_0_rgba(0,0,0,0.15)] lg:hidden bg-[#fffbf3]">
        <div className="p-4 pb-6 relative h-full w-full before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/background.png')] before:bg-cover before:bg-center before:opacity-10 before:block">
          <div className="relative w-full h-full px-3">
            <Button onClick={onShowBooking} className="w-full h-12 rounded-4xl">
              Select This Therapist <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
