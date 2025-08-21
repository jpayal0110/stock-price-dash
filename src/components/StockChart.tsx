import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { StockData } from '../types/stock';
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

interface StockChartProps {
  stocks: StockData[];
  selectedStock: StockData | null;
  onStockSelect: (stock: StockData) => void;
}

type ChartType = 'line' | 'bar' | 'pie';

const StockChart: React.FC<StockChartProps> = ({ stocks, selectedStock, onStockSelect }) => {
  const [chartType, setChartType] = useState<ChartType>('line');

  const chartData = useMemo(() => {
    return stocks.map(stock => ({
      ...stock,
      changeColor: stock.changePercent >= 0 ? '#22c55e' : '#ef4444',
      formattedPrice: `$${stock.price.toFixed(2)}`,
      formattedChange: `${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%`
    }));
  }, [stocks]);

  const pieData = useMemo(() => {
    return stocks.map(stock => ({
      name: stock.symbol,
      value: Math.abs(stock.changePercent),
      color: stock.changePercent >= 0 ? '#22c55e' : '#ef4444'
    }));
  }, [stocks]);

  const formatTooltip = (value: any, name: string) => {
    if (name === 'price') return [`$${value.toFixed(2)}`, 'Price'];
    if (name === 'changePercent') return [`${value.toFixed(2)}%`, 'Change %'];
    if (name === 'volume') return [value.toLocaleString(), 'Volume'];
    return [value, name];
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="symbol" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={formatTooltip}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="symbol" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={formatTooltip}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="price" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${typeof value === 'number' ? value.toFixed(2) : value}%`, name]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  if (stocks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No stocks to display</div>
        <div className="text-gray-400 text-sm mt-2">Add some stocks to see charts</div>
      </div>
    );
  }

  return (
    <div>
      {/* Chart Type Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              chartType === 'line' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Line</span>
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              chartType === 'bar' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Bar</span>
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              chartType === 'pie' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <PieChartIcon className="h-4 w-4" />
            <span>Pie</span>
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Click on a stock in the table to select it
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        {renderChart()}
      </div>

      {/* Chart Legend */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chartData.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => onStockSelect(stock)}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedStock?.symbol === stock.symbol
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stock.changeColor }}
                />
                <span className="font-medium text-gray-900">{stock.symbol}</span>
              </div>
              <span className="text-sm text-gray-600">{stock.formattedPrice}</span>
            </div>
            <div className={`text-sm font-medium mt-1 ${
              stock.changePercent >= 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
              {stock.formattedChange}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockChart;
