// CurrentRoundScores.jsx
import { useState } from 'react';

const CurrentRoundScores = ({ gameType }) => {
  const [roundScores] = useState({
    round1: [
      { name: "Player 1", biddedNumber: 5, score: 120 },
      { name: "Player 2", biddedNumber: 3, score: 90 },
      { name: "Player 3", biddedNumber: 4, score: 110 },
    ],
    round2: [
      { name: "Player 1", biddedNumber: 4, score: 100 },
      { name: "Player 2", biddedNumber: 6, score: 150 },
      { name: "Player 3", biddedNumber: 3, score: 80 },
    ]
  });

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-sm">
      {/* Round 1 */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-600 p-3 rounded-lg">Round 1</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Bidded Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Score</th>
              </tr>
            </thead>
            <tbody>
              {roundScores.round1.map((player, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-blue-600 font-medium">{player.name}</td>
                  <td className="px-6 py-4 text-gray-700">{player.biddedNumber}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Round 2 */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-600 p-3 rounded-lg">Round 2</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Bidded Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Score</th>
              </tr>
            </thead>
            <tbody>
              {roundScores.round2.map((player, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-blue-600 font-medium">{player.name}</td>
                  <td className="px-6 py-4 text-gray-700">{player.biddedNumber}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CurrentRoundScores;