import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchResources } from './services/searchService.js';
import { upload } from './services/pdfService.js';
import { extractTextFromPDF, analyzePDFContent, generateSearchQueries } from './services/pdfAnalyzer.js';
import fs from 'fs';
import path from 'path';

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

// Enable file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// PDF upload and analysis endpoint
app.post('/api/upload-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    console.log(`[API] Processing PDF: ${req.file.filename}`);
    
    // Extract text from PDF
    const text = await extractTextFromPDF(req.file.path);
    
    // Analyze the content
    const analysis = analyzePDFContent(text);
    
    // Generate search queries based on content
    const searchQueries = generateSearchQueries(analysis);
    
    // Find resources for each query
    const allResources = [];
    for (const query of searchQueries.slice(0, 5)) { // Limit to 5 queries to avoid API limits
      try {
        const resources = await searchResources(query, 10);
        allResources.push(...resources);
      } catch (error) {
        console.warn(`[API] Warning: Failed to search for query "${query}":`, error.message);
      }
    }
    
    // Remove duplicates based on title
    const uniqueResources = allResources.filter((resource, index, self) =>
      index === self.findIndex((r) => r.title === resource.title)
    );
    
    // Clean up uploaded file
    fs.unlinkSync(req.file.path);
    
    res.json({
      success: true,
      analysis: {
        filename: req.file.filename,
        wordCount: analysis.wordCount,
        sentenceCount: analysis.sentenceCount,
        keywords: analysis.keywords,
        topics: analysis.topics,
        searchQueries: searchQueries
      },
      resources: uniqueResources.slice(0, 20), // Limit to 20 results
      resourceCount: uniqueResources.length
    });
    
  } catch (error) {
    console.error('[API Error] PDF processing:', error.message);
    
    // Clean up uploaded file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      error: 'Failed to process PDF', 
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 AI Learning Aggregator API ready`);
});

