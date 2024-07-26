'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import usePaddle from '@/hooks/usePaddle';
import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const paddle = usePaddle();
  const { user } = useUser();

  const openCheckout = () => {
    paddle?.Checkout.open({
      items: [
        {
          priceId: 'pri_01j3mda0sb1cmfyx8f70vtq2qd', // you can find it in the product catalog
          quantity: 1,
        },
      ],
      customer: {
        email: user?.emailAddresses[0]?.emailAddress || '', // email of your current logged in user
      },
      customData: {
        userEmail: user?.emailAddresses[0]?.emailAddress || '',
      },
    });
  };

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
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <>
      <header className="p-4 flex justify-end items-center relative">
        <div className="absolute left-8 right-8 bottom-0 h-px bg-gray-200"></div>
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
                <motion.button
                  onClick={openCheckout}
                  className="block w-full text-left px-4 py-2 text-sm text-[#716A49] hover:bg-[#E6E0D0] transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  Subscription
                </motion.button>
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
      </header>
    </>
  );
}