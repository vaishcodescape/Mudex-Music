'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">User Dashboard</h1>
        {session?.user && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome, {session.user.name}</h2>
            <p className="text-gray-400">Your dashboard is under construction.</p>
          </div>
        )}
      </div>
    </div>
  );
}
