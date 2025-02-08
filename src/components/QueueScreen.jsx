import { useState, useEffect, useCallback } from 'react';
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseDB';
import { calculateDinersRoundScores, calculateUBARoundScores } from '@/lib/roundScores';
// import { db } from '@/firebase';
const QueueScreen = ({ gameType }) => {
  const [queue, setQueue] = useState([]);
  const [pools, setPools] = useState({});
  const [history, setHistory] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [started, setStarted] = useState(false)

 

  useEffect(() => {
    const docRef = doc(db, 'IGTS', 'Queue');
    const startedRef = doc(db, 'IGTS', 'started');

    let s=false;
    const unsubscribeStarted = onSnapshot(startedRef, async (docSnap) => {
      if(docSnap){
        setStarted(docSnap.data().started)
        s=docSnap.data().started
        refresh()
      }
    })
    let unsubscribe ;
   
     unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (Array.isArray(data.users)) {
            const emailQueue = data.users.map((email) => ({
              id: email,
              name: email,
              status: 'Not Ready'
            }));
            setQueue(emailQueue);
          } else {
            console.error('Users data is not in expected format.');
            setQueue([]);
          }
        } else {
          console.log('Queue document does not exist.');
          setQueue([]);
        }
      });
      //refresh()
    

    return () => {
      unsubscribe()
      unsubscribeStarted()
    };
  }, []);

  const saveToHistory = useCallback(() => {
    setHistory((prev) => [...prev, { queue: [...queue], pools: JSON.parse(JSON.stringify(pools)) }]);
  }, [queue, pools]);

  const handleUndo = () => {
    if (history.length < 2) return; // Ensure at least two states exist to go back properly
  
    if (window.confirm('Are you sure you want to Undo?')) {
      const previousState = history[history.length - 2]; // Get the second last state
  
      setQueue(previousState.queue);
      setPools(previousState.pools);
  
      // Remove the last two history entries
      setHistory((prev) => prev.slice(0, -2));
    }
  };

  async function refresh(){
    let st=localStorage.getItem("started")
    const gameDocRef = doc(db, 'IGTS', gameType);
    let n=localStorage.getItem("poolsLength")
    let p = { ...pools }
    for(let i=1;i<=n;i++){
      const poolCollectionRef = collection(gameDocRef, `pool${i}`); 
      let snap=await getDocs(poolCollectionRef);
        //let input=snap.docs[2].data()
        //let users=snap.docs[4].data().users
      let r,input,users;
      snap.forEach((d)=>{
        console.log(d.data())
        if(d.data().users){
          users=d.data().users
        }
        if(d.data().round){
          r=d.data().round
        }
        if(!input&&d.data().round1){
          input=d.data()
        }
        //console.log(d.data())
      })
      let syyy=false;
      p[i]={
        players:users.map((user,i)=>{
          let sxxx=true;
          if(gameType=="uba"){
            if(r<4){

              let j=input[`round${r}`][i][0]
              if(j==0){
                sxxx=false;
              }
            }else{
              syyy=true
            }
          }else{
            if(r<4){
              let j=input[`round${r}`][i]
              if(j==-1){
                sxxx=false;
              }
            }else{
              syyy=true
            }

          }
          return{
            id:user,
            status:sxxx,
            name:user,
          }
        }),
        status:syyy,
        round:r
      }
    }
    if(st){
      console.log(p)

      //some updates
      setPools(p)
    }
  }

  
  

  // const handleUndo = () => {
  //   if (history.length > 0 && window.confirm('Are you sure you want to Undo?')) {
  //     const previousState = history[history.length - 1];
  //     setQueue(previousState.queue);
  //     setPools(previousState.pools);
  //     setHistory(prev => prev.slice(0, -1));
  //   }
  // };

  

  const handleStartGame = async () => {
    if (window.confirm('Are you sure you want to start the game?')) {
      try {
        // Iterate over each pool and update the user's pool in Firestore
        const queueRef = doc(db, 'IGTS', 'Queue');
        setDoc(queueRef, { users: [] }); 
        localStorage.setItem("poolsLength",Object.entries(pools).length)
        localStorage.setItem("started",true)
        console.log(pools)

        for (const [poolName, pool] of Object.entries(pools)) {
          for (const player of pool.players) {
            const currentUserEmail = player.id; // Get the email of the player
            if (!currentUserEmail) {
              console.warn(`No email found for player in pool ${poolName}.`);
              continue;
            }
  
            // Reference to the user's document inside 'Users' collection in Firestore
            const poolDocRef = doc(db, 'IGTS', 'Users', 'pool', currentUserEmail); // Using email as doc ID
  
            // Set the pool for the player in Firestore
            await setDoc(poolDocRef, { pool: poolName });
          }
        }
  
        
        // Reference to the game document in Firestore
        const gameDocRef = doc(db, 'IGTS', gameType);
        
        for (const [poolName, pool] of Object.entries(pools)) {
          const poolCollectionRef = collection(gameDocRef, `pool${poolName}`); // Collection for each pool
          
          
          const usersDocRef = doc(poolCollectionRef, 'users'); // Document to store users
          const inputDocRef = doc(poolCollectionRef, 'input'); // Document to store input
          const scoreDocRef = doc(poolCollectionRef, 'score'); // Document to store score
          const detailDocRef = doc(poolCollectionRef, 'details'); // Document to store details
          
          const playerEmails = pool.players.map(player => player.id); // Extract emails
          const numUsers = playerEmails.length; // Get number of users in the pool
          
          // Initialize input data based on game type
          let inputData = {};
          if (gameType === 'diners') {
            inputData = {
              round1: new Array(numUsers).fill(-1),
              round2: new Array(numUsers).fill(-1),
              round3: new Array(numUsers).fill(-1),
            };
            
          } else if (gameType === 'uba') {
            inputData = {
              round1: Object.fromEntries([...Array(numUsers).keys()].map(i => [i, new Array(3).fill(0)])),
              round2: Object.fromEntries([...Array(numUsers).keys()].map(i => [i, new Array(3).fill(0)])),
              round3: Object.fromEntries([...Array(numUsers).keys()].map(i => [i, new Array(3).fill(0)])),
            };
            
          }
          
          // Store users and input data in Firestore
          await setDoc(usersDocRef, { users: playerEmails });
          await setDoc(inputDocRef, inputData);
          await setDoc(detailDocRef, {round: 1, status: false});


          // Once all users' pools are updated, update the game status to "started"
          const startedRef = doc(db, 'IGTS', 'started');
          await updateDoc(startedRef, { started: true });
        }
  
        alert('Game has started, pools assigned, and input initialized!');
      } catch (error) {
        console.error('Error starting the game:', error);
        alert('Failed to start the game. Please try again.');
      }
    }
  };
  
  

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset? All players will return to the waiting queue.')) {
      // Collect all players from the pools and put them back in the queue
      const allPlayersFromPools = Object.values(pools).reduce((acc, pool) => {
        return [...acc, ...pool.players];
      }, []);
  
      // Set the queue with the players from both the existing queue and the players from pools
      setQueue((prevQueue) => [...prevQueue, ...allPlayersFromPools]);
  
      // Reset the pools and history
      setPools({});
      setHistory([]);
    }
  };
  

  const handleEndGame = async () => {
    if (window.confirm('Are you sure you want to end the game?')) { 
      try {
        const startedRef = doc(db, 'IGTS', 'started');
        const gameDocRef = doc(db, 'IGTS', gameType);
        localStorage.removeItem("poolsLength")
        localStorage.removeItem("started")
        await updateDoc(startedRef, { started: false });
        let n=localStorage.getItem("poolsLength")
        let p = { ...pools }
        for(let i=1;i<=n;i++){
          const poolCollectionRef = collection(gameDocRef, `pool${i}`); 
          await updateDoc(poolCollectionRef,{});
        }
        
        console.log("Game ended successfully!"); 

      }catch (error) {
        console.error('Error ending the game:', error);
        alert('Failed to end the game. Please try again.');
      }
    }
  }

        

  const createPool = () => {
    saveToHistory();
  
    // Change the pool name generation to use numbers instead of letters
    let poolName = (Object.keys(pools).length + 1).toString(); // 1, 2, 3, ...
    setPools((prevPools) => ({
      ...prevPools,
      [poolName]: { players: [], status: false,round:1 }
    }));
  };
  

  const toggleSelect = () => {
    setIsSelecting((prev) => !prev);
  };

  const handleSelectPlayer = (playerId) => {
    if (!isSelecting) return;
    setSelectedPlayers((prevSelected) =>
      prevSelected.includes(playerId) ? prevSelected.filter((id) => id !== playerId) : [...prevSelected, playerId]
    );
  };

  const handleDropPlayersToPool = (poolName) => {
    if (selectedPlayers.length === 0) return;

    saveToHistory();

    let selectedFromQueue = queue.filter((player) => selectedPlayers.includes(player.id));
    let selectedFromPools = [];
    let updatedPools = { ...pools };

    Object.keys(updatedPools).forEach((pool) => {
      updatedPools[pool].players = updatedPools[pool].players.filter((player) => {
        if (selectedPlayers.includes(player.id)) {
          selectedFromPools.push(player);
          return false;
        }
        return true;
      });
    });

    let remainingQueue = queue.filter((player) => !selectedPlayers.includes(player.id));

    updatedPools[poolName].players = [...updatedPools[poolName].players, ...selectedFromQueue, ...selectedFromPools];

    setQueue(remainingQueue);
    setPools(updatedPools);
    setSelectedPlayers([]);
    toggleSelect();
  };

  const handleDropPlayersToQueue = () => {
    if (selectedPlayers.length === 0) return;

    saveToHistory();

    let selectedFromPools = [];
    let updatedPools = { ...pools };

    Object.keys(updatedPools).forEach((pool) => {
      updatedPools[pool].players = updatedPools[pool].players.filter((player) => {
        if (selectedPlayers.includes(player.id)) {
          selectedFromPools.push(player);
          return false;
        }
        return true;
      });
    });

    setQueue((prevQueue) => [...prevQueue, ...selectedFromPools]);
    setPools(updatedPools);
    setSelectedPlayers([]);
    toggleSelect();
  };

  // Updated function to allocate players to pools automatically
  const handleAllocatePlayersToPools = () => {
    if (queue.length === 0 || Object.keys(pools).length === 0) {
      alert('No pools available to allocate players.');
      return;
    }

    // Calculate the total available spots across all pools (each pool can hold up to 12 players)
    const totalAvailableSlots = Object.values(pools).reduce((acc, pool) => acc + (12 - pool.players.length), 0);

    // If the number of players exceeds the available spots, don't allocate any players
    if (queue.length > totalAvailableSlots) {
      alert('Not enough space in the current pools to accommodate all players.');
      return;
    }

    saveToHistory();

    let updatedPools = { ...pools };
    let remainingPlayers = [...queue];

    // Loop over pools and assign players without exceeding 12 in each pool
    Object.keys(updatedPools).forEach((poolName) => {
      if (remainingPlayers.length > 0 && updatedPools[poolName].players.length < 12) {
        const poolSize = Math.min(12 - updatedPools[poolName].players.length, remainingPlayers.length);
        updatedPools[poolName].players = [...updatedPools[poolName].players, ...remainingPlayers.slice(0, poolSize)];
        remainingPlayers = remainingPlayers.slice(poolSize);
      }
    });

    // If there are remaining players and no pools can accept more, show an alert
    if (remainingPlayers.length > 0) {
      alert('There are more players left than can be allocated to the current pools.');
    }

    setQueue([]);
    setPools(updatedPools);
    console.log(queue)
      console.log(updatedPools)
  };

  const handleCalculateScore = async (poolName) => {
    let round=pools[poolName].round
    try{ 
      if(gameType==='diners') await calculateDinersRoundScores(round, 'pool'+poolName);
      else await calculateUBARoundScores(round, 'pool'+poolName);
      alert(`Successfully calculated! pool: ${poolName} round: ${round}`);
    }catch{
      alert(`Failurreeeeee! pool: ${poolName} round: ${round}`);
    }
  }
  const handleNextRound = async (poolName) => {
    const detailsDocRef = doc(db, 'IGTS', gameType, "pool"+poolName, 'details');
    const detailsDoc = await getDoc(detailsDocRef);
    let details=detailsDoc.data()
    details.round=round+1;
    if (round === 3) {
        details.status=true;
    }
    await setDoc(detailsDocRef, details);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end space-x-4">
        {!started&&<div className='flex space-x-4'>

        <button 
          onClick={toggleSelect}
          className={`px-4 py-2 rounded-lg transition ${
            isSelecting ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
          } text-white`}
          >
          {isSelecting ? "Cancel Select" : "Select Players"}
        </button>
        {/* <button
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 transition"
          >
          Undo
          </button> */}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
          Reset
        </button>
        <button
          onClick={handleAllocatePlayersToPools}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
          Allocate Players 
        </button>
        <button
        onClick={handleStartGame}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
      Start Game
      </button>
        </div>}
        {started && <div className='flex justify-between w-full'>
            <button
            onClick={refresh}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 transition"
            >
            Refresh
          </button>
            <button
            onClick={handleEndGame}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
            End Game
          </button>
        </div>
        }
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className='flex space-x-2'>

        <h2 className="text-2xl font-bold text-gray-800">Waiting Queue - {gameType?.toUpperCase()} : {queue.length}</h2>
        <button
          onClick={handleDropPlayersToQueue}
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${selectedPlayers.length === 0 ? "hidden" : ""}`}
          >
          Drop Selected Players Here
        </button>
          </div>
        <div className="flex flex-wrap gap-2 bg-gray-50 rounded-lg p-4">
          {queue.map((player) => (
            <span key={player.id} onClick={() => handleSelectPlayer(player.id)}
              className={`px-3 py-1 rounded-full cursor-pointer ${
                selectedPlayers.includes(player.id) ? 'bg-green-400 text-white' : 'bg-blue-100 text-blue-800'
              }`}>
              {player.name}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(pools).map(([poolName, pool]) => (
          <div key={poolName} className="bg-white rounded-lg shadow p-6">
            <div className='flex justify-between'>
            <div className='flex space-x-2'>
            <h3 className="text-xl font-bold text-gray-800">Pool {poolName} : <span> {pool.players.length}</span></h3>
            <button
              onClick={() => handleDropPlayersToPool(poolName)}
              className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${selectedPlayers.length === 0 ? "hidden" : ""}`}
            >
              Drop Selected Players Here
            </button>
            </div>
            {started&&<div>Round:{pool.round}
            </div>}
            {started&&(!pool.status)&&<button
              onClick={()=>handleCalculateScore(poolName)}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
              >
              Calculate Round Score 
            </button>}
            {started&&(!pool.status)&&<button
              onClick={()=>handleNextRound(poolName)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
              Next Round
            </button>}
            {started&&(pool.status)&&<div
              className="px-4 py-2  text-black rounded-lg"
              >
              Ended
            </div>}
                </div>
            <div className="flex flex-wrap gap-2 bg-gray-50 rounded-lg p-4">
              {pool.players.map((player) => (
                <span key={player.id} onClick={() => handleSelectPlayer(player.id)}
                  className={`px-3 py-1 rounded-full cursor-pointer ${
                    selectedPlayers.includes(player.id) ? 'bg-yellow-200 text-black' : ((player.status)?'bg-green-100 text-green-800':'bg-red-100 text-red-800')
                  } `}>
                  {player.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
          onClick={createPool}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create Pool
      </button>
      <br />
      
    </div>
  );
};

export default QueueScreen;
