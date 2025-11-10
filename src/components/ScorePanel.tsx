import React from 'react';
import { Trophy, Dices } from 'lucide-react';
import { useGame } from '../context/GameContext';

const ScorePanel: React.FC = () => {
  const { score, totalRolls, translations, setScreen } = useGame();
  const t = translations[useGame().language];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-500" size={28} />
          <div>
            <p className="text-xs md:text-sm text-gray-600">{t.score}</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{score}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Dices className="text-blue-500" size={28} />
          <div>
            <p className="text-xs md:text-sm text-gray-600">{t.rolls}</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{totalRolls}</p>
          </div>
        </div>
        <button
          onClick={() => setScreen('menu')}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 md:px-6 rounded-lg transition text-sm md:text-base"
        >
          {t.back}
        </button>
      </div>
    </div>
  );
};

export default ScorePanel;