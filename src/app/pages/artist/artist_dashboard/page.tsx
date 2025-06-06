"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { FiMusic, FiUpload, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverImage: string;
  audioUrl: string;
  uploadDate: string;
}

export default function ArtistDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [songs, setSongs] = useState<Song[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    artist: '',
    genre: '',
    description: '',
  });

  const fetchSongs = async () => {
    try {
      const response = await fetch('/api/songs/artist');
      if (!response.ok) {
        throw new Error('Failed to fetch songs');
      }
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error);
      toast.error('Failed to load songs');
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/pages/signin');
    } else if (status === 'authenticated') {
      fetchSongs();
    }
  }, [status, router]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'cover') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'audio') {
        setSelectedFile(file);
      } else {
        setSelectedCover(file);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadForm.title || !uploadForm.artist) {
      toast.error('Please fill in all required fields and select a song file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('audio', selectedFile);
      if (selectedCover) {
        formData.append('cover', selectedCover);
      }
      formData.append('title', uploadForm.title);
      formData.append('artist', uploadForm.artist);
      formData.append('genre', uploadForm.genre);
      formData.append('description', uploadForm.description);

      const response = await fetch('/api/songs/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload song');
      }

      const song = await response.json();
      
      // Update the songs list
      setSongs(prev => [...prev, song]);
      
      toast.success('Song uploaded successfully');
      setShowUploadModal(false);
      setSelectedFile(null);
      setSelectedCover(null);
      setUploadForm({
        title: '',
        artist: '',
        genre: '',
        description: '',
      });
    } catch (error) {
      console.error('Error uploading song:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload song');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white animate-page-fade-in relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-particle opacity-30"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-blue-300 rounded-full animate-particle opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-64 left-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-particle opacity-20" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-particle opacity-35" style={{animationDelay: '6s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Artist Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Link href="/pages/artist/artist_profile">
              <Button
                variant="outline"
                size="md"
                className="flex items-center space-x-2"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={session?.user?.image || '/default-avatar.png'}
                    alt={session?.user?.name || 'Artist'}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>Profile</span>
              </Button>
            </Link>
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2"
            >
              <FiUpload className="w-5 h-5" />
              <span>Upload Song</span>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-400 mb-2">Total Songs</h3>
            <p className="text-3xl font-bold text-blue-400">0</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-400 mb-2">Total Plays</h3>
            <p className="text-3xl font-bold text-purple-400">0</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-400 mb-2">Followers</h3>
            <p className="text-3xl font-bold text-cyan-400">0</p>
          </div>
          
        </div>

        {/* Songs List */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Your Songs
          </h2>
          {songs.length === 0 ? (
            <div className="text-center py-12">
              <FiMusic className="w-12 h-12 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">No songs uploaded yet</p>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowUploadModal(true)}
                className="mt-4"
              >
                Upload Your First Song
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {songs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={song.coverImage}
                        alt={song.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{song.title}</h3>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400">{song.duration}</span>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button className="text-red-400 hover:text-red-300 transition-colors duration-200">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 w-full max-w-2xl mx-4">
            <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Upload New Song
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Song Title
                </label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter song title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Artist Name
                </label>
                <input
                  type="text"
                  value={uploadForm.artist}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, artist: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter artist name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Genre
                </label>
                <input
                  type="text"
                  value={uploadForm.genre}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, genre: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter genre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter song description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Song File
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileSelect(e, 'audio')}
                  className="hidden"
                  id="song-upload"
                />
                <label
                  htmlFor="song-upload"
                  className="w-full flex items-center justify-center px-4 py-2 border border-slate-700 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200"
                >
                  <span className="text-gray-300">
                    {selectedFile ? selectedFile.name : 'Choose song file'}
                  </span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, 'cover')}
                  className="hidden"
                  id="cover-upload"
                />
                <label
                  htmlFor="cover-upload"
                  className="w-full flex items-center justify-center px-4 py-2 border border-slate-700 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200"
                >
                  <span className="text-gray-300">
                    {selectedCover ? selectedCover.name : 'Choose cover image'}
                  </span>
                </label>
              </div>
              {isUploading && (
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
              <div className="flex justify-end space-x-4">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleUpload}
                  loading={isUploading}
                >
                  Upload Song
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
