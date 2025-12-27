import fs from 'fs';
import pdfParse from 'pdf-parse';

export async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export function analyzePDFContent(text) {
  // Clean and preprocess the text
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  // Extract key concepts and topics
  const words = cleanText.toLowerCase().split(/\s+/);
  const wordFreq = {};
  
  words.forEach(word => {
    if (word.length > 3) { // Filter out very short words
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  // Sort by frequency and get top keywords
  const keywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);
  
  // Extract potential topics (simple heuristic)
  const sentences = cleanText.split(/[.!?]+/);
  const topics = [];
  
  sentences.forEach(sentence => {
    sentence = sentence.trim();
    if (sentence.length > 20 && sentence.length < 100) {
      // Look for sentences that might indicate topics
      if (sentence.includes('is') || sentence.includes('are') || sentence.includes('will')) {
        topics.push(sentence);
      }
    }
  });
  
  return {
    text: cleanText,
    keywords,
    topics: topics.slice(0, 10),
    wordCount: words.length,
    sentenceCount: sentences.length
  };
}

export function generateSearchQueries(analysis) {
  const { keywords, topics } = analysis;
  const queries = [];
  
  // Generate queries from keywords
  if (keywords.length >= 3) {
    queries.push(`${keywords.slice(0, 3).join(' ')} explanation`);
    queries.push(`${keywords.slice(0, 2).join(' ')} tutorial`);
  }
  
  // Generate queries from topics
  topics.slice(0, 3).forEach(topic => {
    const cleanTopic = topic.replace(/[.!?]+$/, '').trim();
    if (cleanTopic.length > 10) {
      queries.push(`${cleanTopic} explained`);
      queries.push(`${cleanTopic} tutorial`);
    }
  });
  
  // Add general learning queries
  if (keywords.length > 0) {
    queries.push(`${keywords[0]} course`);
    queries.push(`${keywords[0]} lecture`);
  }
  
  return [...new Set(queries)]; // Remove duplicates
}
