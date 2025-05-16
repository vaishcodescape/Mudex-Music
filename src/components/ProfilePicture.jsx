import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaCamera, FaCheck, FaTimes } from 'react-icons/fa';

const ProfilePicture = ({ 
  src, 
  name = 'User', 
  size = 'md',
  editable = false,
  onUpdate = () => {}
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
          />
          {editable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-2">
              <button 
                onClick={handleSave}
                className="p-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                <FaCheck size={iconSize * 0.7} />
              </button>
              <button 
                onClick={handleCancel}
                className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
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
        />
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
        {getInitials()}
      </div>
    );
  };

  return (
    <div 
      className={`relative rounded-full overflow-hidden flex-shrink-0 ${sizeClasses[size]}`}
      onMouseEnter={() => editable && setIsHovered(true)}
      onMouseLeave={() => !isEditing && setIsHovered(false)}
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
        />
      )}
      
      {editable && (
        <button
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Change profile picture"
        />
      )}
    </div>
  );
};

export default ProfilePicture;
