import React from 'react';
import { GameProvider } from './context/GameContext';
import MenuPage from './pages/MenuPage';
import HowToPlayPage from './pages/HowToPlayPage';
import CreatorPage from './pages/CreatorPage';
import ResultsPage from './pages/ResultsPage';
import GamePage from './pages/GamePage';
import { useGame } from './context/GameContext';

const BoardGameContent: React.FC = () => {
  const { screen } = useGame();

 const renderScreen = () => {
    switch (screen) {
      case 'menu':
        return <MenuPage />;
      case 'howto':
        return <HowToPlayPage />;
      case 'creator':
        return <CreatorPage />;
      case 'finish':
        return <ResultsPage />;
      case 'game':
        return <GamePage />;
      default:
        return <MenuPage />;
    }
  };

  return renderScreen();
};

const BoardGame: React.FC = () => {
  return (
    <GameProvider>
      <BoardGameContent />
    </GameProvider>
  );
};

export default BoardGame;