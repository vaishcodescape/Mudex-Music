"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Music, Mail, Lock, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'listener' as 'listener' | 'artist'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const success = await signUp(formData.name, formData.email, formData.password, formData.userType);
      
      if (success) {
        // Redirect based on user type
        if (formData.userType === 'listener') {
          router.push('/dashboard');
        } else {
          router.push('/profile');
        }
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      const success = await signInWithGoogle(formData.userType);
      
      if (success) {
        // Redirect based on user type
        if (formData.userType === 'listener') {
          router.push('/dashboard');
        } else {
          router.push('/profile');
        }
      } else {
        setError('Google sign-up failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred with Google sign-up.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black flex items-center justify-center px-4 pt-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md w-full"
      >
        <motion.div
          variants={formVariants}
          className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 border border-sky-500/20 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-sky-500/20 rounded-full">
                <Music className="w-8 h-8 text-sky-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
              Join Mudex Music
            </h1>
            <p className="text-sky-200/70 mt-2">Create your account and start your music journey</p>
          </div>

          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-sky-200/80 mb-3">I am a:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'listener' }))}
                className={`p-4 rounded-lg border transition-all ${
                  formData.userType === 'listener'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-400'
                    : 'bg-white/5 border-sky-500/30 text-sky-200/70 hover:bg-white/10'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium">Listener</div>
                  <div className="text-xs opacity-70">Discover music</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'artist' }))}
                className={`p-4 rounded-lg border transition-all ${
                  formData.userType === 'artist'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-400'
                    : 'bg-white/5 border-sky-500/30 text-sky-200/70 hover:bg-white/10'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium">Artist</div>
                  <div className="text-xs opacity-70">Share music</div>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-sky-200/80 mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-sky-500/30 rounded-lg text-white placeholder-sky-200/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-sky-200/80 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-sky-500/30 rounded-lg text-white placeholder-sky-200/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-sky-200/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-sky-500/30 rounded-lg text-white placeholder-sky-200/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400 hover:text-sky-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-sky-200/50 mt-1">Must be at least 6 characters long</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-sky-200/80 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-sky-500/30 rounded-lg text-white placeholder-sky-200/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400 hover:text-sky-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-sky-500/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-sky-200/70">Or continue with</span>
              </div>
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full bg-white/10 border border-sky-500/30 text-white py-3 rounded-lg font-medium hover:bg-white/20 disabled:bg-white/5 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sky-200/70">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 