import { useEffect, useRef, useState } from 'react';

const Scrollbar = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const startY = useRef(0);
  const startScroll = useRef(0);

  // Calculate thumb height based on content height
  useEffect(() => {
    const updateThumbHeight = () => {
      if (!scrollContainerRef.current) return;
      
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      const thumbHeight = Math.max((clientHeight / scrollHeight) * 100, 10); // Minimum height of 10%
      setThumbHeight(thumbHeight);
    };

    updateThumbHeight();
    window.addEventListener('resize', updateThumbHeight);
    return () => window.removeEventListener('resize', updateThumbHeight);
  }, [children]);

  // Handle scroll event
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollY(scrollPercentage);
  };

  // Handle mouse down on thumb
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    startY.current = e.clientY;
    startScroll.current = scrollContainerRef.current.scrollTop;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    const deltaY = e.clientY - startY.current;
    const scrollRatio = scrollContainerRef.current.scrollHeight / scrollContainerRef.current.clientHeight;
    const newScrollTop = startScroll.current + deltaY * scrollRatio;
    
    scrollContainerRef.current.scrollTop = newScrollTop;
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Handle click on track
  const handleTrackClick = (e) => {
    if (!scrollContainerRef.current || !scrollThumbRef.current) return;
    
    const trackRect = e.currentTarget.getBoundingClientRect();
    const thumbRect = scrollThumbRef.current.getBoundingClientRect();
    
    // Only handle clicks outside the thumb
    if (e.clientY < thumbRect.top || e.clientY > thumbRect.bottom) {
      const clickPosition = e.clientY - trackRect.top;
      const clickPercentage = (clickPosition / trackRect.height) * 100;
      
      // Calculate new scroll position
      const newScrollTop = (clickPercentage / 100) * scrollContainerRef.current.scrollHeight;
      scrollContainerRef.current.scrollTo({
        top: newScrollTop,
        behavior: 'smooth'
      });
    }
  };

  // Calculate thumb position
  const thumbPosition = `${Math.min(scrollY, 100 - thumbHeight)}%`;
  const thumbStyle = {
    height: `${thumbHeight}%`,
    transform: `translateY(${thumbPosition})`,
    opacity: isHovered || isDragging ? 1 : 0.7,
  };

  return (
    <div className="relative h-full w-full flex">
      {/* Scrollable Content */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto scrollbar-hide"
        onScroll={handleScroll}
      >
        {children}
      </div>

      {/* Custom Scrollbar */}
      <div 
        className="w-2.5 h-full bg-background/20 rounded-full mr-1 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => !isDragging && setIsHovered(false)}
        onClick={handleTrackClick}
      >
        <div
          ref={scrollThumbRef}
          className={`absolute w-full bg-primary/60 rounded-full transition-all duration-200 ${
            isHovered || isDragging ? 'w-2.5' : 'w-1.5'
          }`}
          style={thumbStyle}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default Scrollbar;
