import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Workspace from './pages/Workspace';
import ChatTutor from './pages/ChatTutor';
import SavedSessions from './pages/SavedSessions';
import Profile from './pages/Profile';
import Progress from './pages/Progress';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/chat" element={<ChatTutor />} />
          <Route path="/saved" element={<SavedSessions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

