'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from './AuthProvider';
import RecordLogo from './RecordLogo';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    setIsMobileMenuOpen(false);
  };

  const baseNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/discover' },
    { name: 'About', href: '/about' },
    { name: 'Community', href: '/community' },
  ];

  const currentNavigation = [
    ...baseNavigation,
    ...(isAuthenticated && user?.userType === 'listener' ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
    ...(isAuthenticated && user?.userType === 'artist' ? [{ name: 'Profile', href: '/profile' }] : []),
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-lg border-b border-sky-500/20 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <RecordLogo size={32} />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent font-sans tracking-tight">
              Mudex Music
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {currentNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sky-200/80 hover:text-sky-400 transition-colors font-semibold text-base font-sans"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sky-200/80">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.name}</span>
                </div>
                
                {user?.userType === 'listener' && (
                  <Link
                    href="/dashboard/settings"
                    className="p-2 text-sky-200/80 hover:text-sky-400 transition-colors rounded-lg hover:bg-sky-500/10"
                    title="Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </Link>
                )}

                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-5 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-colors font-semibold shadow-sm"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sky-200/80 hover:text-sky-400 transition-colors font-semibold text-base font-sans"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-sky-500 hover:bg-sky-600 px-5 py-2 rounded-xl text-white font-semibold transition-colors shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-sky-200/80 hover:text-sky-400 transition-colors p-3 rounded-lg hover:bg-sky-500/10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-sky-500/20 shadow-lg bg-black/95 backdrop-blur-xl rounded-b-2xl"
            >
              <div className="px-4 py-3 space-y-1">
                {currentNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-sky-200/80 hover:text-sky-400 transition-colors font-semibold text-lg font-sans"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {isAuthenticated ? (
                  <div className="border-t border-sky-500/20 pt-4 mt-4">
                    <div className="flex items-center space-x-2 px-4 py-3 text-sky-200/80">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{user?.name}</span>
                      <span className="text-xs bg-sky-500/20 px-3 py-1 rounded-xl capitalize font-semibold">
                        {user?.userType}
                      </span>
                    </div>
                    
                    {user?.userType === 'listener' && (
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center space-x-2 px-4 py-3 text-sky-200/80 hover:text-sky-400 transition-colors font-semibold text-lg font-sans"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    )}

                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 transition-colors rounded-xl font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-sky-500/20 pt-4 mt-4 space-y-2">
                    <Link
                      href="/sign-in"
                      className="block px-4 py-3 text-sky-200/80 hover:text-sky-400 transition-colors font-semibold text-lg font-sans"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-colors rounded-xl mx-3 shadow-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
} 