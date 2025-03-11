import * as React from 'react';

import { Button, Link, Modal } from '@/components/ui';
import ArrowRightIcon from '@/assets/icons/arrow-right-icon.svg';
import InstagramIcon from '@/assets/icons/instagram-icon.svg';
import { useTherapistContext } from '@/hooks/useTherapistContext';
import { SessionInfo } from './components';

export const Confirmation = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { currentTherapist, bookingData } = useTherapistContext();

  const handleOpenEmailApp = () => {
    setIsModalOpen(false);
    window.open('mailto:');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto_auto_auto]">
      <h2 className="text-center lg:text-left leading-[36px] text-[40px] lg:text-[48px] lg:leading-[43px] font-normal font-['Very_Vogue_Text'] mb-5 lg:mb-6 lg:pr-8">
        We&apos;re so Glad to <i>Have You</i> at Sol Health,{' '}
        {bookingData?.ClientName}!
      </h2>
      <div className="lg:row-span-4 mb-5 lg:mb-0">
        <SessionInfo
          bookingData={bookingData}
          therapistImageLink={currentTherapist?.therapist?.image_link}
          therapistVideoLink={currentTherapist?.therapist?.greetings_video_link}
        />
      </div>
      <div className="lg:pr-8">
        <h3 className="leading-[29px] text-[32px] font-normal font-['Very_Vogue_Text'] mb-3">
          How to prepare for the first session
        </h3>
        <ol className="flex flex-col gap-3 list-decimal list-inside font-light text-[16px] tracking-[-0.02em]">
          <li>
            Please check your email so that to fill out Mandatory client form.
          </li>
          <li>
            Once you submitted the Mandatory New Client Form your account will
            be activated.
          </li>
          <li>
            In 24h after account setting up we will send you an appointment
            confirmation on your email.
          </li>
        </ol>
      </div>
      <div className="lg:col-span-2 flex justify-center mt-6 lg:mt-[51px]">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="text-[16px] font-normal tracking-[-0.02em] px-6 py-3 rounded-4xl w-full lg:w-auto"
        >
          Finish Setting up Account <ArrowRightIcon />
        </Button>
      </div>
      <div className="lg:col-span-2 flex flex-col lg:flex-row mt-6 lg:mt-20">
        <div className="flex flex-col gap-3 items-center justify-center lg:flex-row lg:flex-1 lg:pl-10">
          <h4 className="text-2xl font-['Very_Vogue_Text']">
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleOpenEmailApp}
        title="Email Application Opening"
        description="Your default email application is about to open. Please check your inbox for the Mandatory New Client Form that needs to be completed to activate your account."
        confirmButtonTitle="Proceed"
      />
    </div>
  );
};
