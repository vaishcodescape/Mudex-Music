import { motion } from 'framer-motion';
import React from 'react';

const ColorChangingTitle = () => {
  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex flex-col items-center justify-center">
        <motion.h1 
          className="text-7xl font-bold tracking-tight flex items-center gap-4 select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              color: [
                "#38BDF8", // sky-400
                "#8B5CF6", // violet-500
                "#0EA5E9", // sky-600
                "#38BDF8", // back to sky-400
              ],
            }}
            transition={{
              opacity: { duration: 0.3, delay: 0.4 },
              color: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            }}
          >
            Mudex
          </motion.span>
          <motion.span
            className="bg-gradient-to-r from-sky-400 to-violet-500 bg-clip-text text-transparent"
            style={{
              backgroundSize: "200% 100%",
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              opacity: { duration: 0.3, delay: 0.4 },
              backgroundPosition: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          >
            Music
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-4 text-lg font-medium select-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.span
            className="bg-gradient-to-r from-sky-400/60 via-violet-400/60 to-sky-400/60 bg-clip-text text-transparent"
            style={{
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            Elevate the Underrated
          </motion.span>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ColorChangingTitle; 