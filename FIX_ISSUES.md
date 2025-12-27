# Common Issues & Fixes

## Issue: "Port 3001 already in use"

**Solution:**
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill it (replace PID with the number from above)
taskkill /PID <PID> /F
```

Or use the provided batch file:
```bash
start.bat
```

## Issue: "Cannot find module"

**Solution:**
```bash
npm install
```

## Issue: Server starts but search doesn't work

**Check:**
1. Backend is running: `http://localhost:3001/api/health` should return JSON
2. YouTube API key is set in `.env` file
3. Check browser console (F12) for errors

## Issue: "YOUTUBE_API_KEY is required"

**Solution:**
1. Create `.env` file in root directory
2. Add:
   ```
   YOUTUBE_API_KEY=your_key_here
   PORT=3001
   ```
3. Get API key from: https://console.cloud.google.com/

## Quick Fix Script

Run `start.bat` (Windows) or `start.sh` (Mac/Linux) to automatically:
- Kill processes on port 3001
- Start backend server
- Start frontend server

