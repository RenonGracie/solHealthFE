import { format } from 'date-fns';

export interface ITimeSlotProps {
  slot: Date;
  isSelected: boolean;
  onSelect: (slot: Date) => void;
}

export const TimeSlot = ({ slot, isSelected, onSelect }: ITimeSlotProps) => {
  const id = slot.toISOString();

  return (
    <label
      htmlFor={id}
      className="w-full font-normal text-sm cursor-pointer flex items-center justify-center tracking-[-0.02em]"
    >
      <input
        id={id}
        type="radio"
        name="timeSlot"
        value={slot.toISOString()}
        className="hidden peer"
        checked={isSelected}
        onChange={() => {
          onSelect(slot);
        }}
      />
      <div className="w-full text-center p-2.5 rounded-lg border border-[#7B4720] peer-checked:bg-[#FFE279]">
        {format(slot, 'h:mmaaa')}
      </div>
    </label>
  );
};
