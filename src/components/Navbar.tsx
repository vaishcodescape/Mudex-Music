'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import RecordLogo from './RecordLogo';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '/discover' },
  { name: 'Library', href: '/library' },
  { name: 'Profile', href: '/profile' },
  { name: 'Community', href: '/community' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-sky-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <RecordLogo size={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent">
              Mudex Music
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-sky-400'
                    : 'text-sky-200/70 hover:text-sky-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Sign In Button */}
            <Link
              href="/signin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-sky-200/70 hover:text-sky-400"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black/95 backdrop-blur-md border-b border-sky-500/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-sky-500/10 text-sky-400'
                    : 'text-sky-200/70 hover:bg-sky-500/10 hover:text-sky-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Sign In Button in Mobile Menu */}
            <Link
              href="/signin"
              className="block w-full mt-4 px-3 py-2 text-center text-base font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
} 