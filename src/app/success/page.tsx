'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-gray-200"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 10 }}
          className="flex justify-center mb-6"
        >
          <CheckCircleIcon className="text-green-500 w-20 h-20 drop-shadow-lg" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3 }}
          className="text-3xl font-extrabold text-gray-800"
        >
          Payment Successful!
        </motion.h1>
        <p className="text-gray-600 mt-3 text-lg">Thank you for your purchase. Your payment has been processed successfully.</p>
        {sessionId && (
          <p className="text-gray-500 mt-2 text-sm">Session ID: {sessionId}</p>
        )}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Link href="/" className="px-8 py-3 bg-green-500 text-white rounded-full shadow-lg text-lg font-semibold hover:bg-green-600 transition-transform transform hover:scale-105">
              Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
