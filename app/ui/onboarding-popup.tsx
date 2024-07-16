import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RahaLogo from '@/app/ui/raha-logo';

interface OnboardingPopupProps {
  isOpen: boolean;
  onClose: () => Promise<void>;
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const OnboardingPopup: React.FC<OnboardingPopupProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const PopupContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-[#FBF3D9] p-12 rounded-lg shadow-xl max-w-[650px] w-full relative z-10 flex flex-col"
      style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
    >
      {children}
    </motion.div>
  );

  const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
    <button
      onClick={onClick}
      className="text-lg font-semibold transition-all text-[#5D552F] hover:underline focus:outline-none focus:ring-2 focus:ring-[#8E9B90] focus:ring-opacity-50"
    >
      {children}
    </button>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <PopupContent key="step1">
            <div className="flex items-center mb-8">
              <RahaLogo colorScheme="balanced" showIcon={true} />
            </div>
            <h2 className="text-3xl font-semibold mb-6 text-[#5D552F]">Welcome to Raha</h2>
            <p className="text-[#5D552F] mb-8 text-lg leading-relaxed font-normal">
              Your personal AI therapist, here to guide you on your journey of self-discovery.
            </p>
            <div className="flex justify-end mt-auto">
              <Button onClick={nextStep}>Begin Your Journey {'>'}</Button>
            </div>
          </PopupContent>
        )}

        {step === 2 && (
          <PopupContent key="step2">
            <div className="flex items-center mb-8">
              <RahaLogo colorScheme="balanced" showIcon={true} />
            </div>
            <h2 className="text-3xl font-semibold mb-6 text-[#5D552F]">How Raha Works</h2>
            <p className="text-[#5D552F] mb-8 text-lg leading-relaxed font-normal">
              Raha uses advanced AI to provide personalized therapy sessions, helping you understand yourself better and navigate life's challenges with greater clarity.
            </p>
            <div className="flex justify-between mt-auto">
              <Button onClick={prevStep}>{'<'} Back</Button>
              <Button onClick={nextStep}>Next {'>'}</Button>
            </div>
          </PopupContent>
        )}

        {step === 3 && (
          <PopupContent key="step3">
            <div className="flex items-center mb-8">
              <RahaLogo colorScheme="balanced" showIcon={true} />
            </div>
            <h2 className="text-3xl font-semibold mb-6 text-[#5D552F]">Ready to Start?</h2>
            <p className="text-[#5D552F] mb-8 text-lg leading-relaxed font-normal">
              Your journey to self-discovery begins now. Raha is here to support you every step of the way, providing insights and a safe space for reflection and growth.
            </p>
            <div className="flex justify-between mt-auto">
              <Button onClick={prevStep}>{'<'} Back</Button>
              <Button onClick={onClose}>Let's Begin {'>'}</Button>
            </div>
          </PopupContent>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingPopup;