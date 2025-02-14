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


const TABLE_ROWS = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "bid1", label: "Bid 1" },
  { id: "bid2", label: "Bid 2" },
  { id: "bid3", label: "Bid 3" },
  { id: "score", label: "Score" },
];

const UbaScoreScreen = () => {
  const [selectedPool, setSelectedPool] = useState("Pool 0");
  const [finalData, setFinalData] = useState({ round1: [], round2: [], round3: [] });
  const [loading, setLoading] = useState(true);

  const [POOLS, setPOOLS] = useState([])
  useEffect(()=>{
    let l=Number(localStorage.getItem("poolsLength"))
      let p=[]
      for(let i=0;i<l;i++){
        p.push("Pool "+String.fromCharCode(65+i))
      }
      setPOOLS(p)
  },[])

  const getPoolDocument = (poolName) => {
    const poolIndex = POOLS.indexOf(poolName) + 1;
    return `pool${poolIndex}`;
  };

  //Function to fetch data data from firestore
  const fetchFinalData = useCallback(async (pool) => {
    try {
      setLoading(true);

      const poolDoc = getPoolDocument(pool);
      console.log(`Fetching data for pool: ${pool}`);
      console.log(`Resolved Firestore path: IGTS/diners/${poolDoc}/input`);


      const poolRef = collection(db, 'IGTS', 'uba', poolDoc);
      const [inputDoc, scoresDoc, usersDoc] = await Promise.all([
        getDoc(doc(poolRef, 'input')),
        getDoc(doc(poolRef, 'scores')),
        getDoc(doc(poolRef, 'users'))
      ]);
      const users = usersDoc.exists() ? usersDoc.data().users || [] : [];
      const scores = scoresDoc.exists() ? scoresDoc.data() : {};
      const input = inputDoc.exists() ? inputDoc.data() : {};

      const extractRoundData = (round) =>
        users.map((user, i) => ({
          name: `Player ${i + 1}`,
          email: user,
          bid1: input[round]?.[i]?.[0] || 0,
          bid2: input[round]?.[i]?.[1] || 0,
          bid3: input[round]?.[i]?.[2] || 0,
          score: scores[round]?.[i] || 0,
        }));

      setFinalData({
        round1: extractRoundData("round1"),
        round2: extractRoundData("round2"),
        round3: extractRoundData("round3"),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedPool]);

  useEffect(() => {
    fetchFinalData(selectedPool);
  }, [fetchFinalData]);

const renderTable = (roundNumber, players) => (
  <Card className="w-full bg-white backdrop-blur-sm rounded-lg shadow-md mt-6">
    <CardHeader className="text-center pb-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-lg">
      <CardTitle className="text-white text-lg font-bold">ROUND {roundNumber}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        {players.length === 0 ? (
          <p className="text-center text-gray-500 font-semibold py-4">No data available</p>
        ) : (
          <Table className="table-auto border-collapse border border-gray-300 w-full">
            <TableHeader>
              <TableRow className="bg-purple-200">
                <TableHead className="text-sm text-purple-900 font-semibold border border-gray-300"></TableHead>
                {players.map((_, idx) => (
                  <TableHead
                    key={idx}
                    className="text-sm text-purple-900 font-semibold border border-gray-300 text-center"
                    style={{ minWidth: "80px" }}
                  >
                    P{idx + 1}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {TABLE_ROWS.map((row) => (
                <TableRow key={row.id} className="hover:bg-purple-100">
                  <TableCell className="text-sm text-gray-700 font-semibold border border-gray-300">{row.label}</TableCell>
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
        )}
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
        <h1 className="text-black text-2xl font-bold text-center mb-6">UNIQUE BID AUCTION</h1>
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
            <p className="text-center text-white">Loading...</p>
            ) : (
            [1, 2, 3].map((roundNumber) =>
                <div key={roundNumber}>
                    {renderTable(roundNumber, finalData[`round${roundNumber}`])}
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default UbaScoreScreen;
