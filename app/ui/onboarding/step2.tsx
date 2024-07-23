import React from 'react';
import { PopupContent, Button } from './shared';
import RahaLogo from '@/app/ui/raha-logo';

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
}

const Step2: React.FC<Step2Props> = React.memo(({ nextStep, prevStep }) => (
  <PopupContent>
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
));

export default Step2;