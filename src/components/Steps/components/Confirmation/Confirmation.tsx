import { Link } from '@/components/ui';
import InstagramIcon from '@/assets/icons/instagram-icon.svg';
import { useTherapistContext } from '@/hooks/useTherapistContext';
import { SessionInfo } from './components';

export const Confirmation = () => {
  const { currentTherapist, bookingData } = useTherapistContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto_auto_auto]">
      <h2 className="text-center lg:text-left leading-[90%] text-[40px] lg:text-[48px] lg:leading-[90%] font-normal font-['Very_Vogue_Text'] mb-5 lg:mb-6 lg:pr-8">
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
          <li>Please check your email for your appointment confirmation.</li>
          <li>You will soon receive a Mandatory Client Form via email.</li>
          <li>Once you submit this form, your account will be activated.</li>
        </ol>
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
    </div>
  );
};
