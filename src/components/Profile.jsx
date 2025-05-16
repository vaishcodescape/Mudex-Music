import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfilePicture from './ProfilePicture';
import { Button } from './ui/button';
import { FaArrowLeft, FaEnvelope, FaUser, FaMusic, FaHeart, FaHistory, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [previousPath, setPreviousPath] = useState('/');

  // Set the previous path when component mounts
  useEffect(() => {
    const referrer = document.referrer;
    const currentHost = `${window.location.protocol}//${window.location.host}`;
    
    // If coming from the same origin, use the path, otherwise default to home
    if (referrer && referrer.startsWith(currentHost)) {
      const path = new URL(referrer).pathname;
      if (path !== '/profile') {  // Don't set the previous path to the profile page itself
        setPreviousPath(path);
      }
    }
  }, []);

  const handleBack = () => {
    // If we have a valid previous path, go there, otherwise go to home
    if (previousPath && previousPath !== window.location.pathname) {
      navigate(previousPath);
    } else {
      navigate('/');
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile({ name, email });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleProfilePictureUpdate = async (newAvatarUrl) => {
    try {
      await updateProfile({ avatar: newAvatarUrl });
    } catch (error) {
      console.error('Failed to update profile picture:', error);
    }
  };

  const stats = [
    { label: 'Tracks Played', value: '1,234', icon: <FaMusic className="text-primary" /> },
    { label: 'Liked Songs', value: '245', icon: <FaHeart className="text-red-500" /> },
    { label: 'Listening Hours', value: '156', icon: <FaHistory className="text-amber-500" /> },
  ];

  const recentActivity = [
    { id: 1, action: 'Liked a song', time: '2 hours ago', song: 'Blinding Lights - The Weeknd' },
    { id: 2, action: 'Created a playlist', time: '1 day ago', song: 'Summer Vibes 2024' },
    { id: 3, action: 'Followed artist', time: '3 days ago', song: 'Dua Lipa' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="relative
        bg-gradient-to-b from-primary/10 to-background
        pb-16 pt-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="mr-4"
            >
              <FaArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Profile</h1>
            <div className="ml-auto">
              {isEditing ? (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      setName(user?.name || '');
                      setEmail(user?.email || '');
                    }}
                  >
                    <FaTimes className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                  >
                    <FaSave className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col items-center md:flex-row md:items-end space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative group">
              <ProfilePicture
                src={user?.avatar}
                name={user?.name || 'User'}
                size="xl"
                editable={true}
                onUpdate={handleProfilePictureUpdate}
                className="border-4 border-background shadow-lg"
              />
            </div>

            <div className="text-center md:text-left flex-1">
              {isEditing ? (
                <div className="space-y-4 max-w-md mx-auto md:mx-0">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Display Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 bg-input rounded-md border border-input focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-input rounded-md border border-input focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold">{user?.name || 'User'}</h2>
                  <p className="text-muted-foreground flex items-center justify-center md:justify-start mt-2">
                    <FaEnvelope className="mr-2 h-4 w-4" />
                    {user?.email || 'user@example.com'}
                  </p>
                  <p className="text-muted-foreground flex items-center justify-center md:justify-start mt-1">
                    <FaUser className="mr-2 h-4 w-4" />
                    Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-sm border border-border"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary/10 mr-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaHistory className="mr-2 text-primary" />
              Recent Activity
            </h3>
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <ul className="divide-y divide-border">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.song}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-4 text-center border-t border-border">
                <Button variant="ghost" className="text-primary">
                  View All Activity
                </Button>
              </div>
            </div>
          </div>

          {/* Playlists */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaMusic className="mr-2 text-primary" />
              Your Playlists
            </h3>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="space-y-3">
                {['Favorites', 'Workout Mix', 'Chill Vibes', 'Road Trip'].map((playlist, index) => (
                  <div 
                    key={playlist}
                    className="flex items-center p-2 rounded-md hover:bg-accent/50 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary mr-3">
                      <FaMusic className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{playlist}</p>
                      <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50) + 1} songs</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Create New Playlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
