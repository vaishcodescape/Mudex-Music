import Link from 'next/link';
import Button from './Button';
import AnimatedLogo from './AnimatedLogo';

export default function Header() {
  return (
    <header className="border-b border-slate-800 animate-in slide-in-from-top duration-700 backdrop-blur-sm bg-black/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0 animate-in fade-in duration-1000 delay-300">
            <Link href="/">
            <AnimatedLogo />
            </Link>
          </div>
          
          {/* Navigation - Center */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center space-x-8 animate-in fade-in duration-1000 delay-500">
              <Link href="/pages/discover" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover-glow interactive-border">
                Discover
              </Link>
              <Link href="/pages/artists" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover-glow interactive-border">
                Artists
              </Link>
              <Link href="/pages/playlists" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover-glow interactive-border">
                Playlists
              </Link>
              <Link href="/pages/about" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover-glow interactive-border">
                About
              </Link>
            </div>
          </div>
          
          {/* Sign In Button - Right */}
          <div className="flex-shrink-0 animate-in fade-in duration-1000 delay-700 animate-bounce-in">
            <Button 
              size="sm"
              onClick={() => alert('Sign in feature coming soon!')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
} 