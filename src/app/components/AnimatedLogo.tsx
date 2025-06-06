export default function AnimatedLogo() {
  return (
    <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 cursor-default">
      {/* Animated M Soundwave */}
      <div className="flex items-end space-x-0.5 h-8 w-12">
        {/* Left side of M */}
        <div className="w-1 bg-blue-400 rounded-t animate-pulse" style={{
          height: '32px',
          animationDelay: '0ms',
          animationDuration: '1.5s'
        }}></div>
        <div className="w-1 bg-blue-500 rounded-t animate-pulse" style={{
          height: '28px',
          animationDelay: '100ms',
          animationDuration: '1.3s'
        }}></div>
        <div className="w-1 bg-blue-400 rounded-t animate-pulse" style={{
          height: '24px',
          animationDelay: '200ms',
          animationDuration: '1.7s'
        }}></div>
        <div className="w-1 bg-blue-500 rounded-t animate-pulse" style={{
          height: '20px',
          animationDelay: '300ms',
          animationDuration: '1.2s'
        }}></div>
        
        {/* Center peak of M */}
        <div className="w-1 bg-blue-400 rounded-t animate-pulse" style={{
          height: '16px',
          animationDelay: '400ms',
          animationDuration: '1.6s'
        }}></div>
        <div className="w-1 bg-blue-500 rounded-t animate-pulse" style={{
          height: '12px',
          animationDelay: '500ms',
          animationDuration: '1.4s'
        }}></div>
        
        {/* Right side of M */}
        <div className="w-1 bg-blue-400 rounded-t animate-pulse" style={{
          height: '20px',
          animationDelay: '600ms',
          animationDuration: '1.2s'
        }}></div>
        <div className="w-1 bg-blue-500 rounded-t animate-pulse" style={{
          height: '24px',
          animationDelay: '700ms',
          animationDuration: '1.7s'
        }}></div>
        <div className="w-1 bg-blue-400 rounded-t animate-pulse" style={{
          height: '28px',
          animationDelay: '800ms',
          animationDuration: '1.3s'
        }}></div>
        <div className="w-1 bg-blue-500 rounded-t animate-pulse" style={{
          height: '32px',
          animationDelay: '900ms',
          animationDuration: '1.5s'
        }}></div>
      </div>
      
      {/* Text */}
      <span className="text-xl font-bold text-white hover-glow">
        Mudex Music
      </span>
    </div>
  );
} 