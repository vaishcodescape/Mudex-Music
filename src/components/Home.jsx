import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from './Navbar';
import { Button } from './ui/button';
import Logo from './Logo';
import ColorChangingTitle from './ColorChangingTitle';
import { FaGithub } from 'react-icons/fa';
import Scrollbar from './ui/Scrollbar';

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
      y: 20,
    },
    onscreen: {
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
    hidden: { y: 20 },
    visible: { 
      y: 0, 
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
    hidden: { y: 20 },
    visible: { 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isNavigating ? (
        <motion.div 
          className="fixed inset-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="fixed inset-0 bg-gradient-to-br from-background to-background/80 -z-10" />
          <Scrollbar>
            <div className="min-h-screen w-full">
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
                  className="relative min-h-[calc(100vh-80px)] flex flex-col items-center px-6 py-16"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                >
                  {/* Main Content */}
                  <motion.div 
                    className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-16"
                    variants={containerVariants}
                  >
                    {/* Action Buttons */}
                    <motion.div 
                      ref={buttonsRef}
                      className="flex flex-wrap justify-center gap-8 mt-8 w-full"
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={scrollVariants}
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
                      className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-16 px-4"
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={scrollVariants}
                    >
                      {['Discover', 'Stream', 'Connect'].map((feature, index) => (
                        <motion.div 
                          key={feature}
                          className="p-8 rounded-lg backdrop-blur-lg bg-card/50 hover:bg-card/80 transition-all duration-300 border border-border/50 relative h-full"
                          variants={{
                            offscreen: { y: 30 },
                            onscreen: { 
                              y: 0,
                              transition: { 
                                type: 'spring', 
                                bounce: 0.3, 
                                duration: 0.8,
                                delay: index * 0.1
                              } 
                            }
                          }}
                          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                        >
                          <h3 className="text-xl font-bold mb-3">{feature}</h3>
                          <p className="text-muted-foreground">
                            {feature === 'Discover' && 'Find new music tailored to your taste'}
                            {feature === 'Stream' && 'High-quality audio streaming anywhere'}
                            {feature === 'Connect' && 'Share and connect with other music lovers'}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Additional Sections */}
                    <motion.section 
                      className="w-full mt-32 py-20 px-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Music, Your Way</h2>
                      <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
                        Experience music like never before with our intuitive interface and powerful features.
                        Create playlists, discover new artists, and take your music with you wherever you go.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {[
                          { icon: '🎵', title: 'Unlimited Songs', desc: 'Access millions of tracks' },
                          { icon: '🎧', title: 'High Quality', desc: 'Premium audio quality' },
                          { icon: '📱', title: 'Cross Platform', desc: 'Available on all devices' },
                          { icon: '🔒', title: 'Ad-Free', desc: 'Uninterrupted listening' }
                        ].map((item, i) => (
                          <motion.div 
                            key={i}
                            className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30 hover:bg-card/50 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                          >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground text-sm">{item.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>

                    <motion.section 
                      className="w-full py-20 px-4 text-center bg-gradient-to-br from-card/20 to-transparent rounded-2xl my-16"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
                      <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Join thousands of music lovers already enjoying the best listening experience.
                      </p>
                      <Button 
                        variant="glow"
                        size="lg"
                        className="text-lg px-12 py-6 h-auto font-semibold relative"
                        onClick={handleNavigation}
                      >
                        Start Your Free Trial
                      </Button>
                      <p className="text-sm text-muted-foreground mt-4">No credit card required</p>
                    </motion.section>
                  </motion.div>
                </motion.main>
              </>
            )}
          </AnimatePresence>
              </div>
            </Scrollbar>
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