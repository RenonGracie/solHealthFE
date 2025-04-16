import { motion } from 'framer-motion';

const DOT_COUNT = 3;

export const LoadingDots = () => {
  return (
    <div className="inline-flex ml-0.5" role="status" aria-label="Loading">
      {Array.from({ length: DOT_COUNT }).map((_, index) => (
        <motion.span
          key={index}
          className="inline-block w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full mr-[3px] bg-[var(--brand-brown)]"
          animate={{ y: [0, -5, 0, 0] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            times: [0, 0.4, 0.8, 1],
            delay: index * 0.2,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};
