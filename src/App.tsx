import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StockTable from './components/StockTable';
import StockChart from './components/StockChart';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { StockData } from './types/stock';
import { StockApiService } from './services/stockApi';

function App() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);

  // Default stock symbols to fetch
  const defaultSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META'];

  useEffect(() => {
    fetchStockData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchStockData, 30000);
    return () => clearInterval(interval);
  }, []);

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
    setShowChart(true);
  };

  const handleRefresh = () => {
    fetchStockData();
  };

  if (loading && stocks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onRefresh={handleRefresh} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={fetchStockData} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stock Table */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Stock Prices
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowChart(false)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      !showChart 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Table
                  </button>
                  <button
                    onClick={() => setShowChart(true)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      showChart 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Chart
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner />
                </div>
              ) : showChart ? (
                <StockChart 
                  stocks={filteredStocks} 
                  selectedStock={selectedStock}
                  onStockSelect={handleStockSelect}
                />
              ) : (
                <StockTable 
                  stocks={filteredStocks}
                  onStockSelect={handleStockSelect}
                />
              )}
            </div>
          </div>

          {/* Market Summary */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Market Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Stocks</span>
                  <span className="font-semibold">{filteredStocks.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gainers</span>
                  <span className="font-semibold text-success-600">
                    {filteredStocks.filter(s => s.changePercent > 0).length}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Losers</span>
                  <span className="font-semibold text-danger-600">
                    {filteredStocks.filter(s => s.changePercent < 0).length}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Unchanged</span>
                  <span className="font-semibold text-gray-600">
                    {filteredStocks.filter(s => s.changePercent === 0).length}
                  </span>
                </div>
              </div>

              {selectedStock && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Selected: {selectedStock.symbol}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">${selectedStock.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Change:</span>
                      <span className={`font-medium ${
                        selectedStock.changePercent >= 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        {selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volume:</span>
                      <span className="font-medium">
                        {selectedStock.volume.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
