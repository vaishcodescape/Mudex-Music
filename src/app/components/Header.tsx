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
                <Button
                  onClick={handleSignOut}
                  variant="secondary"
                  size="sm"
                  loading={isLoading}
                >
                  Sign Out
                </Button>
              </div>
            ) : isHomePage ? (
              <Link href="/pages/signup">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/pages/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/pages/signin">
                  <Button variant="secondary" size="sm">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 