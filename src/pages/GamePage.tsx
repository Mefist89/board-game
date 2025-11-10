import React from 'react';
import ScorePanel from '../components/ScorePanel';
import GameBoard from '../components/GameBoard';
import Question from '../components/Question';
import DiceRoll from '../components/DiceRoll';
import { useGame } from '../context/GameContext';

const GamePage: React.FC = () => {
  const { currentQuestion, screen, totalSquares, position } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-blue-500 p-4">
      <div className="max-w-4xl mx-auto">
        <ScorePanel />
        <GameBoard />
        {screen !== 'finish' && position < totalSquares - 1 && (currentQuestion ? <Question /> : <DiceRoll />)}
      </div>
    </div>
  );
};

export default GamePage;