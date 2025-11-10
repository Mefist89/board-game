import React from 'react';
import { useGame } from '../context/GameContext';

const CreatorPage: React.FC = () => {
  const { 
    setScreen, 
    translations, 
    language 
  } = useGame();
  
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-8 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t.creator}</h2>
        <p className="text-lg text-gray-700 text-center mb-8">{t.creatorText}</p>
        <button
          onClick={() => setScreen('menu')}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl text-xl transition"
        >
          {t.back}
        </button>
      </div>
    </div>
  );
};

export default CreatorPage;