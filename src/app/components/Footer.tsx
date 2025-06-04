export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-16 mt-20 animate-in slide-in-from-bottom duration-1000 delay-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 text-center md:text-left animate-in fade-in duration-1000 delay-500">
            <h3 className="text-2xl font-bold text-blue-400 mb-2 hover:animate-pulse cursor-default">
              Mudex Music
            </h3>
            <p className="text-gray-400">Elevating the underrated since 2025</p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 animate-in fade-in duration-1000 delay-700">
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm font-medium hover:scale-110 hover:-translate-y-1">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm font-medium hover:scale-110 hover:-translate-y-1">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm font-medium hover:scale-110 hover:-translate-y-1">
                Contact
              </a>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/vaishcodescape/Mudex-Music.git" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:transform hover:scale-125 hover:rotate-12 hover:-translate-y-2 hover:animate-pulse"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center animate-in fade-in duration-1000 delay-1000">
          <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300 cursor-default">
            &copy; 2025 Mudex Music. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 