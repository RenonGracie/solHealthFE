import * as React from 'react';
import { DayPicker, DayPickerProps, UI } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { CALENDAR_WEEK_DAYS } from '@/constants';
import NextIcon from '@/assets/icons/next-icon.svg';

const NextMonthButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => (
  <button {...props}>
    <NextIcon />
  </button>
);

const PreviousMonthButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => (
  <button {...props}>
    <NextIcon className="rotate-180" />
  </button>
);

export const Calendar = (props: DayPickerProps) => {
  return (
    <DayPicker
      mode="single"
      weekStartsOn={1}
      components={{
        NextMonthButton,
        PreviousMonthButton,
      }}
      formatters={{
        formatWeekdayName: (weekday) => {
          const days = CALENDAR_WEEK_DAYS;
          return days[weekday.getDay()];
        },
      }}
      classNames={{
        caption_label: 'font-["Very_Vogue_Text"] font-normal text-[20px]',
        [UI.NextMonthButton]:
          '[&>svg]:!fill-[var(--gray-80)] hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none [&.disabled_svg]:!fill-[var(--gray-60)]',
        [UI.PreviousMonthButton]:
          '[&>svg]:!fill-[var(--gray-80)] hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none [&.disabled_svg]:!fill-[var(--gray-60)]',
        today:
          'text-[var(--brand-black)] rounded-sm outline outline-1 outline-[var(--brand-brown)]',
        selected:
          'text-[var(--brand-black)] rounded-sm outline outline-1 outline-[var(--brand-brown)] bg-[var(--brand-yellow)]',
        disabled: 'opacity-30 pointer-events-none',
        [UI.Day]: 'font-normal text-sm tracking-[-0.02em]',
        [UI.DayButton]:
          'hover:cursor-pointer hover:bg-[var(--brand-coffee)] hover:rounded-sm hover:outline hover:outline-1 hover:outline-[var(--brand-brown)] w-[36px] h-[35px] lg:w-[42px] lg:h-[41px]',
        [UI.Weekday]: 'font-normal text-base opacity-70 tracking-[-0.02em]',
      }}
      {...props}
    />
  );
};
