import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Artists = () => {
  const navigate = useNavigate();
  const [artistCount, setArtistCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulate API call to get artist count
    const fetchArtistCount = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // For now, we'll simulate a network request
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // This would normally come from your backend
        setArtistCount(42);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching artist count:', err);
        setError('Unable to load artist data');
        setLoading(false);
      }
    };
    
    fetchArtistCount();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Artists
          </motion.h1>
          
          <motion.div
            className="bg-card/40 backdrop-blur-sm border border-border/30 rounded-xl p-10 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(56, 189, 248, 0.3)',
              borderColor: 'rgba(56, 189, 248, 0.6)'
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <FaUser className="text-primary h-16 w-16 mb-6 opacity-80" />
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <FaSpinner className="animate-spin text-primary h-12 w-12 mb-4" />
                  <p className="text-muted-foreground">Loading artist data...</p>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <p className="text-red-500 mb-2">{error}</p>
                  <Button 
                    onClick={() => window.location.reload()}
                    variant="outline"
                    size="sm"
                  >
                    Retry
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    {artistCount}
                  </div>
                  
                  <p className="text-xl text-muted-foreground mb-8">Active Artists</p>
                  
                  <Button
                    onClick={() => navigate('/artist/1')}
                    variant="glow"
                    size="lg"
                    className="font-semibold"
                  >
                    View Featured Artist
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Artists;
