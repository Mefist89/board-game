import React from 'react';
import { Dices } from 'lucide-react';
import { useGame } from '../context/GameContext';

const DiceRoll: React.FC = () => {
  const { 
    diceValue, 
    isRolling, 
    rollDice, 
    currentQuestion, 
    translations, 
    language 
  } = useGame();
  
  const t = translations[language];

  const rollDiceHandler = () => {
    if (isRolling) return;
    rollDice();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 text-center">
      {diceValue && (
        <div className="mb-4 md:mb-6">
          <div className="inline-block bg-gray-800 text-white text-4xl md:text-6xl font-bold w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg">
            {diceValue}
          </div>
        </div>
      )}
      
      {!currentQuestion && (
        <button
          onClick={rollDiceHandler}
          disabled={isRolling}
          className={`py-3 md:py-4 px-6 md:px-8 rounded-xl font-bold text-lg md:text-xl transition transform hover:scale-105 flex items-center gap-3 mx-auto ${
            isRolling
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Dices size={24} />
          {t.rollDice}
        </button>
      )}
    </div>
  );
};

export default DiceRoll;