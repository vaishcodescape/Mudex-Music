'use client';

import { motion } from 'framer-motion';
import { Playlist } from '@/types';

const playlists: Playlist[] = [
  {
    id: 1,
    name: 'My Favorites',
    description: 'Your favorite tracks all in one place',
    trackCount: 24,
  },
  {
    id: 2,
    name: 'Recently Played',
    description: 'Tracks you\'ve been listening to',
    trackCount: 18,
  },
  {
    id: 3,
    name: 'Discover Weekly',
    description: 'Weekly recommendations based on your taste',
    trackCount: 30,
  },
];

export default function Profile() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Profile Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500 to-purple-500" />
            <div>
              <h1 className="text-3xl font-bold mb-2">John Doe</h1>
              <p className="text-sky-200/70">Music enthusiast</p>
            </div>
          </div>
        </motion.section>

        {/* Playlists Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            Your Playlists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-sky-500/20 hover:border-sky-500/40 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{playlist.name}</h3>
                <p className="text-sky-200/70 mb-4">{playlist.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-sky-200/50">{playlist.trackCount} tracks</span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Play
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
} 