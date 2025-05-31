'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  ArrowLeft, 
  Music, 
  Upload, 
  Save,
  Search,
  Plus,
  X
} from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  album: string;
}

function CreatePlaylistContent() {
  const [playlistData, setPlaylistData] = useState({
    name: '',
    description: '',
    coverImage: null as File | null,
    isPublic: true
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [availableTracks] = useState<Track[]>([
    { id: 1, title: "Midnight Dreams", artist: "Luna Eclipse", duration: "3:42", album: "Nocturnal" },
    { id: 2, title: "Urban Pulse", artist: "City Beats", duration: "4:15", album: "Street Symphony" },
    { id: 3, title: "Ocean Waves", artist: "Serene Sounds", duration: "5:23", album: "Nature's Call" },
    { id: 4, title: "Electric Nights", artist: "Neon Vibes", duration: "3:58", album: "Digital Dreams" },
    { id: 5, title: "Mountain High", artist: "Alpine Echo", duration: "4:32", album: "Peak Experience" }
  ]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setPlaylistData(prev => ({ ...prev, [field]: value }));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPlaylistData(prev => ({ ...prev, coverImage: file }));
    }
  };

  const addTrack = (track: Track) => {
    if (!selectedTracks.find(t => t.id === track.id)) {
      setSelectedTracks(prev => [...prev, track]);
    }
  };

  const removeTrack = (trackId: number) => {
    setSelectedTracks(prev => prev.filter(t => t.id !== trackId));
  };

  const handleCreatePlaylist = () => {
    // Here you would typically send the data to your backend
    alert('Playlist created successfully!');
  };

  const filteredTracks = availableTracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
                Create Playlist
              </h1>
              <p className="text-sky-200/70 mt-2">Build your perfect music collection</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Playlist Details */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6 border border-sky-500/20">
                <h2 className="text-xl font-semibold mb-6">Playlist Details</h2>
                
                {/* Cover Image */}
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 bg-sky-500/30 rounded-lg flex items-center justify-center">
                      {playlistData.coverImage ? (
                        <img
                          src={URL.createObjectURL(playlistData.coverImage)}
                          alt="Playlist cover"
                          className="w-32 h-32 rounded-lg object-cover"
                        />
                      ) : (
                        <Music className="w-16 h-16 text-sky-400" />
                      )}
                    </div>
                    <label className="absolute bottom-2 right-2 p-2 bg-sky-500 rounded-full cursor-pointer hover:bg-sky-600 transition-colors">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Choose Cover Image</h3>
                    <p className="text-sky-200/70 text-sm">Upload an image to represent your playlist</p>
                  </div>
                </div>

                {/* Playlist Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-sky-200/70 mb-2">
                    Playlist Name *
                  </label>
                  <input
                    type="text"
                    value={playlistData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-sky-500/20 rounded-lg text-white placeholder-sky-200/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                    placeholder="My Awesome Playlist"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-sky-200/70 mb-2">
                    Description
                  </label>
                  <textarea
                    value={playlistData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-sky-500/20 rounded-lg text-white placeholder-sky-200/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all resize-none"
                    placeholder="Describe your playlist..."
                  />
                </div>

                {/* Privacy Setting */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-sky-200/70 mb-3">
                    Privacy
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="privacy"
                        checked={playlistData.isPublic}
                        onChange={() => handleInputChange('isPublic', true)}
                        className="mr-3 text-sky-500 focus:ring-sky-500"
                      />
                      <div>
                        <span className="font-medium">Public</span>
                        <p className="text-sm text-sky-200/70">Anyone can search for and view this playlist</p>
                      </div>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="privacy"
                        checked={!playlistData.isPublic}
                        onChange={() => handleInputChange('isPublic', false)}
                        className="mr-3 text-sky-500 focus:ring-sky-500"
                      />
                      <div>
                        <span className="font-medium">Private</span>
                        <p className="text-sm text-sky-200/70">Only you can view this playlist</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Selected Tracks Summary */}
                <div className="border-t border-sky-500/20 pt-4">
                  <h3 className="font-semibold mb-2">Playlist Summary</h3>
                  <div className="space-y-2 text-sm text-sky-200/70">
                    <div className="flex justify-between">
                      <span>Total tracks:</span>
                      <span>{selectedTracks.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated duration:</span>
                      <span>
                        {selectedTracks.reduce((total, track) => {
                          const [minutes, seconds] = track.duration.split(':').map(Number);
                          return total + minutes * 60 + seconds;
                        }, 0) > 0 
                          ? `${Math.floor(selectedTracks.reduce((total, track) => {
                              const [minutes, seconds] = track.duration.split(':').map(Number);
                              return total + minutes * 60 + seconds;
                            }, 0) / 60)}:${String(selectedTracks.reduce((total, track) => {
                              const [minutes, seconds] = track.duration.split(':').map(Number);
                              return total + minutes * 60 + seconds;
                            }, 0) % 60).padStart(2, '0')}`
                          : '0:00'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Add Tracks */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6 border border-sky-500/20">
                <h2 className="text-xl font-semibold mb-6">Add Tracks</h2>
                
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-sky-500/20 rounded-lg text-white placeholder-sky-200/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                    placeholder="Search for tracks..."
                  />
                </div>

                {/* Available Tracks */}
                <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                  {filteredTracks.map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{track.title}</p>
                        <p className="text-sm text-sky-200/70 truncate">{track.artist} • {track.album}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-sky-200/70">{track.duration}</span>
                        <button
                          onClick={() => addTrack(track)}
                          disabled={selectedTracks.some(t => t.id === track.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            selectedTracks.some(t => t.id === track.id)
                              ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                              : 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-400'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Tracks */}
                {selectedTracks.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-4">Selected Tracks ({selectedTracks.length})</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedTracks.map((track, index) => (
                        <div
                          key={track.id}
                          className="flex items-center justify-between p-3 bg-sky-500/10 rounded-lg border border-sky-500/20"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-sky-200/50 w-6">{index + 1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{track.title}</p>
                              <p className="text-sm text-sky-200/70 truncate">{track.artist}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-sky-200/70">{track.duration}</span>
                            <button
                              onClick={() => removeTrack(track.id)}
                              className="p-1 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex justify-end space-x-4 pt-6 border-t border-sky-500/20">
            <button
              onClick={handleCreatePlaylist}
              disabled={!playlistData.name.trim()}
              className="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              Create Playlist
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CreatePlaylist() {
  return (
    <ProtectedRoute requireAuth={true} userType="listener">
      <CreatePlaylistContent />
    </ProtectedRoute>
  );
} 