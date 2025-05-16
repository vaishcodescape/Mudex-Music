/**
 * Auth Component
 * 
 * This component handles user authentication including sign-in and sign-up functionality.
 * It provides a form for email/password authentication and Google authentication option.
 * Features smooth animations for transitions between sign-in and sign-up modes.
 */

// Import necessary dependencies
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
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
  const [pageLoading, setPageLoading] = useState(true); // For initial page load
  
  // Toggle between sign-in and sign-up modes - initialize based on URL query param if present
  const [isSignIn, setIsSignIn] = useState(() => {
    // Check if there's a mode parameter in the URL
    const params = new URLSearchParams(location.search);
    return params.get('mode') !== 'signup';
  });
  
  // State to track component mount status
  const [isMounted, setIsMounted] = useState(false);
  
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
    
    // Check if there's a mode parameter in the URL
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    if (mode === 'signup' && isSignIn) {
      setIsSignIn(false);
    } else if (mode === 'signin' && !isSignIn) {
      setIsSignIn(true);
    }
  }, [location.key]);
  
  // Mark component as mounted after initial render and handle initial loading
  useEffect(() => {
    setIsMounted(true);
    // Add a small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Animate heading text color with gradient effect
   * Uses GSAP for smooth color transitions in the heading
   * Only starts animation after component is mounted
   */
  useEffect(() => {
    if (!isMounted || pageLoading) return;
    
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

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      animateColor();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (animation) {
        animation.kill();
      }
      gsap.killTweensOf(headingRef.current);
    };
  }, [isMounted]);

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
    if (isLoading || isGoogleLoading) return;
    
    setIsGoogleLoading(true);
    
    try {
      // Simulate API call with a shorter delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create mock user data for Google auth
      const userData = {
        email: 'user@example.com',
        name: 'Demo User',
        accountType: accountType,
        // In a real app, this would come from Google
        avatar: 'https://lh3.googleusercontent.com/a/default-user=s128'
      };
      
      // Call login function from auth context
      const result = await login(userData);
      
      // Only show success message if not handled by the login function
      if (result && result.success && !result.toastShown) {
        showSuccess('Signed in with Google!');
      }
      
      // Navigate is handled by the login function
    } catch (error) {
      console.error('Google auth error:', error);
      showError(error.message || 'Failed to sign in with Google');
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
    
    // Basic validation
    if (!formData.email) {
      showError('Please enter your email');
      return;
    }
    
    if (!formData.password) {
      showError('Please enter your password');
      return;
    }
    
    // Additional validation for sign up
    if (!isSignIn) {
      if (formData.password.length < 8) {
        showError('Password must be at least 8 characters');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        showError('Passwords do not match');
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call with a shorter delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create user data object
      const userData = {
        email: formData.email,
        name: formData.email.split('@')[0], // Use part of email as name
        accountType: accountType
      };
      
      // Call login function from auth context
      const result = await login(userData);
      
      // Only show success message if not handled by the login function
      if (result && result.success && !result.toastShown) {
        showSuccess(isSignIn ? 'Signed in successfully!' : 'Account created successfully!');
      }
      
      // Navigation is handled by the login function
    } catch (error) {
      console.error('Auth error:', error);
      showError(error.message || `Failed to ${isSignIn ? 'sign in' : 'create account'}`);
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
        <motion.button
          onClick={() => handleAccountTypeSelect('listener')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center relative overflow-hidden group ${
            accountType === 'listener' 
              ? 'border-primary bg-primary/5 shadow-lg' 
              : 'border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-md'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
            <motion.svg 
              className="w-8 h-8 text-blue-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </motion.svg>
          </div>
          <h3 className="font-semibold text-lg relative z-10">Listener</h3>
          <p className="text-sm text-muted-foreground mt-1 relative z-10">Enjoy music, create playlists, follow artists</p>
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform origin-left transition-transform duration-300 ${
            accountType === 'listener' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`} />
        </motion.button>
        
        <motion.button
          onClick={() => handleAccountTypeSelect('artist')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center relative overflow-hidden group ${
            accountType === 'artist' 
              ? 'border-primary bg-primary/5 shadow-lg' 
              : 'border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-md'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
            <motion.svg 
              className="w-8 h-8 text-purple-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </motion.svg>
          </div>
          <h3 className="font-semibold text-lg relative z-10">Artist</h3>
          <p className="text-sm text-muted-foreground mt-1 relative z-10">Upload your music, grow your audience</p>
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-purple-500 transform origin-left transition-transform duration-300 ${
            accountType === 'artist' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`} />
        </motion.button>
      </div>
    </div>
  );

  // If page is loading, show a loading state
  if (pageLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-background/80 p-4 sm:p-6 overflow-hidden">
        <div className="w-full max-w-md bg-card/80 backdrop-blur-md shadow-xl rounded-xl overflow-hidden border border-border/40 flex items-center justify-center p-8">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-sm text-muted-foreground">Loading authentication...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-background/80 p-4 sm:p-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-card/80 backdrop-blur-md shadow-xl rounded-xl overflow-hidden border border-border/40"
      >
        <div className="px-6 py-8 sm:px-8 sm:py-10 overflow-hidden">
          <AnimatePresence mode="wait" initial={isMounted}>
            <motion.div 
              className="text-center mb-6 sm:mb-8"
              key={isSignIn ? "signin-header" : "signup-header"}
              custom={isSignIn}
              initial="enter"
              animate="center"
              exit="exit"
              variants={{
                enter: (isSigningIn) => ({
                  x: isSigningIn ? 50 : -50, // Reduced slide distance for better performance
                  opacity: 0
                }),
                center: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    x: { type: "spring", stiffness: 400, damping: 35 }, // Optimized spring animation
                    opacity: { duration: 0.15 } // Faster fade in
                  }
                },
                exit: (isSigningIn) => ({
                  x: isSigningIn ? -50 : 50, // Reduced slide distance for better performance
                  opacity: 0,
                  transition: {
                    x: { type: "spring", stiffness: 400, damping: 35 },
                    opacity: { duration: 0.15 }
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
              type="button"
              onClick={handleGoogleAuth}
              variant="outline"
              className="w-full py-3 px-4 text-sm sm:text-base font-medium border border-border/60 hover:bg-background/50 hover:border-border transition-colors mb-6 flex items-center justify-center gap-2"
              disabled={isLoading || isGoogleLoading}
            >
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center w-full gap-2"
              >
                {isGoogleLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in with Google...
                  </>
                ) : (
                  <>
                    <FcGoogle className="h-5 w-5" />
                    Continue with Google
                  </>
                )}
              </motion.div>
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

              <AnimatePresence mode="wait" initial={isMounted}>
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
                        height: { type: "tween", duration: 0.2 }, // Simpler animation for better performance
                        opacity: { duration: 0.2 } // Faster fade in
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      height: 0, 
                      marginBottom: 0,
                      transition: {
                        height: { type: "tween", duration: 0.15 }, // Simpler animation for better performance
                        opacity: { duration: 0.15 } // Faster fade out
                      }
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground/80">
                      Password
                    </label>
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

              <AnimatePresence initial={isMounted}>
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
                          height: { type: "tween", duration: 0.2 }, // Simpler animation for better performance
                          opacity: { duration: 0.2 } // Faster fade in
                        }
                      },
                      exit: { 
                        opacity: 0, 
                        height: 0, 
                        marginBottom: 0,
                        transition: {
                          height: { type: "tween", duration: 0.15 }, // Simpler animation for better performance
                          opacity: { duration: 0.15 } // Faster fade out
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

            {isSignIn && (
              <div className="mb-4 text-right">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs sm:text-sm text-primary hover:underline focus:outline-none"
                  disabled={isLoading || isGoogleLoading}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-3 px-4 text-sm sm:text-base font-medium bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 touch-manipulation"
              disabled={isLoading || isGoogleLoading}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center w-full"
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
              </motion.div>
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
