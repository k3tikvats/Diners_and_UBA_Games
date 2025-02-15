import React, { useState, useEffect, useCallback } from "react";
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
import { getDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseDB";

const UbaFrequencyScreen = () => {
  const [selectedPool, setSelectedPool] = useState("Pool A");
  const [finalData, setFinalData] = useState({ 
    round1: [], 
    round2: [], 
    round3: [] 
  });
  const [loading, setLoading] = useState(true);
  const [POOLS, setPOOLS] = useState([]);

  useEffect(() => {
    const l = Number(localStorage.getItem("poolsLength"));
    const pools = Array.from({ length: l }, (_, i) => 
      `Pool ${String.fromCharCode(65 + i)}`
    );
    setPOOLS(pools);
  }, []);

  const getPoolDocument = (poolName) => {
    const poolIndex = POOLS.indexOf(poolName) + 1;
    return `pool${poolIndex}`;
  };

  const processBids = (bidsArray) => {
    const frequency = Array.from({ length: 30 }, (_, i) => ({
      bid: i + 1,
      count: 0
    }));

    bidsArray.forEach(bid => {
      if (typeof bid === 'number' && bid >= 1 && bid <= 30) {
        frequency[bid - 1].count += 1;
      }
    });

    return [
      frequency.slice(0, 5),
      frequency.slice(5, 10),
      frequency.slice(10, 15),
      frequency.slice(15, 20),
      frequency.slice(20, 25),
      frequency.slice(25, 30)
    ];
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const poolDoc = getPoolDocument(selectedPool);
      const poolRef = collection(db, 'IGTS', 'uba', poolDoc);

      const inputDoc = await getDoc(doc(poolRef, 'input'));
      const input = inputDoc.exists() ? inputDoc.data() : {};

      const processRoundData = (round) => {
        const rawData = input[round] || {}; // Handle if round data is missing

        // Correctly access participant bids.  Assumes input is { participantId: [round1bids], ... }
        const bidsForRound = Object.values(rawData).flat().map(bid => Number(bid)).filter(bid => !isNaN(bid));

        return processBids(bidsForRound);
      };

      setFinalData({
        round1: processRoundData("round1"),
        round2: processRoundData("round2"),
        round3: processRoundData("round3")
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error loading data. Please try again.");
      setFinalData({ round1: [], round2: [], round3: [] });
    } finally {
      setLoading(false);
    }
  }, [selectedPool, POOLS]);

  useEffect(() => {
    if (POOLS.length > 0) {
      loadData();
    }
  }, [loadData, POOLS]);

  const renderFrequencyTable = (roundNumber, bidGroups) => (
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
              <TableRow className="bg-purple-100">
                {Array.from({ length: 6 }).flatMap((_, i) => [
                  <TableHead key={`${i}-bid`} className="text-xs text-purple-700 border border-gray-300 text-center w-20">
                    Bid
                  </TableHead>,
                  <TableHead key={`${i}-freq`} className="text-xs text-purple-700 border border-gray-300 text-center w-20">
                    Frequency
                  </TableHead>
                ])}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-purple-50">
                  {bidGroups.flatMap((group, groupIndex) => {
                    const bidData = group[rowIndex] || { bid: "-", count: "-" };
                    return [
                      <TableCell 
                        key={`${groupIndex}-${rowIndex}-bid`}
                        className="text-sm text-center border border-gray-300 p-1 font-medium bg-purple-200"
                      >
                        {bidData.bid}
                      </TableCell>,
                      <TableCell 
                        key={`${groupIndex}-${rowIndex}-freq`}
                        className={`text-sm text-center border border-gray-300 p-1 ${
                          bidData.count > 0 ? 'text-green-600 font-semibold' : 'text-gray-400'
                        }`}
                      >
                        {bidData.count}
                      </TableCell>
                    ];
                  })}
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
        className="absolute inset-0 w-full h-full object-contain opacity-40 pointer-events-none"
      />
      <div className="max-w-[1440px] mx-auto py-8 px-4 relative">
        <h1 className="text-black text-2xl font-bold text-center mb-6">UNIQUE BID AUCTION FREQUENCY</h1>
        
        <div className="flex justify-start mb-6 space-x-3">
          {POOLS.map((pool) => (
            <button
              key={pool}
              className={`text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedPool === pool ? "bg-purple-700 text-white" : "bg-white text-purple-700 hover:bg-purple-300"
              }`}
              onClick={() => setSelectedPool(pool)}
            >
              {pool}
            </button>
          ))}
        </div>

        <div className="relative space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-purple-600">Loading frequency data...</p>
            </div>
          ) : (
            [1, 2, 3].map((roundNumber) => (
              <div key={roundNumber}>
                {renderFrequencyTable(roundNumber, finalData[`round${roundNumber}`])}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UbaFrequencyScreen;