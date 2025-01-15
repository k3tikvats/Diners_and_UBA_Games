// src/components/QueueScreen.jsx
import { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const mockQueue = [
    { id: 1, name: "Player 1" },
    { id: 2, name: "Player 2" },
    { id: 3, name: "Player 3" },
    { id: 4, name: "Player 4" },
    { id: 5, name: "Player 5" },
    { id: 6, name: "Player 6" },
    { id: 7, name: "Player 7" },
    { id: 8, name: "Player 8" },
    { id: 9, name: "Player 9" },
    { id: 10, name: "Player 10" },
    { id: 11, name: "Player 11" },
    { id: 12, name: "Player 12" },
    { id: 13, name: "Player 13" },
    { id: 14, name: "Player 14" },
    { id: 15, name: "Player 15" },
    { id: 16, name: "Player 16" },
    { id: 17, name: "Player 17" },
    { id: 18, name: "Player 18" },
    { id: 19, name: "Player 19" },
    { id: 20, name: "Player 20" },
    { id: 21, name: "Player 21" },
    { id: 22, name: "Player 22" },
    { id: 23, name: "Player 23" },
    { id: 24, name: "Player 24" },
    { id: 25, name: "Player 25" },
    { id: 26, name: "Player 26" },
    { id: 27, name: "Player 27" },
    { id: 28, name: "Player 28" },
    { id: 29, name: "Player 29" },
    { id: 30, name: "Player 30" },
    { id: 31, name: "Player 31" },
    { id: 32, name: "Player 32" },
    { id: 33, name: "Player 33" },
    { id: 34, name: "Player 34" },
    { id: 35, name: "Player 35" },
    { id: 36, name: "Player 36" },
    { id: 37, name: "Player 37" },
    { id: 38, name: "Player 38" },
    { id: 39, name: "Player 39" },
    { id: 40, name: "Player 40" }
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
    if (history.length > 0) {
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
    const players = [...queue];
    const newPools = { ...pools };
    
    let poolName = 'A';
    while (players.length >= POOL_SIZE && poolName <= 'E') {
      const poolPlayers = players.splice(0, POOL_SIZE);
      newPools[poolName] = {
        players: poolPlayers,
        status: 'Ready'
      };
      poolName = String.fromCharCode(poolName.charCodeAt(0) + 1);
    }

    setPools(newPools);
    setQueue(players);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    saveToHistory();

    const newQueue = [...queue];
    const newPools = JSON.parse(JSON.stringify(pools));

    // Get the player being moved
    let player;
    if (source.droppableId === 'queue') {
      [player] = newQueue.splice(source.index, 1);
    } else {
      [player] = newPools[source.droppableId].players.splice(source.index, 1);
      newPools[source.droppableId].status = 
        newPools[source.droppableId].players.length === POOL_SIZE ? 'Ready' : 'Not Started';
    }

    // Add player to destination
    if (destination.droppableId === 'queue') {
      newQueue.splice(destination.index, 0, player);
    } else {
      if (!newPools[destination.droppableId].players) {
        newPools[destination.droppableId].players = [];
      }
      newPools[destination.droppableId].players.splice(destination.index, 0, player);
      newPools[destination.droppableId].status = 
        newPools[destination.droppableId].players.length === POOL_SIZE ? 'Ready' : 'Not Started';
    }

    setQueue(newQueue);
    setPools(newPools);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-8">
        {/* Control Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 
                     disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Undo Last Action
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                     transition"
          >
            Reset
          </button>
        </div>

        {/* Waiting Queue Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Waiting Queue - {gameType?.toUpperCase()}
            </h2>
            <button 
              onClick={allotPlayers}
              disabled={queue.length < POOL_SIZE}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
                       disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              Allot Players to Pools
            </button>
          </div>

          <Droppable droppableId="queue" direction="horizontal">
            {(provided, snapshot) => (
              <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-gray-50 rounded-lg p-4 min-h-[60px] ${
                  snapshot.isDraggingOver ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex flex-wrap gap-2">
                  {queue.map((player, index) => (
                    <Draggable 
                      key={`queue-${player.id}`}
                      draggableId={`queue-${player.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-blue-100 text-blue-800 px-3 py-1 rounded-full cursor-move
                                   ${snapshot.isDragging ? 'opacity-50 shadow-lg' : ''}`}
                        >
                          {player.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>

        {/* Pools Section */}
        <div className="space-y-4">
          {Object.entries(pools).map(([poolName, pool]) => (
            <div key={poolName} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Pool {poolName}
                  </h3>
                  <p className="text-gray-600">
                    Players: {pool.players?.length || 0} / {POOL_SIZE}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  pool.status === 'Ready' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {pool.status}
                </span>
              </div>

              <Droppable droppableId={poolName} direction="horizontal">
                {(provided, snapshot) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-gray-50 rounded-lg p-4 min-h-[60px] ${
                      snapshot.isDraggingOver ? 'bg-green-50' : ''
                    }`}
                  >
                    <div className="flex flex-wrap gap-2">
                      {pool.players?.map((player, index) => (
                        <Draggable 
                          key={`pool-${poolName}-${player.id}`}
                          draggableId={`pool-${poolName}-${player.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-gray-100 text-gray-800 px-3 py-1 rounded-full cursor-move
                                       ${snapshot.isDragging ? 'opacity-50 shadow-lg' : ''}`}
                            >
                              {player.name}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default QueueScreen;