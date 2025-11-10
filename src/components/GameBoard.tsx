import React from 'react';
import { useGame } from '../context/GameContext';

const GameBoard: React.FC = () => {
  const { position, colors } = useGame();

  // Определяем путь лабиринта: [x, y] координаты для каждой клетки
  const path: [number, number][] = [
    // 9 право
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
    // 6 вниз
    [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6],
    // 2 лево
    [7, 6], [6, 6],
    // 4 вверх
    [6, 5], [6, 4], [6, 3], [6, 2],
    // 6 лево
    [5, 2], [4, 2], [3, 2], [2, 2], [1, 2], [0, 2],
    // 2 низ
    [0, 3], [0, 4],
    // 4 право
    [1, 4], [2, 4], [3, 4], [4, 4],
    // 2 низ
    [4, 5], [4, 6],
    // 4 лево
    [3, 6], [2, 6], [1, 6], [0, 6],
    // 2 низ
    [0, 7], [0, 8],
    // 8 право
    [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8]
  ];

  const gridWidth = 9;
  const gridHeight = 9;
  
  const renderBoard = () => {
    const grid = [];
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const pathIndex = path.findIndex(p => p[0] === x && p[1] === y);
        const isPath = pathIndex !== -1;
        const isPlayerHere = pathIndex === position;
        
        if (isPath) {
          grid.push(
            <div
              key={`${x}-${y}`}
              className="relative flex items-center justify-center square-cell"
              style={{
                backgroundColor: colors[pathIndex % colors.length],
                border: '3px solid #000',
                borderRadius: '8px',
                gridColumn: x + 1,
                gridRow: y + 1
              }}
            >
              {pathIndex === 0 && <div className="text-xs font-bold">START</div>}
              {pathIndex === path.length - 1 && <div className="text-2xl">★</div>}
              {isPlayerHere && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="player-circle bg-purple-600 rounded-full border-3 border-white shadow-lg z-10"></div>
                </div>
              )}
            </div>
          );
        }
      }
    }
    return grid;
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex items-center justify-center overflow-x-auto">
        <div className="board-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(9, minmax(45px, 80px))',
          gridTemplateRows: 'repeat(9, minmax(40px, 70px))',
          gap: '0',
          rowGap: '0',
          columnGap: '0',
          minWidth: 'fit-content'
        }}>
          {renderBoard()}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;