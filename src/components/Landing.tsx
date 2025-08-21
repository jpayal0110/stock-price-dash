import React from 'react';
import { TrendingUp, BarChart3, ArrowRight, Zap, Shield } from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section with enhanced animations */}
          <div className="mb-16 animate-fadeIn">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <TrendingUp className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 animate-fadeIn" style={{animationDelay: '0.3s'}}>
              Welcome to{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                PebbleStocks
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 animate-fadeIn" style={{animationDelay: '0.6s'}}>
              Your intelligent companion for real-time stock market insights and analytics
            </p>
            
            <button
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-5 rounded-full text-xl font-bold hover:from-yellow-300 hover:to-orange-400 shadow-2xl"
              style={{animationDelay: '0.9s'}}
            >
              Get Started
              <ArrowRight className="inline-block ml-3 h-6 w-6" />
            </button>
          </div>

          {/* Features Section with staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-fadeIn" style={{animationDelay: '1.2s'}}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/30 rounded-full mb-6">
                <BarChart3 className="h-10 w-10 text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Analytics</h3>
              <p className="text-blue-100 text-lg">
                Advanced charting with multiple visualization types including line, bar, and pie charts
              </p>
            </div>

            <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-fadeIn" style={{animationDelay: '1.5s'}}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/30 rounded-full mb-6">
                <Zap className="h-10 w-10 text-green-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-time Data</h3>
              <p className="text-blue-100 text-lg">
                Live stock updates with automatic refresh every 30 seconds for the latest market data
              </p>
            </div>

            <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-fadeIn" style={{animationDelay: '1.8s'}}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/30 rounded-full mb-6">
                <Shield className="h-10 w-10 text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Reliable & Secure</h3>
              <p className="text-blue-100 text-lg">
                Built with modern technologies and includes comprehensive error handling
              </p>
            </div>
          </div>

          {/* Stats Section with enhanced styling */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 max-w-5xl mx-auto animate-fadeIn" style={{animationDelay: '2.1s'}}>
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Market Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-300 mb-3">12+</div>
                <div className="text-blue-200 text-lg">Major Stocks</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-300 mb-3">24/7</div>
                <div className="text-blue-200 text-lg">Market Data</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-300 mb-3">3</div>
                <div className="text-blue-200 text-lg">Chart Types</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-300 mb-3">30s</div>
                <div className="text-blue-200 text-lg">Auto Refresh</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 animate-fadeIn" style={{animationDelay: '2.4s'}}>
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready to explore the markets?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of investors using PebbleStocks for smarter trading decisions
            </p>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-5 rounded-full text-xl font-bold shadow-2xl"
            >
              Start Trading Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
