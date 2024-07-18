import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import RahaLogo from '@/app/ui/raha-logo';

const countryCodes = [
  { code: '+1', country: 'US' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'IN' },
  // TODO: Add more country codes here
];

interface OnboardingPopupProps {
  isOpen: boolean;
  onClose: () => Promise<void>;
}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = React.memo(({ children, className = '', ...props }) => (
  <button
    className={`text-lg font-semibold transition-all text-[#5D552F] bg-[#E6D9B8] hover:bg-[#D9C9A3] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E9B90] focus:ring-opacity-50 ${
      props.disabled ? 'opacity-50 cursor-not-allowed' : ''
    } ${className}`}
    {...props}
  >
    {children}
  </button>
));

const ErrorMessage: React.FC<{ message: string }> = React.memo(({ message }) => (
  <p className="text-red-500 text-sm mt-1">{message}</p>
));

const SuccessMessage: React.FC<{ message: string }> = React.memo(({ message }) => (
  <p className="text-green-500 text-sm mt-1">{message}</p>
));

const PopupContent: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => (
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
));

const PhoneInputSection: React.FC<{
  countryCode: string;
  setCountryCode: (code: string) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  sendOtp: () => void;
  otpSent: boolean;
}> = React.memo(({ countryCode, setCountryCode, phoneNumber, setPhoneNumber, sendOtp, otpSent }) => (
  <div className="flex items-center mb-4">
    <div className="relative z-20">
      <Select value={countryCode} onValueChange={setCountryCode}>
        <SelectTrigger className="w-[100px] mr-2 bg-white">
          <SelectValue placeholder="Code" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {countryCodes.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.code} ({country.country})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <input
      type="tel"
      placeholder="(555) 123-4567"
      value={phoneNumber}
      onChange={(e) => {
        const input = e.target.value.replace(/\D/g, '');
        setPhoneNumber(input.slice(0, 10));
      }}
      className="flex-grow p-2 border border-[#8E9B90] rounded"
    />
    <Button onClick={sendOtp} className="ml-2 whitespace-nowrap">
      {otpSent ? 'Resend' : 'Send'} Code
    </Button>
  </div>
));


const ScreenshotImage: React.FC<{ src: string; rotate: number }> = React.memo(({ src, rotate }) => (
  <motion.img
    src={src}
    alt="App Insight"
    className="w-[400px] h-auto object-cover rounded-lg shadow-lg" 
    style={{ rotate: `${rotate}deg` }}
    whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  />
));

