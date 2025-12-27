# Setup Guide - Real-Time Search Configuration

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Keys

Create a `.env` file in the root directory:

```env
PORT=3001
YOUTUBE_API_KEY=your_youtube_api_key_here
SERPAPI_KEY=your_serpapi_key_here
```

### 3. Get YouTube API Key (Required)

**YouTube Data API v3** is required for real-time video search:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key
   - (Optional) Restrict the key to YouTube Data API v3 for security
5. Add the key to your `.env` file

**Free Tier**: 10,000 units/day (about 1000 searches/day)

### 4. Get SerpAPI Key (Optional)

SerpAPI enables search for articles and PDFs beyond YouTube:

1. Sign up at [https://serpapi.com/](https://serpapi.com/)
2. Get your API key from the dashboard
3. Add to `.env` file

**Free Tier**: 100 searches/month

**Note**: Without SerpAPI, the app will still work but only show YouTube videos.

### 5. Run the Application

**Start both frontend and backend:**
```bash
npm run dev:all
```

Or run separately:

**Terminal 1 (Backend):**
```bash
npm run dev:server
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

### 6. Test the Search

1. Open http://localhost:5173 (or the port shown in terminal)
2. Search for any topic (e.g., "Machine Learning", "Python", "React")
3. See real-time results from YouTube!

## Troubleshooting

### "Failed to fetch resources" Error

**Possible causes:**
- YouTube API key not set or invalid
- API quota exceeded
- Network/CORS issues

**Solutions:**
1. Verify API key in `.env` file
2. Check Google Cloud Console for quota limits
3. Ensure backend server is running on port 3001
4. Check browser console for detailed error messages

### No Results Appearing

**Check:**
1. Backend server is running (check Terminal 1)
2. Backend shows "Server running on http://localhost:3001"
3. No errors in backend console
4. API key is valid

### CORS Errors

The backend has CORS enabled. If you see CORS errors:
1. Ensure backend is running
2. Check `server/index.js` has `app.use(cors())`
3. Verify frontend is proxying to `http://localhost:3001`

## API Costs

### YouTube Data API v3
- **Free**: 10,000 units/day
- Each search uses ~10 units
- **Cost**: Free for normal usage

### SerpAPI (Optional)
- **Free Tier**: 100 searches/month
- **Paid Plans**: Start at $50/month for more searches

## Production Deployment

For production:
1. Set environment variables on your hosting platform
2. Use secure API key management
3. Consider rate limiting
4. Enable API key restrictions in Google Cloud Console
5. Monitor API usage

## Support

If you encounter issues:
1. Check browser console for frontend errors
2. Check backend terminal for server errors
3. Verify API keys are correct
4. Test API keys directly (YouTube API explorer)

