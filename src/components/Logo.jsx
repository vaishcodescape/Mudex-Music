import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Logo = ({ size = 24, animated = true }) => {
  const containerRef = useRef(null);
  
  // Simple rotation animation
  const rotation = {
    rotate: animated ? 360 : 0,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  };

  // Scale for responsive sizing
  const scale = size / 24;

  return (
    <motion.div 
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {/* Outer circle */}
      <motion.div
        className="absolute rounded-full bg-black border-2 border-sky-400/30"
        style={{
          width: '100%',
          height: '100%',
          boxShadow: '0 0 15px rgba(14, 165, 233, 0.3)'
        }}
        animate={animated ? rotation : {}}
      >
        {/* Inner circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
            <div className="w-1/4 h-1/4 rounded-full bg-black"></div>
          </div>
        </div>

        {/* Grooves */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[0.8, 0.6, 0.4].map((scale, i) => (
            <div 
              key={i}
              className="absolute rounded-full border border-sky-400/20"
              style={{
                width: `${scale * 100}%`,
                height: `${scale * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Simple sound wave effect - static for native */}
      {animated && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1">
          {[0.6, 1, 0.8, 1, 0.6].map((h, i) => (
            <div 
              key={i}
              className="w-1 bg-sky-400 rounded-full"
              style={{
                height: `${h * 12}px`,
                opacity: 0.7
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Logo; 