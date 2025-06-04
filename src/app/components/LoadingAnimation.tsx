interface LoadingAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  type?: 'spinner' | 'dots' | 'bars' | 'pulse';
  className?: string;
}

export default function LoadingAnimation({ 
  size = 'md', 
  type = 'spinner',
  className = '' 
}: LoadingAnimationProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (type === 'spinner') {
    return (
      <div className={`${sizeClasses[size]} ${className} animate-spin`}>
        <div className="w-full h-full border-4 border-blue-200 border-t-blue-600 rounded-full animate-fade-in-out"></div>
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-fade-bounce" style={{animationDelay: '0ms'}}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-fade-bounce" style={{animationDelay: '200ms'}}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-fade-bounce" style={{animationDelay: '400ms'}}></div>
      </div>
    );
  }

  if (type === 'bars') {
    return (
      <div className={`flex items-end space-x-1 ${className}`}>
        <div className="w-1 h-6 bg-blue-400 rounded animate-fade-stretch" style={{animationDelay: '0ms'}}></div>
        <div className="w-1 h-4 bg-blue-500 rounded animate-fade-stretch" style={{animationDelay: '100ms'}}></div>
        <div className="w-1 h-8 bg-blue-600 rounded animate-fade-stretch" style={{animationDelay: '200ms'}}></div>
        <div className="w-1 h-5 bg-blue-400 rounded animate-fade-stretch" style={{animationDelay: '300ms'}}></div>
        <div className="w-1 h-7 bg-blue-500 rounded animate-fade-stretch" style={{animationDelay: '400ms'}}></div>
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <div className="w-full h-full bg-blue-500 rounded-full animate-fade-pulse"></div>
      </div>
    );
  }

  return null;
} 