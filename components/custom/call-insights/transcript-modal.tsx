import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { lusitana } from '@/app/fonts';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Message {
  speaker: string;
  content: string;
}

interface TranscriptPopupProps {
  isOpen: boolean;
  onClose: () => void;
  transcript: Message[];
}

const TranscriptPopup: React.FC<TranscriptPopupProps> = ({
  isOpen,
  onClose,
  transcript,
}) => {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 100], [1, 0]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  const handleCopy = () => {
    const fullTranscript = transcript
      .map((msg) => `${msg.speaker}: ${msg.content}`)
      .join('\n\n');
    navigator.clipboard.writeText(fullTranscript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const messageVariants = {
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
            className={`${lusitana.className} bg-[#FBF3D9] rounded-3xl p-8 w-full max-w-3xl h-[80vh] shadow-lg relative flex flex-col`}
          >
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#5D552F] opacity-50 rounded-full" />

            <div className="flex justify-between items-center mb-6 mt-2">
              <h2 className="text-3xl font-bold text-[#5D552F]">Transcript</h2>
              <button
                onClick={handleCopy}
                className="p-2 text-[#5D552F] hover:bg-[#F7F3E8] rounded-full transition-colors duration-200"
                title="Copy transcript"
              >
                {copied ? (
                  <CheckIcon className="w-6 h-6" />
                ) : (
                  <ClipboardIcon className="w-6 h-6" />
                )}
              </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-4">
              {transcript.map((message, index) => (
                <motion.div
                  key={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  className="bg-[#F7F3E8] p-4 rounded-xl shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-[#5D552F] mb-2">
                    {message.speaker}
                  </h3>
                  <p className="text-[#5D552F] text-opacity-90">
                    {message.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TranscriptPopup;
