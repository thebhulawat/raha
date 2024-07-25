'use client'
import React, { useState, useRef, useEffect } from 'react';
import { SignOutButton } from "@clerk/nextjs";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSetupSave = (scheduleData: Record<string, any>) => {
    // Here you would typically send this data to your API
    console.log('Schedule data:', scheduleData);
    // TODO: Implement API call to save the schedule
  };

  return (
    <>
      <header className="p-4 flex justify-end items-center relative">
        <div className="absolute left-8 right-8 bottom-0 h-px bg-gray-200"></div>
        <div className="relative z-10" ref={menuRef}>
          <button 
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E6E0D0]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open profile menu"
          >
            <FaUserCircle className="w-8 h-8 text-[#716A49] hover:text-[#5D5641]" />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-[#F6F3E8] rounded-md shadow-lg py-1 z-10"
              >
                <button 
                  onClick={() => {
                    setIsSetupOpen(true);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-[#716A49] hover:bg-[#E6E0D0]"
                >
                  Setup Call Schedule
                </button>
                <a href="#" className="block px-4 py-2 text-sm text-[#716A49] hover:bg-[#E6E0D0]">Subscription</a>
                <SignOutButton>
                  <button className="block w-full text-left px-4 py-2 text 771996nj
                  -sm text-[#716A49] hover:bg-[#E6E0D0]">
                    Sign Out
                  </button>
                </SignOutButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}