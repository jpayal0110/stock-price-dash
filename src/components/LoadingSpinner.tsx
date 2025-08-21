import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary-200 rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <div className="text-primary-600 font-medium">Loading stock data...</div>
    </div>
  );
};

export default LoadingSpinner;
