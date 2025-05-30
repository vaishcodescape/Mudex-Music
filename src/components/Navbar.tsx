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

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/discover' },
    { name: 'About', href: '/about' },
  ];

  const authenticatedNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/discover' },
    ...(user?.userType === 'listener' ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
    ...(user?.userType === 'artist' ? [{ name: 'Profile', href: '/profile' }] : []),
  ];

  const currentNavigation = isAuthenticated ? authenticatedNavigation : navigation;

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-sky-500/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <RecordLogo size={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
              Mudex Music
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sky-200/70 hover:text-sky-400 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sky-200/70">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.name}</span>
                </div>
                
                {user?.userType === 'listener' && (
                  <Link
                    href="/dashboard/settings"
                    className="p-2 text-sky-200/70 hover:text-sky-400 transition-colors"
                    title="Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </Link>
                )}

                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
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
                  className="text-sky-200/70 hover:text-sky-400 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg text-white font-medium transition-colors"
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
              className="text-sky-200/70 hover:text-sky-400 transition-colors p-2"
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
              className="md:hidden border-t border-sky-500/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {currentNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-sky-200/70 hover:text-sky-400 transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {isAuthenticated ? (
                  <div className="border-t border-sky-500/20 pt-3 mt-3">
                    <div className="flex items-center space-x-2 px-3 py-2 text-sky-200/70">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{user?.name}</span>
                      <span className="text-xs bg-sky-500/20 px-2 py-1 rounded capitalize">
                        {user?.userType}
                      </span>
                    </div>
                    
                    {user?.userType === 'listener' && (
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center space-x-2 px-3 py-2 text-sky-200/70 hover:text-sky-400 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    )}

                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-3 py-2 w-full text-left text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-sky-500/20 pt-3 mt-3 space-y-1">
                    <Link
                      href="/sign-in"
                      className="block px-3 py-2 text-sky-200/70 hover:text-sky-400 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium transition-colors rounded-lg mx-3"
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