import * as React from 'react';
import lodash from 'lodash';

import { Tag, VideoPlayer } from './ui';
import { MatchResponse } from '../api/services/therapistsService';

type TProps = MatchResponse;

export const MatchedTherapist: React.FC<TProps> = ({ therapists }) => {
  const firstTherapist = lodash.get(therapists, '[0].therapist');

  const therapistIdentification = React.useMemo(
    () => (
      <span className="tracking-[-0.02em]">
        {firstTherapist?.ethnicity?.map((ethnicity, key) => (
          <span key={ethnicity}>
            {ethnicity}
            {key !== (firstTherapist?.ethnicity?.length || 0) - 1 && ', '}
          </span>
        ))}
        , {firstTherapist?.gender}
      </span>
    ),
    [firstTherapist],
  );

  return (
    <div className="max-w-7xl rounded-[8px] border border-[#7B4720] px-4 py-8 lg:px-6 mx-auto bg-transparent">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row flex-wrap">
          <div className="flex items-center gap-4 mb-5 w-full lg:w-1/2 order-1">
            <img
              src={firstTherapist?.image_link}
              alt={`${firstTherapist?.intern_name} photo`}
              className="w-[80px] h-[80px] rounded-full object-cover"
            />
            <div>
              <h2 className="text-[32px] font-normal font-['Very_Vogue_Text']">
                {firstTherapist?.intern_name}
              </h2>
              <p className="text-base font-light leading-6 tracking-[-0.02em]">
                Therapist
              </p>
            </div>
          </div>

          <div className="flex justify-end mb-5 w-full lg:w-1/2 order-3 lg:order-2">
            <VideoPlayer
              videoUrl={firstTherapist?.welcome_video_link ?? ''}
              className="w-full aspect-video rounded-[8px] lg:w-[140px] lg:h-[80px] lg:rounded-[4px]"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-5 w-full order-2 lg:order-3">
            {firstTherapist?.specialities?.map((specialty) => (
              <Tag key={specialty}>{specialty}</Tag>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-base font-light leading-5">
            <span className="text-xl font-normal leading-6 font-['Very_Vogue_Text']">
              Identifies as:{' '}
            </span>
            {therapistIdentification}
          </p>

          <p className="text-base font-light leading-5">
            <span className="text-xl font-normal leading-6 font-['Very_Vogue_Text']">
              Age:{' '}
            </span>
            <span className="tracking-[-0.02em]">{firstTherapist?.age}</span>
          </p>

          <p className="text-base font-light leading-5">
            <span className="text-xl font-normal leading-6 font-['Very_Vogue_Text']">
              Work in States:{' '}
            </span>
            {firstTherapist?.states?.map((state, index) => (
              <span key={state} className="tracking-[-0.02em]">
                {state}
                {index !== (firstTherapist?.states?.length || 0) - 1 && ', '}
              </span>
            ))}
          </p>
        </div>

        <p className="text-sm font-light leading-5 tracking-[-0.02em]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
          eius minus, atque id delectus, velit veniam est in laudantium vel eum
          nesciunt suscipit? Nihil praesentium temporibus laudantium quis rem
          quibusdam.
        </p>
      </div>
    </div>
  );
};
