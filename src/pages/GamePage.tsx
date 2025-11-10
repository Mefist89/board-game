import React, { useEffect } from 'react';
import ScorePanel from '../components/ScorePanel';
import GameBoard from '../components/GameBoard';
import Question from '../components/Question';
import DiceRoll from '../components/DiceRoll';
import { useGame } from '../context/GameContext';

const GamePage: React.FC = () => {
  const { currentQuestion, screen, totalSquares, position } = useGame();

  // Добавляем стили для адаптивности
  useEffect(() => {
    const styles = `
      .square-cell {
        width: 80px;
        height: 70px;
        margin: 0;
        padding: 0;
      }
      .player-circle {
        width: 64px;
        height: 56px;
      }
      .board-grid {
        line-height: 0;
        font-size: 0;
      }
      @media (max-width: 768px) {
        .square-cell {
          width: 60px;
          height: 52px;
        }
        .player-circle {
          width: 48px;
          height: 42px;
        }
      }
      @media (max-width: 480px) {
        .square-cell {
          width: 45px;
          height: 40px;
          border-width: 2px;
          border-radius: 6px;
        }
        .player-circle {
          width: 36px;
          height: 32px;
        }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

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