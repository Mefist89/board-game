import React from 'react';
import { Info, User } from 'lucide-react';
import { useGame } from '../context/GameContext';

const MenuPage: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    setScreen, 
    translations 
  } = useGame();
  
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-8 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">{t.title}</h1>
        
        <div className="space-y-4">
          <button
            onClick={() => setScreen('game')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-xl transition transform hover:scale-105"
          >
            {t.start}
          </button>
          
          <button
            onClick={() => setScreen('howto')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl text-xl transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Info size={24} />
            {t.howToPlay}
          </button>
          
          <button
            onClick={() => setScreen('creator')}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-xl text-xl transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <User size={24} />
            {t.creator}
          </button>

          <div className="pt-4">
            <p className="text-center text-gray-60 mb-2">{t.language}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('ru')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition ${
                  language === 'ru' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Русский
              </button>
              <button
                onClick={() => setLanguage('ro')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition ${
                  language === 'ro' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Română
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;