// src/components/MainScreen.jsx
import { auth } from '@/firebaseDB';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainScreen = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    auth.authStateReady().then(()=>{
      let l=auth.currentUser.providerData
      let valid=false;
      for (let i = 0; i < l.length; i++) {
        if(l[i].providerId=="password"){
          valid=true;
          break;
        }
      }
      if(auth.currentUser==null||!valid){
        navigate("/login")
      }
    })
  },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 w-full">
      <div className="w-full px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Select Game Type
        </h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-full">
          <button
            onClick={() => navigate('/game/uba')}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
          >
            <h2 className="text-3xl font-bold text-purple-500">UBA Game</h2>
            <p className="text-gray-600 mt-2">Manage UBA game sessions and scores</p>
          </button>
  
          <button
            onClick={() => navigate('/game/diners')}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
          >
            <h2 className="text-3xl font-bold text-purple-500">Diner's Game</h2>
            <p className="text-gray-600 mt-2">Manage Diner's game sessions and scores</p>
          </button>
        </div>
  
        {/* Move the button outside the grid */}
        <div className="mt-8 w-full">
          <button
            onClick={() => navigate('/finalscreen')}
            className="group relative bg-purple-500 text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 py-4 w-full text-center"
          >
            <h2 className="text-3xl font-bold">Final Scores</h2>
            <p className="text-gray-200 mt-2">View final scores and rankings</p>
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default MainScreen;