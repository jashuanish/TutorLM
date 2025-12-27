import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, TrendingUp, BookOpen, Users } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularTopics = [
    'Machine Learning',
    'Data Structures',
    'Quantum Physics',
    'Web Development',
    'Artificial Intelligence',
    'Cybersecurity'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      {/* Hero Section with Parallax Effect */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-darkBlue-600/5 via-transparent to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-darkBlue-50 rounded-full text-darkBlue-700 mb-6 animate-slide-down">
              <Sparkles size={16} className="text-darkBlue-600" />
              <span className="text-sm font-medium">AI-Powered Learning Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-slide-up">
              Your AI Learning
              <span className="block bg-gradient-to-r from-darkBlue-600 to-purple-600 bg-clip-text text-transparent">
                Companion
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-slide-up animation-delay-200">
              Search once. Learn smarter. Let AI organize everything.
            </p>

            {/* Large Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto animate-scale-in animation-delay-300">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any topic — e.g., Machine Learning, Data Structures, Quantum Physics"
                  className="block w-full pl-14 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-darkBlue-200 focus:border-darkBlue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-darkBlue-600 to-darkBlue-700 text-white rounded-xl font-semibold hover:from-darkBlue-700 hover:to-darkBlue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Popular Topics */}
            <div className="mt-12 animate-fade-in animation-delay-400">
              <p className="text-sm text-gray-500 mb-4">Popular Topics:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {popularTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(topic);
                      navigate(`/explore?q=${encodeURIComponent(topic)}`);
                    }}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-darkBlue-300 hover:bg-darkBlue-50 hover:text-darkBlue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-darkBlue-500 to-darkBlue-600 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Ranking</h3>
            <p className="text-gray-600">
              Resources ranked by AI using quality, relevance, and learning effectiveness algorithms.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Source Learning</h3>
            <p className="text-gray-600">
              Consolidate videos, PDFs, articles, and websites in one unified learning experience.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Workspace</h3>
            <p className="text-gray-600">
              Track progress, save sessions, and organize your learning journey with AI assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-darkBlue-600 to-darkBlue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-darkBlue-100">Learning Resources</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-darkBlue-100">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-darkBlue-100">Topics Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-darkBlue-100">AI Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

