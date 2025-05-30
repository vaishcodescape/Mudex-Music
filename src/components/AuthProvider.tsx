'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  userType: 'listener' | 'artist';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string, userType: 'listener' | 'artist') => Promise<boolean>;
  signUp: (name: string, email: string, password: string, userType: 'listener' | 'artist') => Promise<boolean>;
  signInWithGoogle: (userType: 'listener' | 'artist') => Promise<boolean>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session on app load
    const checkSession = () => {
      try {
        const storedUser = localStorage.getItem('mudex_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking session:', error);
        localStorage.removeItem('mudex_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string, userType: 'listener' | 'artist'): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password combination
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        userType
      };

      setUser(userData);
      localStorage.setItem('mudex_user', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string, userType: 'listener' | 'artist'): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call for registration - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, create account with provided details
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        userType
      };

      setUser(userData);
      localStorage.setItem('mudex_user', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (userType: 'listener' | 'artist'): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // In a real app, this would integrate with Google OAuth
      // For now, we'll simulate Google authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful Google authentication
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: 'user@gmail.com',
        name: 'Google User',
        userType
      };

      setUser(userData);
      localStorage.setItem('mudex_user', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Google sign in error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('mudex_user');
    router.push('/sign-in');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 