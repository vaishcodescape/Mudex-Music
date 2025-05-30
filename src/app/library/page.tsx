'use client';

import { motion } from 'framer-motion';
import { Track } from '@/types';

const tracks: Track[] = [
  {
    id: 1,
    title: 'Summer Vibes',
    artist: 'The Groove Collective',
    duration: '3:45',
  },
  {
    id: 2,
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    duration: '4:20',
  },
  {
    id: 3,
    title: 'Electric Soul',
    artist: 'Neon Pulse',
    duration: '3:55',
  },
];

export default function Library() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Library Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            Your Library
          </h1>
          <p className="text-sky-200/70 text-lg">
            All your favorite tracks in one place
          </p>
        </motion.section>

        {/* Tracks List */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            {tracks.map((track) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-sky-500/20 hover:border-sky-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{track.title}</h3>
                    <p className="text-sky-200/70">{track.artist}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sky-200/50">{track.duration}</span>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Play
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
} 