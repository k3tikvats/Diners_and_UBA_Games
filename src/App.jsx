// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './components/MainScreen';
import GameDashboard from './components/GameDashboard';
import FinalScreen from './components/FinalScreen';
import LogIn from './components/Login';


function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/game/:gameType/*" element={<GameDashboard />} />
          <Route path="/finalscreen" element={<FinalScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;