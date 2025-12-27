import { Clock, BookOpen, Folder, TrendingUp, Play, Trash2, Share2 } from 'lucide-react';

const SavedSessions = () => {
  // Same data as Workspace for consistency
  const savedSessions = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      topic: 'Machine Learning',
      resources: 8,
      progress: 65,
      lastAccessed: '2 hours ago',
      savedDate: '2024-01-15',
      thumbnail: 'https://via.placeholder.com/200x120/1e3a8a/ffffff?text=ML+Fundamentals'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      topic: 'Computer Science',
      resources: 12,
      progress: 40,
      lastAccessed: '1 day ago',
      savedDate: '2024-01-10',
      thumbnail: 'https://via.placeholder.com/200x120/0284c7/ffffff?text=DSA'
    },
    {
      id: 3,
      title: 'React Advanced Patterns',
      topic: 'Web Development',
      resources: 6,
      progress: 85,
      lastAccessed: '3 days ago',
      savedDate: '2024-01-05',
      thumbnail: 'https://via.placeholder.com/200x120/0ea5e9/ffffff?text=React'
    },
    {
      id: 4,
      title: 'Python for Data Science',
      topic: 'Data Science',
      resources: 10,
      progress: 30,
      lastAccessed: '5 days ago',
      savedDate: '2024-01-01',
      thumbnail: 'https://via.placeholder.com/200x120/0369a1/ffffff?text=Python'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Learning Sessions</h1>
          <p className="text-gray-600">All your bookmarked learning sessions in one place</p>
        </div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{savedSessions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Folder className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {savedSessions.filter(s => s.progress > 0 && s.progress < 100).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {savedSessions.filter(s => s.progress === 100).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Avg. Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(savedSessions.reduce((acc, s) => acc + s.progress, 0) / savedSessions.length)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-40 bg-gradient-to-br from-darkBlue-100 to-purple-100">
                <img
                  src={session.thumbnail}
                  alt={session.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200">
                    <Share2 size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200">
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-gray-900">
                    {session.topic}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{session.title}</h3>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{session.resources} resources</span>
                  <span>Saved {new Date(session.savedDate).toLocaleDateString()}</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-darkBlue-600">{session.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-darkBlue-600 to-darkBlue-700 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${session.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Last accessed: {session.lastAccessed}</span>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-darkBlue-600 text-white rounded-lg hover:bg-darkBlue-700 transition-colors duration-200">
                    <Play size={16} />
                    <span>Resume</span>
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    <BookOpen size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {savedSessions.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved sessions yet</h3>
            <p className="text-gray-500">Start exploring topics and save your favorite learning sessions!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSessions;

