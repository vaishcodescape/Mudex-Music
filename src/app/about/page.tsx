'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Feature } from '@/types';

const features: Feature[] = [
  {
    title: 'Music Discovery',
    description: 'Find new tracks and artists that match your taste',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Playlist Creation',
    description: 'Create and share your perfect playlists',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    title: 'Social Features',
    description: 'Connect with other music lovers',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            About Mudex Music
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-sky-200/70 max-w-2xl mx-auto">
            We&apos;re on a mission to revolutionize the way you discover and experience music
          </p>
        </motion.section>

        {/* What We Do */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            What We Do
          </h2>
        
          <h3 className="color-change text-3xl grid place-items-center mb-8">We Elevate the Underrated</h3>

          </div> 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-sky-500/20 hover:border-sky-500/40 transition-colors"
              >
                <div className="text-sky-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sky-200/70 text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            Join Our Community
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-sky-200/70 mb-8 max-w-2xl mx-auto">
            Be part of a vibrant community of music lovers and creators
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <Link href="/discover">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg text-base sm:text-lg font-medium transition-colors w-full sm:w-auto"
              >
                Start Discovering
              </motion.button>
            </Link>
            <Link href="/learn">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent hover:bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg text-base sm:text-lg font-medium transition-colors w-full sm:w-auto"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 