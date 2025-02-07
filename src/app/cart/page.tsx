"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
gsap.registerPlugin(ScrollTrigger);

const PaymentSuccess = () => {
  const router = useRouter();
  const { totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/studio/payment-success.mp3");
    audio.play();

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  const handleContinueShopping = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => router.push("/"),
    });
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center min-h-screen bg-white"
    >
      <div
        className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl flex flex-col items-center border border-gray-200 relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-500 opacity-20 blur-3xl" />
        
        {/* Success Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full shadow-xl relative z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1
          ref={textRef}
          className="mt-6 text-3xl text-center font-bold text-gray-800 relative z-10"
        >
          Payment Successful!
        </h1>

        <p className="mt-4 text-center text-gray-700 text-lg relative z-10">
          Thank you for your purchase! Your order has been confirmed.
        </p>

        {/* Display Amount */}
        <p className="mt-2 text-center text-gray-900 text-xl font-bold relative z-10">
          Amount Paid: ${adjustedTotalPrice || totalPrice}
        </p>

        {/* Continue Shopping Button */}
        <button
          className="mt-6 px-6 py-3 text-white bg-black rounded-lg shadow-xl transition-all hover:bg-gray-800 duration-300 transform hover:scale-105 relative z-10"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
