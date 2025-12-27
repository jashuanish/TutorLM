import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Clock, Target, Award, Flame } from 'lucide-react';
import { userProgress } from '../data/sampleData';

const Progress = () => {
  const weeklyData = userProgress.weeklyHours.map((hours, index) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
    hours: hours
  }));

  const topicDistribution = [
    { name: 'Completed', value: 12, color: '#2563eb' },
    { name: 'In Progress', value: 8, color: '#0ea5e9' },
    { name: 'Not Started', value: 15, color: '#cbd5e1' }
  ];

  const resourceTypes = [
    { type: 'Videos', completed: 25, total: 40 },
    { type: 'PDFs', completed: 15, total: 25 },
    { type: 'Articles', completed: 18, total: 30 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracking</h1>
          <p className="text-gray-600">Monitor your learning journey and achievements</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="text-blue-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-gray-900">{userProgress.topicsCompleted}</span>
            </div>
            <p className="text-sm text-gray-500">Topics Completed</p>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span>+3 this week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Flame className="text-orange-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-gray-900">{userProgress.learningStreak}</span>
            </div>
            <p className="text-sm text-gray-500">Day Streak</p>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <Flame size={16} className="mr-1" />
              <span>Keep it up!</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="text-purple-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-gray-900">{userProgress.totalHours}</span>
            </div>
            <p className="text-sm text-gray-500">Total Learning Hours</p>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span>+5.5 this week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="text-green-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-gray-900">{userProgress.resourceCompletion}%</span>
            </div>
            <p className="text-sm text-gray-500">Resource Completion</p>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span>+8% this week</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Learning Hours */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Learning Hours</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px' 
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', r: 5 }}
                  name="Hours"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Topic Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Topic Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topicDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resource Completion */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Resource Type Completion</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resourceTypes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="type" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px' 
                }}
              />
              <Legend />
              <Bar dataKey="completed" fill="#2563eb" name="Completed" radius={[8, 8, 0, 0]} />
              <Bar dataKey="total" fill="#cbd5e1" name="Total" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: '7-Day Streak', description: 'Learned for 7 consecutive days', icon: Flame, color: 'bg-orange-100 text-orange-600' },
              { title: 'ML Master', description: 'Completed 5 ML topics', icon: Award, color: 'bg-blue-100 text-blue-600' },
              { title: 'Speed Learner', description: '10 hours in a week', icon: Clock, color: 'bg-purple-100 text-purple-600' }
            ].map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className={`w-12 h-12 ${achievement.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;

