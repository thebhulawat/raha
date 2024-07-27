import React from 'react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import countryCodes from '@/lib/country-codes';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
  React.memo(({ children, className = '', ...props }) => (
    <button
      className={`text-lg font-semibold transition-all text-[#5D552F] bg-[#E6D9B8] hover:bg-[#D9C9A3] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E9B90] focus:ring-opacity-50 ${
        props.disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  ));

export const ErrorMessage: React.FC<{ message: string }> = React.memo(
  ({ message }) => <p className="text-red-500 text-sm mt-1">{message}</p>
);

export const SuccessMessage: React.FC<{ message: string }> = React.memo(
  ({ message }) => <p className="text-green-500 text-sm mt-1">{message}</p>
);

export const PopupContent: React.FC<{ children: React.ReactNode }> = React.memo(
  ({ children }) => (
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
  )
);

export const PhoneInputSection: React.FC<{
  countryCode: string;
  setCountryCode: (code: string) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  sendOtp: () => void;
  otpSent: boolean;
  disabled: boolean;
}> = React.memo(
  ({
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    sendOtp,
    otpSent,
    disabled,
  }) => (
    <div className="flex items-center mb-4">
      <div className="relative z-20">
        <Select
          value={countryCode}
          onValueChange={setCountryCode}
          disabled={disabled}
        >
          <SelectTrigger className="w-[100px] mr-2 bg-white h-[42px]">
            <SelectValue placeholder="Code" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {countryCodes.map((country) => (
              <SelectItem key={country.country} value={country.code}>
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
          setPhoneNumber(input.slice(0, 13));
        }}
        className="flex-grow p-2 border rounded h-[42px]"
        disabled={disabled}
      />
      <Button
        onClick={sendOtp}
        disabled={disabled}
        className="ml-2 whitespace-nowrap h-[42px]"
      >
        {otpSent ? 'Resend' : 'Send'} Code
      </Button>
    </div>
  )
);

export const ScreenshotImage: React.FC<{ src: string; rotate: number }> =
  React.memo(({ src, rotate }) => (
    <motion.img
      src={src}
      alt="App Insight"
      className="w-[400px] h-auto object-cover rounded-lg shadow-lg"
      style={{ rotate: `${rotate}deg` }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  ));
