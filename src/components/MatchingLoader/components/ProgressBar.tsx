import { motion } from 'framer-motion';

interface IProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: IProps) => {
  return (
    <div
      className="flex gap-1"
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
    >
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className="h-[2px] w-[64px] lg:w-[124px] bg-[var(--brand-coffee)] rounded-[8px] overflow-hidden"
        >
          <motion.div
            className="h-full bg-[var(--brand-brown)] origin-left"
            initial={false}
            animate={{ scaleX: index <= currentStep ? 1 : 0 }}
            transition={{ duration: 0.7, ease: 'linear', delay: 0.5 }}
            style={{ scaleX: 0 }}
          />
        </div>
      ))}
    </div>
  );
};
