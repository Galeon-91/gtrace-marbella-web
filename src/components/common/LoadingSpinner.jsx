const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gt-black">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-gt-gold/20 border-t-gt-gold rounded-full animate-spin`}
        ></div>
        <p className="text-gt-gold text-sm mt-4 text-center animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;