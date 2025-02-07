import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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

// Mock Final Data 
const mockFinalData = [
  { name: "Sophia", email: "sophia@example.com", ubaScore: 15, dinerScore: 18 },
  { name: "Liam Lawson", email: "liam@example.com", ubaScore: 14, dinerScore: 16 },
  { name: "Olivia Rodrigo", email: "olivia@example.com", ubaScore: 16, dinerScore: 15 },
  { name: "Noah", email: "noah@example.com", ubaScore: 17, dinerScore: 14 },
  { name: "Emma Stone", email: "emma@example.com", ubaScore: 18, dinerScore: 17 },
  { name: "James May", email: "james@example.com", ubaScore: 13, dinerScore: 19 },
  { name: "Ava", email: "ava@example.com", ubaScore: 19, dinerScore: 18 },
  { name: "William", email: "william@example.com", ubaScore: 14, dinerScore: 13 },
  { name: "Charlotte", email: "charlotte@example.com", ubaScore: 20, dinerScore: 19 },
  { name: "Lucas", email: "lucas@example.com", ubaScore: 15, dinerScore: 14 },
  { name: "Mia", email: "mia@example.com", ubaScore: 16, dinerScore: 18 },
  { name: "Ethan", email: "ethan@example.com", ubaScore: 18, dinerScore: 20 },
];

const FinalScreen = () => {
  const navigate = useNavigate();

  const finalDataWithTotal = useMemo(() => 
    mockFinalData.map(player => ({
      ...player,
      total: player.ubaScore + player.dinerScore,
    }))
    .sort((a, b) => b.total - a.total), []);

  const tableHeaders = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "ubaScore", label: "UBA Score" },
    { id: "dinerScore", label: "Diner's Score" },
    { id: "total", label: "Total Score" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50 bg-gradient-to-b from-purple-300 to-purple-500 text-purple-900 ">
      <img
            src={IGTSlogo}
            alt="Background Logo"
            className="absolute inset-0 w-full h-full object-contain opacity-40 pointer-events-none"
          />
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Final Scores</h1>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Back to Game Selection
        </button>
      </div>

      <Card className="w-full bg-white backdrop-blur-sm rounded-lg shadow-md mt-6">
        <CardHeader className="text-center pb-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-lg">
          <CardTitle className="text-white text-lg font-bold">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="table-auto border-collapse border border-gray-300 w-full">
              <TableHeader>
                <TableRow className="bg-purple-200">
                  {tableHeaders.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-sm text-purple-900 font-semibold border border-gray-300"
                    >
                      {header.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {finalDataWithTotal.map((player, index) => (
                  <TableRow key={index} className="hover:bg-purple-100">
                    <TableCell className="text-sm text-gray-700 font-semibold border border-gray-300">
                      {player.name}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 font-semibold border border-gray-300">
                      {player.email}
                    </TableCell>
                    <TableCell className="text-sm text-center border border-gray-300">
                      {player.ubaScore}
                    </TableCell>
                    <TableCell className="text-sm text-center border border-gray-300">
                      {player.dinerScore}
                    </TableCell>
                    <TableCell className="text-sm text-center font-bold border border-gray-300">
                      {player.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>              
        </CardContent>
      </Card>
    </div>
  );
};

export default FinalScreen;
