import { useState } from 'react';
import { User, Settings, BookOpen, Target, Zap, Save } from 'lucide-react';

const Profile = () => {
  const [settings, setSettings] = useState({
    learningGoal: 'skill-building',
    learningPace: 'normal',
    preferredFormats: ['video', 'text'],
    notifications: true,
    emailUpdates: false
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleFormatToggle = (format) => {
    setSettings(prev => ({
      ...prev,
      preferredFormats: prev.preferredFormats.includes(format)
        ? prev.preferredFormats.filter(f => f !== format)
        : [...prev.preferredFormats, format]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-darkBlue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              JD
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">John Doe</h1>
              <p className="text-gray-500 mb-2">john.doe@example.com</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">Member since: Jan 2024</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">Level: Intermediate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Goals */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="text-blue-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Learning Goals</h2>
          </div>

          <div className="space-y-4">
            {[
              { value: 'exam-prep', label: 'Exam Preparation', description: 'Focus on exam-specific content and practice tests' },
              { value: 'skill-building', label: 'Skill Building', description: 'Develop practical skills for career advancement' },
              { value: 'research', label: 'Research', description: 'Deep dive into advanced topics for academic research' },
              { value: 'hobby', label: 'Hobby/Interest', description: 'Learn new things for personal interest and fun' }
            ].map((goal) => (
              <label
                key={goal.value}
                className={`flex items-start space-x-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  settings.learningGoal === goal.value
                    ? 'border-darkBlue-500 bg-darkBlue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="learningGoal"
                  value={goal.value}
                  checked={settings.learningGoal === goal.value}
                  onChange={(e) => handleSettingChange('learningGoal', e.target.value)}
                  className="mt-1 w-5 h-5 text-darkBlue-600 focus:ring-darkBlue-500"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{goal.label}</div>
                  <div className="text-sm text-gray-500 mt-1">{goal.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Learning Pace */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Zap className="text-purple-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Learning Pace</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { value: 'slow', label: 'Slow & Steady', description: 'Take your time, focus on understanding' },
              { value: 'normal', label: 'Normal', description: 'Balanced learning pace' },
              { value: 'fast', label: 'Fast Track', description: 'Accelerated learning for quick progress' }
            ].map((pace) => (
              <button
                key={pace.value}
                onClick={() => handleSettingChange('learningPace', pace.value)}
                className={`p-6 border-2 rounded-xl text-left transition-all duration-200 ${
                  settings.learningPace === pace.value
                    ? 'border-darkBlue-500 bg-darkBlue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900 mb-1">{pace.label}</div>
                <div className="text-sm text-gray-500">{pace.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Formats */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-green-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Preferred Formats</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { value: 'video', label: 'Video', icon: '🎥' },
              { value: 'text', label: 'Text/Articles', icon: '📝' },
              { value: 'pdf', label: 'PDF Documents', icon: '📄' }
            ].map((format) => (
              <button
                key={format.value}
                onClick={() => handleFormatToggle(format.value)}
                className={`p-6 border-2 rounded-xl text-center transition-all duration-200 ${
                  settings.preferredFormats.includes(format.value)
                    ? 'border-darkBlue-500 bg-darkBlue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{format.icon}</div>
                <div className="font-semibold text-gray-900">{format.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Settings className="text-orange-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              { key: 'notifications', label: 'Enable Notifications', description: 'Get notified about new resources and progress updates' },
              { key: 'emailUpdates', label: 'Email Updates', description: 'Receive weekly learning summary via email' }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900">{setting.label}</div>
                  <div className="text-sm text-gray-500 mt-1">{setting.description}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[setting.key]}
                    onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-darkBlue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-darkBlue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="flex items-center space-x-2 px-8 py-3 bg-darkBlue-600 text-white rounded-xl hover:bg-darkBlue-700 transition-colors duration-200 font-semibold">
            <Save size={20} />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

