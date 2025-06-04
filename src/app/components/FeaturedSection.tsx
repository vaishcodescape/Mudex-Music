export default function FeaturedSection() {
  const playlists = [
    {
      title: "Indie Dreams",
      description: "A collection of dreamy indie tracks from upcoming artists",
      tracks: 24,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Underground Beats",
      description: "Electronic sounds from the underground scene",
      tracks: 18,
      gradient: "from-green-500 to-blue-600"
    },
    {
      title: "Raw Talent",
      description: "Fresh voices breaking into the music scene",
      tracks: 32,
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Featured This Week</h2>
          <p className="text-gray-400">Handpicked tracks from rising artists</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playlists.map((playlist, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-all duration-300 cursor-pointer group hover:transform hover:scale-105">
              <div className={`w-full h-48 bg-gradient-to-br ${playlist.gradient} rounded-lg mb-4 flex items-center justify-center group-hover:shadow-lg transition-shadow`}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{playlist.title}</h3>
              <p className="text-gray-400 mb-4">{playlist.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-400">{playlist.tracks} tracks</span>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 