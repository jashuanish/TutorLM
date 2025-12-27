import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Folder, TrendingUp, Play, MoreVertical, BarChart3 } from 'lucide-react';

const Workspace = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  const navigate = useNavigate();

  const savedSessions = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      topic: 'Machine Learning',
      resources: 8,
      progress: 65,
      lastAccessed: '2 hours ago',
      thumbnail: 'https://via.placeholder.com/200x120/1e3a8a/ffffff?text=ML+Fundamentals'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      topic: 'Computer Science',
      resources: 12,
      progress: 40,
      lastAccessed: '1 day ago',
      thumbnail: 'https://via.placeholder.com/200x120/0284c7/ffffff?text=DSA'
    },
    {
      id: 3,
      title: 'React Advanced Patterns',
      topic: 'Web Development',
      resources: 6,
      progress: 85,
      lastAccessed: '3 days ago',
      thumbnail: 'https://via.placeholder.com/200x120/0ea5e9/ffffff?text=React'
    }
  ];

  const bookmarkedResources = [
    {
      id: 1,
      title: 'Introduction to Neural Networks',
      type: 'video',
      duration: '45 min',
      savedAt: '2 days ago'
    },
    {
      id: 2,
      title: 'Python Pandas Complete Guide',
      type: 'article',
      duration: '30 min',
      savedAt: '5 days ago'
    },
    {
      id: 3,
      title: 'Deep Learning Research Paper',
      type: 'pdf',
      duration: '120 min',
      savedAt: '1 week ago'
    }
  ];

  const folders = [
    { name: 'Computer Science', count: 15, color: 'bg-blue-500' },
    { name: 'Mathematics', count: 8, color: 'bg-green-500' },
    { name: 'Physics', count: 12, color: 'bg-purple-500' },
    { name: 'Web Development', count: 20, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Workspace</h1>
          <p className="text-gray-600">Organize and track your learning journey</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-gray-200">
          {[
            { id: 'sessions', label: 'Saved Sessions', icon: Clock },
            { id: 'bookmarks', label: 'Bookmarks', icon: BookOpen },
            { id: 'folders', label: 'Folders', icon: Folder }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-darkBlue-600 text-darkBlue-600 font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'sessions' && (
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
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200">
                      <MoreVertical size={18} className="text-gray-600" />
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
                    <span>{session.lastAccessed}</span>
                  </div>

                  {/* Progress Bar */}
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

                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-darkBlue-600 text-white rounded-lg hover:bg-darkBlue-700 transition-colors duration-200">
                    <Play size={18} />
                    <span>Resume Learning</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {bookmarkedResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        resource.type === 'video' ? 'bg-red-100' :
                        resource.type === 'pdf' ? 'bg-blue-100' :
                        'bg-green-100'
                      }`}>
                        <BookOpen className={
                          resource.type === 'video' ? 'text-red-600' :
                          resource.type === 'pdf' ? 'text-blue-600' :
                          'text-green-600'
                        } size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>{resource.type.toUpperCase()}</span>
                          <span>•</span>
                          <span>{resource.duration}</span>
                          <span>•</span>
                          <span>{resource.savedAt}</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-darkBlue-600 hover:bg-darkBlue-50 rounded-lg transition-colors duration-200">
                      Open
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'folders' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {folders.map((folder, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className={`w-16 h-16 ${folder.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Folder className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{folder.name}</h3>
                <p className="text-sm text-gray-500">{folder.count} resources</p>
              </div>
            ))}
          </div>
        )}

        {/* Progress Link */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/progress')}
            className="w-full bg-gradient-to-r from-darkBlue-600 to-purple-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1">View Detailed Progress Analytics</h3>
                <p className="text-white/90">Track your learning journey with comprehensive charts and statistics</p>
              </div>
            </div>
            <TrendingUp size={24} className="opacity-80" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{savedSessions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Bookmarks</p>
                <p className="text-2xl font-bold text-gray-900">{bookmarkedResources.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Folders</p>
                <p className="text-2xl font-bold text-gray-900">{folders.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Folder className="text-purple-600" size={24} />
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
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;

