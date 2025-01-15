// src/components/MainScreen.jsx
import { useNavigate } from 'react-router-dom';

const MainScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 w-full">
      <div className="w-full px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Select Game Type
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
          <button
            onClick={() => navigate('/game/uba')}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
          >
            <h2 className="text-3xl font-bold text-blue-600">UBA Game</h2>
            <p className="text-gray-600 mt-2">Manage UBA game sessions and scores</p>
          </button>

          <button
            onClick={() => navigate('/game/diners')}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
          >
            <h2 className="text-3xl font-bold text-blue-600">Diner's Game</h2>
            <p className="text-gray-600 mt-2">Manage Diner's game sessions and scores</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;