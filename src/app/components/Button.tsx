import LoadingAnimation from './LoadingAnimation';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  loading = false,
  disabled = false
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 hover:transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 group relative overflow-hidden animate-shimmer hover-glow';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-black text-white shadow-lg hover:shadow-black/50 hover:shadow-2xl',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500 interactive-border',
    outline: 'bg-black hover:bg-blue-600 text-white hover:text-white border-2 border-black hover:border-blue-600 hover:shadow-lg hover:shadow-blue-400/30'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const loadingSizeMap = {
    sm: 'sm' as const,
    md: 'sm' as const,
    lg: 'md' as const
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        isDisabled ? 'opacity-50 cursor-not-allowed hover:transform-none hover:translate-y-0' : ''
      }`}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
    >
      <span className={`relative z-10 transition-all duration-300 group-hover:animate-pulse flex items-center justify-center gap-2 ${
        loading ? 'opacity-70' : ''
      }`}>
        {loading && <LoadingAnimation type="spinner" size={loadingSizeMap[size]} />}
        {children}
      </span>
      
      {/* Enhanced gradient overlay for primary buttons */}
      {variant === 'primary' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </>
      )}
      
      {/* Glow effect for outline buttons */}
      {variant === 'outline' && (
        <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
      )}
      
      {/* Shimmer effect for all buttons */}
      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </button>
  );
} 