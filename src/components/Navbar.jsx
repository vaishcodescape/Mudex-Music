import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <nav className="fixed w-full z-50 px-6 py-4 backdrop-blur-lg bg-background/10 border-b border-border/20">
      <div className="container mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8">
              <Logo />
            </div>
          </Link>
        </motion.div>

        <motion.div 
          className="flex items-center space-x-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          <motion.a 
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            variants={navItemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Features
          </motion.a>
          
          <motion.a 
            href="#discover"
            className="text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            variants={navItemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover
          </motion.a>
          
          <AnimatePresence>
            {!isAuthPage && isLoaded && (
              <motion.div
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link to="/auth">
                  <Button
                    variant="glow"
                    size="sm"
                    className="font-semibold"
                  >
                    Sign In
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar; 