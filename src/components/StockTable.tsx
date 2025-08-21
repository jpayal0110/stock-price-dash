import React, { useState, useMemo } from 'react';
import { ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';
import { StockData } from '../types/stock';

interface StockTableProps {
  stocks: StockData[];
  onStockSelect: (stock: StockData) => void;
}

type SortField = 'symbol' | 'price' | 'change' | 'changePercent' | 'volume';
type SortDirection = 'asc' | 'desc';

const StockTable: React.FC<StockTableProps> = ({ stocks, onStockSelect }) => {
  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedStocks = useMemo(() => {
    return [...stocks].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle numeric sorting
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }

      return 0;
    });
  }, [stocks, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    
    return sortDirection === 'asc' 
      ? <TrendingUp className="h-4 w-4 text-success-600" />
      : <TrendingDown className="h-4 w-4 text-danger-600" />;
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  if (stocks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No stocks found</div>
        <div className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="table-header cursor-pointer hover:bg-gray-100" onClick={() => handleSort('symbol')}>
              <div className="flex items-center space-x-1">
                <span>Symbol</span>
                {getSortIcon('symbol')}
              </div>
            </th>
            <th className="table-header cursor-pointer hover:bg-gray-100" onClick={() => handleSort('price')}>
              <div className="flex items-center space-x-1">
                <span>Price</span>
                {getSortIcon('price')}
              </div>
            </th>
            <th className="table-header cursor-pointer hover:bg-gray-100" onClick={() => handleSort('change')}>
              <div className="flex items-center space-x-1">
                <span>Change</span>
                {getSortIcon('change')}
              </div>
            </th>
            <th className="table-header cursor-pointer hover:bg-gray-100" onClick={() => handleSort('changePercent')}>
              <div className="flex items-center space-x-1">
                <span>Change %</span>
                {getSortIcon('changePercent')}
              </div>
            </th>
            <th className="table-header cursor-pointer hover:bg-gray-100" onClick={() => handleSort('volume')}>
              <div className="flex items-center space-x-1">
                <span>Volume</span>
                {getSortIcon('volume')}
              </div>
            </th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedStocks.map((stock) => (
            <tr 
              key={stock.symbol} 
                              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onStockSelect(stock)}
            >
              <td className="table-cell">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-800">
                        {stock.symbol.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                    <div className="text-sm text-gray-500">Stock</div>
                  </div>
                </div>
              </td>
              
              <td className="table-cell">
                <div className="text-sm font-medium text-gray-900">
                  ${stock.price.toFixed(2)}
                </div>
              </td>
              
              <td className="table-cell">
                <div className={`text-sm font-medium flex items-center space-x-2 ${
                  stock.change >= 0 ? 'text-success-600' : 'text-danger-600'
                }`}>
                  <span>{stock.change >= 0 ? '📈' : '📉'}</span>
                  <span>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}</span>
                </div>
              </td>
              
              <td className="table-cell">
                <div className={`text-sm font-medium flex items-center space-x-2 ${
                  stock.changePercent >= 0 ? 'text-success-600' : 'text-danger-600'
                }`}>
                  <span>{stock.changePercent >= 0 ? '🚀' : '💸'}</span>
                  <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                </div>
              </td>
              
              <td className="table-cell">
                <div className="text-sm text-gray-900">
                  {formatNumber(stock.volume)}
                </div>
              </td>
              
              <td className="table-cell">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStockSelect(stock);
                  }}
                  className="btn-primary text-xs py-1 px-3"
                >
                  View Chart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
