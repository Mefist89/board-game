import React from 'react';
import { useGame } from '../context/GameContext';

const HowToPlayPage: React.FC = () => {
  const { 
    setScreen, 
    translations, 
    language 
  } = useGame();
  
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-8 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t.howToPlay}</h2>
        <div className="space-y-3 mb-8 text-gray-700">
          {t.howToPlayText.map((line: string, idx: number) => (
            <p key={idx} className={line === '' ? 'pt-2' : 'text-lg'}>{line}</p>
          ))}
        </div>
        <button
          onClick={() => setScreen('menu')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl text-xl transition"
        >
          {t.back}
        </button>
      </div>
    </div>
  );
};

export default HowToPlayPage;