import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import gsap from 'gsap';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const headingRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Reset form state when location changes
  useEffect(() => {
    setIsLoading(false);
    setIsGoogleLoading(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }, [location.key]);

  useEffect(() => {
    const colors = ['#3b82f6', '#06b6d4', '#6366f1'];
    let currentIndex = 0;
    let animation;

    const animateColor = () => {
      if (!headingRef.current) return;
      
      animation = gsap.to(headingRef.current, {
        color: colors[currentIndex],
        duration: 2,
        ease: 'power2.inOut',
        onComplete: () => {
          currentIndex = (currentIndex + 1) % colors.length;
          animateColor();
        }
      });
    };

    animateColor();

    return () => {
      if (animation) {
        animation.kill();
      }
      gsap.killTweensOf(headingRef.current);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoogleAuth = async () => {
    if (isGoogleLoading || isLoading) return;
    setIsGoogleLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Authenticating with Google');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Google authentication error:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || isGoogleLoading) return;
    
    if (!isSignIn && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Authenticating with:', formData.email);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    if (isLoading || isGoogleLoading) return;
    setIsSignIn(!isSignIn);
    setFormData({
      email: formData.email,
      password: '',
      confirmPassword: ''
    });
  };

  const handleBack = () => {
    if (isLoading || isGoogleLoading) return;
    navigate('/', { replace: true });
  };

  const handleTouchStart = (e) => {
    e.currentTarget.classList.add('scale-95');
  };

  const handleTouchEnd = (e) => {
    e.currentTarget.classList.remove('scale-95');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4 sm:p-6">
      <motion.div 
        className="w-full max-w-md bg-background/90 sm:bg-background/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-border/20"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="text-center mb-6 sm:mb-8">
            <h2 
              ref={headingRef}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent"
            >
              {isSignIn ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              {isSignIn ? 'Sign in to your account to continue' : 'Enter your details to get started'}
            </p>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full py-3 px-4 text-sm sm:text-base border border-border/50 bg-background/70 sm:bg-background/50 hover:bg-foreground/5 transition-colors active:scale-95 touch-manipulation"
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading || isLoading}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            {isGoogleLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              <>
                <FcGoogle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1.5">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-background/70 sm:bg-background/50 border-border/50 focus:border-primary/70 focus:ring-1 focus:ring-primary/30 transition-colors"
                  placeholder="you@example.com"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading || isGoogleLoading}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground/80">
                    Password
                  </label>
                  {isSignIn && (
                    <button
                      type="button"
                      className="text-xs font-medium text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 rounded px-1.5 py-0.5"
                      disabled={isLoading || isGoogleLoading}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignIn ? 'current-password' : 'new-password'}
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-background/70 sm:bg-background/50 border-border/50 focus:border-primary/70 focus:ring-1 focus:ring-primary/30 transition-colors"
                  placeholder="••••••••"
                  disabled={isLoading || isGoogleLoading}
                />
              </div>

              {!isSignIn && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground/80 mb-1.5">
                    Confirm password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-sm sm:text-base bg-background/70 sm:bg-background/50 border-border/50 focus:border-primary/70 focus:ring-1 focus:ring-primary/30 transition-colors"
                    placeholder="••••••••"
                    disabled={isLoading || isGoogleLoading}
                  />
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-3 px-4 text-sm sm:text-base font-medium bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 touch-manipulation"
              disabled={isLoading || isGoogleLoading}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isSignIn ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>{isSignIn ? 'Sign in' : 'Sign up'}</>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs sm:text-sm text-muted-foreground">
            {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="font-medium text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1"
              disabled={isLoading || isGoogleLoading}
            >
              {isSignIn ? 'Sign up' : 'Sign in'}
            </button>
          </p>
          
          <button 
            type="button"
            onClick={handleBack}
            className="mt-4 w-full text-center text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1"
            disabled={isLoading || isGoogleLoading}
          >
            ← Back to home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
