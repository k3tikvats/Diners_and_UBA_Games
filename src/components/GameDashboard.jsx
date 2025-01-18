// src/components/GameDashboard.jsx
import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QueueScreen from './QueueScreen';
import UbaScoreScreen from './UbaScoreScreen';
import DinersScoreScreen from './DinersScoreScreen';
import UbaFinalScreen from './UbaFinalScreen';
import DinersFinalScreen from './DinersFinalScreen';

const GameDashboard = () => {
  const { gameType } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('queue');

  const renderContent = () => {
    if (gameType === 'uba') {
      switch (activeTab) {
        case 'scores':
          return <UbaScoreScreen />;
        case 'final':
          return <UbaFinalScreen />;
        default:
          return <QueueScreen gameType={gameType} />;
      }
    } else {
      // Diner's game screens
      switch (activeTab) {
        case 'scores':
          return <DinersScoreScreen />;
        case 'final':
          return <DinersFinalScreen />;
        default:
          return <QueueScreen gameType={gameType} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {gameType === 'uba' ? 'UBA' : "Diner's"} Game Management
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Game Selection
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === 'queue' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Queue Management
            </button>
            <button
              onClick={() => setActiveTab('scores')}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === 'scores' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Current Round Scores
            </button>
            <button
              onClick={() => setActiveTab('final')}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === 'final' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Final Scores
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="mt-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;