'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0 flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative w-8 h-8"
            >
              <div className="absolute inset-0 rounded-full bg-black border-4 border-sky-400"></div>
              <div className="absolute inset-2 rounded-full bg-black border-2 border-sky-400"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-sky-400"></div>
              </div>
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
              Mudex Music
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block"
            >
              <div className="flex items-baseline space-x-4">
                <a href="#" className="text-sky-300 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </a>
                <a href="#" className="text-sky-300 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Discover
                </a>
                <a href="#" className="text-sky-300 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Library
                </a>
                <a href="#" className="text-sky-300 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Profile
                </a>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-sky-500/20"
            >
              Sign In
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 