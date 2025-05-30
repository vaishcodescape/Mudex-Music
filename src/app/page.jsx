'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Navbar from '../components/Navbar';

export default function Home() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background gradient
      gsap.to(backgroundRef.current, {
        backgroundPosition: '200% 200%',
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    });

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Smart Playlists",
      description: "AI-powered playlist generation based on your mood and preferences",
      icon: "🎵"
    },
    {
      title: "High Quality Audio",
      description: "Experience crystal clear sound with our premium audio streaming",
      icon: "🎧"
    },
    {
      title: "Social Sharing",
      description: "Share your favorite tracks and playlists with friends",
      icon: "🤝"
    },
    {
      title: "Offline Mode",
      description: "Download your music and listen anywhere, anytime",
      icon: "📱"
    },
    {
      title: "Artist Discovery",
      description: "Find new artists and tracks tailored to your taste",
      icon: "🔍"
    },
    {
      title: "Cross Platform",
      description: "Seamlessly switch between devices while listening",
      icon: "🔄"
    }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-sky-900 via-black to-purple-900 bg-[length:400%_400%]"
      />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent"
            >
              Welcome to Mudex Music
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-sky-200 mb-8"
            >
              Elevate the underrated
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="flex justify-center gap-4"
            >
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full transition-colors">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-sky-400 text-sky-400 hover:bg-sky-400/10 px-8 py-3 rounded-full transition-colors">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-sky-200 mb-12 text-center">Why Choose Mudex Music?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-sky-900/30 backdrop-blur-md rounded-xl p-6 cursor-pointer border border-sky-500/20 hover:border-sky-400/40 transition-all"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-sky-200 mb-2">{feature.title}</h3>
                  <p className="text-sky-300/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
