import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { toast } from 'sonner';

// Get initials from name or email
const getInitials = (name = 'User', email = '') => {
  // If name is provided and not empty, use it
  if (name && name.trim() !== '') {
    return name
      .trim()
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
  // Otherwise, use the first part of the email before @
  if (email && email.includes('@')) {
    return email
      .split('@')[0]
      .substring(0, 2)
      .toUpperCase();
  }
  // Default to 'US' if nothing else works
  return 'US';
};

// Default profile picture URL or generate one
const getDefaultAvatarUrl = (name = 'User', accountType = 'listener', email = '') => {
  const colors = accountType === 'artist' 
    ? ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'] 
    : ['#FFEEAD', '#D4A5A5', '#9B97B2', '#E8F9FD'];
  const color = colors[(name + email).length % colors.length];
  const initials = getInitials(name, email);
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${color.slice(1)}&color=fff&size=128&length=2&bold=true`;
};

// Default user data based on account type
const getDefaultUserData = (accountType) => ({
  isArtist: accountType === 'artist',
  stats: accountType === 'artist' 
    ? { followers: 0, tracks: 0, monthlyListeners: 0 }
    : { tracksPlayed: 0, likedSongs: 0, listeningHours: 0 },
  socialLinks: accountType === 'artist' ? {
    instagram: '',
    twitter: '',
    website: ''
  } : {}
});

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
  loading: true
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize user with default data based on account type
  const initializeUser = useCallback((userData) => {
    const accountType = userData?.accountType || 'listener';
    const defaultData = getDefaultUserData(accountType);
    
    return {
      ...defaultData,
      ...userData,
      avatar: userData?.avatar || getDefaultAvatarUrl(
        userData?.name || userData?.email?.split('@')[0] || 'User',
        accountType,
        userData?.email || ''
      ),
      accountType,
      createdAt: userData?.createdAt || new Date().toISOString()
    };
  }, []);

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(initializeUser(parsedUser));
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, [initializeUser]);

  const login = async (userData) => {
    try {
      // In a real app, you would make an API call to your backend to authenticate
      // For now, we'll simulate a successful login
      const userWithAvatar = initializeUser(userData);
      setUser(userWithAvatar);
      localStorage.setItem('user', JSON.stringify(userWithAvatar));
      
      // Show success toast
      toast.success('Signed in successfully!', {
        description: `Welcome back, ${userWithAvatar.name || 'User'}!`,
      });
      
      // Navigate after state is updated
      navigate('/discover');
      
      return { success: true, user: userWithAvatar };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.message || 'Failed to log in';
      toast.error('Sign in failed', {
        description: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    try {
      const userName = user?.name || 'User';
      setUser(null);
      localStorage.removeItem('user');
      
      // Show success toast
      toast.success('Signed out successfully!', {
        description: 'You have been signed out.',
      });
      
      navigate('/');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      const errorMessage = error.message || 'Failed to log out';
      toast.error('Sign out failed', {
        description: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  };

  const updateProfile = async (updates) => {
    try {
      setUser(prev => {
        const updatedUser = { ...prev, ...updates };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      });
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message || 'Failed to update profile' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        updateProfile,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
