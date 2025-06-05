'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import AnimatedLogo from '@/app/components/AnimatedLogo';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Here you would typically make an API call to create the user
      // For now, we'll simulate a successful signup and redirect to sign in
      router.push('/pages/signin');
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-black text-white animate-page-fade-in relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-particle opacity-30"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-blue-300 rounded-full animate-particle opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-64 left-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-particle opacity-20" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-particle opacity-35" style={{animationDelay: '6s'}}></div>
        <div className="absolute bottom-60 left-16 w-1 h-1 bg-blue-300 rounded-full animate-particle opacity-25" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-10 w-1.5 h-1.5 bg-blue-500 rounded-full animate-particle opacity-30" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-md w-full space-y-8 bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-800/50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex flex-col items-center space-y-4 animate-in fade-in duration-1000 delay-200">
            <div className="w-16 h-16">
              <AnimatedLogo />
            </div>
            <h2 className="text-3xl font-extrabold text-white text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Join Mudex Music
            </h2>
            <p className="text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/pages/signin" className="font-medium text-blue-500 hover:text-blue-400 transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg relative animate-in fade-in slide-in-from-top-2 duration-200" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="mt-8 space-y-6 animate-in fade-in duration-1000 delay-300" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              <div className="animate-in fade-in slide-in-from-left-2 duration-500 delay-400">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="animate-in fade-in slide-in-from-left-2 duration-500 delay-500">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="animate-in fade-in slide-in-from-left-2 duration-500 delay-600">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="animate-in fade-in duration-500 delay-700">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                Create Account
              </Button>
            </div>
          </form>

          <div className="mt-8 animate-in fade-in duration-500 delay-800">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900/50 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleGoogleSignUp}
                variant="secondary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                <FcGoogle className="h-5 w-5 mr-2" />
                Sign up with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 