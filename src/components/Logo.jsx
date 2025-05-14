import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Logo = () => {
  const containerRef = useRef(null);
  const recordRef = useRef(null);
  const groovesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous rotation for the record
      gsap.to(recordRef.current, {
        rotate: 360,
        duration: 8,
        repeat: -1,
        ease: "none"
      });

      // Subtle pulsing animation for the grooves
      gsap.to(groovesRef.current, {
        scale: 1.02,
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-32 h-32"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-sky-400 opacity-20 blur-xl animate-pulse"></div>
      
      {/* Vinyl record base */}
      <motion.div
        ref={recordRef}
        className="absolute inset-0 bg-black rounded-full shadow-2xl"
        style={{
          boxShadow: "0 0 30px rgba(186, 230, 253, 0.3)"
        }}
      >
        {/* Record label */}
        <div className="absolute inset-1/4 bg-sky-100 rounded-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-sky-300"></div>
          <div className="absolute inset-[30%] bg-sky-400/20 rounded-full border-2 border-sky-400/40"></div>
          <div className="absolute w-3 h-3 bg-black rounded-full"></div>
        </div>

        {/* Record grooves */}
        <motion.div
          ref={groovesRef}
          className="absolute inset-0"
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-sky-400/20"
              style={{
                transform: `scale(${1 - i * 0.08})`
              }}
            />
          ))}
        </motion.div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-transparent rounded-full"></div>
      </motion.div>

      {/* Animated particles */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1.5 h-1.5 bg-sky-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
            rotate: 360
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "linear"
          }}
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${index * 60}deg) translateX(${55}px)`,
            boxShadow: "0 0 10px rgba(186, 230, 253, 0.5)"
          }}
        />
      ))}

      {/* Sound wave effect */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="w-1 h-4 bg-sky-400 rounded-full"
            animate={{
              height: ["16px", "8px", "16px"],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "linear"
            }}
            style={{
              boxShadow: "0 0 8px rgba(186, 230, 253, 0.5)"
            }}
          />
        ))}
      </div>

      {/* Reflection highlights */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(186, 230, 253, 0.2) 0%, transparent 40%)",
            "linear-gradient(45deg, rgba(186, 230, 253, 0.1) 10%, transparent 50%)",
            "linear-gradient(45deg, rgba(186, 230, 253, 0.2) 0%, transparent 40%)"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

export default Logo; 