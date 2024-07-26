'use client';
import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { lusitana } from '@/app/fonts';
import { useAuth } from '@clerk/nextjs';
import { call } from '@/api/calls';

interface CallNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallNowModal({ isOpen, onClose }: CallNowModalProps) {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 100], [1, 0]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { getToken } = useAuth();

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  const handleCallNow = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = await getToken();
      if (!token) throw new Error('No authentication token available');
      
      await call(token);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
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
            className={`${lusitana.className} bg-[#FBF3D9] rounded-3xl p-8 w-full max-w-md shadow-lg relative`}
          >
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#5D552F] opacity-50 rounded-full" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-6 mt-4"
            >
              <p className="text-xl text-[#5D552F] leading-relaxed">
                Your call from Raha is on its way! 📞✨🎉
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCallNow}
              disabled={isLoading}
              className="mt-8 w-full px-6 py-3 rounded-full bg-[#F7F3E8] text-[#5D552F] hover:bg-[#EBE5D3] transition-colors text-lg font-semibold shadow-md"
            >
              {isLoading ? 'Calling...' : 'Call now 😊'}
            </motion.button>

            {error && (
              <p className="mt-4 text-red-500 text-center">{error}</p>
            )}
            {success && (
              <p className="mt-4 text-green-500 text-center">Your call is on its way!</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}