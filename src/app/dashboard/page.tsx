'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  Music, 
  Heart, 
  Plus, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Search,
  Settings,
  User,
  Clock,
  TrendingUp,
  Shuffle
} from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  isLiked: boolean;
}

interface Playlist {
  id: number;
  name: string;
  trackCount: number;
  coverUrl: string;
  createdAt: string;
}

function DashboardContent() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'playlists' | 'liked' | 'recent'>('overview');

  // Sample data
  const recentTracks: Track[] = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Eclipse",
      album: "Nocturnal",
      duration: "3:42",
      coverUrl: "/api/placeholder/60/60",
      isLiked: true
    },
    {
      id: 2,
      title: "Urban Pulse",
      artist: "City Beats",
      album: "Street Symphony",
      duration: "4:15",
      coverUrl: "/api/placeholder/60/60",
      isLiked: false
    },
    {
      id: 3,
      title: "Ocean Waves",
      artist: "Serene Sounds",
      album: "Nature's Call",
      duration: "5:23",
      coverUrl: "/api/placeholder/60/60",
      isLiked: true
    }
  ];

  const playlists: Playlist[] = [
    {
      id: 1,
      name: "My Favorites",
      trackCount: 24,
      coverUrl: "/api/placeholder/180/180",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Workout Mix",
      trackCount: 18,
      coverUrl: "/api/placeholder/180/180",
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      name: "Chill Vibes",
      trackCount: 32,
      coverUrl: "/api/placeholder/180/180",
      createdAt: "2024-01-05"
    }
  ];

  const handlePlayPause = (track?: Track) => {
    if (track && track.id !== currentTrack?.id) {
      setCurrentTrack(track);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleLike = (trackId: string) => {
    // In a real app, this would update the backend
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-sky-500/20 shadow-2xl"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
                Welcome back!
              </h1>
              <p className="text-sky-200/70 mt-2">Discover your music, your way</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/settings"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <Link
                href="/profile"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              href="/dashboard/create-playlist"
              className="bg-gradient-to-r from-sky-500/20 to-purple-500/20 border border-sky-500/30 rounded-xl p-6 hover:from-sky-500/30 hover:to-purple-500/30 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-sky-500/30 rounded-lg group-hover:bg-sky-500/50 transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Create Playlist</h3>
                  <p className="text-sm text-sky-200/70">Start a new collection</p>
                </div>
              </div>
            </Link>

            <Link
              href="/discover"
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 hover:from-purple-500/30 hover:to-pink-500/30 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/30 rounded-lg group-hover:bg-purple-500/50 transition-colors">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Discover</h3>
                  <p className="text-sm text-purple-200/70">Find new music</p>
                </div>
              </div>
            </Link>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500/30 rounded-lg">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Liked Songs</h3>
                  <p className="text-sm text-green-200/70">32 tracks</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-500/30 rounded-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Trending</h3>
                  <p className="text-sm text-orange-200/70">Hot tracks</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div variants={itemVariants} className="border-b border-sky-500/20">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'playlists', label: 'My Playlists' },
                { id: 'liked', label: 'Liked Songs' },
                { id: 'recent', label: 'Recently Played' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-sky-400 text-sky-400'
                      : 'border-transparent text-sky-200/70 hover:text-sky-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Content Area */}
          <motion.div variants={itemVariants} className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recently Played */}
                <div className="bg-white/5 rounded-xl p-6 border border-sky-500/20">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-sky-400" />
                    Recently Played
                  </h3>
                  <div className="space-y-3">
                    {recentTracks.map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="relative">
                          <div className="w-12 h-12 bg-sky-500/30 rounded-lg flex items-center justify-center">
                            <Music className="w-6 h-6 text-sky-400" />
                          </div>
                          <button
                            onClick={() => handlePlayPause(track)}
                            className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {isPlaying && currentTrack?.id === track.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{track.title}</p>
                          <p className="text-sm text-sky-200/70 truncate">{track.artist}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-sky-200/70">{track.duration}</span>
                          <button
                            onClick={() => toggleLike(track.id.toString())}
                            className={`p-1 rounded ${
                              track.isLiked ? 'text-red-400' : 'text-sky-200/50 hover:text-sky-400'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${track.isLiked ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-6 border border-sky-500/20">
                    <h3 className="text-xl font-semibold mb-4">Your Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sky-200/70">Total Playlists</span>
                        <span className="font-semibold">{playlists.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sky-200/70">Liked Songs</span>
                        <span className="font-semibold">32</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sky-200/70">Hours Listened</span>
                        <span className="font-semibold">127</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sky-200/70">Favorite Genre</span>
                        <span className="font-semibold">Electronic</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'playlists' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">My Playlists</h3>
                  <Link
                    href="/dashboard/create-playlist"
                    className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Playlist
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {playlists.map((playlist) => (
                    <Link
                      key={playlist.id}
                      href={`/dashboard/playlist/${playlist.id}`}
                      className="bg-white/5 rounded-xl p-6 border border-sky-500/20 hover:bg-white/10 transition-colors group"
                    >
                      <div className="aspect-square bg-sky-500/30 rounded-lg mb-4 flex items-center justify-center group-hover:bg-sky-500/40 transition-colors">
                        <Music className="w-12 h-12 text-sky-400" />
                      </div>
                      <h4 className="font-semibold mb-2">{playlist.name}</h4>
                      <p className="text-sm text-sky-200/70">{playlist.trackCount} tracks</p>
                      <p className="text-xs text-sky-200/50 mt-1">
                        Created {new Date(playlist.createdAt).toLocaleDateString()}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'liked' && (
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-400 fill-current" />
                  Liked Songs
                </h3>
                <div className="bg-white/5 rounded-xl border border-sky-500/20">
                  <div className="p-6 border-b border-sky-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="p-3 bg-sky-500 rounded-full hover:bg-sky-600 transition-colors">
                          <Play className="w-6 h-6" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Shuffle className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-sky-200/70">32 songs</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {recentTracks.filter(track => track.isLiked).map((track, index) => (
                        <div
                          key={track.id}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <span className="text-sm text-sky-200/50 w-6">{index + 1}</span>
                          <div className="relative">
                            <div className="w-12 h-12 bg-sky-500/30 rounded-lg flex items-center justify-center">
                              <Music className="w-6 h-6 text-sky-400" />
                            </div>
                            <button
                              onClick={() => handlePlayPause(track)}
                              className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {isPlaying && currentTrack?.id === track.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{track.title}</p>
                            <p className="text-sm text-sky-200/70 truncate">{track.artist} • {track.album}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-sky-200/70">{track.duration}</span>
                            <button
                              onClick={() => toggleLike(track.id.toString())}
                              className="p-1 rounded text-red-400"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'recent' && (
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-sky-400" />
                  Recently Played
                </h3>
                <div className="bg-white/5 rounded-xl p-6 border border-sky-500/20">
                  <div className="space-y-3">
                    {recentTracks.map((track, index) => (
                      <div
                        key={track.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <span className="text-sm text-sky-200/50 w-6">{index + 1}</span>
                        <div className="relative">
                          <div className="w-12 h-12 bg-sky-500/30 rounded-lg flex items-center justify-center">
                            <Music className="w-6 h-6 text-sky-400" />
                          </div>
                          <button
                            onClick={() => handlePlayPause(track)}
                            className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {isPlaying && currentTrack?.id === track.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{track.title}</p>
                          <p className="text-sm text-sky-200/70 truncate">{track.artist} • {track.album}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-sky-200/70">{track.duration}</span>
                          <button
                            onClick={() => toggleLike(track.id.toString())}
                            className={`p-1 rounded ${
                              track.isLiked ? 'text-red-400' : 'text-sky-200/50 hover:text-sky-400'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${track.isLiked ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute requireAuth={true} userType="listener">
      <DashboardContent />
    </ProtectedRoute>
  );
} 