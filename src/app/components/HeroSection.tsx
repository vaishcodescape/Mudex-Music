import Button from './Button';

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pb-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 animate-in slide-in-from-bottom duration-1000 delay-200">
            <span className="text-white">Elevate the</span>
            <br />
            <span className="text-blue-400 animate-pulse">Underrated</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto animate-in fade-in duration-1000 delay-500">
            Discover emerging artists, hidden gems, and the next big sounds before they hit the mainstream. 
            Join a community that celebrates authentic music.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom duration-1000 delay-700">
            <Button size="lg">
              Start Listening
            </Button>
            <Button variant="outline" size="lg">
              Browse Artists
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 