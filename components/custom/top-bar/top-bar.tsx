'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { SignOutButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useUserStore, fetchUserDetails } from '@/lib/user-store';
import ProBenefitsModal from '@/components/custom/pro-benefits/pro-benefits-modal';
import { useAuth } from '@clerk/nextjs';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const { userId, getToken } = useAuth();

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId, getToken).finally(() => setIsLoading(false));
    }
  }, [userId, getToken]);

  const { userDetails } = useUserStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <header className="p-4 flex justify-end items-center relative">
        <div className="absolute left-8 right-8 bottom-0 h-px bg-gray-200"></div>
        <div className="flex items-center space-x-4">
          {isLoading ? (
            <div className="flex items-center space-x-4">
              <div className="w-32 h-4 bg-[#ded4b8] rounded animate-pulse"></div>
              <div className="w-24 h-8 bg-[#ded4b8] rounded-full animate-pulse"></div>
            </div>
          ) : (
            <>
              {userDetails?.subscriptionStatus === 'free' && (
                <>
                  <span className="text-sm text-[#716A49]">
                    {userDetails.freeCallsLeft} free calls left
                  </span>
                  <button
                    onClick={() => setIsProModalOpen(true)}
                    className="px-4 py-2 bg-[#716A49] text-white rounded-full text-sm hover:bg-[#5D5641] transition-colors"
                  >
                    Upgrade to Pro
                  </button>
                </>
              )}
              {(userDetails?.subscriptionStatus === 'active' ||
                userDetails?.subscriptionStatus === 'trialing') && (
                <div className="bg-[#716A49] text-white px-3 py-1 rounded-full text-sm">
                  Raha Pro Active
                </div>
              )}
            </>
          )}
          <div className="relative z-10" ref={menuRef}>
            <motion.button
              className="focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open profile menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt="User profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-[#716A49] hover:text-[#5D5641]" />
              )}
            </motion.button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-2 w-48 bg-[#F6F3E8] rounded-lg shadow-lg py-1 z-10 overflow-hidden"
                >
                  <SignOutButton>
                    <motion.button
                      className="block w-full text-left px-4 py-2 text-sm text-[#716A49] hover:bg-[#E6E0D0] transition-colors duration-200"
                      whileHover={{ x: 5 }}
                    >
                      Sign Out
                    </motion.button>
                  </SignOutButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
      <ProBenefitsModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </>
  );
}
