import React from 'react';
import { motion } from 'framer-motion';
import { PopupContent, Button, ScreenshotImage } from './shared';
import RahaLogo from '@/app/ui/raha-logo';

interface Step3Props {
  nextStep: () => void;
  prevStep: () => void;
}

const Step3: React.FC<Step3Props> = React.memo(({ nextStep, prevStep }) => (
  <PopupContent>
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
));

export default Step3;