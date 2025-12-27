import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Video, FileText, BookOpen, Filter, Star, Clock, ExternalLink, MessageSquare, Brain, List, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { sampleResources } from '../data/sampleData';
import TranscriptModal from '../components/TranscriptModal';
import SummaryModal from '../components/SummaryModal';
import ConceptMap from '../components/ConceptMap';

const Explore = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const isPDFMode = searchParams.get('pdf') === 'true';
  
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfAnalysis, setPdfAnalysis] = useState(null);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    duration: 'all',
    type: 'all',
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showConceptMap, setShowConceptMap] = useState(false);

  // Fetch resources from API
  useEffect(() => {
    // Check for PDF analysis data in sessionStorage
    if (isPDFMode) {
      const storedAnalysis = sessionStorage.getItem('pdfAnalysis');
      if (storedAnalysis) {
        try {
          const pdfData = JSON.parse(storedAnalysis);
          setPdfAnalysis(pdfData);
          setResources(pdfData.resources || []);
          applyFilters(pdfData.resources || []);
          setLoading(false);
          return;
        } catch (err) {
          console.error('Error parsing PDF analysis:', err);
          sessionStorage.removeItem('pdfAnalysis');
        }
      }
    }

    const fetchResources = async () => {
      if (!query || query.trim() === '') {
        // Show sample data when no query
        setResources(sampleResources);
        applyFilters(sampleResources);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/search', {
          params: {
            q: query,
            max: 20
          }
        });

        const fetchedResources = response.data.results || [];
        setResources(fetchedResources);
        applyFilters(fetchedResources);
      } catch (err) {
        console.error('Error fetching resources:', err);
        const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to fetch resources. Please try again.';
        setError(errorMessage);
        
        // Only show sample data if it's not an API key error
        if (!errorMessage.includes('API key') && !errorMessage.includes('YOUTUBE_API_KEY')) {
          setResources(sampleResources);
          applyFilters(sampleResources);
        } else {
          // Clear resources if API key error
          setResources([]);
          setFilteredResources([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [query, isPDFMode]);

  const applyFilters = (resourceList) => {
    let filtered = [...resourceList];

    // Apply difficulty filter
    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(r => r.difficulty === filters.difficulty);
    }

    // Apply duration filter
    if (filters.duration !== 'all') {
      if (filters.duration === 'quick') {
        filtered = filtered.filter(r => {
          const duration = parseInt(r.duration);
          return duration <= 10 || r.duration.includes('min') && parseInt(r.duration) <= 10;
        });
      } else if (filters.duration === 'medium') {
        filtered = filtered.filter(r => {
          const duration = parseInt(r.duration);
          return (duration > 10 && duration <= 60) || (r.duration.includes('min') && parseInt(r.duration) > 10 && parseInt(r.duration) <= 60);
        });
      } else if (filters.duration === 'long') {
        filtered = filtered.filter(r => {
          const duration = parseInt(r.duration);
          return duration > 60 || r.duration.includes('hour') || parseInt(r.duration) > 60;
        });
      }
    }

    // Apply type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(r => r.type === filters.type);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'quality':
        filtered.sort((a, b) => b.qualityScore - a.qualityScore);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
        filtered.sort((a, b) => b.recency - a.recency);
        break;
      case 'relevance':
      default:
        filtered.sort((a, b) => b.aiRelevance - a.aiRelevance);
        break;
    }

    setFilteredResources(filtered);
  };

  useEffect(() => {
    applyFilters(resources);
  }, [filters, resources]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return Video;
      case 'pdf':
        return FileText;
      case 'article':
        return BookOpen;
      default:
        return BookOpen;
    }
  };

  const getDurationCategory = (duration) => {
    const minutes = parseInt(duration);
    if (minutes <= 10 || (duration.includes('min') && parseInt(duration) <= 10)) return 'Quick';
    if (minutes <= 60 || (duration.includes('min') && parseInt(duration) <= 60)) return 'Medium';
    return 'Long';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isPDFMode && pdfAnalysis ? (
              <div className="flex items-center space-x-3">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <span>Resources for Your PDF</span>
              </div>
            ) : query ? (
              `Results for "${query}"`
            ) : (
              'Explore Learning Resources'
            )}
          </h1>
          <p className="text-gray-600">
            {loading ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="animate-spin" size={16} />
                <span>{isPDFMode ? 'Analyzing your PDF and finding resources...' : 'Searching for the best resources...'}</span>
              </span>
            ) : isPDFMode && pdfAnalysis ? (
              <div className="space-y-2">
                <p>{filteredResources.length} personalized resources found based on your PDF content</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {pdfAnalysis.analysis.keywords.slice(0, 5).map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {filteredResources.length} resources found • AI-ranked by relevance and quality
              </>
            )}
          </p>
          {error && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2 text-yellow-800">
                <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold mb-1">Search Error</p>
                  <p className="text-sm">{error}</p>
                  {error.includes('API key') && (
                    <div className="mt-3 pt-3 border-t border-yellow-300">
                      <p className="text-sm font-semibold mb-2">To fix this:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>Create a <code className="bg-yellow-100 px-1 rounded">.env</code> file in the root directory</li>
                        <li>Add: <code className="bg-yellow-100 px-1 rounded">YOUTUBE_API_KEY=your_key_here</code></li>
                        <li>Get your API key from <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                        <li>Restart the backend server</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PDF Analysis Summary */}
        {isPDFMode && pdfAnalysis && !loading && (
          <div className="bg-purple-50 rounded-xl p-6 mb-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              PDF Analysis Summary
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-purple-600">Word Count</p>
                <p className="text-xl font-bold text-purple-800">{pdfAnalysis.analysis.wordCount}</p>
              </div>
              <div>
                <p className="text-sm text-purple-600">Topics Found</p>
                <p className="text-xl font-bold text-purple-800">{pdfAnalysis.analysis.topics.length}</p>
              </div>
              <div>
                <p className="text-sm text-purple-600">Resources Found</p>
                <p className="text-xl font-bold text-purple-800">{pdfAnalysis.resourceCount}</p>
              </div>
            </div>
            
            {pdfAnalysis.analysis.searchQueries.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-purple-700 mb-2">Generated Search Queries:</p>
                <div className="space-y-1">
                  {pdfAnalysis.analysis.searchQueries.slice(0, 3).map((query, index) => (
                    <p key={index} className="text-sm text-purple-600">• {query}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filters and Actions */}
        {!loading && (
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              showFilters
                ? 'bg-darkBlue-50 border-darkBlue-300 text-darkBlue-700'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>

          <button
            onClick={() => setShowConceptMap(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            <Brain size={18} />
            <span>Concept Map</span>
          </button>
        </div>
        )}

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-slide-down">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-darkBlue-500 focus:border-darkBlue-500"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-darkBlue-500 focus:border-darkBlue-500"
                >
                  <option value="all">All Durations</option>
                  <option value="quick">Quick (&lt;10 min)</option>
                  <option value="medium">Medium (10-60 min)</option>
                  <option value="long">Long (&gt;60 min)</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Resource Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-darkBlue-500 focus:border-darkBlue-500"
                >
                  <option value="all">All Types</option>
                  <option value="video">Video</option>
                  <option value="pdf">PDF</option>
                  <option value="article">Article</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-darkBlue-500 focus:border-darkBlue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="quality">Quality Score</option>
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-darkBlue-600 mb-4" size={48} />
            <p className="text-gray-600 text-lg">Searching for the best educational resources...</p>
            <p className="text-gray-500 text-sm mt-2">This may take a few seconds</p>
          </div>
        )}

        {/* Resource Cards */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
            const Icon = getTypeIcon(resource.type);
            return (
              <div
                key={resource.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-darkBlue-100 to-purple-100">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                      <Icon className="text-darkBlue-600" size={20} />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={14} />
                      <span className="text-sm font-semibold text-gray-900">{resource.qualityScore}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{resource.source}</p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center space-x-1 text-xs text-gray-600">
                      <Clock size={14} />
                      <span>{resource.duration}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {resource.difficulty}
                    </span>
                  </div>

                  {/* AI Summary */}
                  <div className="mb-4">
                    {Array.isArray(resource.summary) ? (
                      <ul className="space-y-1 text-sm text-gray-600">
                        {resource.summary.slice(0, 2).map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-darkBlue-500 mr-2">•</span>
                            <span className="line-clamp-2">{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {resource.summary || resource.description || 'No summary available'}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={resource.url}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-darkBlue-600 text-white rounded-lg hover:bg-darkBlue-700 transition-colors duration-200 text-sm font-medium"
                    >
                      <ExternalLink size={16} />
                      <span>Open</span>
                    </a>
                    {resource.type === 'video' && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedResource(resource);
                            setShowTranscript(true);
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
                          title="Generate Transcript"
                        >
                          <List size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedResource(resource);
                            setShowSummary(true);
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
                          title="Auto Summary"
                        >
                          <Brain size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}

        {!loading && filteredResources.length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-2">No resources found matching your criteria.</p>
            {query && (
              <p className="text-gray-400 text-sm">Try adjusting your search query or filters.</p>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showTranscript && selectedResource && (
        <TranscriptModal
          resource={selectedResource}
          onClose={() => setShowTranscript(false)}
        />
      )}

      {showSummary && selectedResource && (
        <SummaryModal
          resource={selectedResource}
          onClose={() => setShowSummary(false)}
        />
      )}

      {showConceptMap && (
        <ConceptMap
          topic={query || 'Machine Learning'}
          onClose={() => setShowConceptMap(false)}
        />
      )}
    </div>
  );
};

export default Explore;

