'use client';

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import classNames from 'classnames';

import { Billing, customerFormDetails } from '@/interface';
import { useAppSelector } from '@/lib/hooks/redux';
import { RootState } from '@/lib/store';

const CheckoutButton = ({ disabled }: { disabled: boolean }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const cart = useAppSelector((state: RootState) => state.carts.cart?.items || []);
  const quantity = useAppSelector((state: RootState) => state.carts.cart?.totalQuantities || 0);
  const totalPrice = useAppSelector((state: RootState) => state.carts.totalPrice || 0);
  const [billingDetails] = useAtom<Billing>(customerFormDetails);

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      .then((loadedStripe) => setStripe(loadedStripe))
      .catch((error) => console.error('Error loading Stripe:', error));
  }, []);

  const handleCheckout = async () => {
    if (!stripe) {
      console.error('❌ Stripe has not loaded yet!');
      return;
    }
    if (!cart || cart.length === 0) {
      console.error('❌ Cart is empty, checkout cannot proceed!');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, billingDetails, quantity, totalPrice }),
      });
      
      if (!res.ok) throw new Error('Failed to create checkout session');

      const { sessionId } = await res.json();
      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) console.error('❌ Stripe Checkout Error:', error);
      } else {
        console.error('❌ No session ID returned from server');
      }
    } catch (error) {
      console.error('❌ Error during checkout', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonClasses = classNames(
    'w-full text-white p-4 rounded-lg flex justify-center items-center shadow-lg font-semibold transition-all duration-300',
    {
      'bg-gray-500 cursor-not-allowed': disabled || isLoading || cart.length === 0,
      'bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500': !(disabled || isLoading || cart.length === 0),
    }
  );

  return (
    <motion.button
      className={buttonClasses}
      onClick={handleCheckout}
      disabled={disabled || isLoading || cart.length === 0}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={!disabled && !isLoading ? { scale: 1.05, rotate: 1 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {isLoading ? <ClipLoader size={25} color="#fff" loading={isLoading} /> : '🚀 Checkout Now'}
    </motion.button>
  );
};

export default CheckoutButton;
