import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { db } from '@/firebaseDB';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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

//const POOLS = ["Pool A", "Pool B", "Pool C", "Pool D", "Pool E"];

// Memoized table headers
const TABLE_HEADERS = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "round1", label: "Round 1 Score" },
  { id: "round2", label: "Round 2 Score" },
  { id: "round3", label: "Round 3 Score" },
  { id: "total", label: "Total Score" },
];

const UbaFinalScreen = () => {
  
  const [selectedPool, setSelectedPool] = useState("Pool A");
  const [finalData, setFinalData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [POOLS, setPOOLS] = useState([])
    const [data, setData] = useState(false)
    useEffect(()=>{
      let l=localStorage.getItem("poolsLength")
      if(!l){
        setData(false)
      }else{
        let p=[]
        for(let i=0;i<l;i++){
          p.push("Pool "+String.fromCharCode(65+i))
        }
        setPOOLS(p)
        setData(true)
      }
    },[])

  const getPoolDocument = (poolName) => {
    const poolIndex = POOLS.indexOf(poolName) + 1;    // Convert "Pool A" -> "pool1", "Pool B" -> "pool2"
    return `pool${poolIndex}`;
  };
  // Memoized fetch function
  const fetchFinalData = useCallback(async (pool) => {
    try {
      setLoading(true);
      
      // // Batch fetch all documents at once
      // const docRef = doc(db, 'IGTS', 'uba'); // Ensure correct path
      // const docSnap = getDoc(docRef) // Ensure correct path
      // const collectionsSnapshot = await docSnap.listCollections();

      // for (const subColRef of collectionsSnapshot) {
      //   console.log('Subcollection:', subColRef);
      // }


      const poolDoc = getPoolDocument(pool);
      console.log(`Fetching data for pool: ${pool}`);
      console.log(`Resolved Firestore path: IGTS/diners/${poolDoc}/input`);


      const poolRef = collection(db, 'IGTS', 'uba', poolDoc);
      const [detailsDoc, finalScoresDoc, scoresDoc, usersDoc] = await Promise.all([
        getDoc(doc(poolRef, 'details')),
        getDoc(doc(poolRef, 'finalScores')),
        getDoc(doc(poolRef, 'scores')),
        getDoc(doc(poolRef, 'users'))
      ]);

      const users = usersDoc.exists() ? usersDoc.data().users || [] : [];
      const finalScores = finalScoresDoc.exists() ? finalScoresDoc.data().finalScores || [] : [];
      const scores = scoresDoc.exists() ? scoresDoc.data() : {};

      // Process data in batch
      const playerData = new Array(users.length);
      for (let i = 0; i < users.length; i++) {
        playerData[i] = {
          name: `Player ${i + 1}`,
          email: users[i],
          round1: scores.round1?.[i] || 0,
          round2: scores.round2?.[i] || 0,
          round3: scores.round3?.[i] || 0,
          total: finalScores[i] || 0,
        };
      }

      setFinalData(playerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedPool]);

  useEffect(() => {
    fetchFinalData(selectedPool);
  }, [fetchFinalData]);

  // Memoized table component
  const TableComponent = useMemo(() => (
    finalData.length>0?(
    <Table className="table-auto border-collapse border border-gray-300 w-full">
      <TableHeader>
        <TableRow className="bg-purple-200">
          {TABLE_HEADERS.map(header => (
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
        {finalData.map((player, index) => (
          <TableRow key={index} className="hover:bg-purple-100">
            <TableCell className="text-sm text-gray-700 font-semibold border border-gray-300">
              {player.name}
            </TableCell>
            <TableCell className="text-sm text-gray-700 font-semibold border border-gray-300">
              {player.email}
            </TableCell>
            <TableCell className="text-sm text-center border border-gray-300">
              {player.round1}
            </TableCell>
            <TableCell className="text-sm text-center border border-gray-300">
              {player.round2}
            </TableCell>
            <TableCell className="text-sm text-center border border-gray-300">
              {player.round3}
            </TableCell>
            <TableCell className="text-sm text-center font-bold border border-gray-300">
              {player.total}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ):(
      <div className="text-center py-4">No data available</div>))
    , [finalData]);

    if(!data){
      return <div>Game Not Started Yet</div>
    }
  

  return (
    <div className="bg-gradient-to-b from-purple-300 to-purple-500 min-h-screen text-purple-900 relative">
      <img
        src={IGTSlogo}
        alt="Background Logo"
        className="absolute inset-0 w-full h-full object-contain opacity-40 pointer-events-none"
      />
      <div className="max-w-[1440px] mx-auto py-8 px-4 relative">
        <h1 className="text-black text-2xl font-bold text-center mb-6">
          UNIQUE BID AUCTION - FINAL SCORES
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
        <Card className="w-full bg-white backdrop-blur-sm rounded-lg shadow-md mt-6">
          <CardHeader className="text-center pb-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-lg">
            <CardTitle className="text-white text-lg font-bold">
              {selectedPool.toUpperCase()} - FINAL SCORES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                TableComponent
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UbaFinalScreen;