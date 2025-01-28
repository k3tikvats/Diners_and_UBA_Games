import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import IGTSlogo from "@/assets/images/IGTSlogo.png";

const POOLS = ["Pool A", "Pool B", "Pool C", "Pool D", "Pool E"];
const TABLE_ROWS = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "bid1", label: "Bid 1" },
  { id: "bid2", label: "Bid 2" },
  { id: "bid3", label: "Bid 3" },
  { id: "lowestUnique", label: "Lowest Unique" },
  { id: "highestUnique", label: "Highest Unique" },
  { id: "score", label: "Score" },
];

// Fixed player data
const mockPlayerData = {
  "Pool A": [
    { name: "Sophia", email: "sophia@example.com", bid1: 5, bid2: 7, bid3: 9, lowestUnique: 5, highestUnique: 9, score: 21 },
    { name: "Liam", email: "liam@example.com", bid1: 2, bid2: 6, bid3: 8, lowestUnique: 2, highestUnique: 8, score: 16 },
    { name: "Olivia", email: "olivia@example.com", bid1: 3, bid2: 4, bid3: 5, lowestUnique: 3, highestUnique: 5, score: 12 },
    { name: "Noah", email: "noah@example.com", bid1: 1, bid2: 2, bid3: 3, lowestUnique: 1, highestUnique: 3, score: 6 },
    { name: "Emma", email: "emma@example.com", bid1: 6, bid2: 7, bid3: 8, lowestUnique: 6, highestUnique: 8, score: 21 },
    { name: "James", email: "james@example.com", bid1: 4, bid2: 5, bid3: 6, lowestUnique: 4, highestUnique: 6, score: 15 },
    { name: "Ava", email: "ava@example.com", bid1: 9, bid2: 8, bid3: 7, lowestUnique: 7, highestUnique: 9, score: 24 },
    { name: "William", email: "william@example.com", bid1: 5, bid2: 6, bid3: 7, lowestUnique: 5, highestUnique: 7, score: 18 },
    { name: "Charlotte", email: "charlotte@example.com", bid1: 3, bid2: 4, bid3: 5, lowestUnique: 3, highestUnique: 5, score: 12 },
    { name: "Lucas", email: "lucas@example.com", bid1: 2, bid2: 3, bid3: 4, lowestUnique: 2, highestUnique: 4, score: 9 },
    { name: "Mia", email: "mia@example.com", bid1: 6, bid2: 8, bid3: 9, lowestUnique: 6, highestUnique: 9, score: 23 },
    { name: "Ethan", email: "ethan@example.com", bid1: 7, bid2: 8, bid3: 9, lowestUnique: 7, highestUnique: 9, score: 24 },
  ],
  "Pool B": [
    { name: "Amelia", email: "amelia@example.com", bid1: 3, bid2: 6, bid3: 9, lowestUnique: 3, highestUnique: 9, score: 18 },
    { name: "Logan", email: "logan@example.com", bid1: 2, bid2: 4, bid3: 8, lowestUnique: 2, highestUnique: 8, score: 14 },
    { name: "Harper", email: "harper@example.com", bid1: 1, bid2: 5, bid3: 7, lowestUnique: 1, highestUnique: 7, score: 13 },
    { name: "Evelyn", email: "evelyn@example.com", bid1: 4, bid2: 6, bid3: 8, lowestUnique: 4, highestUnique: 8, score: 18 },
    { name: "Aiden", email: "aiden@example.com", bid1: 5, bid2: 7, bid3: 9, lowestUnique: 5, highestUnique: 9, score: 21 },
    { name: "Jackson", email: "jackson@example.com", bid1: 3, bid2: 6, bid3: 9, lowestUnique: 3, highestUnique: 9, score: 18 },
    { name: "Abigail", email: "abigail@example.com", bid1: 2, bid2: 4, bid3: 8, lowestUnique: 2, highestUnique: 8, score: 14 },
    { name: "Michael", email: "michael@example.com", bid1: 1, bid2: 5, bid3: 7, lowestUnique: 1, highestUnique: 7, score: 13 },
  ],
};

const UbaScoreScreen = () => {
  const [selectedPool, setSelectedPool] = useState("Pool A");
  const [rounds] = useState([1, 2, 3]); // Updated to 3 rounds

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
                      style={{ minWidth: "80px" }} // Shrinking column width
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

  return (
    <div className="bg-gradient-to-b from-purple-300 to-purple-500 min-h-screen text-purple-900 relative">
      <img
        src={IGTSlogo}
        alt="Background Logo"
        className="absolute inset-0 w-full h-full object-contain opacity-40 pointer-events-none" // Increased visibility
      />
      <div className="max-w-[1440px] mx-auto py-8 px-4 relative">
        <h1 className="text-black text-2xl font-bold text-center mb-6">
          UNIQUE BID AUCTION
        </h1>
        <div className="flex justify-start mb-6 space-x-3">
          {POOLS.map((pool) => (
            <button
              key={pool}
              className={`text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedPool === pool
                  ? "bg-purple-700 text-white"
                  : "bg-white text-purple-700 hover:bg-purple-300"
              }`}
              onClick={() => setSelectedPool(pool)}
            >
              {pool}
            </button>
          ))}
        </div>
        <div className="relative space-y-6">
          {rounds.map((roundNumber) =>
            renderTable(roundNumber, mockPlayerData[selectedPool] || [])
          )}
        </div>
      </div>
    </div>
  );
};

export default UbaScoreScreen;
