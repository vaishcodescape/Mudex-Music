import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Button } from './ui/button';
import { FaGithub, FaBars, FaTimes, FaHome, FaInfoCircle, FaTags, FaStar } from 'react-icons/fa';
import { useClickAway } from 'react-use';
import Logo from './Logo';
import { useWindowSize } from '../hooks/useWindowSize';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const controls = useAnimation();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isAuthPage = location.pathname === '/auth';
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const lastScrollY = useRef(0);
  
  // Close mobile menu when clicking outside or scrolling
  useClickAway(mobileMenuRef, (event) => {
    if (isMobileMenuOpen && !event?.target?.closest?.('.mobile-menu-button')) {
      closeMobileMenu();
    }
  });
  
  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [location]);
  
  const closeMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      controls.start('exit').then(() => {
        setIsMobileMenuOpen(false);
      });
    }
  }, [isMobileMenuOpen, controls]);
  
  const toggleMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      setIsMobileMenuOpen(true);
      controls.start('visible');
    }
  }, [isMobileMenuOpen, closeMobileMenu, controls]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNavigation = async () => {
    setIsLoaded(false);
    setIsMobileMenuOpen(false);
    await new Promise(resolve => setTimeout(resolve, 100));
    navigate('/auth');
    window.location.reload();
  };

  const handleGithubClick = (e) => {
    e.preventDefault();
    window.open('https://github.com/vaishcodescape/Mudex-Music.git', '_blank', 'noopener=yes,noreferrer=yes');
  };

  const navItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: (i = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + (i * 0.05),
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
    hover: {
      y: -2,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: { scale: 0.96 }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.07,
        delayChildren: 0.1,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };
  
  const mobileItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { stiffness: 1000, velocity: -100 }
      }
    },
    exit: {
      x: -20,
      opacity: 0,
      transition: {
        x: { stiffness: 1000 }
      }
    }
  };

  // Navigation items data
  const navItems = [
    { id: 'home', label: 'Home', href: '/', icon: FaHome },
    { id: 'features', label: 'Features', href: '#features', icon: FaStar },
    { id: 'pricing', label: 'Pricing', href: '#pricing', icon: FaTags },
    { id: 'about', label: 'About', href: '#about', icon: FaInfoCircle },
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 ease-out ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border/20 shadow-sm' 
          : 'bg-background/80 backdrop-blur-sm border-b border-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-shrink-0"
          >
            <Link 
              to="/" 
              className="flex items-center group" 
              aria-label="Home"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <Logo size={36} animated={false} />
              </div>
              <motion.span 
                className="text-xl font-bold whitespace-nowrap flex items-center gap-1"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <motion.span
                  animate={{ 
                    color: ["#38BDF8", "#8B5CF6", "#0EA5E9", "#38BDF8"]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  Mudex
                </motion.span>
                <motion.span
                  className="font-normal"
                  style={{
                    background: "linear-gradient(90deg, #38BDF8, #8B5CF6, #0EA5E9, #38BDF8)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  Music
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
          
          {/* Mobile menu */}
          <AnimatePresence mode="wait">
            {isMobileMenuOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/20 shadow-xl z-50 py-4"
                ref={mobileMenuRef}
                style={{
                  WebkitOverflowScrolling: 'touch',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <div className="px-4 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      variants={mobileItemVariants}
                      className="flex items-center px-4 py-3 text-base font-medium text-foreground/90 hover:text-primary hover:bg-foreground/5 rounded-lg transition-colors"
                      whileTap={{ scale: 0.98 }}
                      onClick={closeMobileMenu}
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                      }}
                    >
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {item.label}
                    </motion.a>
                  ))}
                  
                  <div className="pt-2 border-t border-border/20 mt-3 space-y-2">
                    <motion.a 
                      href="#discover"
                      variants={mobileItemVariants}
                      className="flex items-center px-4 py-3 text-base font-medium text-foreground/90 hover:text-primary hover:bg-foreground/5 rounded-lg transition-colors"
                      whileTap={{ scale: 0.98 }}
                      onClick={closeMobileMenu}
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                      }}
                    >
                      <FaStar className="mr-3 h-5 w-5 flex-shrink-0" />
                      Discover
                    </motion.a>
                    
                    <motion.button
                      variants={mobileItemVariants}
                      className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-base font-medium text-foreground bg-primary/10 hover:bg-primary/20 active:bg-primary/30 transition-colors"
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        handleGithubClick(e);
                        closeMobileMenu();
                      }}
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                      }}
                    >
                      <FaGithub className="mr-2 h-5 w-5" />
                      <span>GitHub</span>
                    </motion.button>
                    
                    {!isAuthPage && isLoaded && (
                      <motion.button
                        variants={mobileItemVariants}
                        className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-base font-semibold text-background bg-primary hover:bg-primary/90 active:bg-primary/80 transition-colors shadow-md shadow-primary/20"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          handleNavigation();
                          closeMobileMenu();
                        }}
                        style={{
                          WebkitTapHighlightColor: 'transparent',
                        }}
                      >
                        Sign In
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-auto">
            <motion.button
              onClick={toggleMobileMenu}
              className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              whileTap={{ scale: 0.95 }}
              style={{
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="block h-6 w-6" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex items-center space-x-1 lg:space-x-2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.03,
                delayChildren: 0.2,
                when: "beforeChildren"
              }
            }
          }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.href}
              custom={index}
              variants={navItemVariants}
              className={`text-sm md:text-[0.9375rem] font-medium px-3.5 py-2.5 rounded-lg transition-colors ${
                location.pathname === item.href 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
              }`}
              whileHover="hover"
              whileTap="tap"
              style={{
                WebkitTapHighlightColor: 'transparent',
              }}
          >
              {item.label}
            </motion.a>
          ))}
          
          <motion.a 
            href="#discover"
            className="text-muted-foreground hover:text-foreground transition-colors"
            variants={navItemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover
          </motion.a>

          <motion.div variants={navItemVariants} className="hidden sm:block">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full px-4 sm:px-6 h-10 border-2 border-primary/20 hover:border-primary/40 bg-transparent hover:bg-primary/10 text-foreground transition-all duration-300"
              onClick={handleGithubClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaGithub className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Star on GitHub</span>
              <span className="sm:hidden">GitHub</span>
            </Button>
          </motion.div>

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


      </div>
    </motion.nav>
  );
};

export default Navbar; 