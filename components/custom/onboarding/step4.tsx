import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { PhoneNumberResource } from '@clerk/types';
import {
  PopupContent,
  Button,
  PhoneInputSection,
  ErrorMessage,
  SuccessMessage,
} from './shared';
import RahaLogo from '@/components/custom/raha-logo';
import { Loader2 } from 'lucide-react';

interface Step4Props {
  prevStep: () => void;
  onClose: () => Promise<void>;
  countryCode: string;
  setCountryCode: (code: string) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
}

const Step4: React.FC<Step4Props> = ({
  prevStep,
  onClose,
  countryCode,
  setCountryCode,
  phoneNumber,
  setPhoneNumber,
}) => {
  const { isLoaded, user } = useUser();
  const [phoneObj, setPhoneObj] = useState<PhoneNumberResource | undefined>();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [resendAttempts, setResendAttempts] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (!isLoaded || !user) return null;

  const handleSendOtp = async () => {
    if (resendAttempts >= 3) {
      setError('Maximum resend attempts reached. Please try again later.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!phoneObj) {
        // First time sending OTP
        const fullPhone = `${countryCode}${phoneNumber}`;
        const res = await user.createPhoneNumber({ phoneNumber: fullPhone });
        await user.reload();
        const newPhoneNumber = user.phoneNumbers.find((a) => a.id === res.id);
        setPhoneObj(newPhoneNumber);
        await newPhoneNumber?.prepareVerification();
      } else {
        // Resending OTP
        await phoneObj.prepareVerification();
      }

      setOtpSent(true);
      setSuccess('Verification code sent successfully!');
      setTimer(60);
      setResendAttempts((prev) => prev + 1);
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const phoneVerifyAttempt = await phoneObj?.attemptVerification({
        code: otp,
      });
      if (phoneVerifyAttempt?.verification.status === 'verified') {
        setOtpVerified(true);
        setSuccess('Phone number verified successfully!');
      } else {
        setError('Verification failed. Please check the code and try again.');
      }
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = async () => {
    setIsClosing(true);
    await onClose();
  };

  return (
    <PopupContent>
      <div className="flex items-center mb-8">
        <RahaLogo colorScheme="balanced" showIcon={true} />
      </div>
      <h2 className="text-3xl font-semibold mb-6 text-[#5D552F]">
        Just one last thing!
      </h2>
      <p className="text-[#5D552F] mb-4 text-lg leading-relaxed font-normal">
        We need your phone number to call you and send a one-time code. We take
        your privacy very seriously. You will recieve it via SMS or Whatsapp
        from our partner <i>Ding</i>
      </p>
      <PhoneInputSection
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        phoneNumber={phoneNumber}
        setPhoneNumber={(number) => setPhoneNumber(number.slice(0, 13))}
        sendOtp={handleSendOtp}
        otpSent={otpSent}
        disabled={loading || timer > 0 || resendAttempts >= 3 || otpSent}
      />
      {otpSent && (
        <div className="flex flex-col items-start mb-2 mt-2">
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Enter verification code"
              value={otp}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, '');
                setOtp(input);
              }}
              className="w-[200px] p-1 mr-2 border border-[#8E9B90] rounded text-base"
            />
            <Button
              onClick={handleVerifyOtp}
              disabled={loading || otp.length === 0}
              className="py-1 px-2 text-sm"
            >
              {loading ? (
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              ) : null}
              Verify
            </Button>
            {timer > 0 && !otpVerified ? (
              <span className="ml-2 text-xs">Resend in {timer}s</span>
            ) : (
              <Button
                onClick={handleSendOtp}
                disabled={loading || resendAttempts >= 3 || otpVerified}
                className="ml-2 py-1 px-2 text-sm"
              >
                Resend
              </Button>
            )}
          </div>
          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message={success} />}
        </div>
      )}
      <div className="flex justify-between mt-8">
        <Button onClick={prevStep}>{'<'} Back</Button>
        <AnimatePresence mode="wait">
          {!isClosing ? (
            <motion.div
              key="lets-begin"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={handleClose}
                disabled={!otpVerified}
                className="relative overflow-hidden"
              >
                <motion.span
                  animate={otpVerified ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  Let's Begin {'>'}
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-green-500"
                  initial={{ scale: 0 }}
                  animate={isClosing ? { scale: 150 } : { scale: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Loader2 className="h-6 w-6 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PopupContent>
  );
};

export default Step4;
