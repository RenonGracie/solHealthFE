import * as React from 'react';

import { Link, Button } from '@/components/ui';
import InstagramIcon from '@/assets/icons/instagram-icon.svg';
import { useTherapistContext } from '@/hooks/useTherapistContext';
import { useIntakeqService } from '@/api/services/intakeqService';
import { VideoPlayer } from '@/components/ui';
import { SessionInfo } from '../SessionInfo';

export const Confirmation = () => {
  const [mandatoryFormUrl, setMandatoryFormUrl] = React.useState<string | null>(
    null,
  );

  const { currentTherapist, bookingData } = useTherapistContext();

  const {
    sendMandatoryForm: {
      loading: mandatoryFormLoading,
      makeRequest: sendMandatoryForm,
    },
  } = useIntakeqService();

  React.useEffect(() => {
    void (async () => {
      if (!bookingData?.ClientId || !bookingData?.PractitionerId) {
        return;
      }

      try {
        const mandatoryFormData = await sendMandatoryForm({
          data: {
            client_id: bookingData.ClientId,
            therapist_id: bookingData.PractitionerId,
          },
        });

        if (mandatoryFormData?.url) {
          setMandatoryFormUrl(mandatoryFormData.url);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [bookingData?.ClientId, bookingData?.PractitionerId]);

  const handleFillOutFormClick = () => {
    if (mandatoryFormUrl) {
      window.open(mandatoryFormUrl, '_blank');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto_auto_auto]">
      <h2 className="text-center lg:text-left leading-[90%] text-[40px] lg:text-[48px] lg:leading-[90%] very-vogue-text mb-5 lg:mb-6 lg:pr-8">
        We&apos;re so Glad to <i>Have You</i> at Sol Health,{' '}
        {bookingData?.ClientName}!
      </h2>
      <div className="lg:row-span-4 mb-5 lg:mb-0">
        <div className="flex flex-col rounded-[8px] border border-[#7B4720] px-4 lg:px-6 py-6 gap-2 lg:gap-4">
          <SessionInfo
            therapistName={bookingData?.PractitionerName}
            startDate={bookingData?.StartDateIso}
            endDate={bookingData?.EndDateIso}
            therapistImageLink={currentTherapist?.therapist?.image_link}
          />
          <VideoPlayer
            videoUrl={currentTherapist?.therapist?.greetings_video_link}
          />
        </div>
      </div>
      <div className="lg:pr-8">
        <h3 className="leading-[29px] text-[32px] very-vogue-text mb-3">
          How to prepare for your first session
        </h3>
        <ol className="flex flex-col gap-3 list-decimal list-inside font-light text-[16px] tracking-[-0.02em]">
          <li>
            Fill out the Mandatory New Client Form below to complete your
            account setup.
          </li>
          <li>
            Once you submit the form, your account will be activated on our
            telehealth portal.
          </li>
          <li>We also sent you your appointment confirmation to your email.</li>
        </ol>
      </div>
      <div className="lg:col-span-2 flex justify-center mt-6 lg:mt-[51px]">
        <Button
          withArrow
          onClick={() => void handleFillOutFormClick()}
          loading={mandatoryFormLoading}
          className="text-[14px] lg:text-[16px] font-normal tracking-[-0.02em] px-6 py-3 rounded-4xl h-12 w-full lg:w-[340px]"
        >
          Fill out Mandatory New Client Form
        </Button>
      </div>
      <div className="lg:col-span-2 flex flex-col lg:flex-row mt-6 lg:mt-20">
        <div className="flex flex-col gap-3 items-center justify-center lg:flex-row lg:flex-1 lg:pl-10">
          <h4 className="text-2xl very-vogue-text">
            Have any questions in mind?
          </h4>
          <Link
            href="https://www.solhealth.co/contact-us"
            rel="noopener noreferrer"
            target="_blank"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex items-center justify-center mt-6 lg:mt-0 lg:ml-auto">
          <Link
            href="https://www.instagram.com/hisolhealth/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <InstagramIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};
