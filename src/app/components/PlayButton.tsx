"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

type PlayButtonProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
};

export default function PlayButton({ size = "md", className = "", onClick }: PlayButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const playIconRef = useRef<SVGPathElement>(null);
  const pauseIconRef = useRef<SVGPathElement>(null);

  const sizeClasses = {
    sm: "w-8 h-8 text-base",
    md: "w-12 h-12 text-xl",
    lg: "w-16 h-16 text-2xl",
  };

  useEffect(() => {
    if (playIconRef.current && pauseIconRef.current) {
      gsap.set(playIconRef.current, { scale: isPlaying ? 0 : 1, opacity: isPlaying ? 0 : 1 });
      gsap.set(pauseIconRef.current, { scale: isPlaying ? 1 : 0, opacity: isPlaying ? 1 : 0 });
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);

    if (buttonRef.current) {
      // Button press animation
      gsap.timeline()
        .to(buttonRef.current, {
          scale: 0.9,
          duration: 0.1
        })
        .to(buttonRef.current, {
          scale: 1,
          duration: 0.1
        });
    }

    if (playIconRef.current && pauseIconRef.current) {
      if (newPlayingState) {
        // Play to Pause animation
        gsap.timeline()
          .to(playIconRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            ease: "back.in(1.7)"
          })
          .fromTo(pauseIconRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.7)" },
            "-=0.1"
          );
      } else {
        // Pause to Play animation
        gsap.timeline()
          .to(pauseIconRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            ease: "back.in(1.7)"
          })
          .fromTo(playIconRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.7)" },
            "-=0.1"
          );
      }
    }

    if (onClick) onClick();
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      className={`flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <polygon points="6,4 20,12 6,20" fill="currentColor" />
        </svg>
      )}
    </button>
  );
} 