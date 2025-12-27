import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Ensure .env is loaded (in case this module is imported before dotenv.config() in index.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

// YouTube Data API v3 - Requires API key from Google Cloud Console
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

console.log('[searchService] YOUTUBE_API_KEY loaded:', YOUTUBE_API_KEY ? 'YES (' + YOUTUBE_API_KEY.substring(0, 10) + '...)' : 'NO');

// SerpAPI for comprehensive web search (requires API key from serpapi.com)
const SERPAPI_KEY = process.env.SERPAPI_KEY || '';
const SERPAPI_URL = 'https://serpapi.com/search.json';

/**
 * Search for educational resources across multiple platforms
 */
export async function searchResources(query, maxResults = 20) {
  const resources = [];
  
  // Check if YouTube API key is set
  if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY.trim() === '') {
    console.warn('YOUTUBE_API_KEY not set. Please add your YouTube API key to .env file');
    throw new Error('YouTube API key is required. Please add YOUTUBE_API_KEY to your .env file. See SETUP.md for instructions.');
  }
  
  try {
    // Search YouTube for educational videos
    const youtubeResults = await searchYouTube(query, Math.min(maxResults, 10));
    resources.push(...youtubeResults);

    // Search for articles and PDFs using SerpAPI or alternative
    if (SERPAPI_KEY) {
      const articleResults = await searchArticles(query, Math.min(maxResults - youtubeResults.length, 10));
      resources.push(...articleResults);
    } else {
      // Fallback: Use YouTube only or add alternative search
      console.log('SERPAPI_KEY not set, skipping article search');
    }

    // Rank and sort resources using AI ranking algorithm
    const rankedResources = rankResources(resources, query);
    
    return rankedResources.slice(0, maxResults);
  } catch (error) {
    console.error('Error in searchResources:', error);
    // Return YouTube results even if other sources fail
    const youtubeResults = await searchYouTube(query, maxResults);
    return rankResources(youtubeResults, query);
  }
}

/**
 * Search YouTube for educational videos
 */
async function searchYouTube(query, maxResults = 10) {
  try {
    console.log(`[YouTube Search] Query: "${query}", API Key: ${YOUTUBE_API_KEY ? 'SET (' + YOUTUBE_API_KEY.substring(0, 10) + '...)' : 'NOT SET'}`);
    
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: 'snippet',
        q: `${query} tutorial education learn`,
        type: 'video',
        maxResults: maxResults,
        key: YOUTUBE_API_KEY,
        videoDuration: 'medium', // Prefer medium-length videos (4-20 min)
        order: 'relevance',
        videoEmbeddable: true,
        safeSearch: 'strict'
      }
    });

    console.log(`[YouTube Search] Found ${response.data.items?.length || 0} videos`);

    const videos = response.data.items.map((item, index) => {
      const snippet = item.snippet;
      const videoId = item.id.videoId;
      
      return {
        id: `yt-${videoId}`,
        type: 'video',
        title: snippet.title,
        source: `YouTube - ${snippet.channelTitle}`,
        qualityScore: calculateQualityScore(snippet, index),
        duration: 'Unknown', // Would need another API call to get duration
        difficulty: estimateDifficulty(snippet.title, snippet.description),
        views: 0, // Would need video statistics API call
        likes: 0,
        summary: generateSummary(snippet.description),
        thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default.url,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        aiRelevance: 85 + (index < 3 ? 10 : 0), // Top results get higher relevance
        recency: getRecency(snippet.publishedAt),
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        description: snippet.description
      };
    });

    return videos;
  } catch (error) {
    console.error('[YouTube API Error]', error.response?.status, error.response?.data || error.message);
    
    // Provide helpful error messages
    if (error.response?.status === 403) {
      const errorDetails = error.response?.data?.error?.message || 'Unknown error';
      throw new Error(`YouTube API Error (403): ${errorDetails}. Please check your API key and quota.`);
    } else if (error.response?.status === 400) {
      const errorDetails = error.response?.data?.error?.message || 'Unknown error';
      throw new Error(`Invalid YouTube API request (400): ${errorDetails}`);
    } else if (error.response?.status === 401) {
      throw new Error('YouTube API key is invalid or unauthorized. Please check your API key.');
    }
    
    // Return empty array if API fails for other reasons
    console.warn('[YouTube API] Returning empty results due to error');
    return [];
  }
}

/**
 * Search for articles and PDFs using SerpAPI
 */
async function searchArticles(query, maxResults = 10) {
  if (!SERPAPI_KEY) {
    return [];
  }

  try {
    const response = await axios.get(SERPAPI_URL, {
      params: {
        q: `${query} tutorial article pdf`,
        engine: 'google',
        api_key: SERPAPI_KEY,
        num: maxResults,
        tbs: 'qdr:y' // Results from past year
      }
    });

    const articles = [];
    
    // Process organic results
    if (response.data.organic_results) {
      response.data.organic_results.forEach((result, index) => {
        const isPDF = result.link?.endsWith('.pdf') || result.title?.toLowerCase().includes('pdf');
        const isArticle = !isPDF && (result.link?.includes('medium.com') || 
                                     result.link?.includes('dev.to') || 
                                     result.link?.includes('wikipedia.org') ||
                                     result.link?.includes('edu') ||
                                     result.snippet);

        if (isArticle || isPDF) {
          articles.push({
            id: `article-${index}-${Date.now()}`,
            type: isPDF ? 'pdf' : 'article',
            title: result.title,
            source: extractDomain(result.link),
            qualityScore: calculateArticleQualityScore(result, index),
            duration: estimateReadingTime(result.snippet || ''),
            difficulty: estimateDifficulty(result.title, result.snippet || ''),
            views: 0,
            likes: 0,
            summary: generateSummary(result.snippet || result.title),
            thumbnail: result.thumbnail || `https://via.placeholder.com/400x225/${getColorForType(isPDF ? 'pdf' : 'article')}/ffffff?text=${encodeURIComponent(result.title.substring(0, 20))}`,
            url: result.link,
            aiRelevance: 80 + (index < 3 ? 10 : 0),
            recency: 0,
            description: result.snippet
          });
        }
      });
    }

    return articles;
  } catch (error) {
    console.error('SerpAPI error:', error.response?.data || error.message);
    return [];
  }
}

