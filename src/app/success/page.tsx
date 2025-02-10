'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { useAppSelector } from '@/lib/hooks/redux';

export default function SuccessPage() {
  const { totalPrice } = useAppSelector((state) => state.carts);
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // GSAP Animations
    gsap.fromTo(containerRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    gsap.fromTo(iconRef.current, { scale: 0 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
    gsap.fromTo(buttonRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.5 });

    // Play Success Sound
    const successSound = new Audio('/success.mp3');
    successSound.oncanplaythrough = () => successSound.play();

    // Fire Confetti Multiple Times for Celebration
    const fireConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 80,
        startVelocity: 30,
        origin: { y: 0.6 }
      });
    };

    fireConfetti();
    setTimeout(fireConfetti, 500);
    setTimeout(fireConfetti, 1000);

  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div 
        ref={containerRef} 
        className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-gray-200"
      >
        <div ref={iconRef} className="flex justify-center mb-6">
          <CheckCircleIcon className="text-black w-20 h-20 drop-shadow-lg animate-bounce" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800">
          Payment Successful! 🎉
        </h1>
        {totalPrice && (
          <p className="text-2xl font-bold text-green-600 mt-3">Total Paid: ${totalPrice}</p>
        )}
        <p className="text-gray-600 mt-3 text-lg">Thank you for your purchase. Your payment has been processed successfully.</p>
        <div ref={buttonRef} className="mt-8">
          <Link href="/" className="px-8 py-3 bg-black text-white rounded-full shadow-lg text-lg font-semibold hover:bg-gray-800 transition-transform transform hover:scale-105">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
