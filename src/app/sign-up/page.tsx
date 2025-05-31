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
          className="bg-slate-900 rounded-2xl p-8 border border-sky-500/20 shadow-2xl"
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
                    : 'bg-slate-800 border-sky-500/30 text-sky-200/70 hover:bg-slate-700'
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
                    : 'bg-slate-800 border-sky-500/30 text-sky-200/70 hover:bg-slate-700'
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
                  className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-sky-500/30 rounded-lg text-white placeholder-sky-200/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
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
                  className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-sky-500/30 rounded-lg text-white placeholder-sky-200/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
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
                  className="w-full pl-12 pr-12 py-3 bg-slate-800 border border-sky-500/30 rounded-lg text-white placeholder-sky-200/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
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
                  className="w-full pl-12 pr-12 py-3 bg-slate-800 border border-sky-500/30 rounded-lg text-white placeholder-sky-200/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
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
              className="w-full bg-white border border-gray-300 text-gray-900 h-10 rounded-lg font-medium hover:bg-gray-100 disabled:bg-gray-200 transition-all flex items-center justify-start gap-3 pl-4 pr-6 shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2045c0-.638-.0573-1.2527-.1645-1.8409H9v3.4818h4.8445c-.2082 1.1236-.8345 2.0763-1.7763 2.719v2.2582h2.8736C16.7273 14.0964 17.64 11.9273 17.64 9.2045z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.4673-.8064 5.9564-2.1882l-2.8736-2.2582c-.7973.5345-1.8145.8491-3.0827.8491-2.3709 0-4.3818-1.6018-5.1018-3.7573H.8523v2.3064C2.3355 16.7418 5.4073 18 9 18z" fill="#34A853"/>
                <path d="M3.8982 10.8036c-.1818-.5345-.2864-1.1045-.2864-1.8036s.1045-1.2691.2864-1.8036V4.8909H.8523C.309 5.9818 0 7.2436 0 9c0 1.7564.309 3.0182.8523 4.1091l3.0459-2.3055z" fill="#FBBC05"/>
                <path d="M9 3.5791c1.3227 0 2.5018.4545 3.4336 1.3455l2.5755-2.5755C13.4645.9982 11.4273 0 9 0 5.4073 0 2.3355 1.2582.8523 3.8909l3.0459 2.3064C4.6182 5.1809 6.6291 3.5791 9 3.5791z" fill="#EA4335"/>
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