export default function Page ({ isOpen, onClose } : OnboardingPopupProps) {
  const [step, setStep] = useState<number>(1);
  const [countryCode, setCountryCode] = useState<string>('+1');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(90);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const nextStep = useCallback(() => setStep(s => s + 1), []);
  const prevStep = useCallback(() => setStep(s => Math.max(1, s - 1)), []);

  const isPhoneValid = useCallback((phone: string): boolean => {
    // TODO: Check for phone here
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const sendOtp = useCallback(() => {
    if (!isPhoneValid(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setOtpSent(true);
    setTimer(90);
    setError('');
    setSuccess('OTP sent successfully!');
    // TODO: Send otp 
  }, [phoneNumber, isPhoneValid]);

  const verifyOtp = useCallback(() => {
    if (otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }
    if (otp === '1234') {
      setOtpVerified(true);
      setError('');
      setSuccess('OTP verified successfully!');
    } else {
      setError('Incorrect OTP. Please try again.');
    }
  }, [otp]);

  const renderStep = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <PopupContent key="step1">
            <div className="flex items-center mb-8">
              <RahaLogo colorScheme="balanced" showIcon={true} />
            </div>
            <h2 className="text-3xl font-semibold mb-6 text-[#5D552F]">Hey Naman!</h2>
            <p className="text-[#5D552F] mb-4 text-lg leading-relaxed font-normal">
              I am Raha! I am here to help you discover yourself. I am very excited to be part of your journey! As Aristotle said, knowing yourself is the beginning of all wisdom ❤️
            </p>
            <div className="flex justify-end mt-auto">
              <Button onClick={nextStep}>Let's Begin {'>'}</Button>
            </div>
          </PopupContent>
        );
      case 2:
        return (
          <PopupContent key="step2">
            <div className="flex items-center mb-8">
              <RahaLogo colorScheme="balanced" showIcon={true} />
            </div>
            <h2 className="text-3xl font-semibold mb-6 text-[#5D552F]">How do I Work?</h2>
            <p className="text-[#5D552F] mb-8 text-lg leading-relaxed font-normal">
              I use advanced AI to help you understand yourself better. I call you at a time that works for you, right on your cellphone so you can talk to me during a commute or a walk. And you don't forget to reflect, ever! 
            </p>
            <div className="flex justify-between mt-auto">
              <Button onClick={prevStep}>{'<'} Back</Button>
              <Button onClick={nextStep}>Next {'>'}</Button>
            </div>
          </PopupContent>
        );
      case 3:
        return (
          <PopupContent key="step3">
          <div className="flex items-center mb-4">
            <RahaLogo colorScheme="balanced" showIcon={true} />
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-[#5D552F]">See for yourself ;)</h2>
          <p className="text-[#5D552F] mb-2 text-base leading-relaxed font-normal">
            Here are some of the example insights that you will know about yourself:
          </p>
          <div className="relative h-[250px] mb-4">
            <motion.div className="absolute top-0 left-0 z-10"
              initial={{ x: -50, y: 20 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ScreenshotImage src="/onboarding/insight1.jpeg" rotate={-5} />
            </motion.div>
            <motion.div className="absolute top-40 left-1/4 z-20"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ScreenshotImage src="/onboarding/insight3.jpeg" rotate={3} />
            </motion.div>
            <motion.div className="absolute top-0 right-0 z-30"
              initial={{ x: 50, y: 20 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
            </motion.div>
          </div>
          <div className="flex justify-between mt-auto">
            <Button onClick={prevStep}>{'<'} Back</Button>
            <Button onClick={nextStep}>Next {'>'}</Button>
          </div>
        </PopupContent>

        );
      case 4:
        return (
          <PopupContent key="step4">
            <div className="flex items-center mb-8">
              <RahaLogo colorScheme="balanced" showIcon={true} />
            </div>
            <h2 className="text-3xl font-semibold mb-6 text-[#5D552F]">Just one last thing!</h2>
            <p className="text-[#5D552F] mb-4 text-lg leading-relaxed font-normal">
              We need your phone number to call you and send a one-time code. We take your privacy very seriously.
            </p>
            <PhoneInputSection
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              sendOtp={sendOtp}
              otpSent={otpSent}
            />
            {error && <ErrorMessage message={error} />}
            {success && <SuccessMessage message={success} />}
            {otpSent && (
              <div className="flex items-center mb-4 mt-4">
                <input
                  type="text"
                  placeholder="Enter 4-digit code"
                  value={otp}
                  onChange={(e) => {
                    const input = e.target.value.replace(/\D/g, '');
                    setOtp(input.slice(0, 4));
                    setError('');
                  }}
                  className="w-[120px] p-2 mr-2 border border-[#8E9B90] rounded"
                />
                <Button onClick={verifyOtp} disabled={otp.length !== 4}>
                  Verify Code
                </Button>
                {timer > 0 && <span className="ml-2 text-sm">Resend in {timer}s</span>}
              </div>
            )}
            <div className="flex justify-between mt-8">
              <Button onClick={prevStep}>{'<'} Back</Button>
              <Button onClick={onClose} disabled={!otpVerified}>
                <motion.span
                  animate={otpVerified ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  Let's Begin {'>'}
                </motion.span>
              </Button>
            </div>
          </PopupContent>
        );
      default:
        return null;
    }
  }, [step, countryCode, phoneNumber, otpSent, otp, timer, error, success, otpVerified, nextStep, prevStep, sendOtp, verifyOtp, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {renderStep}
      </AnimatePresence>
    </div>
  );
};
