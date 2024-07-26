import React, { useState, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';

interface OnboardingPopupProps {
  isOpen: boolean;
  onClose: () => Promise<void>;
}

export default function OnboardingPopup({
  isOpen,
  onClose,
}: OnboardingPopupProps) {
  const [step, setStep] = useState<number>(1);
  const [countryCode, setCountryCode] = useState<string>('+1');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const nextStep = useCallback(() => setStep((s) => s + 1), []);
  const prevStep = useCallback(() => setStep((s) => Math.max(1, s - 1)), []);

  const renderStep = useMemo(() => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return (
          <Step4
            prevStep={prevStep}
            onClose={onClose}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        );
      default:
        return null;
    }
  }, [step, countryCode, phoneNumber, nextStep, prevStep, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <AnimatePresence mode="wait">{renderStep}</AnimatePresence>
    </div>
  );
}
