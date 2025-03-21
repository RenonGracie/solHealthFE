import { DayPicker, DayPickerProps, UI } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { CALENDAR_WEEK_DAYS } from '@/constants';

export const Calendar = (props: DayPickerProps) => {
  return (
    <DayPicker
      mode="single"
      weekStartsOn={1}
      formatters={{
        formatWeekdayName: (weekday) => {
          const days = CALENDAR_WEEK_DAYS;
          return days[weekday.getDay()];
        },
      }}
      classNames={{
        caption_label: 'font-["Very_Vogue_Text"] font-normal text-[20px]',
        [UI.NextMonthButton]:
          '[&>svg]:!fill-[#7E7E7E] hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none [&.disabled_svg]:!fill-[#D8D8D8]',
        [UI.PreviousMonthButton]:
          '[&>svg]:!fill-[#7E7E7E] hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none [&.disabled_svg]:!fill-[#D8D8D8]',
        today: 'text-[#363943] rounded-sm outline outline-1 outline-[#7B4720]',
        selected:
          'text-[#363943] rounded-sm outline outline-1 outline-[#7B4720] bg-[#FDDB6D]',
        disabled: 'opacity-30',
        [UI.Day]: 'font-normal text-sm tracking-[-0.02em]',
        [UI.DayButton]:
          'hover:cursor-pointer w-[36px] h-[35px] lg:w-[42px] lg:h-[41px]',
        [UI.Weekday]: 'font-normal text-base opacity-70 tracking-[-0.02em]',
      }}
      {...props}
    />
  );
};
