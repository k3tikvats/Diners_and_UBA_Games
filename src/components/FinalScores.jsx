import { useState } from 'react';

const FinalScores = ({ gameType }) => {
  const [finalScores] = useState([
    { name: "Player 1", totalScore: 220 },
    { name: "Player 2", totalScore: 240 },
    { name: "Player 3", totalScore: 190 },
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Final Scores</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Final Score</th>
            </tr>
          </thead>
          <tbody>
            {finalScores
              .sort((a, b) => b.totalScore - a.totalScore)
              .map((player, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4">{player.name}</td>
                  <td className="px-6 py-4">{player.totalScore}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinalScores;