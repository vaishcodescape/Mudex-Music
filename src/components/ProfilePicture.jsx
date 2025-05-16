import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaCamera, FaCheck, FaTimes } from 'react-icons/fa';

const ProfilePicture = ({ 
  src, 
  name = 'User', 
  size = 'md',
  editable = false,
  onUpdate = () => {},
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl',
  };

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 20,
    xl: 24,
  }[size];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      setIsEditing(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (previewUrl) {
      onUpdate(previewUrl);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPreviewUrl('');
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getInitials = () => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          {editable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-4">
              <button 
                onClick={handleSave}
                className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                aria-label="Save profile picture"
              >
                <FaCheck size={iconSize * 0.7} />
              </button>
              <button 
                onClick={handleCancel}
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                aria-label="Cancel profile picture change"
              >
                <FaTimes size={iconSize * 0.7} />
              </button>
            </div>
          )}
        </div>
      );
    }

    if (src) {
      return (
        <img 
          src={src} 
          alt={name} 
          className="w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            // Fallback to initials if image fails to load
            e.target.style.display = 'none';
            e.target.parentNode.appendChild(
              document.createTextNode(getInitials())
            );
            e.target.parentNode.classList.add('bg-primary/10', 'text-primary', 'flex', 'items-center', 'justify-center');
          }}
        />
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
        {getInitials()}
      </div>
    );
  };

  // Function to handle touch start for mobile devices
  const handleTouchStart = () => {
    if (editable && !isEditing) {
      setIsHovered(true);
    }
  };

  // Function to handle touch end for mobile devices
  const handleTouchEnd = () => {
    if (!isEditing) {
      // Add a small delay before hiding the overlay on mobile
      // to ensure it's visible enough for the user to see
      setTimeout(() => {
        setIsHovered(false);
      }, 300);
    }
  };

  return (
    <div 
      className={`relative rounded-full overflow-hidden flex-shrink-0 ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => editable && setIsHovered(true)}
      onMouseLeave={() => !isEditing && setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {renderContent()}
      
      {editable && !isEditing && isHovered && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer">
          <FaCamera size={iconSize} className="text-white" />
        </div>
      )}
      
      {editable && (
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          onClick={(e) => e.stopPropagation()}
          capture="user"
        />
      )}
      
      {editable && (
        <button
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onTouchEnd={() => fileInputRef.current?.click()}
          aria-label="Change profile picture"
        />
      )}
    </div>
  );
};

export default ProfilePicture;
