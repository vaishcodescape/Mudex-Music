"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

interface StreamingBarProps {
  song?: {
    title: string;
    artist: string;
    cover: string;
    duration: number; // in seconds
  };
}

export default function StreamingBar({
  song = {
    title: "Sample Song",
    artist: "Sample Artist",
    cover: "/default-cover.png",
    duration: 180,
  },
}: StreamingBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // seconds
  const progressRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animate progress bar with GSAP
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${(progress / song.duration) * 100}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [progress, song.duration]);

  // Handle play/pause and progress
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev < song.duration) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, song.duration]);

  // Reset progress if song changes
  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
  }, [song.title]);

  const togglePlay = () => setIsPlaying((p) => !p);

  // Format time mm:ss
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-black via-gray-900 to-black shadow-2xl z-50">
      <div className="max-w-4xl mx-auto flex items-center px-4 py-3 gap-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shadow-md">
          <Image src={song.cover} alt="cover" fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{song.title}</div>
          <div className="text-sm text-gray-400 truncate">{song.artist}</div>
        </div>
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-purple-500 transition-colors"
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
        <div className="flex items-center gap-2 w-40">
          <span className="text-xs text-gray-400 w-8 text-right">{formatTime(progress)}</span>
          <div className="relative flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div ref={progressRef} className="absolute left-0 top-0 h-full bg-purple-500 rounded-full" style={{ width: 0 }} />
          </div>
          <span className="text-xs text-gray-400 w-8">{formatTime(song.duration)}</span>
        </div>
      </div>
    </div>
  );
} 