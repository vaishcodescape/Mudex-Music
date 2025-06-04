"use client"

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Discover() {
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
        
        {/* Discover Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent animate-in fade-in duration-1000">
              Discover Music
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-in fade-in duration-1000 delay-300">
              Unearth Hidden Gems & Rising Stars
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto animate-in fade-in duration-1000 delay-500"></div>
          </div>
        </section>

        {/* Featured Tracks Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-400 animate-in fade-in duration-1000">
              Featured This Week
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gradient-to-br from-slate-900/50 to-blue-900/20 p-6 rounded-xl border border-slate-800 backdrop-blur-sm hover:scale-105 transition-all duration-300 animate-in fade-in duration-1000" style={{animationDelay: `${item * 200}ms`}}>
                  <div className="w-full h-48 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Rising Track {item}</h3>
                  <p className="text-gray-300 mb-2">by Emerging Artist</p>
                  <p className="text-sm text-gray-400">Electronic • 3:42</p>
                  <button 
                    onClick={() => alert('Play feature coming soon!')}
                    className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                  >
                    Play Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Genres Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-900/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-400 animate-in fade-in duration-1000">
              Explore by Genre
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Electronic', 'Indie', 'Hip-Hop', 'Alternative', 'Folk', 'Jazz', 'Rock', 'Pop'].map((genre, index) => (
                <div key={genre} className="bg-gradient-to-br from-slate-900/30 to-blue-900/10 p-6 rounded-lg border border-slate-800/50 text-center hover:scale-105 transition-all duration-300 cursor-pointer animate-in fade-in duration-1000" style={{animationDelay: `${index * 100}ms`}}>
                  <h3 className="text-lg font-semibold text-white mb-2">{genre}</h3>
                  <p className="text-sm text-gray-400">125+ tracks</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Mix Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/50 to-blue-900/20 p-8 md:p-12 rounded-xl border border-slate-800 backdrop-blur-sm animate-in fade-in duration-1000">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Your Daily Mix</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Personalized recommendations based on your taste in underrated music
                </p>
                <button 
                  onClick={() => alert('Personalized mix generation coming soon!')}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Generate My Mix
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
