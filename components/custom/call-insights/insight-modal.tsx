import React, { useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { lusitana } from '@/app/fonts';

interface InsightProps {
  title: string;
  description: string;
  emoji: string;
}

interface InsightsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  insights: InsightProps[];
}

const InsightsPopup: React.FC<InsightsPopupProps> = ({
  isOpen,
  onClose,
  insights,
}) => {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 100], [1, 0]);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  const insightVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const hoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={modalRef}
            style={{ y, opacity }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            className={`${lusitana.className} bg-[#FBF3D9] rounded-3xl p-8 w-full max-w-2xl shadow-lg relative`}
          >
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#5D552F] opacity-50 rounded-full" />

            <h2 className="text-3xl font-bold text-[#5D552F] mb-6 mt-2">
              Insights
            </h2>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 -mr-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  variants={insightVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  custom={index}
                  className="bg-[#F7F3E8] p-4 rounded-xl shadow-sm cursor-pointer"
                >
                  <motion.div variants={hoverVariants}>
                    <h3 className="text-xl font-semibold text-[#5D552F] mb-2 flex items-center">
                      <motion.span
                        className="mr-2 text-2xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: index * 0.1 + 0.3,
                          type: 'spring',
                          stiffness: 200,
                          damping: 10,
                        }}
                      >
                        {insight.emoji}
                      </motion.span>
                      {insight.title}
                    </h3>
                    <p className="text-[#5D552F] text-opacity-90">
                      {insight.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InsightsPopup;
