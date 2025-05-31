"use client";

import { motion } from 'framer-motion';
import { Genre } from '@/types';
import SearchBar from '@/components/SearchBar';

const genres: Genre[] = [
  {
    name: 'Pop',
    description: 'The latest hits and chart-toppers',
    color: 'from-pink-500 to-purple-500',
  },
  {
    name: 'Rock',
    description: 'Classic and contemporary rock anthems',
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'Hip Hop',
    description: 'Fresh beats and lyrical masterpieces',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Electronic',
    description: 'Pulsating rhythms and electronic soundscapes',
    color: 'from-green-500 to-teal-500',
  },
  {
    name: 'Jazz',
    description: 'Smooth melodies and improvisational brilliance',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Classical',
    description: 'Timeless compositions and orchestral masterpieces',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function Discover() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            Discover New Music
          </h1>
          <p className="text-xl text-sky-200/70 max-w-2xl mx-auto">
            Explore different genres and find your next favorite track
          </p>
        </motion.section>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <SearchBar />
        </div>

        {/* Genres Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            Browse by Genre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genres.map((genre, index) => (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${genre.color} rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer`}
              >
                <h3 className="text-2xl font-bold mb-2">{genre.name}</h3>
                <p className="text-white/80">{genre.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Playlists */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            Featured Playlists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-sky-500/20 hover:border-sky-500/40 transition-colors"
              >
                <div className="aspect-square bg-gradient-to-br from-sky-500 to-purple-500 rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2">Featured Playlist {index}</h3>
                <p className="text-sky-200/70 mb-4">A curated selection of tracks for your listening pleasure</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Play Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
} 