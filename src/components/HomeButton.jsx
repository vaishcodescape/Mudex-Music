import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';

const HomeButton = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        delay: 0.5 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link 
        to="/" 
        aria-label="Go to home page"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-background shadow-lg hover:bg-primary/90 transition-colors"
      >
        <FaHome className="w-5 h-5" />
      </Link>
    </motion.div>
  );
};

export default HomeButton;
