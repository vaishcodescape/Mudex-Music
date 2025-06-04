'use client';

import Link from 'next/link';
import Button from './Button';
import AnimatedLogo from './AnimatedLogo';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: '/' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-200">
            Mudex Music
          </Link>

          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="h-8 w-20 bg-gray-800 rounded animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">{session.user?.email}</span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign Out
                </button>
              </div>
            ) : isHomePage ? (
              <div className="relative">
                <button
                  onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started
                </button>
                {showAuthDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-1">
                      <Link
                        href="/pages/signin"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                        onClick={() => setShowAuthDropdown(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/pages/signup"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                        onClick={() => setShowAuthDropdown(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/pages/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign Up
                </Link>
                <Link
                  href="/pages/signin"
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 