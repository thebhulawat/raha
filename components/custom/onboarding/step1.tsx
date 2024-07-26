import React from 'react';
import { PopupContent, Button } from './shared';
import RahaLogo from '@/components/custom/raha-logo';

interface Step1Props {
  nextStep: () => void;
}

const Step1: React.FC<Step1Props> = React.memo(({ nextStep }) => (
  <PopupContent>
    <div className="flex items-center mb-8">
      <RahaLogo colorScheme="balanced" showIcon={true} />
    </div>
    <h2 className="text-3xl font-semibold mb-6 text-[#5D552F]">Hey bud!</h2>
    <p className="text-[#5D552F] mb-4 text-lg leading-relaxed font-normal">
      I am Raha! I am here to help you discover yourself. I am very excited to
      be part of your journey! As Aristotle said, knowing yourself is the
      beginning of all wisdom ❤️
    </p>
    <div className="flex justify-end mt-auto">
      <Button onClick={nextStep}>Let's Begin {'>'}</Button>
    </div>
  </PopupContent>
));

export default Step1;
