import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Navbar from './Navbar';
import { Button } from './ui/button';
import Logo from './Logo';

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
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none">
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
            className="relative min-h-screen flex flex-col items-center justify-center px-6 -mt-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="container text-center">
              {/* Centered Logo and Title */}
              <motion.div
                className="mb-16"
                variants={itemVariants}
              >
                <div className="flex flex-col items-center justify-center">
                  <motion.div 
                    className="w-40 h-40 mb-6"
                    variants={itemVariants}
                  >
                    <Logo />
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    variants={itemVariants}
                  >
                    <h1 className="text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
                      Mudex Music
                    </h1>
                    <p className="text-2xl text-muted-foreground mt-4 max-w-2xl mx-auto">
                      Your gateway to endless musical possibilities
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex justify-center gap-6 mt-12"
                variants={itemVariants}
              >
                <Button
                  variant="glow"
                  size="lg"
                  className="text-lg px-12 py-6 h-auto font-semibold"
                >
                  Start Listening
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-12 py-6 h-auto font-semibold border-primary text-primary hover:bg-primary/10"
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
                    className="p-8 rounded-lg backdrop-blur-lg bg-card/50 hover:bg-card/80 transition-colors border border-border/50"
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