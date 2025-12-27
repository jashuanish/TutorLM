# Testing the Server

## Quick Test Steps

1. **Start the backend server:**
   ```bash
   npm run dev:server
   ```
   
   You should see:
   ```
   🚀 Server running on http://localhost:3001
   📚 AI Learning Aggregator API ready
   ```

2. **Test the health endpoint:**
   Open in browser: `http://localhost:3001/api/health`
   
   Should return:
   ```json
   {
     "status": "ok",
     "message": "AI Learning Aggregator API is running"
   }
   ```

3. **Test search (without API key - will show error but server works):**
   ```
   http://localhost:3001/api/search?q=machine%20learning
   ```
   
   Should return error about API key, but server is working.

4. **Start frontend (in new terminal):**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   ```
   http://localhost:5173
   ```

## If Server Won't Start

**Check these:**

1. **Node.js version:**
   ```bash
   node --version
   ```
   Should be 18+ (we use ES modules)

2. **Dependencies installed:**
   ```bash
   npm install
   ```

3. **Port available:**
   ```bash
   netstat -ano | findstr :3001
   ```
   Should be empty. If not, kill the process.

4. **File exists:**
   ```bash
   dir server\index.js
   ```

## Common Error Messages

**"Cannot find module 'express'"**
→ Run `npm install`

**"Port 3001 already in use"**
→ Kill the process: `taskkill /PID <PID> /F`

**"YOUTUBE_API_KEY is required"**
→ This is OK! Server will still run, just won't be able to search.

**"SyntaxError: Unexpected token"**
→ Make sure you're using Node.js 18+ for ES modules support

