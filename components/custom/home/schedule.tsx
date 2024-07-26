import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { lusitana } from '@/app/fonts';
import { createOrUpdateSchedule } from '@/api/schedules';
import { useAuth } from '@clerk/nextjs';
import moment from 'moment-timezone';
import { useUserStore } from '@/lib/userStore';
import usePaddle from '@/hooks/usePaddle';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  const [scheduleType, setScheduleType] = useState<'daily' | 'custom'>('daily');
  const [time, setTime] = useState('09:00');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const { getToken } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);
  const timeDropdownRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const { userDetails } = useUserStore();
  const paddle = usePaddle();

  const openCheckout = () => {
    paddle?.Checkout.open({
      items: [
        {
          priceId: 'pri_01j3mda0sb1cmfyx8f70vtq2qd', // you can find it in the product catalog
          quantity: 1,
        },
      ],
      customer: {
        email: userDetails?.email || '',
      },
      customData: {
        userEmail: userDetails?.email || '',
      },
      settings: {
        allowLogout: false,
        successUrl: process.env.NEXT_PUBLIC_PADDLE_REDIRECT_URL,
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
      if (
        timeDropdownRef.current &&
        !timeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTimeDropdownOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleDayToggle = (day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    setFeedbackMessage(null);

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const timezone = moment.tz.guess();
      const scheduleData = {
        time,
        scheduleFrequency: scheduleType === 'daily' ? 'daily' : 'weekly',
        scheduleDays: daysOfWeek.map((day) =>
          scheduleType === 'daily' ? true : selectedDays.includes(day)
        ),
        timezone,
      };

      await createOrUpdateSchedule(scheduleData, token);
      setFeedbackMessage({
        type: 'success',
        message: 'Schedule saved successfully!',
      });

      // Clear feedback message after 3 seconds
      setTimeout(() => setFeedbackMessage(null), 3000);
    } catch (err) {
      setFeedbackMessage({
        type: 'error',
        message: 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`${lusitana.className} bg-[#FBF3D9] rounded-2xl p-8 w-full max-w-md relative shadow-2xl`}
          >
            {/* Briefcase bar */}
            <div
              className="absolute top-0 left-0 right-0 h-6 rounded-t-2xl cursor-pointer flex items-center justify-center"
              onClick={onClose}
            >
              <div className="w-16 h-1 bg-[#5D552F] rounded-full" />
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-[#5D552F] mb-6">
                {userDetails?.subscriptionStatus == 'free'
                  ? 'Upgrade Subscription'
                  : 'Schedule Calls'}
              </h2>

              {userDetails?.subscriptionStatus === 'free' ? (
                <motion.div
                  key="subscription-required"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center text-[#5D552F] space-y-6"
                >
                  <p className=" text-xl text-left">
                    In order to setup a daily/ weekly schedule of calls from
                    Raha, please upgrade to pro! <br /> <br />
                    Pro gives you access to:
                  </p>
                  <ul className="list-disc pl-6 font-semibold text-base text-left">
                    <li>Schedule Raha to call you at designated times</li>
                    <li>30 calls/ month</li>
                    <li>Up to 30 mins/ call</li>
                    <li>Make a call to Raha anytime from your dialer</li>
                  </ul>
                  <button
                    onClick={openCheckout}
                    className="px-6 py-3 rounded-full bg-[#5D552F] text-[#FBF3D9] hover:bg-opacity-90 transition-colors text-lg"
                  >
                    Upgrade to Raha Pro
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex space-x-4 bg-[#EBE5D3] p-1 rounded-full">
                    {['daily', 'custom'].map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          setScheduleType(type as 'daily' | 'custom')
                        }
                        className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          scheduleType === type
                            ? 'bg-[#F7F3E8] text-[#5D552F] shadow-md'
                            : 'text-[#5D552F] hover:bg-[#F7F3E8] hover:shadow-sm'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div className="relative" ref={timeDropdownRef}>
                    <div
                      className="w-full p-2 pl-10 rounded-lg bg-[#F7F3E8] border border-[#5D552F] text-[#5D552F] text-sm cursor-pointer flex justify-between items-center"
                      onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                    >
                      <Clock
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5D552F]"
                      />
                      <span>{time}</span>
                      {isTimeDropdownOpen ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                    {isTimeDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-[#F7F3E8] border border-[#5D552F] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {timeOptions.map((option) => (
                          <div
                            key={option}
                            className="px-4 py-2 cursor-pointer hover:bg-[#EBE5D3] text-[#5D552F]"
                            onClick={() => {
                              setTime(option);
                              setIsTimeDropdownOpen(false);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {scheduleType === 'custom' && (
                      <motion.div
                        key="custom"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 overflow-hidden"
                      >
                        <p className="text-[#5D552F] font-medium text-sm">
                          Select days for weekly calls:
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {daysOfWeek.map((day) => (
                            <button
                              key={day}
                              onClick={() => handleDayToggle(day)}
                              className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                                selectedDays.includes(day)
                                  ? 'bg-[#F7F3E8] text-[#5D552F] shadow-md border border-[#5D552F]'
                                  : 'bg-[#EBE5D3] text-[#5D552F] hover:bg-[#F7F3E8] hover:shadow-sm'
                              }`}
                            >
                              {day.charAt(0)}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-6">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="w-full px-4 py-2 rounded-lg bg-[#5D552F] text-[#FBF3D9] hover:bg-opacity-90 transition-colors text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Saving...' : 'Save Schedule'}
                    </button>
                  </div>

                  {feedbackMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex items-center justify-center p-2 rounded-lg ${
                        feedbackMessage.type === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {feedbackMessage.type === 'success' && (
                        <Check size={16} className="mr-2" />
                      )}
                      <p className="text-sm font-medium">
                        {feedbackMessage.message}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
