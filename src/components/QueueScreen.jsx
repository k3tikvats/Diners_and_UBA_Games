// src/components/QueueScreen.jsx
import { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const mockQueue = [
  { id: 1, name: "Player 1", status: "Ready" },
  { id: 2, name: "Player 2", status: "Not Ready" },
  { id: 3, name: "Player 3", status: "Disconnected" },
  { id: 4, name: "Player 4", status: "Ready" },
  { id: 5, name: "Player 5", status: "Not Ready" },
  { id: 6, name: "Player 6", status: "Ready" },
  { id: 7, name: "Player 7", status: "Disconnected" },
  { id: 8, name: "Player 8", status: "Ready" },
  { id: 9, name: "Player 9", status: "Not Ready" },
  { id: 10, name: "Player 10", status: "Ready" },
  { id: 11, name: "Player 11", status: "Disconnected" },
  { id: 12, name: "Player 12", status: "Not Ready" },
  { id: 13, name: "Player 13", status: "Ready" },
  { id: 14, name: "Player 14", status: "Ready" },
  { id: 15, name: "Player 15", status: "Disconnected" },
  { id: 16, name: "Player 16", status: "Not Ready" },
  { id: 17, name: "Player 17", status: "Ready" },
  { id: 18, name: "Player 18", status: "Disconnected" },
  { id: 19, name: "Player 19", status: "Not Ready" },
  { id: 20, name: "Player 20", status: "Ready" },
  { id: 21, name: "Player 21", status: "Not Ready" },
  { id: 22, name: "Player 22", status: "Ready" },
  { id: 23, name: "Player 23", status: "Disconnected" },
  { id: 24, name: "Player 24", status: "Ready" },
  { id: 25, name: "Player 25", status: "Not Ready" },
  { id: 26, name: "Player 26", status: "Ready" },
  { id: 27, name: "Player 27", status: "Disconnected" },
  { id: 28, name: "Player 28", status: "Not Ready" },
  { id: 29, name: "Player 29", status: "Ready" },
  { id: 30, name: "Player 30", status: "Disconnected" },
  { id: 31, name: "Player 31", status: "Ready" },
  { id: 32, name: "Player 32", status: "Not Ready" },
  { id: 33, name: "Player 33", status: "Ready" },
  { id: 34, name: "Player 34", status: "Disconnected" },
  { id: 35, name: "Player 35", status: "Ready" },
  { id: 36, name: "Player 36", status: "Not Ready" },
  { id: 37, name: "Player 37", status: "Disconnected" },
  { id: 38, name: "Player 38", status: "Ready" },
  { id: 39, name: "Player 39", status: "Not Ready" },
  { id: 40, name: "Player 40", status: "Ready" },
];

const initialPoolsState = {
  A: { players: [], status: 'Not Started' },
  B: { players: [], status: 'Not Started' },
  C: { players: [], status: 'Not Started' },
  D: { players: [], status: 'Not Started' },
  E: { players: [], status: 'Not Started' }
};

const QueueScreen = ({ gameType }) => {
  const [queue, setQueue] = useState([]);
  const [pools, setPools] = useState(initialPoolsState);
  const [history, setHistory] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const POOL_SIZE = 12;

  // Load state on mount
  useEffect(() => {
    const loadState = () => {
      // Load shared state
      const savedState = localStorage.getItem('gameState');
      if (savedState) {
        const { queue: savedQueue, pools: savedPools, history: savedHistory } = JSON.parse(savedState);
        if (savedQueue) setQueue(savedQueue);
        if (savedPools) setPools(savedPools);
        if (savedHistory) setHistory(savedHistory);
      } else {
        setQueue(mockQueue);
        setPools(initialPoolsState);
      }
    };

    loadState();
    setIsInitialized(true);
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem('gameState', JSON.stringify({
      queue,
      pools,
      history
    }));
  }, [queue, pools, history, isInitialized]);

  const saveToHistory = useCallback(() => {
    setHistory(prev => [...prev, {
      queue: [...queue],
      pools: JSON.parse(JSON.stringify(pools))
    }]);
  }, [queue, pools]);

  const handleUndo = () => {
    if (history.length > 0 && window.confirm('Are you sure you want to Undo?')) {
      const previousState = history[history.length - 1];
      setQueue(previousState.queue);
      setPools(previousState.pools);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset? All players will return to the waiting queue.')) {
      // Get all players from pools
      const allPlayers = Object.values(pools)
        .flatMap(pool => pool.players || []);
      
      // Reset to initial state with all players in queue
      setQueue([...mockQueue]);
      setPools(initialPoolsState);
      setHistory([]);
      
      // Update localStorage
      localStorage.setItem('gameState', JSON.stringify({
        queue: mockQueue,
        pools: initialPoolsState,
        history: []
      }));
    }
  };

  const allotPlayers = () => {
    if (queue.length < POOL_SIZE) return;
  
    saveToHistory();
    let players = [...queue];
    const newPools = { ...pools };
  
    let poolName = 'A';
    while (players.length > 0 && poolName <= 'E') {
      const remainingSlots = POOL_SIZE - newPools[poolName].players.length;
  
      if (remainingSlots > 0) {
        const poolPlayers = players.splice(0, remainingSlots);
        newPools[poolName].players = [...newPools[poolName].players, ...poolPlayers];
        newPools[poolName].status = checkPoolStatus(newPools[poolName], POOL_SIZE);
      }
  
      poolName = String.fromCharCode(poolName.charCodeAt(0) + 1);
    }
  
    setPools(newPools);
    setQueue(players);
  };

  const getColor = (status) => {
    
    switch (status) {
      case 'Ready':
        return 'bg-green-100';
      case 'Not Ready':
        return 'bg-blue-200';
      case 'Disconnected':
        return 'bg-red-100';
      default:
        return 'bg-gray-200';
    }
  };

  const manualReadyPool = (poolName) => {
    const newPools = { ...pools };
    newPools[poolName].status = 'Ready';

    setPools(newPools);
  };

  const checkPoolStatus = (pool, poolsize) => {
    if (pool.status === 'Ready') {
      return 'Ready';
    }
    if (pool.players.length !== poolsize) {
      return 'Not Started';
    }
    return pool.players.every((player) => player.status === 'Ready') ? 'Ready' : 'Not Ready';
  };

  // Select and drop

  const toggleSelect = () => {
    setIsSelecting((prev) => !prev);
  };

  const handleSelectPlayer = (playerId) => {
    if(!isSelecting) return;
    setSelectedPlayers((prevSelected) =>
      prevSelected.includes(playerId) ? prevSelected.filter((id) => id !== playerId) : [...prevSelected, playerId]
    );
  };

  const handleDropPlayersToPool = (poolName) => {
    if (selectedPlayers.length === 0) return;
  
    saveToHistory();
  
    let selectedFromQueue = queue.filter((player) => selectedPlayers.includes(player.id));
    let remainingQueue = queue.filter((player) => !selectedPlayers.includes(player.id));
  
    let selectedFromPools = [];
    let updatedPools = { ...pools };
  
    // Extract selected players from pools
    Object.keys(updatedPools).forEach((pool) => {
      updatedPools[pool].players = updatedPools[pool].players.filter((player) => {
        if (selectedPlayers.includes(player.id)) {
          selectedFromPools.push(player);
          return false; // Remove from the pool
        }
        return true;
      });
      updatedPools[pool].status = checkPoolStatus(updatedPools[pool], POOL_SIZE);
    });
  
    const allSelected = [...selectedFromQueue, ...selectedFromPools];
  
    if (updatedPools[poolName].players.length + allSelected.length <= POOL_SIZE) {
      updatedPools[poolName].players = [...updatedPools[poolName].players, ...allSelected];
      updatedPools[poolName].status = checkPoolStatus(updatedPools[poolName], POOL_SIZE);
      setPools(updatedPools);
      setQueue(remainingQueue);
      setSelectedPlayers([]);
    } else {
      alert(`Pool ${poolName} is full or doesn't have enough space.`);
    }

    toggleSelect();
  };
  
  const handleDropPlayersToQueue = () => {
    if (selectedPlayers.length === 0) return;
  
    saveToHistory();
  
    let selectedFromPools = [];
    let updatedPools = { ...pools };
  
    // Extract selected players from pools
    Object.keys(updatedPools).forEach((pool) => {
      updatedPools[pool].players = updatedPools[pool].players.filter((player) => {
        if (selectedPlayers.includes(player.id)) {
          selectedFromPools.push(player);
          return false; // Remove from the pool
        }
        return true;
      });
      updatedPools[pool].status = checkPoolStatus(updatedPools[pool], POOL_SIZE);
    });
  
    setQueue((prevQueue) => [...prevQueue, ...selectedFromPools]);
    setPools(updatedPools);
    setSelectedPlayers([]);

    toggleSelect();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end space-x-4">
        <button 
          onClick={toggleSelect}
          className={`px-4 py-2 rounded-lg transition ${
            isSelecting
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-600 hover:bg-gray-700"
          } text-white`}
        >
          Select
        </button>
        <button
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          Undo Last Action
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Reset
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Waiting Queue - {gameType?.toUpperCase()}</h2>'
          <button
            onClick={() => handleDropPlayersToQueue()}
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
              selectedPlayers.length === 0 ? "hidden" : ""
            }`}
          >
            Drop Selected Players Here
          </button>
          <button
            onClick={allotPlayers}
            disabled={queue.length < POOL_SIZE}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Allot Players to Pools
          </button>
        </div>

        <div className="flex flex-wrap gap-2 bg-gray-50 rounded-lg p-4">
          {queue.map((player) => (
            <span key={player.id} onClick={() => handleSelectPlayer(player.id)}
            className={`px-3 py-1 rounded-full ${
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
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Pool {poolName}</h3>
                <p className="text-gray-600">Players: {pool.players?.length || 0} / {POOL_SIZE}</p>
              </div>
              <div className="flex items-center ml-auto space-x-4">
                <button
                  onClick={() => handleDropPlayersToPool(poolName)}
                  className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
                    selectedPlayers.length === 0 ? "hidden" : ""
                  }`}
                >
                  Drop Selected Players Here
                </button>
                <span className={`px-3 py-1 rounded-full text-sm bg-${getColor(pool.status)}-100 text-gray-800`}>
                  {pool.status}
                </span>
                {pool.status === 'Not Ready' && (
                  <button onClick={() => manualReadyPool(poolName)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Manual Ready
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 bg-gray-50 rounded-lg p-4">
              {pool.players?.map((player) => (
                <span key={player.id} onClick={() => handleSelectPlayer(player.id)}
                className={`${selectedPlayers.includes(player.id) ? 'bg-green-400 text-white' : `${getColor(player.status)} text-gray-800`} px-3 py-1 rounded-full`}
                >
                  {player.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueueScreen;