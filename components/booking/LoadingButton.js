export default function LoadingButton({ 
  onClick, 
  disabled = false, 
  loading = false, 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center';
  
  const variants = {
    primary: loading || disabled 
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95',
    secondary: loading || disabled
      ? 'border border-gray-300 text-gray-400 cursor-not-allowed'
      : 'border border-gray-300 text-gray-700 hover:bg-gray-50 transform hover:scale-105 active:scale-95',
    success: loading || disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm min-w-[120px]',
    md: 'px-6 py-3 min-w-[160px]',
    lg: 'px-8 py-4 text-lg min-w-[200px]'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
