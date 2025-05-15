import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      // Simulate Google auth delay
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
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleBack = () => {
    if (isLoading || isGoogleLoading) return;
    navigate('/', { replace: true });
  };

  return (
    <motion.div
      key={location.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-background p-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-md space-y-8 bg-card/30 backdrop-blur-xl p-8 rounded-lg shadow-lg border border-border/50"
      >
        <div className="text-center">
          <h2 
            ref={headingRef}
            className="text-4xl font-bold tracking-tight transition-colors duration-500"
          >
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignIn 
              ? 'Sign in to your account to continue' 
              : 'Sign up for a new account'}
          </p>
        </div>

        <div>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white/5 hover:bg-white/10 border-border"
            size="lg"
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading || isLoading}
          >
            {isGoogleLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                Connecting to Google...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <FcGoogle className="w-5 h-5 mr-2" />
                Continue with Google
              </div>
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.form
            key={isSignIn ? 'signin' : 'signup'}
            initial={{ opacity: 0, x: isSignIn ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isSignIn ? 20 : -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading || isGoogleLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  required
                  className="mt-1"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading || isGoogleLoading}
                />
              </div>

              {!isSignIn && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="mt-1"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading || isGoogleLoading}
                  />
                </motion.div>
              )}
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 hover:opacity-90"
                size="lg"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {isSignIn ? 'Signing in...' : 'Signing up...'}
                  </div>
                ) : (
                  isSignIn ? 'Sign in' : 'Sign up'
                )}
              </Button>
            </div>
          </motion.form>
        </AnimatePresence>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              type="button"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
              onClick={toggleMode}
              disabled={isLoading || isGoogleLoading}
            >
              {isSignIn ? 'Sign up' : 'Sign in'}
            </button>
          </p>
          <button 
            type="button"
            className="mt-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={handleBack}
            disabled={isLoading || isGoogleLoading}
          >
            Go back home
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Auth; 