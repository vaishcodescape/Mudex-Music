"use client";
import { motion } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';

interface CommunityPost {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  type: 'playlist' | 'track' | 'discussion';
}

type TabType = 'all' | 'playlist' | 'track' | 'discussion';

const posts: CommunityPost[] = [
  {
    id: '1',
    user: {
      name: 'Alex Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    content: 'Just created a new playlist "Summer Vibes 2024" 🎵 Check it out!',
    likes: 42,
    comments: 12,
    timestamp: '2h ago',
    type: 'playlist',
  },
  {
    id: '2',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    content: 'What are your thoughts on the new album from The Midnight?',
    likes: 28,
    comments: 15,
    timestamp: '4h ago',
    type: 'discussion',
  },
  {
    id: '3',
    user: {
      name: 'Marcus Williams',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    content: 'Sharing my favorite track of the week: "Midnight City" by M83',
    likes: 56,
    comments: 8,
    timestamp: '6h ago',
    type: 'track',
  },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'all') return true;
    return post.type === activeTab;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            Community
          </h1>
          <p className="text-xl text-sky-200/70 max-w-2xl mx-auto">
            Connect with music lovers, share your playlists, and discover new tracks
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar />
          </div>
          
          {/* Filter Tabs */}
          <div className="flex justify-center space-x-4 mb-8">
            {(['all', 'playlist', 'track', 'discussion'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-sky-500 text-white'
                    : 'bg-white/5 text-sky-200/70 hover:bg-white/10'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post: CommunityPost, index: number) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-sky-500/20 hover:border-sky-500/40 transition-colors"
            >
              {/* User Info */}
              <div className="flex items-center mb-4">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium text-white">{post.user.name}</div>
                  <div className="text-sm text-sky-200/50">{post.timestamp}</div>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-sky-200/70 mb-4">{post.content}</p>

              {/* Post Type Badge */}
              <div className="inline-block px-3 py-1 rounded-full text-sm mb-4 bg-sky-500/20 text-sky-400">
                {post.type}
              </div>

              {/* Interaction Buttons */}
              <div className="flex items-center space-x-4 text-sky-200/70">
                <button className="flex items-center space-x-1 hover:text-sky-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-sky-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-sky-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Post Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="fixed bottom-8 right-8 bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-full shadow-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>
      </div>
    </main>
  );
}