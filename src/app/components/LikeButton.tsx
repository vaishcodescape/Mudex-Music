"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface LikeButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  initialLiked?: boolean;
  onLikeChange?: (liked: boolean) => void;
}

export default function LikeButton({
  size = "md",
  className = "",
  initialLiked = false,
  onLikeChange,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const heartRef = useRef<SVGPathElement>(null);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  useEffect(() => {
    if (heartRef.current) {
      gsap.set(heartRef.current, { scale: isLiked ? 1 : 0.8 });
    }
  }, []);

  const handleClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onLikeChange?.(newLikedState);

    if (heartRef.current) {
      if (newLikedState) {
        // Like animation
        gsap.timeline()
          .to(heartRef.current, {
            scale: 1.2,
            duration: 0.2,
            ease: "back.out(1.7)"
          })
          .to(heartRef.current, {
            scale: 1,
            duration: 0.1
          });
      } else {
        // Unlike animation
        gsap.to(heartRef.current, {
          scale: 0.8,
          duration: 0.2,
          ease: "back.in(1.7)"
        });
      }
    }

    // Button press animation
    if (buttonRef.current) {
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
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center 
        hover:bg-white/10 transition-colors ${className}`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors"
      >
        <path
          ref={heartRef}
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={isLiked ? "#E11D48" : "none"}
          stroke={isLiked ? "#E11D48" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />
      </svg>
    </button>
  );
} 