/**
 * Extract domain from URL
 */
function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return 'Unknown Source';
  }
}

/**
 * Calculate quality score for YouTube videos
 */
function calculateQualityScore(snippet, index) {
  let score = 3; // Base score

  // Channel reputation (simplified - would use channel stats in production)
  const reputableChannels = [
    'khan academy', 'coursera', 'edx', 'mit', 'stanford', 'harvard',
    'freecodecamp', 'traversy media', 'net ninja', '3blue1brown'
  ];
  
  const channelLower = snippet.channelTitle.toLowerCase();
  if (reputableChannels.some(ch => channelLower.includes(ch))) {
    score += 1;
  }

  // Title quality indicators
  if (snippet.title.toLowerCase().includes('tutorial') || 
      snippet.title.toLowerCase().includes('course') ||
      snippet.title.toLowerCase().includes('complete guide')) {
    score += 0.5;
  }

  // Position bonus (top results are likely better)
  if (index < 3) {
    score += 0.5;
  }

  // Description length (longer descriptions often indicate quality content)
  if (snippet.description && snippet.description.length > 500) {
    score += 0.5;
  }

  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * Calculate quality score for articles
 */
function calculateArticleQualityScore(result, index) {
  let score = 3;

  // Reputable domains
  const reputableDomains = ['edu', 'org', 'medium.com', 'dev.to', 'wikipedia.org', 'coursera.org', 'edx.org'];
  if (reputableDomains.some(domain => result.link?.includes(domain))) {
    score += 1;
  }

  // Snippet quality
  if (result.snippet && result.snippet.length > 100) {
    score += 0.5;
  }

  // Position bonus
  if (index < 3) {
    score += 0.5;
  }

  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * Estimate difficulty level
 */
function estimateDifficulty(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  
  const advancedKeywords = ['advanced', 'expert', 'professional', 'master', 'deep dive', 'comprehensive'];
  const beginnerKeywords = ['beginner', 'introduction', 'basics', 'getting started', '101', 'fundamentals'];
  
  if (advancedKeywords.some(kw => text.includes(kw))) {
    return 'Advanced';
  }
  if (beginnerKeywords.some(kw => text.includes(kw))) {
    return 'Beginner';
  }
  return 'Intermediate';
}

/**
 * Generate summary from description
 */
function generateSummary(description) {
  if (!description) {
    return ['No description available'];
  }

  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const summary = sentences.slice(0, 3).map(s => s.trim());

  if (summary.length === 0) {
    return [description.substring(0, 150) + '...'];
  }

  return summary;
}

/**
 * Estimate reading time
 */
function estimateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  if (minutes < 10) {
    return `${minutes} min`;
  } else if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours} hour${hours > 1 ? 's' : ''}`;
  }
}

/**
 * Get recency score (days since publication)
 */
function getRecency(publishedAt) {
  if (!publishedAt) return 365;
  
  const published = new Date(publishedAt);
  const now = new Date();
  const daysDiff = Math.floor((now - published) / (1000 * 60 * 60 * 24));
  
  return daysDiff;
}

/**
 * Get color for placeholder images
 */
function getColorForType(type) {
  const colors = {
    video: '1e3a8a',
    pdf: '0284c7',
    article: '0ea5e9'
  };
  return colors[type] || '6b7280';
}

/**
 * AI-powered resource ranking algorithm
 */
function rankResources(resources, query) {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);

  return resources.map(resource => {
    let relevanceScore = resource.aiRelevance || 70;

    // Title match bonus
    const titleLower = resource.title.toLowerCase();
    queryWords.forEach(word => {
      if (titleLower.includes(word)) {
        relevanceScore += 5;
      }
    });

    // Exact phrase match
    if (titleLower.includes(queryLower)) {
      relevanceScore += 10;
    }

    // Description match
    const descLower = (resource.description || '').toLowerCase();
    queryWords.forEach(word => {
      if (descLower.includes(word)) {
        relevanceScore += 2;
      }
    });

    // Quality score influence
    relevanceScore += (resource.qualityScore - 3) * 5;

    // Recency bonus (newer content gets slight boost)
    if (resource.recency < 90) {
      relevanceScore += 3;
    }

    // View/like influence (if available)
    if (resource.views > 100000) {
      relevanceScore += 2;
    }

    return {
      ...resource,
      aiRelevance: Math.min(100, Math.round(relevanceScore))
    };
  }).sort((a, b) => b.aiRelevance - a.aiRelevance);
}

