# Quick Start Guide

## Fix Common Issues

### Port 3001 Already in Use

If you see `EADDRINUSE: address already in use :::3001`:

**Windows:**
```bash
# Find the process using port 3001
netstat -ano | findstr :3001

# Kill the process (replace PID with the number from above)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

Or change the port in `.env`:
```env
PORT=3002
```

### Missing Dependencies

If you get module errors:

```bash
npm install
```

### Server Not Starting

1. **Check Node.js version:**
   ```bash
   node --version
   ```
   Should be Node.js 18+ (native fetch support)

2. **Check if server file exists:**
   ```bash
   dir server\index.js
   ```

3. **Test server directly:**
   ```bash
   node server/index.js
   ```

### Frontend Not Connecting to Backend

1. **Make sure backend is running:**
   - You should see: `🚀 Server running on http://localhost:3001`

2. **Check vite.config.js has proxy:**
   ```js
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:3001',
         changeOrigin: true,
       }
     }
   }
   ```

3. **Test API manually:**
   Open browser: `http://localhost:3001/api/health`

## Step-by-Step Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file** (copy from .env.example):
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` and add your YouTube API key:
   ```env
   PORT=3001
   YOUTUBE_API_KEY=your_key_here
   ```

3. **Run both servers:**
   ```bash
   npm run dev:all
   ```

   Or separately:
   ```bash
   # Terminal 1
   npm run dev:server

   # Terminal 2  
   npm run dev
   ```

4. **Open browser:**
   - Frontend: http://localhost:5173 (or port shown)
   - Backend API: http://localhost:3001/api/health

## Still Not Working?

1. Check terminal output for error messages
2. Check browser console (F12) for frontend errors
3. Verify API key is correct
4. Try running without API key first (will show error but server should start)

