import axios from 'axios';
import { StockData, ApiResponse } from '../types/stock';

// Using Alpha Vantage API (free tier)
const API_KEY = 'demo'; // Replace with your actual API key
const BASE_URL = 'https://www.alphavantage.co/query';

// Mock data for demonstration purposes
const MOCK_STOCKS: StockData[] = [
  {
    symbol: 'AAPL',
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 45678900,
    marketCap: 2750000000000,
    previousClose: 173.28,
    open: 173.50,
    high: 176.20,
    low: 172.80
  },
  {
    symbol: 'GOOGL',
    price: 142.56,
    change: -1.23,
    changePercent: -0.85,
    volume: 23456700,
    marketCap: 1790000000000,
    previousClose: 143.79,
    open: 144.00,
    high: 144.50,
    low: 142.00
  },
  {
    symbol: 'MSFT',
    price: 338.11,
    change: 4.67,
    changePercent: 1.40,
    volume: 34567800,
    marketCap: 2510000000000,
    previousClose: 333.44,
    open: 334.00,
    high: 339.20,
    low: 333.50
  },
  {
    symbol: 'AMZN',
    price: 145.24,
    change: 3.21,
    changePercent: 2.26,
    volume: 56789000,
    marketCap: 1500000000000,
    previousClose: 142.03,
    open: 142.50,
    high: 146.00,
    low: 142.00
  },
  {
    symbol: 'TSLA',
    price: 242.54,
    change: -8.76,
    changePercent: -3.49,
    volume: 78901200,
    marketCap: 770000000000,
    previousClose: 251.30,
    open: 250.00,
    high: 252.00,
    low: 240.50
  },
  {
    symbol: 'META',
    price: 312.87,
    change: 5.43,
    changePercent: 1.77,
    volume: 23456700,
    marketCap: 790000000000,
    previousClose: 307.44,
    open: 308.00,
    high: 314.00,
    low: 307.50
  },
  {
    symbol: 'NVDA',
    price: 485.09,
    change: 12.34,
    changePercent: 2.61,
    volume: 45678900,
    marketCap: 1190000000000,
    previousClose: 472.75,
    open: 473.00,
    high: 487.50,
    low: 471.80
  },
  {
    symbol: 'NFLX',
    price: 485.09,
    change: -8.76,
    changePercent: -1.77,
    volume: 34567800,
    marketCap: 215000000000,
    previousClose: 493.85,
    open: 494.00,
    high: 495.20,
    low: 483.50
  },
  {
    symbol: 'AMD',
    price: 128.45,
    change: 3.21,
    changePercent: 2.56,
    volume: 67890100,
    marketCap: 207000000000,
    previousClose: 125.24,
    open: 125.50,
    high: 129.00,
    low: 125.00
  },
  {
    symbol: 'INTC',
    price: 44.67,
    change: -0.89,
    changePercent: -1.95,
    volume: 45678900,
    marketCap: 189000000000,
    previousClose: 45.56,
    open: 45.60,
    high: 45.80,
    low: 44.50
  },
  {
    symbol: 'CRM',
    price: 267.56,
    change: 5.43,
    changePercent: 2.07,
    volume: 23456700,
    marketCap: 260000000000,
    previousClose: 262.13,
    open: 262.50,
    high: 268.00,
    low: 262.00
  },
  {
    symbol: 'ORCL',
    price: 125.34,
    change: -2.15,
    changePercent: -1.69,
    volume: 34567800,
    marketCap: 340000000000,
    previousClose: 127.49,
    open: 127.50,
    high: 127.80,
    low: 125.00
  }
];

export class StockApiService {
  static async getStockQuotes(symbols: string[]): Promise<ApiResponse> {
    try {
      // Try to fetch real data first
      const promises = symbols.map(symbol => 
        axios.get(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
      );
      
      const responses = await Promise.all(promises);
      const stockData: StockData[] = [];
      
      responses.forEach((response, index) => {
        const data = response.data['Global Quote'];
        if (data && data['05. price']) {
          stockData.push({
            symbol: symbols[index],
            price: parseFloat(data['05. price']),
            change: parseFloat(data['09. change']),
            changePercent: parseFloat(data['10. change percent'].replace('%', '')),
            volume: parseInt(data['06. volume']),
            previousClose: parseFloat(data['08. previous close']),
            open: parseFloat(data['02. open']),
            high: parseFloat(data['03. high']),
            low: parseFloat(data['04. low'])
          });
        }
      });
      
      if (stockData.length > 0) {
        return { success: true, data: stockData };
      }
      
      // Fallback to mock data if API fails or returns no data
      console.log('Using mock data due to API limitations');
      return { success: true, data: MOCK_STOCKS };
      
    } catch (error) {
      console.error('Error fetching stock data:', error);
      // Return mock data on error
      return { success: true, data: MOCK_STOCKS };
    }
  }

  static async searchStocks(query: string): Promise<StockData[]> {
    try {
      const response = await axios.get(`${BASE_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`);
      const matches = response.data.bestMatches || [];
      
      if (matches.length > 0) {
        // Get quotes for the first few matches
        const symbols = matches.slice(0, 5).map((match: any) => match['1. symbol']);
        const quotesResponse = await this.getStockQuotes(symbols);
        return quotesResponse.data || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error searching stocks:', error);
      return MOCK_STOCKS.filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.symbol.toLowerCase().startsWith(query.toLowerCase())
      );
    }
  }
}
