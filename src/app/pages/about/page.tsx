"use client"

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function About() {
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
        
        {/* About Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent animate-in fade-in duration-1000">
              About Mudex Music
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-in fade-in duration-1000 delay-300">
              Elevate the Underrated
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto animate-in fade-in duration-1000 delay-500"></div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-in slide-in-from-left duration-1000">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">Our Mission</h2>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  At Mudex Music, we believe that incredible talent exists everywhere, waiting to be discovered. 
                  Our platform is dedicated to amplifying the voices of underrated artists and connecting them 
                  with listeners who crave authentic, fresh sounds.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We&apos;re not just another streaming service—we&apos;re a movement to democratize music discovery 
                  and ensure that great music finds its audience, regardless of an artist&apos;s current following.
                </p>
              </div>
              <div className="animate-in slide-in-from-right duration-1000 delay-300">
                <div className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 p-8 rounded-xl border border-blue-800/30 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Quality Over Quantity</h3>
                  </div>
                  <p className="text-gray-300">
                    We curate exceptional music from emerging artists, ensuring every track meets our 
                    high standards for creativity and production quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-900/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-400 animate-in fade-in duration-1000">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center animate-in fade-in duration-1000 delay-200">
                <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Artist First</h3>
                <p className="text-gray-300">
                  We prioritize fair compensation and meaningful exposure for artists, 
                  ensuring they receive the recognition they deserve.
                </p>
              </div>
              <div className="text-center animate-in fade-in duration-1000 delay-400">
                <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Authentic Discovery</h3>
                <p className="text-gray-300">
                  Mudex Music is powered by A.I looking for the best user experience.
                </p>
              </div>
              <div className="text-center animate-in fade-in duration-1000 delay-600">
                <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Community Driven</h3>
                <p className="text-gray-300">
                  We foster a community where music lovers and artists connect, 
                  share, and support each other&apos;s musical journeys.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-400 animate-in fade-in duration-1000">
              Our Story
            </h2>
            <div className="bg-gradient-to-br from-slate-900/50 to-blue-900/20 p-8 md:p-12 rounded-xl border border-slate-800 backdrop-blur-sm animate-in fade-in duration-1000 delay-300">
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Mudex Music was born from a simple observation: incredible artists were being overlooked 
                by traditional music industry gatekeepers. We saw talented musicians with unique voices 
                struggling to find their audience while listeners were hungry for fresh, authentic sounds.
              </p>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Founded by music enthusiasts and technology innovators, we set out to create a platform 
                that would bridge this gap. Using cutting-edge recommendation algorithms and human curation, 
                we&apos;ve built a space where musical discovery thrives.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Today, Mudex Music continues to grow as a community of artists and listeners who believe 
                in the power of music to connect, inspire, and elevate the human experience.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto animate-in fade-in duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Join the Movement
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Ready to discover your next favorite artist or share your music with the world?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pages/discover">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                Start Discovering
              </button>
              </Link>
              <button 
                onClick={() => alert('Music submission feature coming soon!')}
                className="px-8 py-3 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                Submit Your Music
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}