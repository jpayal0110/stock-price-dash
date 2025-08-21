# PebbleStocks - Smart Stock Analytics

A modern, responsive stock price dashboard built with React, TypeScript, and Tailwind CSS. This application provides real-time stock data visualization with both table and chart views.

## 🚀 Features

### ✨ **New Enhanced Features**
- **Single Page Design**: Beautiful hero section with seamless flow to dashboard
- **View Toggle**: Easy switching between Stock Table and Charts views
- **Emoji Indicators**: Visual indicators for stock performance (📈📉🚀💸)
- **Extended Data**: 12+ major stocks with comprehensive market information
- **Unified Experience**: Everything on one page for better user flow

### Core Requirements ✅
- **Stock Data Table**: Displays stock symbols, prices, change percentages, and volume
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive layout
- **Real-time Data**: Fetches live stock data from Alpha Vantage API
- **Deployment Ready**: Configured for easy deployment to Vercel/Netlify/GitHub Pages

### Optional Features 🌟
- **Loading States**: Beautiful animated loading spinners during data fetch
- **Interactive Charts**: Multiple chart types (Line, Bar, Pie) using Recharts
- **Search & Filtering**: Real-time search functionality with debounced input
- **Error Handling**: Comprehensive error handling with retry functionality
- **Sorting**: Clickable table headers for sorting by any column
- **Auto-refresh**: Data refreshes automatically every 30 seconds
- **Stock Selection**: Click on stocks to view detailed information and charts

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts (Chart.js alternative)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **API**: Alpha Vantage (free tier)

## 📱 Screenshots

The dashboard features:
- Clean, modern UI with responsive design
- Interactive stock table with sorting capabilities
- Multiple chart types for data visualization
- Real-time search and filtering
- Market summary sidebar
- Loading states and error handling

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stock-price-dash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up API key (optional)**
   - Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
   - Update `src/services/stockApi.ts` with your API key
   - Note: The app works with mock data if no API key is provided

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Netlify
1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages
1. Update `vite.config.ts` with your repository name
2. Push to GitHub
3. Enable GitHub Pages in repository settings

## 📊 API Configuration

The app uses Alpha Vantage API for real-time stock data:

```typescript
// src/services/stockApi.ts
const API_KEY = 'your-api-key-here'; // Replace with your actual API key
```

**Free Tier Limits:**
- 5 API calls per minute
- 500 API calls per day

**Mock Data Fallback:**
- If API fails or reaches limits, the app automatically falls back to mock data
- Ensures the app always works for demonstration purposes

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

### Stock Symbols
Modify the default stocks in `src/App.tsx`:

```typescript
const defaultSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META'];
```

### Chart Types
Add new chart types in `src/components/StockChart.tsx`:

```typescript
type ChartType = 'line' | 'bar' | 'pie' | 'your-new-chart';
```

## 🔧 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Application header
│   ├── SearchBar.tsx   # Search functionality
│   ├── StockTable.tsx  # Stock data table
│   ├── StockChart.tsx  # Chart components
│   ├── LoadingSpinner.tsx # Loading states
│   └── ErrorMessage.tsx   # Error handling
├── services/            # API services
│   └── stockApi.ts     # Stock data fetching
├── types/               # TypeScript interfaces
│   └── stock.ts        # Stock data types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 📈 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Portfolio tracking
- [ ] Price alerts and notifications
- [ ] Historical data charts
- [ ] More chart types (candlestick, area)
- [ ] Dark mode theme
- [ ] Export functionality
- [ ] Mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for providing free stock market data
- [Recharts](https://recharts.org/) for the excellent charting library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Support

If you have any questions or need help:
- Create an issue in this repository
- Check the [Alpha Vantage documentation](https://www.alphavantage.co/documentation/)
- Review the [React documentation](https://react.dev/)

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**# Deployment triggered at Wed Aug 20 22:33:37 PDT 2025
