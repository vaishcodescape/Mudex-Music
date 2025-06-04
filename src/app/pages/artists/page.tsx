"use client"

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Artists() {
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
        
        {/* Artists Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent animate-in fade-in duration-1000">
              Featured Artists
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-in fade-in duration-1000 delay-300">
              Spotlight on Tomorrow's Music Icons
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto animate-in fade-in duration-1000 delay-500"></div>
          </div>
        </section>

        {/* Featured Artist Spotlight */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/50 to-blue-900/20 p-8 md:p-12 rounded-xl border border-slate-800 backdrop-blur-sm animate-in fade-in duration-1000">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-full h-80 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-24 h-24 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Artist Spotlight</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Luna Waves</h2>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    An emerging electronic artist from Portland, blending ambient soundscapes with 
                    ethereal vocals. Luna's unique approach to sound design has garnered attention 
                    from music producers worldwide.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">Electronic</span>
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">Ambient</span>
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">Experimental</span>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => alert('Play feature coming soon!')}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Play Latest Track
                    </button>
                    <button 
                      onClick={() => alert('Follow feature coming soon!')}
                      className="px-6 py-3 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Follow Artist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rising Artists Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-400 animate-in fade-in duration-1000">
              Rising Stars
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Echo Dreams', genre: 'Indie Folk', followers: '12.5K' },
                { name: 'Neon Pulse', genre: 'Synthwave', followers: '8.3K' },
                { name: 'Cosmic Rain', genre: 'Lo-Fi Hip Hop', followers: '15.7K' },
                { name: 'Midnight Canvas', genre: 'Alternative Rock', followers: '9.2K' },
                { name: 'Digital Horizon', genre: 'Electronic', followers: '11.8K' },
                { name: 'Velvet Storm', genre: 'Dream Pop', followers: '6.9K' }
              ].map((artist, index) => (
                <div key={artist.name} className="bg-gradient-to-br from-slate-900/50 to-blue-900/20 p-6 rounded-xl border border-slate-800 backdrop-blur-sm hover:scale-105 transition-all duration-300 animate-in fade-in duration-1000" style={{animationDelay: `${index * 150}ms`}}>
                  <div className="w-full h-48 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{artist.name}</h3>
                  <p className="text-blue-300 mb-2">{artist.genre}</p>
                  <p className="text-sm text-gray-400 mb-4">{artist.followers} followers</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => alert('Play feature coming soon!')}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-300"
                    >
                      Play
                    </button>
                    <button 
                      onClick={() => alert('Follow feature coming soon!')}
                      className="flex-1 py-2 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black text-sm rounded-lg transition-all duration-300"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submit Music CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-900/5 to-transparent">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Are You an Artist?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community of rising musicians and get your music heard by the right audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => alert('Music submission feature coming soon!')}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Submit Your Music
              </button>
              <Link href="/pages/about">
                <button className="px-8 py-3 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
