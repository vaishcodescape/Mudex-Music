import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Navbar from './Navbar';
import { Button } from './ui/button';
import Logo from './Logo';

const ColorChangingHeading = () => {
  return (
    <motion.div
      className="relative z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1 
        className="text-7xl font-bold tracking-tight"
        style={{ textShadow: "0 0 30px rgba(56, 189, 248, 0.5)" }}
      >
        <motion.span
          className="inline-block"
          animate={{
            color: [
              "rgb(56, 189, 248)", // sky-400
              "rgb(139, 92, 246)", // violet-500
              "rgb(14, 165, 233)", // sky-600
              "rgb(56, 189, 248)", // back to sky-400
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          Mudex
        </motion.span>{" "}
        <motion.span
          className="inline-block bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(to right, rgb(56, 189, 248), rgb(139, 92, 246))",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          Music
        </motion.span>
      </motion.h1>
      <motion.div
        className="mt-3 text-lg font-medium tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.span
          className="bg-gradient-to-r from-sky-400/60 via-violet-400/60 to-sky-400/60 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            backgroundSize: "200% 100%",
          }}
        >
          Elevate the Underrated
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  const particlesRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    }, particlesRef); // Scope GSAP to our particle container

    return () => ctx.revert(); // This will clean up all GSAP animations
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.01, -0.05, 0.95]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 text-foreground overflow-hidden">
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0">
        <style>
          {`
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
          <motion.main
            className="relative min-h-screen flex flex-col items-center justify-center px-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Background Title */}
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none"
              variants={itemVariants}
              style={{ zIndex: 0 }}
            >
              <h1 className="text-[12rem] font-bold opacity-10 whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-primary/40 via-primary/30 to-primary/40">
                MUDEX MUSIC
              </h1>
            </motion.div>

            <motion.div className="container relative z-10 text-center mt-0">
              <div className="flex flex-col md:flex-row items-center justify-center gap-16 mb-20">
                {/* Logo on the left */}
                <motion.div
                  className="relative"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="w-48 h-48 relative"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Logo />
                  </motion.div>
                </motion.div>

                {/* Color Changing Heading */}
                <motion.div
                  variants={itemVariants}
                  className="flex-1 min-w-[400px]"
                >
                  <ColorChangingHeading />
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div 
                className="flex justify-center gap-8 mt-16"
                variants={itemVariants}
              >
                <Button
                  variant="glow"
                  size="lg"
                  className="text-lg px-12 py-6 h-auto font-semibold relative"
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
                className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                variants={containerVariants}
              >
                {['Discover', 'Stream', 'Connect'].map((feature, index) => (
                  <motion.div 
                    key={feature}
                    className="p-8 rounded-lg backdrop-blur-lg bg-card/50 hover:bg-card/80 transition-colors border border-border/50 relative"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 20px hsl(var(--primary) / 0.2)'
                    }}
                  >
                    <h3 className="text-2xl font-semibold text-primary mb-4">{feature}</h3>
                    <p className="text-muted-foreground">Experience music like never before with our powerful {feature.toLowerCase()} features.</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home; 