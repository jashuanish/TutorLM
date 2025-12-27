# AI-Based Learning Aggregator

A modern, production-ready web application that consolidates high-quality educational content from multiple sources using AI filtering and personalization with **REAL-TIME SEARCH**.

## 🌟 Features

### Core Functionality
- **Real-Time Search**: Live search across YouTube, articles, and PDFs (no hardcoded data!)
- **AI-Powered Ranking**: Intelligent resource ranking based on quality, relevance, and popularity
- **Multi-Source Learning**: Consolidates videos, PDFs, articles, and websites in real-time
- **Personalized Workspace**: Save sessions, track progress, organize folders
- **AI Chat Tutor**: Interactive chatbot for concept explanations and quizzes
- **Progress Tracking**: Visual analytics with charts and statistics
- **Concept Maps**: Interactive visual concept exploration

### AI Features
- ✅ Real-time Resource Ranking Engine (quality, relevance, popularity)
- ✅ YouTube Data API integration for video resources
- ✅ Web search integration for articles and PDFs
- ✅ Transcript Generator for videos
- ✅ Auto Summary (bullet notes, paragraphs, revision notes)
- ✅ AI Tutor Chatbot with contextual responses
- ✅ Concept Map Generator

### UI/UX Highlights
- Sleek, professional academic design
- Responsive mobile-first layout
- Smooth animations and transitions
- Glassmorphism effects
- Parallax scrolling in hero section
- Modern card-based layouts
- Loading states and error handling

## 🛠 Tech Stack

### Frontend
- **React.js** + **Tailwind CSS**
- **React Router DOM** for navigation
- **Recharts** for data visualization
- **Axios** for API calls
- **Lucide React** for icons
- **Vite** for building

### Backend
- **Node.js** + **Express**
- **YouTube Data API v3** for video search
- **SerpAPI** (optional) for article/PDF search
- **CORS** enabled for frontend communication

## 📦 Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
PORT=3001
YOUTUBE_API_KEY=your_youtube_api_key_here
SERPAPI_KEY=your_serpapi_key_here  # Optional
```

3. **Get API Keys:**
   - **YouTube Data API v3**: 
     - Go to [Google Cloud Console](https://console.cloud.google.com/)
     - Create a project
     - Enable YouTube Data API v3
     - Create credentials (API Key)
   - **SerpAPI** (optional, for articles/PDFs):
     - Sign up at [SerpAPI](https://serpapi.com/)
     - Get your free API key (100 searches/month free)

4. **Start the application:**

   **Option 1: Run both frontend and backend together:**
   ```bash
   npm run dev:all
   ```

   **Option 2: Run separately:**
   
   Terminal 1 (Backend):
   ```bash
   npm run dev:server
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

5. **Build for production:**
```bash
npm run build
```

## 🚀 Usage

1. **Home**: Search for any topic using the hero search bar
2. **Explore**: Browse AI-ranked learning resources fetched in real-time from YouTube and web
3. **Workspace**: Manage saved sessions and bookmarks
4. **AI Chat Tutor**: Ask questions and get explanations
5. **Saved Sessions**: View all your bookmarked learning sessions
6. **Profile**: Configure learning goals, pace, and preferences
7. **Progress**: Track your learning journey with detailed analytics

## 📁 Project Structure

```
├── server/              # Backend Express server
│   ├── index.js        # Main server file
│   └── services/
│       └── searchService.js  # Search API integration
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── data/           # Sample data (fallback)
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── .env.example        # Environment variables template
└── package.json        # Dependencies
```

## 🔑 API Configuration

### YouTube Data API v3
The app uses YouTube Data API to fetch real educational videos. You need:
1. A Google Cloud Project
2. YouTube Data API v3 enabled
3. An API key

**Free tier**: 10,000 units/day (enough for ~1000 searches/day)

### SerpAPI (Optional)
For searching articles and PDFs beyond YouTube:
1. Sign up at serpapi.com
2. Get your API key
3. Add to `.env` file

**Free tier**: 100 searches/month

## 🎯 Real-Time Search Features

- **Live YouTube Search**: Fetches real educational videos
- **Quality Ranking**: AI algorithm ranks resources by:
  - Title relevance
  - Channel reputation
  - Content quality indicators
  - Recency
- **Smart Filtering**: Difficulty level estimation, duration filtering
- **Error Handling**: Graceful fallbacks if APIs fail

## 📝 Notes

- The app fetches real data from YouTube API
- If SerpAPI is not configured, only YouTube videos will be shown
- Sample data is used as fallback if APIs fail or on initial load
- All search results are ranked using AI algorithms

## 🎨 Design System

- **Primary Color**: Dark Blue (#1e3a8a - #0c4a6e)
- **Accent Color**: Purple gradients
- **Typography**: System fonts with clean hierarchy
- **Spacing**: Consistent 8px grid system
- **Shadows**: Soft, layered shadows for depth
- **Borders**: Rounded corners (12px-24px)

## 🐛 Troubleshooting

**"Failed to fetch resources" error:**
- Check if your YouTube API key is set correctly in `.env`
- Verify the API key has YouTube Data API v3 enabled
- Check API quota limits in Google Cloud Console

**No results appearing:**
- Ensure the backend server is running on port 3001
- Check browser console for CORS errors
- Verify API keys are valid

**CORS errors:**
- The backend has CORS enabled, but if issues persist, check server/index.js

## 📄 License

MIT License - Feel free to use this project for your presentations and demonstrations!

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
