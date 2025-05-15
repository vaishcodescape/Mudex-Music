import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Rotating Logo */}
        <motion.div
          className="w-24 h-24"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        >
          <Logo />
        </motion.div>

        {/* Pulsing Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-sky-400/30"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />

        {/* Second Pulsing Ring (delayed) */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-sky-400/30"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.75
          }}
        />

        {/* Loading Text */}
        <motion.p
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sky-400/80 font-medium"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 