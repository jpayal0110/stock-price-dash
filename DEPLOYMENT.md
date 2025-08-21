# Deployment Guide

This guide will help you deploy your Stock Price Dashboard to various platforms.

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended - Easiest)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy automatically!

**Vercel automatically detects Vite and configures everything.**

### 2. Netlify

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "New site from Git"
   - Choose your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Deploy!

### 3. GitHub Pages

1. **Push to GitHub** (same as above)

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: "GitHub Actions"
   - The workflow in `.github/workflows/deploy.yml` will handle deployment

## 🔧 Manual Deployment

### Build Locally
```bash
npm run build
```

### Upload to Web Server
Upload the contents of the `dist` folder to your web server.

## 📱 Environment Variables

### API Key (Optional)
If you want to use real stock data:

1. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Update `src/services/stockApi.ts`:
   ```typescript
   const API_KEY = 'your-actual-api-key';
   ```

**Note**: The app works perfectly with mock data if no API key is provided.

## 🌐 Custom Domain

### Vercel
- Go to your project settings
- Domains → Add domain
- Follow DNS instructions

### Netlify
- Site settings → Domain management
- Add custom domain
- Follow DNS instructions

### GitHub Pages
- Repository settings → Pages
- Custom domain → Enter your domain

## 📊 Performance Optimization

The build process automatically:
- ✅ Minifies JavaScript and CSS
- ✅ Optimizes images
- ✅ Generates source maps
- ✅ Splits code into chunks

## 🚨 Troubleshooting

### Build Errors
```bash
npm run build
```
Check the output for TypeScript errors.

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📈 Monitoring

After deployment:
- Check your site loads correctly
- Test on mobile devices
- Verify all features work
- Monitor performance with browser dev tools

## 🎯 Next Steps

1. **Customize**: Update colors, add your logo
2. **Enhance**: Add more chart types, real-time updates
3. **Scale**: Consider upgrading API plans for production use

---

**Need help?** Create an issue in this repository or check the main README.md for more details.
