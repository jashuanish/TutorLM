# Important: Restart Backend After Adding API Key

## Why?
When you add or change the `.env` file, the backend server needs to be restarted to load the new environment variables.

## How to Restart:

### Option 1: If running with `npm run dev:all`
1. Press `Ctrl+C` to stop
2. Run `npm run dev:all` again

### Option 2: If running separately
**Terminal 1 (Backend):**
1. Press `Ctrl+C` to stop
2. Run `npm run dev:server` again

**Terminal 2 (Frontend):**
- Leave it running (no need to restart)

### Option 3: Kill and restart
1. Find the process: `netstat -ano | findstr :3001`
2. Kill it: `taskkill /PID <number> /F`
3. Start again: `npm run dev:server`

## Verify it's working:
1. Check backend console - you should see:
   ```
   [Server] Environment check:
     PORT: 3001
     YOUTUBE_API_KEY: SET (AIzaSyDwj5...)
   ```
2. Try a search in the browser
3. Check backend console for search logs

