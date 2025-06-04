"use client"

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Playlists() {
  return (
    <div className="min-h-screen bg-black text-white animate-page-fade-in relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-particle opacity-30"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-blue-300 rounded-full animate-particle opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-64 left-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-particle opacity-20" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-particle opacity-35" style={{animationDelay: '6s'}}></div>
        <div className="absolute bottom-60 left-16 w-1 h-1 bg-blue-300 rounded-full animate-particle opacity-25" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-10 w-1.5 h-1.5 bg-blue-500 rounded-full animate-particle opacity-30" style={{animationDelay: '5s'}}></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        <Header />
        
        {/* Playlists Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent animate-in fade-in duration-1000">
              Curated Playlists
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-in fade-in duration-1000 delay-300">
              Handpicked Collections for Every Mood
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto animate-in fade-in duration-1000 delay-500"></div>
          </div>
        </section>

        {/* Featured Playlist */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/50 to-blue-900/20 p-8 md:p-12 rounded-xl border border-slate-800 backdrop-blur-sm animate-in fade-in duration-1000">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-full h-80 bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <svg className="w-24 h-24 text-white opacity-75 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-1.79-.59-3.44-1.586-4.757a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Featured Playlist</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Midnight Discoveries</h2>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    A carefully curated selection of atmospheric tracks perfect for late-night listening. 
                    Featuring emerging artists who craft sonic landscapes that blur the line between 
                    reality and dreams.
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-gray-400">32 tracks</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">2h 14m</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">Updated weekly</span>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => alert('Play feature coming soon!')}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Play Playlist
                    </button>
                    <button 
                      onClick={() => alert('Save feature coming soon!')}
                      className="px-6 py-3 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Save to Library
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Playlists Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-400 animate-in fade-in duration-1000">
              Popular Collections
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Underground Vibes', 
                  description: 'Raw and authentic sounds from the underground scene',
                  tracks: 28,
                  duration: '1h 52m',
                  color: 'from-red-600 to-orange-600'
                },
                { 
                  name: 'Chill Electronica', 
                  description: 'Downtempo electronic beats for relaxation',
                  tracks: 24,
                  duration: '1h 36m',
                  color: 'from-green-600 to-teal-600'
                },
                { 
                  name: 'Indie Gems', 
                  description: 'Hidden treasures from independent artists',
                  tracks: 35,
                  duration: '2h 28m',
                  color: 'from-purple-600 to-pink-600'
                },
                { 
                  name: 'Lo-Fi Nights', 
                  description: 'Nostalgic lo-fi beats for late evening sessions',
                  tracks: 42,
                  duration: '2h 45m',
                  color: 'from-blue-600 to-indigo-600'
                },
                { 
                  name: 'Rising Hip-Hop', 
                  description: 'Fresh voices in the hip-hop scene',
                  tracks: 18,
                  duration: '1h 12m',
                  color: 'from-yellow-600 to-orange-600'
                },
                { 
                  name: 'Dreamy Shoegaze', 
                  description: 'Ethereal walls of sound and dreamy vocals',
                  tracks: 22,
                  duration: '1h 48m',
                  color: 'from-pink-600 to-purple-600'
                }
              ].map((playlist, index) => (
                <div key={playlist.name} className="bg-gradient-to-br from-slate-900/50 to-blue-900/20 p-6 rounded-xl border border-slate-800 backdrop-blur-sm hover:scale-105 transition-all duration-300 animate-in fade-in duration-1000" style={{animationDelay: `${index * 150}ms`}}>
                  <div className={`w-full h-48 bg-gradient-to-br ${playlist.color} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <svg className="w-16 h-16 text-white opacity-75 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{playlist.name}</h3>
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">{playlist.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <span>{playlist.tracks} tracks</span>
                    <span>•</span>
                    <span>{playlist.duration}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => alert('Play feature coming soon!')}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-300"
                    >
                      Play
                    </button>
                    <button 
                      onClick={() => alert('Save feature coming soon!')}
                      className="flex-1 py-2 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black text-sm rounded-lg transition-all duration-300"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Create Playlist CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-900/5 to-transparent">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Create Your Own Playlist
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Discover and organize your favorite underrated tracks into personalized collections.
            </p>
            <button 
              onClick={() => alert('Playlist creation feature coming soon!')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Start Creating
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
