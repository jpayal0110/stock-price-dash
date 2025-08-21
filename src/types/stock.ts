export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  previousClose?: number;
  open?: number;
  high?: number;
  low?: number;
}

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface ApiResponse {
  success: boolean;
  data?: StockData[];
  error?: string;
}

export interface SearchResult {
  symbol: string;
  name: string;
  exchange: string;
}
