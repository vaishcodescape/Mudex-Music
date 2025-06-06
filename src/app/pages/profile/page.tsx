'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiEdit2, FiSettings, FiMusic, FiHeart, FiList } from 'react-icons/fi';

interface UserProfile {
  username: string;
  email: string;
  avatar: string;
  bio: string;
  stats: {
    playlists: number;
    followers: number;
    following: number;
  };
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>({
    username: 'John Doe',
    email: 'john@example.com',
    avatar: '/default-avatar.png',
    bio: 'Music enthusiast and playlist curator',
    stats: {
      playlists: 12,
      followers: 234,
      following: 156,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-xl p-8 mb-8 shadow-xl">
          <div className="flex items-center space-x-8">
            <div className="relative">
              <Image
                src={user.avatar}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-purple-500"
              />
              <button className="absolute bottom-0 right-0 bg-purple-500 p-2 rounded-full hover:bg-purple-600 transition">
                <FiEdit2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
              <p className="text-gray-400 mb-4">{user.bio}</p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.stats.playlists}</p>
                  <p className="text-gray-400">Playlists</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.stats.followers}</p>
                  <p className="text-gray-400">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.stats.following}</p>
                  <p className="text-gray-400">Following</p>
                </div>
              </div>
            </div>
            <button className="bg-purple-500 px-6 py-2 rounded-full hover:bg-purple-600 transition flex items-center space-x-2">
              <FiSettings className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="md:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <FiMusic className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Added to Playlist</p>
                      <p className="text-sm text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                  <FiMusic className="w-5 h-5 text-purple-500" />
                  <span>Create Playlist</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                  <FiHeart className="w-5 h-5 text-purple-500" />
                  <span>View Favorites</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                  <FiList className="w-5 h-5 text-purple-500" />
                  <span>My Library</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 