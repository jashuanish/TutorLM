import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchResources } from './services/searchService.js';

// Load .env from project root (where package.json is)
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, '..', '.env');

dotenv.config({ path: envPath });

// Log environment status (for debugging)
console.log('[Server] Environment check:');
console.log(`  Loading .env from: ${envPath}`);
console.log(`  PORT: ${process.env.PORT || 3001}`);
console.log(`  YOUTUBE_API_KEY: ${process.env.YOUTUBE_API_KEY ? 'SET (' + process.env.YOUTUBE_API_KEY.substring(0, 10) + '...)' : 'NOT SET ❌'}`);
if (!process.env.YOUTUBE_API_KEY) {
  console.warn('⚠️  WARNING: YOUTUBE_API_KEY not found! Make sure .env file exists in project root.');
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Learning Aggregator API is running' });
});

// Search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q;
    const maxResults = parseInt(req.query.max) || 20;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    console.log(`[API] Searching for: "${query}"`);
    const resources = await searchResources(query, maxResults);
    console.log(`[API] Returning ${resources.length} resources`);
    
    res.json({
      query,
      results: resources,
      count: resources.length
    });
  } catch (error) {
    console.error('[API Error]', error.message);
    res.status(500).json({ 
      error: 'Failed to search resources', 
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 AI Learning Aggregator API ready`);
});

