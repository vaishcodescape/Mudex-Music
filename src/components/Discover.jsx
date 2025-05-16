import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaHeart, FaEllipsisH, FaSearch, FaHeadphones, FaMusic } from 'react-icons/fa';

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Empty categories for now
  const categories = [
    { id: 'trending', name: 'Trending' },
    { id: 'new-releases', name: 'New Releases' },
    { id: 'top-charts', name: 'Top Charts' },
    { id: 'genres', name: 'Genres' },
    { id: 'artists', name: 'Artists' }
  ];

  // Empty playlists for now
  const featuredPlaylists = [];

  // Empty tracks for now
  const trendingTracks = [];

  const filteredTracks = [];

  return (
    <motion.div 
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Discover
          </h1>
          <div className="bg-primary/10 p-6 rounded-lg mb-6 border border-primary/20">
            <h2 className="text-2xl font-bold mb-2 text-primary">Welcome to Our Discovery Page!</h2>
            <p className="text-lg text-foreground">
              We're excited to have you explore the world of music with us. Stay tuned for amazing content coming soon!
            </p>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Explore new music, trending tracks, and curated playlists tailored to your taste.
          </p>
        </motion.div>

        <div className="mb-10">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tracks, artists, or albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>

        <div className="mb-10 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 min-w-max pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-background shadow-md shadow-primary/20'
                    : 'bg-card text-muted-foreground hover:bg-primary/10 hover:text-foreground'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {!searchQuery && (
          <motion.div 
            className="mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
            <div className="bg-card rounded-xl p-8 border border-border/50 text-center">
              <motion.div variants={fadeInUp} className="max-w-md mx-auto">
                <div className="bg-primary/10 p-4 rounded-full inline-flex mb-4">
                  <FaHeadphones className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Playlists Available</h3>
                <p className="text-muted-foreground mb-6">
                  Featured playlists will appear here once content is added to the platform.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold mb-6">
            {searchQuery ? 'Search Results' : 'Trending Tracks'}
          </h2>
          
          <div className="bg-card rounded-xl border border-border/50 p-12 text-center">
            <motion.div variants={fadeInUp} className="max-w-md mx-auto">
              {searchQuery ? (
                <>
                  <div className="bg-primary/10 p-4 rounded-full inline-flex mb-4">
                    <FaSearch className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
                  <p className="text-muted-foreground mb-6">
                    No tracks found matching your search.
                  </p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="px-6 py-2 text-primary hover:text-primary/80 border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-primary/10 p-4 rounded-full inline-flex mb-4">
                    <FaMusic className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Tracks Available</h3>
                  <p className="text-muted-foreground mb-6">
                    Trending tracks will appear here once content is added to the platform.
                  </p>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Discover;
