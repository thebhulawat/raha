'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import ScheduleModal from '@/components/custom/home/schedule';
import { abril } from '@/app/fonts';
import { useRouter } from 'next/navigation';
import CallNowModal from '@/components/custom/home/call-now';
import { useUserStore, fetchUserDetails } from '@/lib/userStore';
import { useAuth } from '@clerk/nextjs';
import HomePageSkeleton from '@/components/custom/home/skeleton';

export default function Page() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isFreeCallModalOpen, setIsFreeCallModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userDetails, setUserDetails } = useUserStore();
  const { userId, getToken } = useAuth();

  useEffect(() => {
    async function loadUserDetails() {
      if (userId) {
        setLoading(true);
        try {
          const details = await fetchUserDetails(userId, getToken);
          setUserDetails(details);
        } catch (error) {
          console.error('Failed to fetch user details:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    loadUserDetails();
  }, [userId, getToken, setUserDetails]);

  if (loading) {
    return <HomePageSkeleton />;
  }

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
        className="text-center text-sm mb-24 text-[#5D552F] font-medium italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Enjoy three complimentary 30-minute calls to start your journey
      </motion.p>

      <motion.div
        className="bg-[#F7F3E8] rounded-2xl shadow-lg p-6 max-w-3xl mx-auto mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-[#5D552F]">
          Upcoming Calls
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#EBE5D3] p-3 rounded-lg">
            <div className="flex items-center">
              <Calendar className="mr-3 text-[#5D552F]" size={20} />
              <div>
                <p className="font-xs text-[#5D552F] text-sm">
                  No upcoming calls
                </p>
                <p className="text-xs text-[#5D552F] opacity-75">
                  Schedule your next call
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center">
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

      {/* <motion.div
        className="flex items-center justify-center text-[#5D552F] text-sm opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Zap size={14} className="mr-1 text-yellow-500" />
        <span>0 day streak</span>
        <span className="ml-1 text-xs">(Keep it up!)</span>
      </motion.div> */}
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
