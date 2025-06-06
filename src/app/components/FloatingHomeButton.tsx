'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function FloatingHomeButton() {
  return (
    <Link
      href="/"
      className="fixed bottom-8 right-8 p-4 bg-primary/90 hover:bg-primary text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
      aria-label="Go to home page"
    >
      <Home className="w-6 h-6" />
    </Link>
  );
} 