import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUpload, FaMusic, FaUser, FaGlobe, FaInstagram, FaTwitter, FaYoutube, FaSpotify } from 'react-icons/fa';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const ArtistProfile = () => {
  const { artistId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from an API
  const [artist, setArtist] = useState({
    id: artistId,
    name: 'Artist Name',
    stageName: 'Stage Name',
    bio: 'A talented musician creating amazing music. Follow for more updates!',
    avatar: 'https://via.placeholder.com/150',
    coverImage: 'https://via.placeholder.com/1200x400',
    socialLinks: {
      website: '#',
      instagram: '#',
      twitter: '#',
      youtube: '#',
      spotify: '#',
    },
    tracks: [
      { id: 1, title: 'New Single', plays: '1.2M', duration: '3:45', cover: 'https://via.placeholder.com/80' },
      { id: 2, title: 'Summer Vibes', plays: '890K', duration: '3:12', cover: 'https://via.placeholder.com/80' },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: artist.name,
    stageName: artist.stageName,
    bio: artist.bio,
  });
  const [isUploading, setIsUploading] = useState(false);

  // Check if current user is the artist
  const isCurrentUserArtist = user?.id === artistId;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would update the artist data via an API
    setArtist(prev => ({
      ...prev,
      ...formData
    }));
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, upload the file to your storage service
      const fileUrl = URL.createObjectURL(file);
      
      if (type === 'avatar') {
        setArtist(prev => ({
          ...prev,
          avatar: fileUrl
        }));
      } else {
        setArtist(prev => ({
          ...prev,
          coverImage: fileUrl
        }));
      }
      
      toast.success(`${type === 'avatar' ? 'Profile picture' : 'Cover image'} updated!`);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleTrackUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Simulate track upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, upload the track to your storage service
      const newTrack = {
        id: Math.random().toString(36).substr(2, 9),
        title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
        plays: '0',
        duration: '3:30', // In a real app, get duration from audio metadata
        cover: 'https://via.placeholder.com/80',
      };
      
      setArtist(prev => ({
        ...prev,
        tracks: [newTrack, ...prev.tracks]
      }));
      
      toast.success('Track uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload track');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-gray-800 overflow-hidden">
        <img 
          src={artist.coverImage} 
          alt={`${artist.name}'s cover`} 
          className="w-full h-full object-cover"
        />
        
        {isCurrentUserArtist && (
          <div className="absolute bottom-4 right-4">
            <label className="inline-flex items-center px-4 py-2 bg-primary/90 hover:bg-primary text-white rounded-full cursor-pointer transition-colors">
              <FaUpload className="mr-2" />
              Change Cover
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => handleFileUpload(e, 'cover')}
                disabled={isUploading}
              />
            </label>
          </div>
        )}
      </div>

      
      {/* Profile Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background bg-card overflow-hidden shadow-lg">
              <img 
                src={artist.avatar} 
                alt={artist.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {isCurrentUserArtist && (
              <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                <FaUpload className="h-4 w-4" />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileUpload(e, 'avatar')}
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-3xl font-bold bg-transparent border-b border-gray-600 focus:outline-none focus:border-primary"
                  />
                ) : (
                  <h1 className="text-3xl font-bold">{artist.name}</h1>
                )}
                
                {isEditing ? (
                  <input
                    type="text"
                    name="stageName"
                    value={formData.stageName}
                    onChange={handleInputChange}
                    className="text-xl text-muted-foreground bg-transparent border-b border-gray-600 focus:outline-none focus:border-primary mt-1"
                    placeholder="Stage name"
                  />
                ) : (
                  <p className="text-xl text-muted-foreground">{artist.stageName}</p>
                )}
              </div>
              
              {isCurrentUserArtist && (
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={() => setIsEditing(false)} variant="outline">
                        Cancel
                      </Button>
                      <Button onClick={handleSave} disabled={isUploading}>
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      Edit Profile
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            <div className="mt-4">
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="3"
                />
              ) : (
                <p className="text-muted-foreground">{artist.bio}</p>
              )}
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              {Object.entries(artist.socialLinks).map(([platform, url]) => (
                <a 
                  key={platform} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {platform === 'website' && <FaGlobe className="h-5 w-5" />}
                  {platform === 'instagram' && <FaInstagram className="h-5 w-5" />}
                  {platform === 'twitter' && <FaTwitter className="h-5 w-5" />}
                  {platform === 'youtube' && <FaYoutube className="h-5 w-5" />}
                  {platform === 'spotify' && <FaSpotify className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tracks Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tracks</h2>
          
          {isCurrentUserArtist && (
            <label className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-full cursor-pointer transition-colors">
              <FaUpload className="mr-2" />
              Upload Track
              <input 
                type="file" 
                className="hidden" 
                accept="audio/*" 
                onChange={handleTrackUpload}
                disabled={isUploading}
              />
            </label>
          )}
        </div>
        
        <div className="bg-card rounded-lg overflow-hidden">
          {artist.tracks.length > 0 ? (
            <ul className="divide-y divide-border">
              {artist.tracks.map((track) => (
                <li key={track.id} className="p-4 hover:bg-card-hover transition-colors">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded overflow-hidden mr-4">
                      <img 
                        src={track.cover} 
                        alt={track.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{track.title}</h3>
                      <p className="text-sm text-muted-foreground">{track.plays} plays</p>
                    </div>
                    <div className="text-muted-foreground">
                      {track.duration}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <FaMusic className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p>No tracks uploaded yet</p>
              {isCurrentUserArtist && (
                <p className="text-sm mt-2">Upload your first track to get started!</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Loading Overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-foreground">Uploading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistProfile;
