import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SetupCallScheduleProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: {frequency: string, time: string; timezone: string}) => void;
}

const SetupCallSchedule : React.FC<SetupCallScheduleProps> = ({ isOpen, onClose, onSave }) => {
  const [frequency, setFrequency] = useState('weekly');
  const [time, setTime] = useState('09:00');
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    // Attempt to get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);
  }, []);

  const handleSave = () => {
    onSave({ frequency, time, timezone });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-[#F6F3E8] p-6 rounded-lg shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#716A49]">Setup Call Schedule</h2>
        <div className="mb-4">
          <label className="block text-[#716A49] mb-2" htmlFor="frequency">
            Frequency
          </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full p-2 border border-[#E6E0D0] rounded bg-white text-[#716A49]"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[#716A49] mb-2" htmlFor="time">
            Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-[#E6E0D0] rounded bg-white text-[#716A49]"
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#716A49] mb-2" htmlFor="timezone">
            Timezone
          </label>
          <input
            type="text"
            id="timezone"
            value={timezone}
            readOnly
            className="w-full p-2 border border-[#E6E0D0] rounded bg-white text-[#716A49]"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 text-[#716A49] hover:bg-[#E6E0D0] rounded transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#716A49] text-white rounded hover:bg-[#5D5641] transition duration-300 shadow-md"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SetupCallSchedule;