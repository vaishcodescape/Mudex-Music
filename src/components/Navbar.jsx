import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { FaGithub } from 'react-icons/fa';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/auth';
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNavigation = async () => {
    setIsLoaded(false);
    setIsMobileMenuOpen(false);
    await new Promise(resolve => setTimeout(resolve, 100));
    navigate('/auth');
  };

  const handleGithubClick = (e) => {
    e.preventDefault();
    window.open('https://github.com/vaishcodescape/Mudex-Music.git', '_blank', 'noopener=yes,noreferrer=yes');
  };

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

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 backdrop-blur-lg bg-background/10 border-b border-border/20">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
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

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex items-center space-x-8"
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
            className="text-muted-foreground hover:text-foreground transition-colors"
            variants={navItemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Features
          </motion.a>
          
          <motion.a 
            href="#discover"
            className="text-muted-foreground hover:text-foreground transition-colors"
            variants={navItemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover
          </motion.a>

          <motion.button
            onClick={handleGithubClick}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
            variants={navItemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="w-5 h-5" />
          </motion.button>

          <AnimatePresence>
            {!isAuthPage && isLoaded && (
              <motion.div
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Button
                  variant="glow"
                  size="sm"
                  className="font-semibold"
                  onClick={handleNavigation}
                >
                  Sign In
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Navigation Button */}
        <motion.button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/20 p-4 md:hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
            >
              <div className="flex flex-col space-y-4">
                <a 
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#discover"
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Discover
                </a>
                <button
                  onClick={(e) => {
                    handleGithubClick(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center py-2"
                >
                  <FaGithub className="w-5 h-5 mr-2" />
                  GitHub
                </button>
                {!isAuthPage && isLoaded && (
                  <Button
                    variant="glow"
                    size="sm"
                    className="font-semibold w-full"
                    onClick={handleNavigation}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar; 