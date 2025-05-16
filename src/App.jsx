/**
 * App.jsx
 * 
 * Main application component that handles routing and page transitions.
 * Implements smooth page transitions using Framer Motion and React Router.
 * Controls the overall layout and navigation structure of the application.
 */

// React core imports
import React, { useState, useEffect } from 'react';

// Routing imports
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Auth Context
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { Toaster } from 'sonner';

// Animation imports
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './pageTransitions.css';

// Page components
import Home from './components/Home';
import Auth from './components/Auth';
import About from './components/About';
import Features from './components/Features';
import Discover from './components/Discover';
import LearnMore from './components/LearnMore';
import Profile from './components/Profile';
import ArtistProfile from './components/ArtistProfile';
import ForgotPassword from './components/ForgotPassword';

// UI components
import HomeButton from './components/HomeButton';
import Navbar from './components/Navbar';

/**
 * Page transition animation variants for Framer Motion
 * 
 * These variants define how pages animate when entering and exiting the viewport.
 * The direction parameter determines if the page slides in from left or right.
 * 
 * @param {number} direction - Positive for forward navigation, negative for backward
 */
const pageTransitionVariants = {
  // Initial state (before entering viewport)
  initial: (direction) => ({
    x: direction > 0 ? '100%' : '-100%', // Start from right or left based on direction
    opacity: 0, // Start transparent
  }),
  
  // Animated state (while in viewport)
  animate: {
    x: 0, // Centered position
    opacity: 1, // Fully visible
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 }, // Springy motion for natural feel
      opacity: { duration: 0.2 } // Quick fade in
    },
  },
  
  // Exit state (when leaving viewport)
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%', // Exit to opposite direction of entry
    opacity: 0, // Fade out
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    },
  }),
};

/**
 * Get the index of a page based on its pathname
 * 
 * Used to determine the direction of page transitions.
 * Higher index means the page is further in the navigation flow.
 * 
 * @param {string} pathname - The current route pathname
 * @returns {number} - The index of the page in the routes array, or -1 if not found
 */
const getPageIndex = (pathname) => {
  const routes = ['/', '/features', '/about', '/discover', '/learn-more', '/auth', '/forgot-password', '/profile', '/artist/:id'];
  return routes.indexOf(pathname);
};

/**
 * AppRoutes Component
 * 
 * Handles the main routing logic and page transitions.
 * Determines which components to show based on the current route.
 * Manages page transition animations and scroll behavior.
 */
const AppRoutes = () => {
  // Get current location from React Router
  const location = useLocation();
  
  // Determine UI states based on current route
  const showHomeButton = location.pathname !== '/'; // Show home button on all pages except home
  const isHomePage = location.pathname === '/'; // Check if we're on the home page
  const isAuthPage = location.pathname === '/auth' || location.pathname === '/forgot-password'; // Check if we're on auth-related pages
  
  // State to track previous path for determining transition direction
  const [previousPath, setPreviousPath] = useState(location.pathname);
  
  // Calculate the direction of navigation for animations
  const currentIndex = getPageIndex(location.pathname);
  const previousIndex = getPageIndex(previousPath);
  const direction = currentIndex > previousIndex ? 1 : -1; // 1 for forward, -1 for backward
  
  /**
   * Scroll to top when navigating to a new page
   * Also update the previous path for next navigation
   */
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of page
    setPreviousPath(location.pathname); // Store current path for next navigation
  }, [location.pathname]); // Run when path changes

  return (
    <>
      {/* Show Navbar on all pages except home and auth */}
      {!isHomePage && !isAuthPage && <Navbar />}
      
      {/* Main content wrapper */}
      <div className="page-wrapper">
        {/* AnimatePresence handles the entering and exiting of components */}
        {/* mode="wait" ensures exit animations complete before enter animations start */}
        {/* initial={false} prevents animation on first render */}
        {/* custom={direction} passes the direction value to variants */}
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={location.pathname} // Changing this key triggers AnimatePresence
            custom={direction} // Pass direction to variants
            variants={pageTransitionVariants} // Animation definitions
            initial="initial" // Starting animation state
            animate="animate" // Target animation state
            exit="exit" // Exiting animation state
            className="page-transition-container"
          >
            {/* Routes are rendered inside the motion.div for page transitions */}
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/learn-more" element={<LearnMore />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/artist/:id" element={<ArtistProfile />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Show floating home button on all pages except home */}
      {showHomeButton && <HomeButton />}
    </>  
  );
};

/**
 * Main App Component
 * 
 * Root component that wraps the application with necessary providers.
 * Currently only includes the Router provider for navigation.
 * 
 * @returns {JSX.Element} The complete application with routing
 */
const App = () => {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="top-center" richColors closeButton />
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
