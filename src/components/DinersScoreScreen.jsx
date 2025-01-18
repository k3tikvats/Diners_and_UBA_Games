import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import IGTSlogo from "@/assets/images/IGTSlogo.png";

const POOLS = ["Pool A", "Pool B", "Pool C", "Pool D", "Pool E"];
const TABLE_ROWS = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "order", label: "Order" },
  { id: "score", label: "Score" },
];

// Fixed Player Data
const mockPlayerData = {
  "Pool A": [
    { name: "Sophia", email: "sophia@example.com", order: 3, score: 15 },
    { name: "Liam", email: "liam@example.com", order: 5, score: 18 },
    { name: "Olivia", email: "olivia@example.com", order: 7, score: 20 },
    { name: "Noah", email: "noah@example.com", order: 6, score: 19 },
    { name: "Emma", email: "emma@example.com", order: 4, score: 17 },
    { name: "James", email: "james@example.com", order: 9, score: 23 },
    { name: "Ava", email: "ava@example.com", order: 2, score: 14 },
    { name: "William", email: "william@example.com", order: 8, score: 21 },
    { name: "Charlotte", email: "charlotte@example.com", order: 10, score: 25 },
    { name: "Lucas", email: "lucas@example.com", order: 7, score: 20 },
    { name: "Mia", email: "mia@example.com", order: 6, score: 19 },
    { name: "Ethan", email: "ethan@example.com", order: 8, score: 22 },
  ],
  "Pool B": [
    { name: "Amelia", email: "amelia@example.com", order: 3, score: 15 },
    { name: "Logan", email: "logan@example.com", order: 5, score: 18 },
    { name: "Harper", email: "harper@example.com", order: 7, score: 20 },
    { name: "Evelyn", email: "evelyn@example.com", order: 6, score: 19 },
    { name: "Aiden", email: "aiden@example.com", order: 4, score: 17 },
    { name: "Jackson", email: "jackson@example.com", order: 9, score: 23 },
    { name: "Abigail", email: "abigail@example.com", order: 2, score: 14 },
    { name: "Michael", email: "michael@example.com", order: 8, score: 21 },
  ],
  "Pool C": [],
  "Pool D": [],
  "Pool E": [],
};

const DinersCurrentScoreScreen = () => {
  const [selectedPool, setSelectedPool] = useState("Pool A");
  const [rounds] = useState([1, 2, 3]); // Three rounds

  const renderTable = (roundNumber, players) => (
    <Card className="w-full bg-white backdrop-blur-sm rounded-lg shadow-md mt-6">
      <CardHeader className="text-center pb-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-lg">
        <CardTitle className="text-white text-lg font-bold">
          ROUND {roundNumber}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="table-auto border-collapse border border-gray-300 w-full">
            <TableHeader>
              <TableRow className="bg-purple-200">
                <TableHead className="text-sm text-purple-900 font-semibold border border-gray-300">
                  {/* Empty Top-Left Cell */}
                </TableHead>
                {players.map((_, idx) => (
                  <TableHead
                    key={idx}
                    className="text-sm text-purple-900 font-semibold border border-gray-300 text-center"
                    style={{ minWidth: "80px" }} // Shrinking column width
                  >
                    P{idx + 1}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {TABLE_ROWS.map((row) => (
                <TableRow key={row.id} className="hover:bg-purple-100">
                  <TableCell className="text-sm text-gray-700 font-semibold border border-gray-300">
                    {row.label}
                  </TableCell>
                  {players.map((player, idx) => (
                    <TableCell
                      key={idx}
                      className="text-sm text-center border border-gray-300"
                      style={{ minWidth: "80px" }}
                    >
                      {player[row.id] || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  const filteredPlayers = mockPlayerData[selectedPool] || [];

  return (
    <div className="bg-gradient-to-b from-purple-300 to-purple-500 min-h-screen text-purple-900 relative">
      <img
        src={IGTSlogo}
        alt="Background Logo"
        className="absolute inset-0 w-full h-full object-contain opacity-40 pointer-events-none"
      />
      <div className="max-w-[1440px] mx-auto py-8 px-4 relative">
        <h1 className="text-black text-2xl font-bold text-center mb-6">
          DINER'S GAME - CURRENT SCORES
        </h1>
        <div className="flex justify-start mb-6 space-x-3">
          {POOLS.map((pool) => (
            <button
              key={pool}
              onClick={() => setSelectedPool(pool)}
              className={`text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedPool === pool
                  ? "bg-purple-700 text-white"
                  : "bg-white text-purple-700 hover:bg-purple-300"
              }`}
            >
              {pool}
            </button>
          ))}
        </div>
        <div className="relative space-y-6">
          {rounds.map((roundNumber) =>
            renderTable(roundNumber, filteredPlayers)
          )}
        </div>
      </div>
    </div>
  );
};

export default DinersCurrentScoreScreen;
