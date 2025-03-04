import * as React from 'react';
import { useTherapistContext } from '@/hooks/useTherapistContext';
import { Tag, VideoPlayer, ExpandableList, Button } from '../../../ui';
import {
  TherapyStyleSection,
  TherapistInfoSection,
  BookingSection,
} from './components';
import ArrowRightIcon from '@/assets/icons/arrow-right-icon.svg';

export const MatchedTherapist: React.FC = () => {
  const {
    bookingState,
    onShowBooking,
    onFindAnotherTherapist,
    currentTherapist: therapistData,
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
        , {therapistData?.therapist?.gender}
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

  if (bookingState.showSection) {
    return <BookingSection />;
  }

  return (
    <div>
      <div className="lg:flex lg:gap-6 max-w-7xl w-full h-full mx-auto pb-[88px] lg:pb-0">
        <div className="rounded-[8px] border border-[#7B4720] px-4 py-8 lg:px-6 bg-transparent lg:w-full lg:h-fit">
          <div className="flex flex-col gap-4 pb-4 lg:pb-8">
            <div className="flex flex-col lg:flex-row flex-wrap">
              <div className="flex items-center gap-4 mb-5 w-full lg:w-1/2 order-1">
                <img
                  src={therapistData?.therapist?.image_link}
                  alt={`${therapistData?.therapist?.intern_name} photo`}
                  className="w-[80px] h-[80px] rounded-full object-cover"
                />
                <div>
                  <h2 className="text-[32px] font-normal font-['Very_Vogue_Text']">
                    {therapistData?.therapist?.intern_name}
                  </h2>
                  <p className="text-base font-light leading-6 tracking-[-0.02em]">
                    Therapist
                  </p>
                </div>
              </div>

              <div className="flex justify-end mb-5 w-full lg:w-1/2 order-3 lg:order-2">
                <VideoPlayer
                  videoUrl={therapistData?.therapist?.welcome_video_link}
                  className="w-full lg:w-[140px] lg:h-[80px] lg:rounded-[4px]"
                />
              </div>

              <ExpandableList
                items={matchedExpertise}
                renderItem={(item) => <Tag>{item}</Tag>}
                getItemKey={(item) => item}
                className="mb-5 w-full order-2 lg:order-3"
              />
            </div>

            <div className="space-y-2">
              <TherapistInfoSection title="Identifies as">
                {therapistIdentification}
              </TherapistInfoSection>
              <TherapistInfoSection title="Age:">
                <span className="tracking-[-0.02em]">
                  {therapistData?.therapist?.age}
                </span>
              </TherapistInfoSection>
              <TherapistInfoSection title="Work in States:">
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
              Therapy style and experience
            </h2>
            <div className="flex flex-col gap-8">
              <TherapyStyleSection
                title="Specializes at"
                items={therapistData?.therapist?.specialities}
                matchedItems={generalExpertise}
              />
              <TherapyStyleSection
                title="Work with diagnoses"
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
        <div className="flex flex-col items-center gap-6 mt-8 mb-8 lg:hidden">
          <h3 className="text-center font-['Very_Vogue_Text'] text-[32px] leading-7 font-normal">
            This therapist isn&apos;t right for you?
          </h3>
          <Button
            className="rounded-4xl bg-transparent"
            onClick={onFindAnotherTherapist}
          >
            Find Another Therapist <ArrowRightIcon />
          </Button>
        </div>
        <div className="lg:h-fit hidden lg:block">
          <BookingSection />
          <div className="flex flex-col items-center gap-6 mt-10.5">
            <h3 className="text-center font-['Very_Vogue_Text'] text-[32px] leading-7 font-normal">
              This therapist isn&apos;t right for you?
            </h3>
            <Button
              className="rounded-4xl bg-transparent"
              onClick={onFindAnotherTherapist}
            >
              Find Another Therapist <ArrowRightIcon />
            </Button>
          </div>
        </div>
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
