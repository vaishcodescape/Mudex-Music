'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Upload, Music, BarChart2, Plus, Trash2 } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  genre: string;
  plays: number;
  likes: number;
  uploadDate: string;
  fileUrl?: string;
}

function ArtistDashboardContent() {
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 1,
      title: 'Sunset Drive',
      genre: 'Electronic',
      plays: 1200,
      likes: 340,
      uploadDate: '2024-06-01',
    },
    {
      id: 2,
      title: 'Midnight Groove',
      genre: 'Jazz',
      plays: 800,
      likes: 210,
      uploadDate: '2024-05-20',
    },
  ]);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    genre: '',
    file: null as File | null,
  });
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string | File | null) => {
    setUploadForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!uploadForm.title || !uploadForm.genre || !uploadForm.file) {
      setError('Please fill in all fields and select a file.');
      return;
    }
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setTracks((prev) => [
        {
          id: Math.random(),
          title: uploadForm.title,
          genre: uploadForm.genre,
          plays: 0,
          likes: 0,
          uploadDate: new Date().toISOString().slice(0, 10),
          fileUrl: URL.createObjectURL(uploadForm.file!),
        },
        ...prev,
      ]);
      setUploadForm({ title: '', genre: '', file: null });
      setUploading(false);
    }, 1200);
  };

  const handleDelete = (id: number) => {
    setTracks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="space-y-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-sky-500/20 shadow-2xl"
        >
          {/* Header */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
                Artist Dashboard
              </h1>
              <p className="text-sky-200/70 mt-2">Upload your music and track your stats</p>
            </div>
          </motion.div>

          {/* Upload Track */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white/5 rounded-xl p-6 border border-sky-500/20 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-sky-400" /> Upload New Track
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Track Title</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-sky-500/30 rounded-lg focus:outline-none focus:border-sky-400 transition-colors"
                  placeholder="Enter track title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <input
                  type="text"
                  value={uploadForm.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-sky-500/30 rounded-lg focus:outline-none focus:border-sky-400 transition-colors"
                  placeholder="e.g. Electronic, Jazz, Pop"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Track File</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleInputChange('file', e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 bg-white/10 border border-sky-500/30 rounded-lg focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <button
                type="submit"
                disabled={uploading}
                className="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Upload Track
              </button>
            </form>
          </motion.div>

          {/* Song Stats */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6 border border-sky-500/20 flex flex-col items-center">
              <BarChart2 className="w-8 h-8 text-sky-400 mb-2" />
              <div className="text-2xl font-bold">{tracks.reduce((a, t) => a + t.plays, 0)}</div>
              <div className="text-sky-200/70">Total Plays</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-sky-500/20 flex flex-col items-center">
              <Music className="w-8 h-8 text-sky-400 mb-2" />
              <div className="text-2xl font-bold">{tracks.length}</div>
              <div className="text-sky-200/70">Tracks Uploaded</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-sky-500/20 flex flex-col items-center">
              <Plus className="w-8 h-8 text-sky-400 mb-2" />
              <div className="text-2xl font-bold">{tracks.reduce((a, t) => a + t.likes, 0)}</div>
              <div className="text-sky-200/70">Total Likes</div>
            </div>
          </motion.div>

          {/* Uploaded Tracks List */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Music className="w-5 h-5 mr-2 text-sky-400" /> Your Uploaded Tracks
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white/5 rounded-xl border border-sky-500/20">
                <thead>
                  <tr className="text-sky-200/70 text-left">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Genre</th>
                    <th className="py-3 px-4">Plays</th>
                    <th className="py-3 px-4">Likes</th>
                    <th className="py-3 px-4">Uploaded</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.map((track) => (
                    <tr key={track.id} className="border-t border-sky-500/10 hover:bg-white/10 transition-colors">
                      <td className="py-3 px-4 font-medium flex items-center space-x-2">
                        <Music className="w-4 h-4 text-sky-400" />
                        <span>{track.title}</span>
                      </td>
                      <td className="py-3 px-4">{track.genre}</td>
                      <td className="py-3 px-4">{track.plays}</td>
                      <td className="py-3 px-4">{track.likes}</td>
                      <td className="py-3 px-4">{track.uploadDate}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDelete(track.id)}
                          className="p-2 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete track"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {tracks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-sky-200/50">
                        No tracks uploaded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ArtistDashboard() {
  return (
    <ProtectedRoute requireAuth={true} userType="artist">
      <ArtistDashboardContent />
    </ProtectedRoute>
  );
} 