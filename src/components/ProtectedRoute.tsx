'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  userType?: 'listener' | 'artist';
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  userType,
  redirectTo = '/sign-in' 
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (userType && user && user.userType !== userType) {
        // Redirect to appropriate dashboard based on user type
        const targetPath = user.userType === 'listener' ? '/dashboard' : '/profile';
        router.push(targetPath);
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, router, requireAuth, userType, redirectTo]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // If auth is required but user is not authenticated, don't render children
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // If specific user type is required but doesn't match, don't render children
  if (userType && user && user.userType !== userType) {
    return null;
  }

  return <>{children}</>;
} 