"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pages/discover', label: 'Discover' },
    { href: '/pages/playlists', label: 'Playlists' },
    { href: '/pages/stars', label: 'Stars' },
  ];

  return (
    <div className="flex items-center justify-between w-full px-4">
      {/* Left spacer for balance */}
      <div className="w-32"></div>

      {/* Centered Navigation */}
      <nav className="hidden md:flex items-center justify-center space-x-1 bg-black/40 rounded-full px-4 py-2 backdrop-blur-sm border border-gray-800/50 shadow-lg">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                isActive
                  ? 'text-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 translate-y-1/2" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Menu */}
      {session && (
        <div className="relative w-32 flex justify-end">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="relative w-8 h-8">
              <Image
                src={session.user?.image || "/default-avatar.png"}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-white">
              {session.user?.name}
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isUserMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-1 border border-white/10">
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}