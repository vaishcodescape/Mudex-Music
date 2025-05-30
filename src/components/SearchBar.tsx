'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  title: string;
  type: 'track' | 'artist' | 'playlist';
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Mock search results - replace with actual API call
  const mockSearch = async (searchQuery: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockResults: SearchResult[] = [
      { id: '1', title: 'Bohemian Rhapsody', type: 'track' },
      { id: '2', title: 'Queen', type: 'artist' },
      { id: '3', title: 'Classic Rock Hits', type: 'playlist' },
    ].filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResults(mockResults);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      mockSearch(query);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    // Navigate based on result type
    switch (result.type) {
      case 'track':
        router.push(`/track/${result.id}`);
        break;
      case 'artist':
        router.push(`/artist/${result.id}`);
        break;
      case 'playlist':
        router.push(`/playlist/${result.id}`);
        break;
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for songs, artists, or playlists..."
          className="w-full px-4 py-2 bg-white/5 border border-sky-500/20 rounded-lg 
                   focus:outline-none focus:border-sky-500/40 focus:ring-1 focus:ring-sky-500/20
                   text-white placeholder-sky-200/50"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-200/50">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (query.length > 0 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-black/90 backdrop-blur-sm border border-sky-500/20 
                     rounded-lg shadow-lg overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="p-4 text-center text-sky-200/70">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-500 mx-auto"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full px-4 py-3 text-left hover:bg-sky-500/10 transition-colors
                             flex items-center gap-3 group"
                  >
                    <div className="text-sky-400">
                      {result.type === 'track' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      )}
                      {result.type === 'artist' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                      {result.type === 'playlist' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-white group-hover:text-sky-400 transition-colors">
                        {result.title}
                      </div>
                      <div className="text-sm text-sky-200/50 capitalize">
                        {result.type}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sky-200/70">
                No results found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 