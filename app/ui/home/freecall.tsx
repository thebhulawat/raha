import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone } from 'lucide-react';
import { lusitana } from '@/app/ui/fonts';

interface FreeCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FreeCallModal: React.FC<FreeCallModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${lusitana.className} bg-[#FBF3D9] rounded-3xl p-8 w-full max-w-md shadow-lg`}
          >

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-6"
            >
              <p className="text-xl text-[#5D552F] leading-relaxed">
                 Your free call from Raha is on its way! 📞✨🎉 
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="mt-8 w-full px-6 py-3 rounded-full bg-[#F7F3E8] text-[#5D552F] hover:bg-[#EBE5D3] transition-colors text-lg font-semibold shadow-md"
            >
              Can't wait! 😊
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FreeCallModal;