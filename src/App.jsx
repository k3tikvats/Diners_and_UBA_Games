// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './components/MainScreen';
import GameDashboard from './components/GameDashboard';


function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/game/:gameType/*" element={<GameDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;