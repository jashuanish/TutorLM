// Sample data for demo purposes
export const sampleResources = [
  {
    id: 1,
    type: 'video',
    title: 'Introduction to Machine Learning - Complete Course',
    source: 'YouTube - 3Blue1Brown',
    qualityScore: 5,
    duration: '45 min',
    difficulty: 'Intermediate',
    views: 2500000,
    likes: 85000,
    summary: [
      'Comprehensive introduction to ML fundamentals with visual explanations',
      'Covers neural networks, backpropagation, and gradient descent',
      'Includes practical coding examples and exercises'
    ],
    thumbnail: 'https://via.placeholder.com/400x225/1e3a8a/ffffff?text=ML+Course',
    url: '#',
    aiRelevance: 98,
    recency: 30
  },
  {
    id: 2,
    type: 'pdf',
    title: 'Deep Learning by Ian Goodfellow - Research Paper',
    source: 'MIT Press Research',
    qualityScore: 5,
    duration: '120 min',
    difficulty: 'Advanced',
    views: 150000,
    likes: 12000,
    summary: [
      'Authoritative textbook on deep learning principles',
      'Covers convolutional networks, RNNs, and optimization techniques',
      'Suitable for graduate-level study and research'
    ],
    thumbnail: 'https://via.placeholder.com/400x225/0284c7/ffffff?text=Deep+Learning+PDF',
    url: '#',
    aiRelevance: 95,
    recency: 180
  },
  {
    id: 3,
    type: 'article',
    title: 'Understanding Neural Networks from Scratch',
    source: 'Medium - Towards Data Science',
    qualityScore: 4,
    duration: '15 min',
    difficulty: 'Beginner',
    views: 500000,
    likes: 25000,
    summary: [
      'Step-by-step guide to building neural networks in Python',
      'Explains concepts with clear diagrams and code',
      'Perfect for beginners starting their ML journey'
    ],
    thumbnail: 'https://via.placeholder.com/400x225/0ea5e9/ffffff?text=Neural+Networks',
    url: '#',
    aiRelevance: 92,
    recency: 14
  },
  {
    id: 4,
    type: 'video',
    title: 'Data Structures and Algorithms - Full Course',
    source: 'YouTube - freeCodeCamp',
    qualityScore: 5,
    duration: '8 hours',
    difficulty: 'Intermediate',
    views: 5000000,
    likes: 150000,
    summary: [
      'Complete DSA course covering arrays, trees, graphs, and algorithms',
      'Includes problem-solving techniques and interview preparation',
      'Hands-on coding challenges with solutions'
    ],
    thumbnail: 'https://via.placeholder.com/400x225/0369a1/ffffff?text=DSA+Course',
    url: '#',
    aiRelevance: 88,
    recency: 60
  },
  {
    id: 5,
    type: 'video',
    title: 'Quantum Computing Explained Simply',
    source: 'YouTube - Veritasium',
    qualityScore: 4,
    duration: '20 min',
    difficulty: 'Beginner',
    views: 3000000,
    likes: 120000,
    summary: [
      'Simplified explanation of quantum computing principles',
      'Visual demonstrations of superposition and entanglement',
      'Great starting point for quantum physics enthusiasts'
    ],
    thumbnail: 'https://via.placeholder.com/400x225/075985/ffffff?text=Quantum+Physics',
    url: '#',
    aiRelevance: 85,
    recency: 7
  },
  {
    id: 6,
    type: 'article',
    title: 'Advanced React Patterns and Hooks',
    source: 'Dev.to - Senior Engineer Blog',
    qualityScore: 4,
    duration: '25 min',
    difficulty: 'Advanced',
    views: 200000,
    likes: 8000,
    summary: [
      'Deep dive into React hooks and advanced component patterns',
      'Performance optimization techniques and best practices',
      'Real-world examples from production applications'
    ],
    thumbnail: 'https://via.placeholder.com/400x225/1e40af/ffffff?text=React+Advanced',
    url: '#',
    aiRelevance: 82,
    recency: 10
  },
  {
    id: 7,
    type: 'pdf',
    title: 'Introduction to Computer Science - MIT OpenCourseWare',
    source: 'MIT OCW',
    qualityScore: 5,
    duration: '90 min',
    difficulty: 'Intermediate',
    views: 800000,
    likes: 35000,
    summary: [
      'Official MIT course materials on CS fundamentals',
      'Covers algorithms, data structures, and problem-solving',
      'Includes lecture notes, assignments, and exams'
    ],
    thumbnail: 'https://via.placeholder.com/400x225/0c4a6e/ffffff?text=MIT+CS',
    url: '#',
    aiRelevance: 90,
    recency: 365
  },
  {
    id: 8,
    type: 'video',
    title: 'Python for Data Science - Pandas Tutorial',
    source: 'YouTube - Corey Schafer',
    qualityScore: 5,
    duration: '30 min',
    difficulty: 'Beginner',
    views: 1800000,
    likes: 65000,
    summary: [
      'Complete Pandas library tutorial for data manipulation',
      'Real-world examples with datasets',
      'Tips and tricks for efficient data analysis'
    ],
    thumbnail: 'https://via.placeholder.com/400x225/0284c7/ffffff?text=Python+Pandas',
    url: '#',
    aiRelevance: 87,
    recency: 21
  }
];

export const conceptMapData = {
  'Machine Learning': {
    connections: ['Neural Networks', 'Supervised Learning', 'Unsupervised Learning'],
    'Neural Networks': {
      connections: ['Deep Learning', 'Backpropagation', 'CNN'],
    },
    'Supervised Learning': {
      connections: ['Regression', 'Classification'],
    }
  }
};

export const chatMessages = [
  {
    id: 1,
    role: 'user',
    content: 'What is machine learning?',
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: 2,
    role: 'assistant',
    content: 'Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can identify patterns in data and make predictions or decisions.',
    timestamp: new Date(Date.now() - 3600000)
  }
];

export const userProgress = {
  topicsCompleted: 12,
  learningStreak: 7,
  totalHours: 45.5,
  resourceCompletion: 68,
  weeklyHours: [5, 7, 6, 8, 4, 9, 6]
};

