/**
 * Auth Component
 * 
 * This component handles user authentication including sign-in and sign-up functionality.
 * It provides a form for email/password authentication and Google authentication option.
 * Features smooth animations for transitions between sign-in and sign-up modes.
 */

// Import necessary dependencies
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import { Button } from './ui/button'; // UI component
import { Input } from './ui/input'; // UI component
import { useNavigate, useLocation } from 'react-router-dom'; // For navigation
import { useAuth } from '../contexts/AuthContext'; // For authentication
import { useToast } from '../contexts/ToastContext'; // For toast notifications
import { FcGoogle } from 'react-icons/fc'; // Google icon
import gsap from 'gsap'; // For advanced animations

const Auth = () => {
  // Hooks for navigation, location and auth
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  
  // State for loading indicators
  const [isLoading, setIsLoading] = useState(false); // For regular form submission
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // For Google authentication
  
  // Toggle between sign-in and sign-up modes
  const [isSignIn, setIsSignIn] = useState(true);
  
  /**
   * Toggle between sign-in and sign-up modes
   * This triggers the animation transitions between forms
   * Also resets password fields while preserving email
   */
  const toggleMode = () => {
    if (isLoading || isGoogleLoading) return;
    setIsSignIn(!isSignIn);
    setFormData({
      email: formData.email,
      password: '',
      confirmPassword: ''
    });
  };
  
  // Reference for heading element (used for GSAP animations)
  const headingRef = useRef(null);
  
  // Form steps for signup flow
  const [signupStep, setSignupStep] = useState(1); // 1: Account type, 2: Details
  const [accountType, setAccountType] = useState('listener');

  // Form data state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  /**
   * Reset form state when location changes
   * This ensures a clean form when navigating back to the auth page
   */
  useEffect(() => {
    setIsLoading(false);
    setIsGoogleLoading(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }, [location.key]);

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
   * Handle form input changes
   * Updates the form data state when user types in any input field
   * @param {Event} e - The input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle Google authentication
   * Simulates authentication process with Google and redirects to discovery page
   * In a real app, this would integrate with Google OAuth
   */
  const handleGoogleAuth = async () => {
    // Prevent multiple simultaneous auth attempts
    if (isGoogleLoading || isLoading) return;
    
    setIsGoogleLoading(true);
    
    try {
      // In a real app, this would integrate with Google OAuth
      // For now, we'll simulate a successful login with a Google user
      const userData = {
        id: `google-user-${Date.now()}`,
        email: 'user@gmail.com',
        name: 'Google User',
        accountType: 'listener', // Default to listener for Google sign-in
        createdAt: new Date().toISOString()
      };
      
      // Call the login function from our auth context
      const result = await login(userData);
      
      if (!result.success) {
        showError(result.error || 'Google authentication failed');
        throw new Error(result.error || 'Google authentication failed');
      }
      
      // The login function will handle navigation
    } catch (error) {
      console.error('Google authentication error:', error);
      alert(error.message || 'Google authentication failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  /**
   * Handle form submission for email/password authentication
   * Validates form data, handles authentication, and redirects to discovery page
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || isGoogleLoading) return;
    
    // If on account type selection, move to details
    if (!isSignIn && signupStep === 1) {
      setSignupStep(2);
      return;
    }
    
    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    
    if (!isSignIn && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to your backend
      // For now, we'll simulate an API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object with account type
      const userData = {
        id: `demo-user-${Date.now()}`,
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        accountType: isSignIn ? 'listener' : accountType, // Use 'listener' as default for sign in
        createdAt: new Date().toISOString()
      };
      
      // Call the login function from our auth context
      const result = await login(userData);
      
      if (!result.success) {
        showError(result.error || 'Authentication failed');
        throw new Error(result.error || 'Authentication failed');
      }
      
      showSuccess(isSignIn ? 'Welcome back!' : 'Account created successfully!');
      
      // The login function will handle navigation
    } catch (err) {
      console.error('Authentication error:', err);
      alert(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle account type selection
   * @param {string} type - The selected account type
   */
  const handleAccountTypeSelect = (type) => {
    setAccountType(type);
    setSignupStep(2);
  };

  /**
   * Navigate back to home page when back button is clicked
   * Prevents navigation during loading states
   */
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

  // Render account type selection
  const renderAccountTypeStep = () => (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-6">Choose Account Type</h2>
      <p className="text-muted-foreground mb-8">Select the type of account you'd like to create</p>
      
      <div className="grid gap-4">
        <button
          onClick={() => handleAccountTypeSelect('listener')}
          className={`p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center ${
            accountType === 'listener' 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg">Listener</h3>
          <p className="text-sm text-muted-foreground mt-1">Enjoy music, create playlists, follow artists</p>
        </button>
        
        <button
          onClick={() => handleAccountTypeSelect('artist')}
          className={`p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center ${
            accountType === 'artist' 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg">Artist</h3>
          <p className="text-sm text-muted-foreground mt-1">Upload your music, grow your audience</p>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card rounded-2xl shadow-xl overflow-hidden border border-border"
      >
        <div className="px-6 py-8 sm:px-8 sm:py-10 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div 
              className="text-center mb-6 sm:mb-8"
              key={isSignIn ? "signin-header" : "signup-header"}
              custom={isSignIn}
              initial="enter"
              animate="center"
              exit="exit"
              variants={{
                enter: (isSigningIn) => ({
                  x: isSigningIn ? 100 : -100, // Slide in from right or left depending on direction
                  opacity: 0
                }),
                center: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 }, // Springy animation
                    opacity: { duration: 0.2 } // Fade in quickly
                  }
                },
                exit: (isSigningIn) => ({
                  x: isSigningIn ? -100 : 100, // Slide out to left or right depending on direction
                  opacity: 0,
                  transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }
                })
              }}
            >
              <h2 
                ref={headingRef}
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent"
              >
                {isSignIn ? 'Welcome back' : 'Create an account'}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                {isSignIn ? 'Sign in to your account to continue' : 'Enter your details to get started'}
              </p>
            </motion.div>
          </AnimatePresence>

          {signupStep === 1 && !isSignIn && renderAccountTypeStep()}

          <div>
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
          </div>

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
                  placeholder="name@domain.com"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading || isGoogleLoading}
                />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isSignIn ? "signin-password" : "signup-password"}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0, height: 0, marginBottom: 0 }, // Initial/hidden state
                    visible: { 
                      opacity: 1, 
                      height: "auto", 
                      marginBottom: 16,
                      transition: {
                        height: { type: "spring", stiffness: 300, damping: 30 }, // Springy height animation
                        opacity: { duration: 0.3 } // Fade in
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      height: 0, 
                      marginBottom: 0,
                      transition: {
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 } // Fade out
                      }
                    }
                  }}
                >
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
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {!isSignIn && (
                  <motion.div
                    key="confirm-password"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: { opacity: 0, height: 0, marginBottom: 0 }, // Initial/hidden state
                      visible: { 
                        opacity: 1, 
                        height: "auto", 
                        marginBottom: 16,
                        transition: {
                          height: { type: "spring", stiffness: 300, damping: 30 }, // Springy height animation
                          opacity: { duration: 0.3 } // Fade in
                        }
                      },
                      exit: { 
                        opacity: 0, 
                        height: 0, 
                        marginBottom: 0,
                        transition: {
                          height: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 } // Fade out
                        }
                      }
                    }}
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
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
              onClick={(e) => {
                e.preventDefault();
                setSignupStep(1);
                toggleMode();
              }}
              disabled={isLoading || isGoogleLoading}
              className="ml-1 text-primary hover:underline focus:outline-none"
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

// Export the Auth component as the default export
export default Auth;
