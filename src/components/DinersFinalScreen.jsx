// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import IGTSlogo from "@/assets/images/IGTSlogo.png";

// const POOLS = ["Pool A", "Pool B", "Pool C", "Pool D", "Pool E"];

// // Mock Final Data grouped by pools
// const mockFinalData = {
//   "Pool A": [
//     { name: "Sophia", email: "sophia@example.com", round1: 15, round2: 18, round3: 17 },
//     { name: "Liam", email: "liam@example.com", round1: 14, round2: 16, round3: 18 },
//     { name: "Olivia", email: "olivia@example.com", round1: 16, round2: 15, round3: 19 },
//     { name: "Noah", email: "noah@example.com", round1: 17, round2: 14, round3: 16 },
//     { name: "Emma", email: "emma@example.com", round1: 18, round2: 17, round3: 20 },
//     { name: "James", email: "james@example.com", round1: 13, round2: 19, round3: 18 },
//     { name: "Ava", email: "ava@example.com", round1: 19, round2: 18, round3: 16 },
//     { name: "William", email: "william@example.com", round1: 14, round2: 13, round3: 15 },
//     { name: "Charlotte", email: "charlotte@example.com", round1: 20, round2: 19, round3: 21 },
//     { name: "Lucas", email: "lucas@example.com", round1: 15, round2: 14, round3: 17 },
//     { name: "Mia", email: "mia@example.com", round1: 16, round2: 18, round3: 19 },
//     { name: "Ethan", email: "ethan@example.com", round1: 18, round2: 20, round3: 19 },
//   ],
//   "Pool B": [
//     { name: "Amelia", email: "amelia@example.com", round1: 13, round2: 15, round3: 16 },
//     { name: "Logan", email: "logan@example.com", round1: 16, round2: 14, round3: 18 },
//     { name: "Harper", email: "harper@example.com", round1: 17, round2: 18, round3: 15 },
//     { name: "Evelyn", email: "evelyn@example.com", round1: 15, round2: 14, round3: 17 },
//     { name: "Aiden", email: "aiden@example.com", round1: 18, round2: 17, round3: 19 },
//     { name: "Jackson", email: "jackson@example.com", round1: 14, round2: 16, round3: 15 },
//     { name: "Abigail", email: "abigail@example.com", round1: 16, round2: 15, round3: 18 },
//     { name: "Michael", email: "michael@example.com", round1: 15, round2: 14, round3: 17 },
//   ],
//   "Pool C": [],
//   "Pool D": [],
//   "Pool E": [],
// };

// const DinersFinalScreen = () => {
//   const [selectedPool, setSelectedPool] = useState("Pool A");

//   const finalDataWithTotal = (data) =>
//     data.map((player) => ({
//       ...player,
//       total: player.round1 + player.round2 + player.round3,
//     }));

//   const tableHeaders = [
//     { id: "name", label: "Name" },
//     { id: "email", label: "Email" },
//     { id: "round1", label: "Round 1 Score" },
//     { id: "round2", label: "Round 2 Score" },
//     { id: "round3", label: "Round 3 Score" },
//     { id: "total", label: "Total Score" },
//   ];

//   const filteredPlayers = mockFinalData[selectedPool] || [];

