"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../../components/Button';

export default function UserProfile() {
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
        {/* Navigation */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Link 
            href="/pages/user/user_dashboard"
            className="inline-flex items-center text-gray-400 hover:text-white transition duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Profile Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 mb-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center space-x-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/50">
              <Image
                src={session?.user?.image || '/default-avatar.png'}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {session?.user?.name}
              </h1>
              <p className="text-gray-300">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stats Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{animationDelay: '100ms'}}>
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Your Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Playlists</span>
                <span className="text-xl font-semibold text-blue-400">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Following</span>
                <span className="text-xl font-semibold text-purple-400">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Followers</span>
                <span className="text-xl font-semibold text-cyan-400">0</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500 md:col-span-2" style={{animationDelay: '200ms'}}>
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Recent Activity</h2>
            <div className="space-y-4">
              <p className="text-gray-400">No recent activity</p>
            </div>
          </div>

          {/* Settings Link */}
          <div className="md:col-span-3">
            <Link href="/pages/user/settings">
              <Button variant="secondary" size="md" className="w-full">
                Manage Account Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}