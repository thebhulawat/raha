'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import ScheduleModal from '@/components/custom/home/schedule';
import { abril } from '@/app/fonts';
import { useRouter } from 'next/navigation';
import CallNowModal from '@/components/custom/home/call-now';
import { useUserStore, fetchUserDetails } from '@/lib/user-store';
import { useAuth } from '@clerk/nextjs';
import HomePageSkeleton from '@/components/custom/home/skeleton';

export default function Page() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isFreeCallModalOpen, setIsFreeCallModalOpen] = useState(false);
  const router = useRouter();
  const { userDetails } = useUserStore();
  const { userId, getToken } = useAuth();

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId, getToken);
    }
  }, [userId]);

  if (!userDetails) {
    return <HomePageSkeleton />;
  }

  const quoteVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-8 min-h-screen bg-[#FBF3D9]">
      <motion.h1
        className={`${abril.className} text-6xl font-bold text-center mb-12 text-[#5D552F]`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Know yourself, {userDetails?.firstName}!
      </motion.h1>

      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <motion.button
          className="bg-[#5D552F] text-[#FBF3D9] px-8 py-4 rounded-full shadow-lg hover:opacity-90 transition duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFreeCallModalOpen(true)}
        >
          <Phone className="mr-2" size={20} />
          Try a free call now
        </motion.button>
        <motion.button
          className="bg-[#EBE5D3] text-[#5D552F] px-8 py-4 rounded-full shadow-lg hover:bg-[#E6E0D1] transition duration-300 flex items-center justify-center border-2 border-[#5D552F]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsScheduleModalOpen(true)}
        >
          <Calendar className="mr-2" size={20} />
          Schedule Regular Calls
        </motion.button>
      </div>

      <motion.p
        className="text-center text-sm mb-32 text-[#5D552F] font-medium italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Enjoy three complimentary 30-minute calls to start your journey
      </motion.p>

      <motion.div
        className="bg-[#F7F3E8] rounded-2xl shadow-md p-4 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-4">
          <motion.div
            variants={quoteVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-[#5D552F] text-sm italic text-center">
              "Knowing yourself is the beginning of all wisdom."
            </p>
            <p className="text-[#5D552F] text-xs text-right mt-1 opacity-75">
              - Aristotle
            </p>
          </motion.div>
          <motion.div
            variants={quoteVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-[#5D552F] text-sm italic text-center">
              "The journey into self-love and self-acceptance must begin with
              self-examination."
            </p>
            <p className="text-[#5D552F] text-xs text-right mt-1 opacity-75">
              - Brené Brown
            </p>
          </motion.div>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <motion.button
            className="bg-transparent text-[#4A6741] px-4 py-2 rounded-full hover:bg-[#EBE5D3] transition duration-300 text-sm flex items-center border border-[#4A6741]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/call-insights')}
          >
            <Lightbulb className="mr-2" size={16} />
            View Call Insights
          </motion.button>
        </div>
      </motion.div>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
      <CallNowModal
        isOpen={isFreeCallModalOpen}
        onClose={() => setIsFreeCallModalOpen(false)}
      />
    </div>
  );
}