//   return (
//     <div className="bg-gradient-to-b from-purple-300 to-purple-500 min-h-screen text-purple-900 relative">
//       <img
//         src={IGTSlogo}
//         alt="Background Logo"
//         className="absolute inset-0 w-full h-full object-contain opacity-40 pointer-events-none"
//       />
//       <div className="max-w-[1440px] mx-auto py-8 px-4 relative">
//         <h1 className="text-black text-2xl font-bold text-center mb-6">
//           DINER'S GAME - FINAL SCORES
//         </h1>
//         {/* Pool Selection Buttons */}
//         <div className="flex justify-start mb-6 space-x-3">
//           {POOLS.map((pool) => (
//             <button
//               key={pool}
//               onClick={() => setSelectedPool(pool)}
//               className={`text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                 selectedPool === pool
//                   ? "bg-purple-700 text-white"
//                   : "bg-white text-purple-700 hover:bg-purple-300"
//               }`}
//             >
//               {pool}
//             </button>
//           ))}
//         </div>
//         {/* Final Scores Table */}
//         <Card className="w-full bg-white backdrop-blur-sm rounded-lg shadow-md mt-6">
//           <CardHeader className="text-center pb-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-lg">
//             <CardTitle className="text-white text-lg font-bold">
//               {selectedPool} - FINAL SCORES
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <Table className="table-auto border-collapse border border-gray-300 w-full">
//                 <TableHeader>
//                   <TableRow className="bg-purple-200">
//                     {tableHeaders.map((header) => (
//                       <TableHead
//                         key={header.id}
//                         className="text-sm text-purple-900 font-semibold border border-gray-300"
//                       >
//                         {header.label}
//                       </TableHead>
//                     ))}
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {finalDataWithTotal(filteredPlayers).map((player, index) => (
//                     <TableRow key={index} className="hover:bg-purple-100">
//                       <TableCell className="text-sm text-gray-700 font-semibold border border-gray-300">
//                         {player.name}
//                       </TableCell>
//                       <TableCell className="text-sm text-gray-700 font-semibold border border-gray-300">
//                         {player.email}
//                       </TableCell>
//                       <TableCell className="text-sm text-center border border-gray-300">
//                         {player.round1}
//                       </TableCell>
//                       <TableCell className="text-sm text-center border border-gray-300">
//                         {player.round2}
//                       </TableCell>
//                       <TableCell className="text-sm text-center border border-gray-300">
//                         {player.round3}
//                       </TableCell>
//                       <TableCell className="text-sm text-center font-bold border border-gray-300">
//                         {player.total}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DinersFinalScreen;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { db } from "../firebaseDB";
// import { doc, getDoc } from "firebase/firestore";
// import IGTSlogo from "@/assets/images/IGTSlogo.png";

// const POOLS = ["Pool A", "Pool B", "Pool C", "Pool D", "Pool E"];

// const DinersFinalScreen = () => {
//   const [selectedPool, setSelectedPool] = useState("Pool A");
//   const [players, setPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const getPoolDocument = (poolName) => {
//     const poolIndex = POOLS.indexOf(poolName) + 1;
//     return `pool${poolIndex}`;
//   };
  
//   const fetchFinalScores = async (pool) => {
//     try {
//       setLoading(true);
//       setError(null);
  
//       const poolDoc = getPoolDocument(pool);
//       console.log(`Fetching data for pool: ${pool}`);
//       console.log(`Resolved Firestore path: IGTS/diners/${poolDoc}/input`);
  
//       const docRef = doc(db, "IGTS", "diners", poolDoc, "input");
//       const userRef = doc(db, "IGTS", "diners", poolDoc, "users");
//       const docSnap = await getDoc(docRef);
//       const userSnap = await getDoc(userRef);
//       if (!docSnap.exists()) {
//         console.warn("No document found in Firestore.");
//         setPlayers([]);
//         setLoading(false);
//         return;
//       }
  
//       const data = docSnap.data();
//       const userData = userSnap.data();
//       console.log("Fetched data:", data);
  
//       // Transforming raw Firestore data into players' structure
//       if (data.round1 && data.round2 && data.round3) {
//         const playersData = data.round1.map((_, index) => ({
//           name: `Player ${index + 1}`,
//           email: userData.users[index],
//           round1: data.round1[index] || 0,
//           round2: data.round2[index] || 0,
//           round3: data.round3[index] || 0,
//           total: (data.round1[index] || 0) + (data.round2[index] || 0) + (data.round3[index] || 0),
//         }));
  
//         setPlayers(playersData);
//       } else {
//         console.warn("Data format incorrect or missing fields.");
//         setPlayers([]);
//       }
//     } catch (err) {
//       console.error("Error fetching final scores:", err);
//       setError("Failed to load final scores.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFinalScores(selectedPool);
//   }, [selectedPool]);

//   return (
//     <div className="bg-gradient-to-b from-purple-300 to-purple-500 min-h-screen text-purple-900 relative">
//       <img
//         src={IGTSlogo}
//         alt="Background Logo"
//         className="absolute inset-0 w-full h-full object-contain opacity-40 pointer-events-none"
//       />
//       <div className="max-w-[1440px] mx-auto py-8 px-4 relative">
//         <h1 className="text-black text-2xl font-bold text-center mb-6">
//           DINER'S GAME - FINAL SCORES
//         </h1>
//         {/* Pool Selection Buttons */}
//         <div className="flex justify-start mb-6 space-x-3">
//           {POOLS.map((pool) => (
//             <button
//               key={pool}
//               onClick={() => setSelectedPool(pool)}
//               className={`text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                 selectedPool === pool
//                   ? "bg-purple-700 text-white"
//                   : "bg-white text-purple-700 hover:bg-purple-300"
//               }`}
//             >
//               {pool}
//             </button>
//           ))}
//         </div>
//         {/* Final Scores Table */}
//         <Card className="w-full bg-white backdrop-blur-sm rounded-lg shadow-md mt-6">
//           <CardHeader className="text-center pb-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-lg">
//             <CardTitle className="text-white text-lg font-bold">
//               {selectedPool} - FINAL SCORES
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <p className="text-center text-gray-700">Loading...</p>
//             ) : error ? (
//               <p className="text-center text-red-600">{error}</p>
//             ) : players.length === 0 ? (
//               <p className="text-center text-gray-700">No data available</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <Table className="table-auto border-collapse border border-gray-300 w-full">
//                   <TableHeader>
//                     <TableRow className="bg-purple-200">
//                       <TableHead className="text-sm text-purple-900 font-semibold border border-gray-300">Name</TableHead>
//                       <TableHead className="text-sm text-purple-900 font-semibold border border-gray-300">Email</TableHead>
//                       <TableHead className="text-sm text-purple-900 font-semibold border border-gray-300">Round 1</TableHead>
//                       <TableHead className="text-sm text-purple-900 font-semibold border border-gray-300">Round 2</TableHead>
//                       <TableHead className="text-sm text-purple-900 font-semibold border border-gray-300">Round 3</TableHead>
//                       <TableHead className="text-sm text-purple-900 font-semibold border border-gray-300">Total</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {players.map((player, index) => (
//                       <TableRow key={index} className="hover:bg-purple-100">
//                         <TableCell className="text-sm border border-gray-300">{player.name}</TableCell>
//                         <TableCell className="text-sm border border-gray-300">{player.email}</TableCell>
//                         <TableCell className="text-sm text-center border border-gray-300">{player.round1}</TableCell>
//                         <TableCell className="text-sm text-center border border-gray-300">{player.round2}</TableCell>
//                         <TableCell className="text-sm text-center border border-gray-300">{player.round3}</TableCell>
//                         <TableCell className="text-sm text-center font-bold border border-gray-300">{player.total}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DinersFinalScreen;


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

const DinersFinalScreen = () => {
  
  const [selectedPool, setSelectedPool] = useState("Pool A");
  const [finalData, setFinalData] = useState([]);
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
    const poolIndex = POOLS.indexOf(poolName) + 1;    // Convert "Pool A" -> "pool1", "Pool B" -> "pool2"
    return `pool${poolIndex}`;
  };
  // Memoized fetch function
  const fetchFinalData = useCallback(async (pool) => {
    try {
      setLoading(true);
      
      // // Batch fetch all documents at once
      // const docRef = doc(db, 'IGTS', 'Diners'); // Ensure correct path
      // const docSnap = getDoc(docRef) // Ensure correct path
      // const collectionsSnapshot = await docSnap.listCollections();

      // for (const subColRef of collectionsSnapshot) {
      //   console.log('Subcollection:', subColRef);
      // }


      const poolDoc = getPoolDocument(pool);
      console.log(`Fetching data for pool: ${pool}`);
      console.log(`Resolved Firestore path: IGTS/diners/${poolDoc}/input`);


      const poolRef = collection(db, 'IGTS', 'diners', poolDoc);
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

  

  return (
    <div className="bg-gradient-to-b from-purple-300 to-purple-500 min-h-screen text-purple-900 relative">
      <img
        src={IGTSlogo}
        alt="Background Logo"
        className="absolute inset-0 w-full h-full object-contain opacity-40 pointer-events-none"
      />
      <div className="max-w-[1440px] mx-auto py-8 px-4 relative">
        <h1 className="text-black text-2xl font-bold text-center mb-6">
          DINER'S GAME - FINAL SCORES
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

export default DinersFinalScreen;