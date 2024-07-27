import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { lusitana } from '@/app/fonts';
import usePaddle from '@/hooks/usePaddle';
import { useUserStore } from '@/lib/user-store';

interface ProBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProBenefitsModal({
  isOpen,
  onClose,
}: ProBenefitsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const paddle = usePaddle();
  const { userDetails } = useUserStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const openCheckout = () => {
    paddle?.Checkout.open({
      items: [
        {
          priceId: 'pri_01j3mda0sb1cmfyx8f70vtq2qd',
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`${lusitana.className} bg-[#FBF3D9] rounded-2xl p-8 w-full max-w-md relative shadow-2xl`}
          >
            <div
              className="absolute top-0 left-0 right-0 h-6 rounded-t-2xl cursor-pointer flex items-center justify-center"
              onClick={onClose}
            >
              <div className="w-16 h-1 bg-[#5D552F] rounded-full" />
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-[#5D552F] mb-6">
                Upgrade to Raha Pro
              </h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center text-[#5D552F] space-y-6"
              >
                <p className="text-lg leading-relaxed">
                  Upgrade to Pro and unlock all of Raha's powerful features!
                </p>
                <div className="bg-[#EBE5D3] rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Pro gives you access to:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Schedule Raha to call you at designated times',
                      '30 calls / month',
                      'Up to 30 mins / call',
                      'Make a call to Raha anytime from your dialer',
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check
                          size={20}
                          className="mr-3 mt-1 flex-shrink-0 text-[#5D552F]"
                        />
                        <span className="text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={openCheckout}
                  className="px-6 py-3 rounded-full bg-[#5D552F] text-[#FBF3D9] hover:bg-opacity-90 transition-colors text-lg"
                >
                  Upgrade to Raha Pro
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
