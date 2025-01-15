// src/components/GameDashboard.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import QueueScreen from './QueueScreen';
import CurrentRoundScores from './CurrentRoundScores';
import FinalScores from './FinalScores';

const GameDashboard = () => {
  const { gameType } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'queue');

  const tabs = [
    { id: 'queue', label: 'Queue Management' },
    { id: 'current-rounds', label: 'Current Round Scores' },
    { id: 'final-scores', label: 'Final Scores' }
  ];

  // Update URL when tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // Set initial tab from URL on mount
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Game Type Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          {gameType === 'uba' ? 'UBA' : "Diner's"} Game Management
        </h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          Back to Game Selection
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b">
          <div className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === 'queue' && <QueueScreen gameType={gameType} />}
        {activeTab === 'current-rounds' && <CurrentRoundScores gameType={gameType} />}
        {activeTab === 'final-scores' && <FinalScores gameType={gameType} />}
      </div>
    </div>
  );
};

export default GameDashboard;