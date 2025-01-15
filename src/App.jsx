// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './components/MainScreen';
import GameDashboard from './components/GameDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/game/:gameType" element={<GameDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;