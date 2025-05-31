'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Feature } from '@/types';

const features: Feature[] = [
  {
    title: 'Smart Discovery',
    description: 'Find new music that matches your taste',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Curated Playlists',
    description: 'Handpicked tracks for every mood',
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

const featuresList = [
  'Access to tracks from the rising stars of the music industry',
  'Ad-free experience',
  'Offline listening',
  'High-quality audio streaming',
  'Aritifical Intelligence powered music discovery',
  'Regular content updates',
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-28"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent tracking-tight font-sans">
            Welcome to Mudex Music
          </h1>
          <p className="text-2xl md:text-3xl text-sky-200/80 max-w-3xl mx-auto mb-10 font-light">
            Elevate the underrated
          </p>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block shadow-xl"
          >
            <Link
              href="/discover"
              className="bg-gradient-to-r from-sky-500 to-purple-500 text-white px-10 py-5 rounded-xl text-xl font-semibold shadow-lg hover:from-sky-600 hover:to-purple-600 transition-all duration-200"
            >
              Start Discovering
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-28"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-14 text-center bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent tracking-tight font-sans">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card p-8 flex flex-col items-center text-center hover:border-sky-400 transition-all duration-200"
              >
                <div className="text-sky-400 mb-5">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-2 font-sans">{feature.title}</h3>
                <p className="text-sky-200/80 text-lg font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features List */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-28"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-14 text-center bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent tracking-tight font-sans">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="card flex items-center space-x-4 p-5"
              >
                <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg font-light">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent tracking-tight font-sans">
            Ready to Get Started?
          </h2>
          <p className="text-2xl text-sky-200/80 mb-10 font-light">
            Join thousands of music lovers who are already using Mudex Music
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block shadow-xl"
            >
              <Link
                href="/sign-up"
                className="bg-gradient-to-r from-sky-500 to-purple-500 text-white px-10 py-5 rounded-xl text-xl font-semibold shadow-lg hover:from-sky-600 hover:to-purple-600 transition-all duration-200"
              >
                Get Started Now
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/learn"
                className="border-2 border-sky-500 text-sky-400 px-10 py-5 rounded-xl text-xl font-semibold hover:bg-sky-500/10 transition-all duration-200"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 