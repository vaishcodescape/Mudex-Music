"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/pages/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
      });
    }
  }, [session]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      // TODO: Implement actual file upload logic here
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      // After successful upload, you would typically update the user's session/profile
      toast.success('Profile picture updated successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    setIsUpdating(true);
    try {
      console.log('Sending update request with data:', formData);
      
      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }
      
      // Update the session with new user data
      console.log('Updating session with:', data.user);
      await update({
        ...session,
        user: {
          ...session?.user,
          name: data.user.name,
          email: data.user.email,
        },
      });

      toast.success('Profile updated successfully');
      
      // Refresh the page to ensure all components are updated
      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsUpdating(false);
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
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Link 
            href="/pages/user/user_dashboard"
            className="inline-flex items-center text-gray-400 hover:text-white transition duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Settings</h2>
              <nav className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 font-medium">
                  Account
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700/50 transition-colors duration-200">
                  Notifications
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700/50 transition-colors duration-200">
                  Privacy
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700/50 transition-colors duration-200">
                  Appearance
                </button>
              </nav>
            </div>
          </div>

          {/* Account Settings */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Picture */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Profile Picture</h2>
              <div className="flex flex-col items-center space-y-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/50">
                  <Image
                    src={previewUrl || session?.user?.image || '/default-avatar.png'}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col items-center space-y-4 w-full max-w-md">
                  <div className="relative w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="profile-picture-upload"
                    />
                    <label
                      htmlFor="profile-picture-upload"
                      className="w-full flex items-center justify-center px-4 py-2 border border-slate-700 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200"
                    >
                      <span className="text-gray-300">Choose a file</span>
                    </label>
                  </div>
                  {selectedFile && (
                    <div className="w-full space-y-4">
                      <p className="text-sm text-gray-400 text-center">
                        Selected: {selectedFile.name}
                      </p>
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full"
                        onClick={handleUpload}
                        loading={isUploading}
                      >
                        Upload Picture
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 text-center">
                    Recommended: Square image, at least 400x400 pixels
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Profile Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <Button 
                  variant="primary" 
                  size="md"
                  onClick={handleProfileUpdate}
                  loading={isUpdating}
                >
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Password */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Change Password</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <Button variant="primary" size="md">
                  Update Password
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-semibold mb-6 text-red-400">Danger Zone</h2>
              <div className="space-y-4">
                <p className="text-gray-400">Once you delete your account, there is no going back. Please be certain.</p>
                <Button variant="outline" size="md" className="w-full text-red-400 hover:text-red-300 border-red-500/50 hover:border-red-400/50">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 