import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Logo = ({ size = 24, animated = true }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Rotation animation
  const rotation = {
    rotate: animated ? 360 : 0,
    transition: {
      duration: isHovered ? 4 : 8, // Faster rotation on hover
      repeat: Infinity,
      ease: "linear"
    }
  };
  
  // Pulse animation for the outer circle
  const pulse = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  // Wave animation for sound bars
  const waveAnimation = (delay) => ({
    height: ["60%", "100%", "80%", "100%", "60%"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  });

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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Outer circle */}
      <motion.div
        className="absolute rounded-full bg-black border-2 border-sky-400/30"
        style={{
          width: '100%',
          height: '100%',
          boxShadow: '0 0 15px rgba(14, 165, 233, 0.3)'
        }}
        animate={animated ? { ...rotation, ...(isHovered && pulse) } : {}}
      >
        {/* Inner circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-1/2 h-1/2 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center"
            animate={isHovered ? {
              scale: [1, 1.1, 1],
              transition: { duration: 1.5, repeat: Infinity }
            } : {}}
          >
            <motion.div 
              className="w-1/4 h-1/4 rounded-full bg-black"
              animate={isHovered ? {
                scale: [1, 0.8, 1],
                transition: { duration: 1.5, repeat: Infinity, delay: 0.2 }
              } : {}}
            ></motion.div>
          </motion.div>
        </div>

        {/* Grooves */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[0.8, 0.6, 0.4].map((scaleVal, i) => (
            <motion.div 
              key={i}
              className="absolute rounded-full border border-sky-400/20"
              style={{
                width: `${scaleVal * 100}%`,
                height: `${scaleVal * 100}%`,
              }}
              animate={isHovered ? {
                opacity: [0.2, 0.8, 0.2],
                scale: [scaleVal, scaleVal * 1.05, scaleVal],
                transition: { duration: 2, repeat: Infinity, delay: i * 0.2 }
              } : {}}
            />
          ))}
        </div>
      </motion.div>

      {/* Sound wave effect with animation */}
      {animated && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1">
          {[0.6, 1, 0.8, 1, 0.6].map((h, i) => (
            <motion.div 
              key={i}
              className="w-1 bg-sky-400 rounded-full"
              style={{
                opacity: 0.7
              }}
              initial={{ height: `${h * 12}px` }}
              animate={waveAnimation(i * 0.1)}
            />
          ))}
        </div>
      )}
      
      {/* Glow effect that appears on hover */}
      {animated && isHovered && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-sky-400"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0],
            scale: [0.8, 1.2, 0.8],
            transition: { duration: 2, repeat: Infinity }
          }}
        />
      )}
    </motion.div>
  );
};

export default Logo; 