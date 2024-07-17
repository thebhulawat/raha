import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ArrowLeft } from 'lucide-react';
import { lusitana } from '@/app/ui/fonts';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'schedule' | 'payment'>('schedule');
  const [scheduleType, setScheduleType] = useState<'daily' | 'custom'>('daily');
  const [time, setTime] = useState('09:00');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDayToggle = (day: string) => {
    setSelectedDays(prevDays => 
      prevDays.includes(day) 
        ? prevDays.filter(d => d !== day)
        : [...prevDays, day]
    );
  };

  const handleSave = () => {
    const schedule = {
      type: scheduleType,
      time,
      days: scheduleType === 'custom' ? selectedDays : ['Every day']
    };
    console.log('Saving schedule:', schedule);
    setStep('payment');
  };

  const handlePayment = () => {
    console.log('Processing payment...');
    onClose();
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(
          <option key={timeString} value={timeString}>
            {timeString}
          </option>
        );
      }
    }
    return options;
  };

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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${lusitana.className} bg-[#FBF3D9] rounded-2xl p-8 w-full max-w-2xl`}
          >
            <div className="flex justify-between items-center mb-8">
              {step === 'payment' && (
                <button onClick={() => setStep('schedule')} className="text-[#5D552F] hover:text-opacity-70 transition-colors">
                  <ArrowLeft size={24} />
                </button>
              )}
              <h2 className="text-3xl font-semibold text-[#5D552F]">
                {step === 'schedule' ? 'Schedule Calls' : 'Payment Details'}
              </h2>
              <button onClick={onClose} className="text-[#5D552F] hover:text-opacity-70 transition-colors">
                <X size={24} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {step === 'schedule' ? (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setScheduleType('daily')}
                      className={`flex-1 px-6 py-3 rounded-full text-lg transition-colors ${
                        scheduleType === 'daily' 
                          ? 'bg-[#F7F3E8] text-[#5D552F] shadow-inner' 
                          : 'bg-[#EBE5D3] text-[#5D552F] hover:bg-[#F7F3E8]'
                      }`}
                    >
                      Daily
                    </button>
                    <button
                      onClick={() => setScheduleType('custom')}
                      className={`flex-1 px-6 py-3 rounded-full text-lg transition-colors ${
                        scheduleType === 'custom' 
                          ? 'bg-[#F7F3E8] text-[#5D552F] shadow-inner' 
                          : 'bg-[#EBE5D3] text-[#5D552F] hover:bg-[#F7F3E8]'
                      }`}
                    >
                      Custom
                    </button>
                  </div>

                  <div className="relative">
                    <Clock 
                      size={24} 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5D552F] cursor-pointer" 
                      onClick={() => document.getElementById('time-select')?.focus()}
                    />
                    <select
                      id="time-select"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-3 pl-12 rounded-full bg-[#F7F3E8] border-2 border-[#5D552F] text-[#5D552F] text-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5D552F]"
                      style={{ maxHeight: '200px', overflowY: 'auto' }}
                    >
                      {generateTimeOptions()}
                    </select>
                  </div>

                  {scheduleType === 'custom' && (
                    <div className="space-y-4">
                      <p className="text-[#5D552F] font-medium text-lg">Select days for weekly calls:</p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        {daysOfWeek.map((day) => (
                          <button
                            key={day}
                            onClick={() => handleDayToggle(day)}
                            className={`w-14 h-14 rounded-full text-lg transition-colors ${
                              selectedDays.includes(day)
                                ? 'bg-[#F7F3E8] text-[#5D552F] shadow-inner'
                                : 'bg-[#EBE5D3] text-[#5D552F] hover:bg-[#F7F3E8]'
                            }`}
                          >
                            {day.charAt(0)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-4">
                    <p className="text-sm text-[#5D552F] italic">We will charge you only after the first 3 calls.</p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-full bg-[#EBE5D3] text-[#5D552F] hover:bg-[#F7F3E8] transition-colors text-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 rounded-full bg-[#5D552F] text-[#FBF3D9] hover:bg-opacity-90 transition-colors text-lg"
                      >
                        Pay and Save
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <p className="text-[#5D552F]">Enter your payment details:</p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full p-3 rounded-full bg-[#F7F3E8] border-2 border-[#5D552F] text-[#5D552F]"
                    />
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-1/2 p-3 rounded-full bg-[#F7F3E8] border-2 border-[#5D552F] text-[#5D552F]"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-1/2 p-3 rounded-full bg-[#F7F3E8] border-2 border-[#5D552F] text-[#5D552F]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handlePayment}
                    className="w-full px-6 py-3 rounded-full bg-[#5D552F] text-[#FBF3D9] hover:bg-opacity-90 transition-colors text-lg"
                  >
                    Complete Payment
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleModal;