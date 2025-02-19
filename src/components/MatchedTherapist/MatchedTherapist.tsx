import * as React from 'react';

import { Tag, VideoPlayer, ExpandableList } from '../ui';
import { MatchResponse } from '../../api/services/therapistsService';
import { TherapyStyleSection, TherapistInfoSection } from './components';

type TProps = MatchResponse;

export const MatchedTherapist: React.FC<TProps> = ({ therapists }) => {
  const [firstTherapist] = therapists || [];
  const firstTherapistData = firstTherapist?.therapist;

  const therapistIdentification = React.useMemo(
    () => (
      <span className="tracking-[-0.02em]">
        {firstTherapistData?.ethnicity?.map((ethnicity, key) => (
          <span key={ethnicity}>
            {ethnicity}
            {key !== (firstTherapistData?.ethnicity?.length || 0) - 1 && ', '}
          </span>
        ))}
        , {firstTherapistData?.gender}
      </span>
    ),
    [firstTherapistData],
  );

  return (
    <div className="rounded-[8px] border border-[#7B4720] px-4 py-8 lg:px-6 bg-transparent">
      <div className="flex flex-col gap-4 pb-4 lg:pb-8">
        <div className="flex flex-col lg:flex-row flex-wrap">
          <div className="flex items-center gap-4 mb-5 w-full lg:w-1/2 order-1">
            <img
              src={firstTherapistData?.image_link}
              alt={`${firstTherapistData?.intern_name} photo`}
              className="w-[80px] h-[80px] rounded-full object-cover"
            />
            <div>
              <h2 className="text-[32px] font-normal font-['Very_Vogue_Text']">
                {firstTherapistData?.intern_name}
              </h2>
              <p className="text-base font-light leading-6 tracking-[-0.02em]">
                Therapist
              </p>
            </div>
          </div>

          <div className="flex justify-end mb-5 w-full lg:w-1/2 order-3 lg:order-2">
            <VideoPlayer
              videoUrl={firstTherapistData?.welcome_video_link}
              className="w-full aspect-video rounded-[8px] lg:w-[140px] lg:h-[80px] lg:rounded-[4px]"
            />
          </div>

          <ExpandableList
            items={firstTherapist?.matched}
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
              {firstTherapistData?.age}
            </span>
          </TherapistInfoSection>
          <TherapistInfoSection title="Work in States:">
            {firstTherapistData?.states?.map((state, index) => (
              <span key={state} className="tracking-[-0.02em]">
                {state}
                {index !== (firstTherapistData?.states?.length || 0) - 1 &&
                  ', '}
              </span>
            ))}
          </TherapistInfoSection>
        </div>

        <p className="text-sm font-light leading-5 tracking-[-0.02em]">
          {firstTherapistData?.biography}
        </p>
      </div>
      <div className="relative pt-8 before:absolute before:top-0 before:-left-4 before:-right-4 lg:before:-left-6 lg:before:-right-6 before:h-[1px] before:bg-[#7B4720]">
        <h2 className="text-[32px] font-normal font-['Very_Vogue_Text'] mb-6">
          Therapy style and experience
        </h2>
        <div className="flex flex-col gap-8">
          <TherapyStyleSection
            title="Specializes at"
            items={firstTherapistData?.specialities}
            matchedItems={firstTherapist?.matched}
          />
          <TherapyStyleSection
            title="Work with diagnoses"
            items={firstTherapistData?.diagnoses}
            matchedItems={firstTherapist?.matched}
          />
          <TherapyStyleSection
            title="Therapeutic orientation"
            items={firstTherapistData?.therapeutic_orientation}
            matchedItems={firstTherapist?.matched}
          />
          <TherapyStyleSection
            title="Has experience working with religions"
            items={firstTherapistData?.religion}
            matchedItems={firstTherapist?.matched}
          />
        </div>
      </div>
    </div>
  );
};
