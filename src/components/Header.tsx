import React from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  onBackToLanding: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, onBackToLanding }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-primary-600" />
            <div>
                          <h1 className="text-2xl font-bold text-gray-900">
              PebbleStocks
            </h1>
            <p className="text-sm text-gray-600">
              Smart stock analytics & insights
            </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToLanding}
              className="btn-secondary flex items-center space-x-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button
              onClick={onRefresh}
              className="btn-secondary flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            
            <div className="text-right">
              <div className="text-sm text-gray-600">
                Last updated
              </div>
              <div className="text-sm font-medium text-gray-900">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
