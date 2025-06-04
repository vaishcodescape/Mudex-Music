'use client';

import { useState, useEffect } from 'react';
import AnimatedLogo from './AnimatedLogo';
import LoadingAnimation from './LoadingAnimation';

interface PageLoaderProps {
  onLoadComplete?: () => void;
}

export default function PageLoader({ onLoadComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState(0);

  useEffect(() => {
    // Simulate loading phases
    const phases = [
      { delay: 0, phase: 0 },
      { delay: 800, phase: 1 },
      { delay: 1600, phase: 2 },
      { delay: 2400, phase: 3 }
    ];

    phases.forEach(({ delay, phase }) => {
      setTimeout(() => setLoadingPhase(phase), delay);
    });

    // Complete loading and start fade out
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      // Give time for fade out animation before calling onLoadComplete
      setTimeout(() => {
        onLoadComplete?.();
      }, 500);
    }, 3000);

    return () => clearTimeout(completeTimer);
  }, [onLoadComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-black z-50 pointer-events-none animate-out fade-out duration-500">
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-particle opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300 rounded-full animate-particle opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-particle opacity-50" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-blue-400 rounded-full animate-particle opacity-30" style={{animationDelay: '6s'}}></div>
      </div>
      
      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 animate-in fade-in duration-1000">
        {/* Animated logo */}
        <div className="animate-in slide-in-from-top duration-800 delay-200">
          <div className="scale-150 animate-float">
            <AnimatedLogo />
          </div>
        </div>
        
        {/* Loading elements */}
        <div className="flex flex-col items-center space-y-6 animate-in slide-in-from-bottom duration-800 delay-500">
          {/* Loading animation */}
          <div className="animate-in fade-in duration-500 delay-700">
            <LoadingAnimation type="bars" className="scale-125" />
          </div>
          
          {/* Progress indicator */}
          <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden animate-in slide-in-from-left duration-600 delay-1000">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${(loadingPhase + 1) * 25}%`,
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
              }}
            ></div>
          </div>
          
          {/* Loading percentage */}
          <div className="text-blue-400 font-mono text-sm animate-fade-pulse">
            {(loadingPhase + 1) * 25}%
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 border border-blue-500/20 rounded-full animate-spin duration-[8s]"></div>
        <div className="absolute -bottom-10 -right-10 w-16 h-16 border border-blue-400/30 rounded-full animate-spin duration-[6s] animate-reverse"></div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-shimmer"></div>
    </div>
  );
} 