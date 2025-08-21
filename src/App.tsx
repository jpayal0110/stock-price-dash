import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StockTable from './components/StockTable';
import StockChart from './components/StockChart';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { StockData } from './types/stock';
import { StockApiService } from './services/stockApi';

type AppSection = 'landing' | 'stocks' | 'charts';

function App() {
  const [currentSection, setCurrentSection] = useState<AppSection>('landing');
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);

  // Default stock symbols to fetch
  const defaultSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'AMD', 'INTC', 'CRM', 'ORCL'];

  useEffect(() => {
    if (currentSection !== 'landing') {
      fetchStockData();
      
      // Refresh data every 30 seconds
      const interval = setInterval(fetchStockData, 30000);
      return () => clearInterval(interval);
    }
  }, [currentSection]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStocks(stocks);
    } else {
      const filtered = stocks.filter(stock =>
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStocks(filtered);
    }
  }, [searchQuery, stocks]);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await StockApiService.getStockQuotes(defaultSymbols);
      
      if (response.success && response.data) {
        setStocks(response.data);
        setFilteredStocks(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch stock data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredStocks(stocks);
      return;
    }

    try {
      setLoading(true);
      const searchResults = await StockApiService.searchStocks(query);
      setFilteredStocks(searchResults);
    } catch (err) {
      console.error('Search error:', err);
      // Fallback to local filtering
      const filtered = stocks.filter(stock =>
        stock.symbol.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStocks(filtered);
    } finally {
      setLoading(false);
    }
  };

  const handleStockSelect = (stock: StockData) => {
    setSelectedStock(stock);
    setCurrentSection('charts');
  };

  const handleRefresh = () => {
    fetchStockData();
  };

  const handleGetStarted = () => {
    setCurrentSection('stocks');
  };

  const handleNavigateToCharts = () => {
    setCurrentSection('charts');
  };

  const handleNavigateToStocks = () => {
    setCurrentSection('stocks');
  };

  const handleBackToLanding = () => {
    setCurrentSection('landing');
    setSelectedStock(null);
    setSearchQuery('');
  };

  // Landing Page with enhanced animations
  if (currentSection === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute top-40 left-40 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>

        <div className="relative z-10">
          <Landing onGetStarted={handleGetStarted} />
        </div>
      </div>
    );
  }

  // Main Dashboard with enhanced styling
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header onRefresh={handleRefresh} onBackToLanding={handleBackToLanding} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs with enhanced styling */}
        <div className="flex justify-center mb-8 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20">
            <button
              onClick={handleNavigateToStocks}
              className={`px-8 py-4 rounded-xl font-semibold ${
                currentSection === 'stocks'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              📊 Stock Table
            </button>
            <button
              onClick={handleNavigateToCharts}
              className={`px-8 py-4 rounded-xl font-semibold ${
                currentSection === 'charts'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              📈 Charts & Analytics
            </button>
          </div>
        </div>

        {/* Search Bar with enhanced styling */}
        <div className="mb-8 animate-fadeIn" style={{animationDelay: '0.2s'}}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <ErrorMessage message={error} onRetry={fetchStockData} />
          </div>
        )}

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn" style={{animationDelay: '0.6s'}}>
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
              {currentSection === 'stocks' ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      📊 Stock Market Data
                    </h2>
                    <div className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
                      {stocks.length} stocks • Auto-refresh every 30s
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex justify-center py-12">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <StockTable 
                      stocks={filteredStocks}
                      onStockSelect={handleStockSelect}
                    />
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      📈 Market Analytics
                    </h2>
                    <div className="text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">
                      Interactive charts and visualizations
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex justify-center py-12">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <StockChart 
                      stocks={filteredStocks} 
                      selectedStock={selectedStock}
                      onStockSelect={handleStockSelect}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Market Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📋 Market Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                  <span className="text-gray-600">Total Stocks</span>
                  <span className="font-semibold text-blue-600">{filteredStocks.length}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg hover:bg-green-100">
                  <span className="text-gray-600">🚀 Gainers</span>
                  <span className="font-semibold text-success-600">
                    {filteredStocks.filter(s => s.changePercent > 0).length}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg hover:bg-red-100">
                  <span className="text-gray-600">💸 Losers</span>
                  <span className="font-semibold text-danger-600">
                    {filteredStocks.filter(s => s.changePercent < 0).length}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <span className="text-gray-600">➖ Unchanged</span>
                  <span className="font-semibold text-gray-600">
                    {filteredStocks.filter(s => s.changePercent === 0).length}
                  </span>
                </div>
              </div>

              {selectedStock && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    🎯 Selected: {selectedStock.symbol}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-gray-50 rounded hover:bg-gray-100">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">${selectedStock.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded hover:bg-gray-100">
                      <span className="text-gray-600">Change:</span>
                      <span className={`font-medium ${
                        selectedStock.changePercent >= 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        {selectedStock.changePercent >= 0 ? '📈' : '📉'} {selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded hover:bg-gray-100">
                      <span className="text-gray-600">Volume:</span>
                      <span className="font-medium">
                        {selectedStock.volume.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded hover:bg-gray-100">
                      <span className="text-gray-600">Market Cap:</span>
                      <span className="font-medium">
                        ${(selectedStock.marketCap! / 1e9).toFixed(1)}B
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  ⚡ Quick Actions
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={handleRefresh}
                    className="w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded"
                  >
                    🔄 Refresh Data
                  </button>
                  <button
                    onClick={handleBackToLanding}
                    className="w-full text-left text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 p-2 rounded"
                  >
                    🏠 Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
