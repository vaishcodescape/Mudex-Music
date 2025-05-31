'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  ArrowLeft, 
  Camera, 
  Eye, 
  EyeOff, 
  Save,
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Database,
  Globe,
  Users
} from 'lucide-react';

function SettingsContent() {
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    bio: 'Music enthusiast and playlist curator. Always discovering new sounds.',
    email: 'alex.johnson@email.com',
    profilePicture: null as File | null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newReleases: true,
    playlistUpdates: true,
    emailNotifications: true,
    pushNotifications: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public' as 'public' | 'friends' | 'private',
    shareListeningActivity: true,
    allowDataCollection: false
  });

  const [activeSection, setActiveSection] = useState<'profile' | 'account' | 'notifications' | 'privacy'>('profile');

  const handleUpdateProfile = () => {
    // In a real app, this would update the backend
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    // In a real app, this would update the backend
    alert('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileData(prev => ({ ...prev, profilePicture: file }));
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/dashboard"
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'account', label: 'Account', icon: Mail },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'privacy', label: 'Privacy', icon: Shield }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-sky-200/70 hover:bg-white/5 hover:text-sky-400'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              className="bg-white/5 rounded-xl p-6 border border-sky-500/20"
            >
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <User className="w-6 h-6 mr-3 text-sky-400" />
                    Profile Settings
                  </h2>

                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-sky-500/30 rounded-full flex items-center justify-center">
                        <User className="w-12 h-12 text-sky-400" />
                      </div>
                      <label
                        htmlFor="profile-picture"
                        className="absolute bottom-0 right-0 p-2 bg-sky-500 rounded-full cursor-pointer hover:bg-sky-600 transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                      </label>
                      <input
                        id="profile-picture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">Profile Picture</h3>
                      <p className="text-sm text-sky-200/70">Upload a photo to personalize your profile</p>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Display Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-sky-500/30 rounded-lg focus:outline-none focus:border-sky-400 transition-colors"
                      placeholder="Enter your display name"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => {
                        if (e.target.value.length <= 160) {
                          setProfileData(prev => ({ ...prev, bio: e.target.value }));
                        }
                      }}
                      className="w-full px-4 py-3 bg-white/10 border border-sky-500/30 rounded-lg focus:outline-none focus:border-sky-400 transition-colors resize-none"
                      rows={3}
                      placeholder="Tell others about yourself..."
                    />
                    <div className="text-sm text-sky-200/70 mt-1">
                      {profileData.bio.length}/160 characters
                    </div>
                  </div>

                  <button
                    onClick={handleUpdateProfile}
                    className="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}

              {activeSection === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-sky-400" />
                    Account Settings
                  </h2>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-sky-500/30 rounded-lg focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  {/* Password Change */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Change Password</h3>
                    
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2">Current Password</label>
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-12 bg-white/10 border border-sky-500/30 rounded-lg focus:outline-none focus:border-sky-400 transition-colors"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-3 top-10 text-sky-200/70 hover:text-sky-400 transition-colors"
                      >
                        {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium mb-2">New Password</label>
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-12 bg-white/10 border border-sky-500/30 rounded-lg focus:outline-none focus:border-sky-400 transition-colors"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-10 text-sky-200/70 hover:text-sky-400 transition-colors"
                      >
                        {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-12 bg-white/10 border border-sky-500/30 rounded-lg focus:outline-none focus:border-sky-400 transition-colors"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-10 text-sky-200/70 hover:text-sky-400 transition-colors"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Update Password
                    </button>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <Bell className="w-6 h-6 mr-3 text-sky-400" />
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    {Object.entries(notificationSettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <h3 className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <p className="text-sm text-sky-200/70">
                            {key === 'newReleases' && 'Get notified about new music releases from your favorite artists'}
                            {key === 'playlistUpdates' && 'Receive updates when your playlists are modified'}
                            {key === 'emailNotifications' && 'Receive notifications via email'}
                            {key === 'pushNotifications' && 'Get push notifications on your device'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setNotificationSettings(prev => ({
                              ...prev,
                              [key]: e.target.checked
                            }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-sky-400" />
                    Privacy & Security
                  </h2>

                  {/* Profile Visibility */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Profile Visibility</h3>
                    <div className="space-y-3">
                      {[
                        { value: 'public', label: 'Public', description: 'Anyone can see your profile and playlists', icon: Globe },
                        { value: 'friends', label: 'Friends Only', description: 'Only your friends can see your profile', icon: Users },
                        { value: 'private', label: 'Private', description: 'Only you can see your profile', icon: Lock }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value={option.value}
                            checked={privacySettings.profileVisibility === option.value}
                            onChange={(e) => setPrivacySettings(prev => ({
                              ...prev,
                              profileVisibility: e.target.value as any
                            }))}
                            className="text-sky-500 focus:ring-sky-500"
                          />
                          <option.icon className="w-5 h-5 text-sky-400" />
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-sky-200/70">{option.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Other Privacy Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <h3 className="font-medium">Share Listening Activity</h3>
                        <p className="text-sm text-sky-200/70">Allow others to see what you&apos;re listening to</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacySettings.shareListeningActivity}
                          onChange={(e) => setPrivacySettings(prev => ({
                            ...prev,
                            shareListeningActivity: e.target.checked
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <h3 className="font-medium">Data Collection</h3>
                        <p className="text-sm text-sky-200/70">Allow us to collect data to improve your experience</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacySettings.allowDataCollection}
                          onChange={(e) => setPrivacySettings(prev => ({
                            ...prev,
                            allowDataCollection: e.target.checked
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                      </label>
                    </div>
                  </div>

                  {/* Data Management */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Database className="w-5 h-5 mr-2 text-sky-400" />
                      Data Management
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="p-4 bg-white/5 rounded-lg border border-sky-500/30 hover:bg-white/10 transition-colors text-left">
                        <h4 className="font-medium mb-2">Download Data</h4>
                        <p className="text-sm text-sky-200/70">Get a copy of your data</p>
                      </button>
                      <button className="p-4 bg-red-500/10 rounded-lg border border-red-500/30 hover:bg-red-500/20 transition-colors text-left">
                        <h4 className="font-medium mb-2 text-red-400">Delete Account</h4>
                        <p className="text-sm text-red-200/70">Permanently remove your account</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  return (
    <ProtectedRoute requireAuth={true} userType="listener">
      <SettingsContent />
    </ProtectedRoute>
  );
}