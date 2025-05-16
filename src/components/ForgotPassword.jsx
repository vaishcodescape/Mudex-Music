/**
 * ForgotPassword Component
 * 
 * This component handles the password reset functionality.
 * It provides a form for users to enter their email address to receive a password reset link.
 * Features smooth animations and responsive design consistent with the application's style.
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import gsap from 'gsap';

const ForgotPassword = () => {
  // Hooks for navigation
  const navigate = useNavigate();
  
  // State for loading indicator and form data
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Reference for heading element (used for GSAP animations)
  const headingRef = useRef(null);

  /**
   * Animate heading text color with gradient effect
   * Uses GSAP for smooth color transitions in the heading
   */
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

  /**
   * Handle form submission for password reset request
   * In a real app, this would send a request to the backend to send a reset email
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple simultaneous submissions
    if (isLoading) return;
    
    // Validate email
    if (!email || !email.includes('@')) {
      toast.error('Invalid email', {
        description: 'Please enter a valid email address',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to your backend
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setIsSubmitted(true);
      
      // Show success toast
      toast.success('Reset link sent!', {
        description: `We've sent a password reset link to ${email}`,
      });
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to send reset link', {
        description: error.message || 'Please try again later',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Navigate back to auth page
   */
  const handleBack = () => {
    navigate('/auth');
  };

  /**
   * Handle touch events for better mobile experience
   */
  const handleTouchStart = (e) => {
    e.currentTarget.classList.add('active');
  };

  const handleTouchEnd = (e) => {
    e.currentTarget.classList.remove('active');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/95 px-4 sm:px-6">
      <motion.div 
        className="w-full max-w-md p-6 sm:p-8 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-6">
          <h1 
            ref={headingRef}
            className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-500"
          >
            Reset Password
          </h1>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base">
            {isSubmitted 
              ? "We've sent you an email with instructions" 
              : "Enter your email to receive a password reset link"}
          </p>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-center"
          >
            <div className="mb-6 p-4 bg-primary/10 rounded-lg text-primary">
              <p className="text-sm">
                Check your email inbox for <strong>{email}</strong> and follow the instructions to reset your password.
              </p>
              <p className="text-sm mt-2">
                If you don't see the email, check your spam folder.
              </p>
            </div>
            <Button
              type="button"
              className="w-full py-3 px-4 text-sm sm:text-base font-medium bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 touch-manipulation"
              onClick={() => navigate('/auth')}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              Return to Sign In
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              Didn't receive the email? <button 
                onClick={() => setIsSubmitted(false)} 
                className="text-primary hover:underline"
              >
                Try again
              </button>
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1.5">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-sm sm:text-base bg-background/70 sm:bg-background/50 border-border/50 focus:border-primary/70 focus:ring-1 focus:ring-primary/30 transition-colors"
                placeholder="name@domain.com"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 px-4 text-sm sm:text-base font-medium bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 touch-manipulation"
              disabled={isLoading}
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
                  Sending reset link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-xs sm:text-sm text-muted-foreground">
          Remember your password?{' '}
          <button
            type="button"
            onClick={handleBack}
            className="ml-1 text-primary hover:underline focus:outline-none"
          >
            Sign in
          </button>
        </p>
        <button 
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 w-full text-center text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1"
          disabled={isLoading}
        >
          ← Back to home
        </button>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
