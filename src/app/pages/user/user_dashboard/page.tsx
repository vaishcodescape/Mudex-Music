'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/pages/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white animate-page-fade-in relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-particle opacity-30"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-blue-300 rounded-full animate-particle opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-64 left-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-particle opacity-20" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-particle opacity-35" style={{animationDelay: '6s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome back, {session?.user?.name}
          </h1>
          <p className="text-gray-400">Here's what's happening with your music</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{animationDelay: '100ms'}}>
            <h3 className="text-lg font-semibold mb-2 text-blue-400">Total Plays</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{animationDelay: '200ms'}}>
            <h3 className="text-lg font-semibold mb-2 text-purple-400">Playlists</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{animationDelay: '300ms'}}>
            <h3 className="text-lg font-semibold mb-2 text-cyan-400">Following</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{animationDelay: '400ms'}}>
            <h3 className="text-lg font-semibold mb-2 text-emerald-400">Followers</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recently Played */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{animationDelay: '500ms'}}>
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Recently Played</h2>
              <div className="space-y-4">
                <p className="text-gray-400">No recent plays</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{animationDelay: '600ms'}}>
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Quick Actions</h2>
              <div className="space-y-4">
                <Button variant="primary" size="md" className="w-full">
                  Create New Playlist
                </Button>
                <Button variant="secondary" size="md" className="w-full">
                  Discover New Music
                </Button>
                <Link href="/pages/user/user_profile" className="block">
                  <Button variant="outline" size="md" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>

            {/* Top Artists */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{animationDelay: '700ms'}}>
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Top Artists</h2>
              <div className="space-y-4">
                <p className="text-gray-400">No artists yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
