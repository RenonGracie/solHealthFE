import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import LogoIcon from '@/assets/icons/logo-icon.svg';
import { LoadingDots, ProgressBar } from './components';
import { loadingStates } from './loadingStates';

const ANIMATION_DURATION = 4_000;

export const MatchingLoader = () => {
  const [currentStateIndex, setCurrentStateIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentStateIndex >= loadingStates.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentStateIndex((prev) => prev + 1);
    }, ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [currentStateIndex]);

  const state = loadingStates[currentStateIndex];

  return (
    <div className="relative min-h-screen min-w-screen">
      <div className="absolute top-[40px] left-0 right-0 flex items-center justify-center gap-2 lg:top-[32px] lg:left-[32px] lg:justify-start">
        <h3 className="text-[22px] lg:text-[28px] font-medium font-['Comfortaa']">
          Sol Health
        </h3>
        <LogoIcon />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStateIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="flex flex-col items-center very-vogue-text leading-[90%] text-[var(--brand-brown)] text-[40px] lg:text-[80px]"
          >
            {state.lines.map((line, lineIndex) => (
              <div
                key={lineIndex}
                className="flex items-center justify-center font-light leading-[90%] space-x-2 lg:space-x-4"
              >
                {line.map(({ text, className, image, withDots }, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    {image?.position === 'before' && (
                      <img
                        src={image.src}
                        className={twMerge(
                          'h-9 w-9 lg:h-18 lg:w-18 object-contain',
                          image.className,
                        )}
                        aria-hidden="true"
                      />
                    )}
                    <span className={className}>
                      {text}
                      {withDots && <LoadingDots />}
                    </span>
                    {image?.position === 'after' && (
                      <img
                        src={image.src}
                        className={twMerge(
                          'h-9 w-9 lg:h-18 lg:w-18 object-contain',
                          image.className,
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute top-[70%] lg:top-[80%]"
        >
          <ProgressBar
            currentStep={currentStateIndex}
            totalSteps={loadingStates.length}
          />
        </motion.div>
      </div>
    </div>
  );
};
