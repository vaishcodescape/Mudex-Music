import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from './Navbar';
import { Button } from './ui/button';
import Logo from './Logo';
import ColorChangingTitle from './ColorChangingTitle';
import { FaGithub } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const particlesRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Create a GSAP context for better cleanup
    const ctx = gsap.context(() => {
      // Initialize particles
      const particles = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesRef.current?.appendChild(particle);
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        particles.push(particle);
        
        // Initial state
        gsap.set(particle, {
          x: x,
          y: y,
          scale: 0,
          opacity: 0
        });
        
        // Animation
        gsap.to(particle, {
          duration: Math.random() * 2 + 2,
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          scale: Math.random() * 1 + 0.5,
          opacity: Math.random() * 0.4 + 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: i * 0.1
        });
      }

      // Set loaded state after particles are initialized
      setIsLoaded(true);
    }, particlesRef);

    return () => ctx.revert();
  }, []);

  const handleNavigation = async () => {
    setIsNavigating(true);
    // Wait for exit animation
    await new Promise(resolve => setTimeout(resolve, 800));
    navigate('/auth');
    window.location.reload();
  };

  // Animation variants for scroll-triggered elements
  const scrollVariants = {
    offscreen: {
      opacity: 0,
      y: 50,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 0.8
      }
    }
  };

  // Animation for the main container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95]
      }
    }
  };
  
  // Create refs for scroll-triggered elements
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);
  
  // Check if elements are in view
  const buttonsInView = useInView(buttonsRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  const featureCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // State for scroll position
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(1);

  // Add global styles and scroll event listener when component mounts
  React.useEffect(() => {
    // Add smooth scroll and scrollbar styles to the document
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: hsl(var(--primary) / 0.6) hsl(var(--background));
      }
      /* For Webkit browsers */
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      ::-webkit-scrollbar-track {
        background: hsl(var(--background));
        border-radius: 5px;
      }
      ::-webkit-scrollbar-thumb {
        background: hsl(var(--primary) / 0.6);
        border-radius: 5px;
        border: 2px solid hsl(var(--background));
        transition: all 0.3s ease;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: hsl(var(--primary) / 0.8);
      }
      body {
        overflow-y: auto;
        scrollbar-gutter: stable both-edges;
      }
    `;
    document.head.appendChild(style);

    // Handle scroll event for opacity effect
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate opacity based on scroll position
      const newOpacity = Math.max(0, 1 - (currentScrollY / 300));
      setOpacity(Math.min(1, Math.max(0.9, newOpacity))); // Keep opacity between 0.9 and 1
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Force scroll to top on mount
    window.scrollTo(0, 0);
    
    return () => {
      // Clean up
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isNavigating ? (
        <motion.div 
          className="min-h-screen bg-gradient-to-br from-background to-background/80 text-foreground overflow-x-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ 
            opacity: opacity,
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0">
            <style jsx global>{`
              .particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: hsl(var(--primary));
                border-radius: 50%;
                will-change: transform, opacity;
                pointer-events: none;
              }
              `}
            </style>
          </div>

          <Navbar />

          <AnimatePresence>
            {isLoaded && (
              <>
                {isLoaded && (
                  <AnimatePresence mode="wait">
                    <ColorChangingTitle />
                  </AnimatePresence>
                )}
                
                <motion.main
                  className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                >
                  {/* Main Content */}
                  <motion.div 
                    className="container max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center gap-16"
                    variants={containerVariants}
                  >
                    {/* Logo */}
                    <motion.div
                      variants={itemVariants}
                      className="relative self-start ml-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <motion.div 
                        className="w-24 h-24"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Logo />
                      </motion.div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                      ref={buttonsRef}
                      className="flex justify-center gap-8 mt-8"
                      initial="offscreen"
                      animate={buttonsInView ? "onscreen" : "offscreen"}
                      variants={scrollVariants}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <Button
                        variant="glow"
                        size="lg"
                        className="text-lg px-12 py-6 h-auto font-semibold relative"
                        onClick={handleNavigation}
                      >
                        Start Listening
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-lg px-12 py-6 h-auto font-semibold border-primary text-primary hover:bg-primary/10 relative"
                      >
                        Learn More
                      </Button>
                    </motion.div>

                    {/* Feature Cards */}
                    <motion.div
                      ref={featuresRef}
                      className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-16"
                      initial="offscreen"
                      animate={featuresInView ? "onscreen" : "offscreen"}
                      variants={scrollVariants}
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      {['Discover', 'Stream', 'Connect'].map((feature, index) => (
                        <motion.div 
                          key={feature}
                          className="p-8 rounded-lg backdrop-blur-lg bg-card/50 hover:bg-card/80 transition-all duration-300 border border-border/50 relative"
                          variants={{
                            offscreen: { opacity: 0, y: 30 },
                            onscreen: { 
                              opacity: 1, 
                              y: 0,
                              transition: {
                                delay: index * 0.15,
                                duration: 0.6
                              }
                            }
                          }}
                          whileHover={{ 
                            scale: 1.03,
                            boxShadow: '0 10px 30px -10px hsl(var(--primary) / 0.3)',
                            transition: { duration: 0.3 }
                          }}
                        >
                          <h3 className="text-2xl font-semibold text-primary mb-4">{feature}</h3>
                          <p className="text-muted-foreground">Experience music like never before with our powerful {feature.toLowerCase()} features.</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.main>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="w-32 h-32 relative">
              <div className="absolute inset-0 rounded-full border-4 border-sky-400/20 border-t-sky-400 animate-spin"></div>
              <div className="absolute inset-3 rounded-full border-4 border-sky-400/20 border-t-sky-400 animate-spin-slow"></div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-full blur-xl"></div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Home; 