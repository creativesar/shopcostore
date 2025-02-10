'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { useAppSelector } from '@/lib/hooks/redux';

const createFloatingAnimation = (element: HTMLElement) => {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(element, {
    duration: 2 + Math.random() * 1,
    y: '+=15',
    rotation: '+=5',
    ease: 'power1.inOut',
  });
  return tl;
};

export default function SuccessPage() {
  const { totalPrice } = useAppSelector((state) => state.carts);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const floatingAnimations = useRef<gsap.core.Timeline[]>([]);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    tl.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.3)' }
    )
    .fromTo(iconRef.current, 
      { scale: 0, rotation: -180 },
      { 
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
        onComplete: () => {
          if (iconRef.current) {
            floatingAnimations.current.push(createFloatingAnimation(iconRef.current));
          }
        }
      },
      '<0.2'
    )
    .fromTo('.success-text', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 },
      '<0.5'
    )
    .fromTo(buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(2)' },
      '<0.3'
    );

    const burst = (count: number, particleRatio: number, opts: any) => {
      confetti({
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        shapes: ['circle', 'square', 'star'],
        colors: colors,
        scalar: 0.8,
        gravity: 0.8
      });
    };

    Array.from({ length: 5 }).forEach((_, i) => {
      setTimeout(() => {
        burst(200, 0.25, { spread: 55 * i, origin: { y: 0.7 } });
        burst(50, 0.2, { spread: 100, origin: { y: 0.7 }, angle: 60 });
        burst(50, 0.2, { spread: 100, origin: { y: 0.7 }, angle: 120 });
      }, i * 150);
    });

    Array.from({ length: 30 }).forEach((_, i) => {
      gsap.to(`.particle-${i}`, {
        duration: 2 + Math.random() * 3,
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        rotation: 'random(0, 360)',
        repeat: -1,
        repeatRefresh: true,
        ease: 'none'
      });
    });

    const successSound = new Audio('/success.mp3');
    successSound.volume = 0.3;
    successSound.play().catch(() => {});

    return () => {
      gsap.killTweensOf('*');
      floatingAnimations.current.forEach(anim => anim.kill());
      successSound.pause();
    };
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-white/10 rounded-full particle-${i}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div 
        ref={containerRef} 
        className="relative bg-gradient-to-br from-white/95 to-gray-100/95 p-12 rounded-[40px] shadow-2xl backdrop-blur-xl text-center max-w-2xl w-full border-2 border-white/20 transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute inset-0 rounded-[40px] transition-all duration-500 ${
          isHovered ? 'shadow-glow opacity-100' : 'opacity-0'
        }`} />

        <div ref={iconRef} className="relative mb-8 inline-block">
          <CheckCircleIcon className="text-emerald-500 w-28 h-28 drop-shadow-2xl" />
          <div className="absolute inset-0 border-4 border-emerald-400/30 rounded-full animate-ping-slow" />
        </div>

        <h1 className="success-text text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Payment Complete!
        </h1>

        {totalPrice && (
          <div className="success-text relative inline-block">
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              ${totalPrice}
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-xl" />
          </div>
        )}

        <p className="success-text text-xl text-gray-700 mt-6 leading-relaxed">
          Your order is being processed. You'll receive a confirmation email shortly.
        </p>

        <div ref={buttonRef} className="mt-10 relative group">
          <Link 
            href="/"
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl text-xl font-bold transform transition-all duration-300 
                      hover:scale-105 hover:shadow-3xl active:scale-95 group-hover:bg-gradient-to-l"
          >
            <span className="relative z-10">Continue Shopping</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-purple-600/30 blur-2xl group-hover:blur-xl transition-all" />
        </div>

        <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-500/20 rounded-full blur-xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/20 rounded-full blur-xl" />
      </div>

      <div className="absolute pointer-events-none">
        {['🚀', '🎉', '💰', '🌟', '💎'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-0 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
}