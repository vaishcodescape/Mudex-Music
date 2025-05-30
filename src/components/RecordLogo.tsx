'use client';

import { useRef, useEffect } from 'react';
import { animate, spring } from '@motionone/dom';
import { RecordLogoProps } from '@/types';

export default function RecordLogo({ size = 40, className = '' }: RecordLogoProps) {
  const recordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (recordRef.current) {
      animate(
        recordRef.current,
        { rotate: 360 },
        {
          duration: 3,
          easing: 'linear',
          repeat: Infinity,
        }
      );
    }
  }, []);

  return (
    <div
      ref={recordRef}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500 to-purple-500" />
      
      {/* Main record surface */}
      <div className="absolute inset-1 rounded-full bg-black" />
      
      {/* Grooves */}
      <div className="absolute inset-2 rounded-full border-2 border-sky-500/20" />
      <div className="absolute inset-4 rounded-full border-2 border-sky-500/20" />
      <div className="absolute inset-6 rounded-full border-2 border-sky-500/20" />
      <div className="absolute inset-8 rounded-full border-2 border-sky-500/20" />
      
      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 h-1/3 rounded-full bg-gradient-to-br from-sky-500 to-purple-500 flex items-center justify-center">
          <div className="w-1/2 h-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
} 