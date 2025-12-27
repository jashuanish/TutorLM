# How to Get Your YouTube API Key

## Quick Steps (5 minutes)

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### Step 2: Create or Select a Project
- Click the project dropdown at the top
- Click "New Project" if you don't have one
- Give it a name (e.g., "AI Learning Aggregator")
- Click "Create"

### Step 3: Enable YouTube Data API v3
1. Go to "APIs & Services" > "Library"
2. Search for "YouTube Data API v3"
3. Click on it
4. Click "Enable"

### Step 4: Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "+ CREATE CREDENTIALS" at the top
3. Select "API key"
4. Copy the API key that appears

### Step 5: Add to Your Project
1. Create a file named `.env` in your project root (same folder as package.json)
2. Add this line:
   ```
   YOUTUBE_API_KEY=paste_your_key_here
   PORT=3001
   ```
3. Replace `paste_your_key_here` with your actual API key

### Step 6: Restart Backend
1. Stop the backend server (Ctrl+C)
2. Start it again: `npm run dev:server`

## That's it! 🎉

Now your search should work and return real YouTube results.

## Free Tier Limits
- **10,000 units per day** (free)
- Each search uses about 10 units
- That's about **1,000 searches per day** (plenty for testing!)

## Security Tip (Optional)
After testing, you can restrict your API key:
1. Go to "Credentials" in Google Cloud Console
2. Click on your API key
3. Under "API restrictions", select "Restrict key"
4. Choose "YouTube Data API v3"
5. Click "Save"

