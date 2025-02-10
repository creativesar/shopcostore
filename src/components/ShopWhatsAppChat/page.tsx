'use client';

import React, { useState, useEffect } from 'react';
import WhatsApp from 'react-whatsapp';
import { motion, AnimatePresence } from 'framer-motion';
import { useMedia } from 'react-use';

interface WhatsAppButtonProps {
  phoneNumber: string;
  brandName?: string;
  defaultMessage?: string;
}

const ShopcoWhatsAppChat: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  brandName = "SHOPCO",
  defaultMessage = "Hi there! 🛍️ Welcome to SHOPCO! How can we assist you today?",
}) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const isMobile = useMedia('(max-width: 768px)');

  // Validate phone number format
  const isValidNumber = phoneNumber.match(/^\+\d{8,15}$/);

  // Check availability based on Pakistan Standard Time (PST, UTC+5)
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      
      // Convert to Pakistan Time
      const nowInPakistan = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Karachi" })
      );

      const hour = nowInPakistan.getHours();
      const weekday = nowInPakistan.toLocaleDateString("en-US", { weekday: "long" });

      console.log(`📅 Day: ${weekday}, 🕒 Hour: ${hour} (PST)`); // Debugging log

      // Working days & hours (9 AM - 8 PM)
      const workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const isWorkingHours = workingDays.includes(weekday) && hour >= 9 && hour < 20;

      setIsAvailable(isWorkingHours);
    };
    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Recheck every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 left-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <WhatsApp
        number={isValidNumber ? phoneNumber : ''}
        message={defaultMessage}
        element="button"
        disabled={!isAvailable || !isValidNumber}
      >
        <motion.div
          className={`group relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all ${
            isAvailable && isValidNumber
              ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          whileHover={isAvailable ? { scale: 1.1 } : undefined}
          whileTap={{ scale: 0.95 }}
        >
          {/* WhatsApp Icon */}
          <svg
            className="w-8 h-8 text-white transition-transform group-hover:rotate-12"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>

          {/* Availability Badge */}
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <span className="text-[10px] text-white font-medium bg-black/30 px-2 rounded-full">
              {!isValidNumber ? 'Invalid Number' : isAvailable ? 'Online' : 'Offline'}
            </span>
          </div>
        </motion.div>
      </WhatsApp>

      {/* Error Toast */}
      <AnimatePresence>
        {!isValidNumber && (
          <motion.div
            className="absolute right-20 bottom-0 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            Invalid WhatsApp number format!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShopcoWhatsAppChat;
