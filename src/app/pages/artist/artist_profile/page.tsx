"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';
import Image from 'next/image';
import { FiMusic, FiEdit2, FiLink, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

interface ArtistStats {
  totalSongs: number;
  totalPlays: number;
  followers: number;
  following: number;
}

interface ArtistProfile {
  bio: string;
  instagram: string;
  twitter: string;
  youtube: string;
  username: string;
}

export default function ArtistProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<ArtistStats>({
    totalSongs: 0,
    totalPlays: 0,
    followers: 0,
    following: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ArtistProfile>({
    bio: '',
    instagram: '',
    twitter: '',
    youtube: '',
    username: session?.user?.name || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/pages/signin');
    }
  }, [status, router]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = async () => {
    if (!profile.username.trim()) {
      toast.error('Username is required');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('bio', profile.bio);
      formData.append('instagram', profile.instagram);
      formData.append('twitter', profile.twitter);
      formData.append('youtube', profile.youtube);
      formData.append('username', profile.username);
      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }

      const response = await fetch('/api/artist/update-profile', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update profile');
      }

      const data = await response.json();
      // Update session with new user data
      if (data.user) {
        // Force a session update
        await fetch('/api/auth/session', { method: 'GET' });
      }

      toast.success('Profile updated successfully');
      setIsEditing(false);
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
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
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/pages/artist/artist_dashboard">
            <Button variant="outline" size="sm">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Profile Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/50">
                <Image
                  src={imagePreview || session?.user?.image || '/default-avatar.png'}
                  alt={session?.user?.name || 'Artist'}
                  fill
                  className="object-cover"
                />
              </div>
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <Button variant="primary" size="sm" className="flex items-center gap-2">
                      <FiEdit2 className="w-4 h-4" />
                      Change Photo
                    </Button>
                  </label>
                </div>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your username"
                  />
                </div>
              ) : (
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {profile.username}
                </h1>
              )}
              <p className="text-gray-400 mb-4">Artist</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={isEditing ? handleEditProfile : () => setIsEditing(true)}
                  loading={isLoading}
                >
                  <FiEdit2 className="w-4 h-4" />
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FiLink className="w-4 h-4" />
                  Share Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-400 mb-2">Total Songs</h3>
            <p className="text-3xl font-bold text-blue-400">{stats.totalSongs}</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-400 mb-2">Total Plays</h3>
            <p className="text-3xl font-bold text-purple-400">{stats.totalPlays}</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-400 mb-2">Followers</h3>
            <p className="text-3xl font-bold text-cyan-400">{stats.followers}</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-400 mb-2">Following</h3>
            <p className="text-3xl font-bold text-green-400">{stats.following}</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 mb-8">
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Social Links
          </h2>
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={profile.instagram}
                    onChange={(e) => setProfile(prev => ({ ...prev, instagram: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter Instagram username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Twitter
                  </label>
                  <input
                    type="text"
                    value={profile.twitter}
                    onChange={(e) => setProfile(prev => ({ ...prev, twitter: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter Twitter username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    YouTube
                  </label>
                  <input
                    type="text"
                    value={profile.youtube}
                    onChange={(e) => setProfile(prev => ({ ...prev, youtube: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter YouTube channel URL"
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-wrap gap-4">
                {profile.instagram && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FiInstagram className="w-4 h-4" />
                    Instagram
                  </Button>
                )}
                {profile.twitter && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FiTwitter className="w-4 h-4" />
                    Twitter
                  </Button>
                )}
                {profile.youtube && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FiYoutube className="w-4 h-4" />
                    YouTube
                  </Button>
                )}
                {!profile.instagram && !profile.twitter && !profile.youtube && (
                  <p className="text-gray-400">No social links added yet</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* About */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About
          </h2>
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
              placeholder="Tell us about yourself..."
              rows={4}
            />
          ) : (
            <p className="text-gray-400">
              {profile.bio || 'No bio added yet. Click the Edit Profile button to add your bio.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
