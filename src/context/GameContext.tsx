import React, { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import questionsData from '../questions.json';

interface GameContextType {
  screen: string;
  setScreen: Dispatch<SetStateAction<string>>;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  position: number;
  setPosition: Dispatch<SetStateAction<number>>;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  diceValue: number | null;
  setDiceValue: Dispatch<SetStateAction<number | null>>;
  currentQuestion: { q: string; answers: string[]; correct: number } | null;
  setCurrentQuestion: Dispatch<SetStateAction<{ q: string; answers: string[]; correct: number } | null>>;
  attempts: number;
  setAttempts: Dispatch<SetStateAction<number>>;
  selectedAnswer: number | null;
  setSelectedAnswer: Dispatch<SetStateAction<number | null>>;
  showResult: boolean;
  setShowResult: Dispatch<SetStateAction<boolean>>;
  isRolling: boolean;
  setIsRolling: Dispatch<SetStateAction<boolean>>;
  totalRolls: number;
  setTotalRolls: Dispatch<SetStateAction<number>>;
  translations: any;
  colors: string[];
  totalSquares: number;
  questions: Record<string, { q: string; answers: string[]; correct: number }[]>;
  gameHistory: GameHistoryEntry[];
  addToGameHistory: (entry: GameHistoryEntry) => void;
  rollDice: () => void;
  showQuestion: () => void;
  handleAnswer: () => void;
  resetGame: () => void;
}

interface GameHistoryEntry {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  scoreChange: number;
  attempts: number;
  timestamp: Date;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [screen, setScreen] = useState('menu');
  const [language, setLanguage] = useState('ru');
  const [position, setPosition] = useState(0);
  const [score, setScore] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<{ q: string; answers: string[]; correct: number } | null>(null);
  const [attempts, setAttempts] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [totalRolls, setTotalRolls] = useState(0);
  const [gameHistory, setGameHistory] = useState<GameHistoryEntry[]>([]);

  const translations = {
    ru: {
      title: 'BOARD GAME',
      start: 'СТАРТ',
      howToPlay: 'КАК ИГРАТЬ',
      creator: 'СОЗДАТЕЛЬ',
      language: 'ЯЗЫК',
      play: 'ИГРАТЬ',
      back: 'НАЗАД',
      rollDice: 'БРОСИТЬ КУБИК',
      score: 'ОЧКИ',
      rolls: 'ХОДЫ',
      attempt: 'Попытка',
      submit: 'ОТВЕТИТЬ',
      next: 'ДАЛЕЕ',
      correct: 'ПРАВИЛЬНО!',
      wrong: 'НЕПРАВИЛЬНО!',
      finish: 'ФИНИШ!',
      finalScore: 'Итоговый счёт',
      playAgain: 'ИГРАТЬ СНОВА',
      howToPlayText: [
        '• Бросьте кубик и передвигайтесь полю',
        '• Примите вызов - ответьте на вопрос',
        '• Если отвечаете правильно, ходите дальше',
        '• Иначе - назад и бросайте кубик снова',
        '',
        'СИСТЕМА ОЧКОВ:',
        '• 1-я попытка: 100 очков',
        '• 2-я попытка: 50 очков',
        '• 3-я попытка: 25 очков'
      ],
      creatorText: 'Игра создана для обучения математике, химии, биологии, физике, географии и информатике учеников 10-12 классов'
    },
    ro: {
      title: 'BOARD GAME',
      start: 'START',
      howToPlay: 'CUM SĂ JOCI',
      creator: 'CREATOR',
      language: 'LIMBĂ',
      play: 'JOACĂ',
      back: 'ÎNAPOI',
      rollDice: 'ARUNCĂ ZARURILE',
      score: 'PUNCTE',
      rolls: 'ARUNCĂRI',
      attempt: 'Încercare',
      submit: 'TRIMITE',
      next: 'URMĂTORUL',
      correct: 'CORECT!',
      wrong: 'GREȘIT!',
      finish: 'FINAL!',
      finalScore: 'Scor Final',
      playAgain: 'JOACĂ DIN NOU',
      howToPlayText: [
        '• Aruncă zarurile și mișcă-te pe tablă',
        '• Acceptă provocarea - răspunde la întrebare',
        '• Dacă răspunzi corect, mergi mai departe',
        '• Altfel - înapoi și aruncă din nou',
        '',
        'SISTEM DE PUNCTE:',
        '• Prima încercare: 100 puncte',
        '• A doua încercare: 50 puncte',
        '• A treia încercare: 25 punctе'
      ],
      creatorText: 'Joc creat pentru învățarea matematicii, chimiei, biologiei, fizicii, geografiei și informaticii elevilor claselor 10-12'
    }
  };

  const addToGameHistory = (entry: GameHistoryEntry) => {
    setGameHistory(prev => [...prev, entry]);
  };

  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'];
  const totalSquares = 55;

  const questions = questionsData;

  // Game logic functions
 const rollDice = () => {
   // Double-check game state before starting dice roll
   if (isRolling || position >= totalSquares - 1 || screen === 'finish') return; // Prevent rolling if game is finished
   setIsRolling(true);
   setTotalRolls(totalRolls + 1);
   let rolls = 0;
   const rollInterval = setInterval(() => {
     // Additional check during the rolling animation
     if (position >= totalSquares - 1 || screen === 'finish') {
       clearInterval(rollInterval);
       setIsRolling(false);
       return;
     }
     setDiceValue(Math.floor(Math.random() * 6) + 1);
     rolls++;
     if (rolls > 10) {
       clearInterval(rollInterval);
       const finalValue = Math.floor(Math.random() * 6) + 1;
       setDiceValue(finalValue);
       setIsRolling(false);
       setTimeout(() => {
         // Check again if game is still active before showing question
         if (position < totalSquares - 1 && screen !== 'finish') {
           showQuestion();
         }
       }, 300);
     }
   }, 100);
 };

  const showQuestion = () => {
    // Check if game has already been won or is on finish screen
    if (position >= totalSquares - 1 || screen === 'finish') return;
    
    const questionList = questions[language as keyof typeof questions];
    const randomQuestion = questionList[Math.floor(Math.random() * questionList.length)];
    
    // Randomize the answers while keeping track of the correct answer
    const answersWithIndex = randomQuestion.answers.map((answer, index) => ({
      answer,
      originalIndex: index
    }));
    
    // Shuffle the answers
    const shuffledAnswers = [...answersWithIndex].sort(() => Math.random() - 0.5);
    
    // Find the new index of the correct answer after shuffling
    const newCorrectIndex = shuffledAnswers.findIndex(item =>
      item.originalIndex === randomQuestion.correct
    );
    
    const randomizedQuestion = {
      q: randomQuestion.q,
      answers: shuffledAnswers.map(item => item.answer),
      correct: newCorrectIndex
    };
    
    // Double-check game state before setting the question to prevent race conditions
    if (position < totalSquares - 1 && screen !== 'finish') {
      setCurrentQuestion(randomizedQuestion);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleAnswer = () => {
    if (selectedAnswer === null || !currentQuestion || position >= totalSquares - 1 || screen === 'finish') return;
    
    const isCorrect = selectedAnswer === currentQuestion!.correct;
    setShowResult(true);

    if (isCorrect) {
      // On correct answer: move forward by dice value and get points based on attempts
      let points = 0;
      if (attempts === 1) {
        points = 100;
      } else if (attempts === 2) {
        points = 50;
      } else if (attempts === 3) {
        points = 25;
      }
      setScore(score + points);

      addToGameHistory({
        question: currentQuestion.q,
        userAnswer: currentQuestion.answers[selectedAnswer],
        correctAnswer: currentQuestion.answers[currentQuestion.correct],
        isCorrect: true,
        scoreChange: points,
        attempts,
        timestamp: new Date(),
      });
      
      // Calculate the new position after dice roll
      const newPosition = position + (diceValue || 0);
      
      // Check immediately if the player crosses or reaches the last square
      if (newPosition >= totalSquares - 1) {
        // End the game immediately without timeout
        setPosition(totalSquares - 1);
        setCurrentQuestion(null);
        setDiceValue(null);
        setAttempts(1);
        
        // Show congratulatory message and transition after 1 second
        setTimeout(() => {
          setScreen('finish');
        }, 1000); // 1 second delay before transitioning
      } else {
        // Player doesn't reach the end, continue the game normally after delay
        setTimeout(() => {
          setPosition(newPosition);
          setCurrentQuestion(null);
          setDiceValue(null);
          setAttempts(1);
        }, 1500);
      }
    } else {
      // On incorrect answer: check for more attempts
      if (attempts < 3) {
        // Allow another attempt
        setAttempts(attempts + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // No more attempts, stay in the same position
        addToGameHistory({
            question: currentQuestion.q,
            userAnswer: currentQuestion.answers[selectedAnswer],
            correctAnswer: currentQuestion.answers[currentQuestion.correct],
            isCorrect: false,
            scoreChange: 0,
            attempts,
            timestamp: new Date(),
        });
        setTimeout(() => {
          setCurrentQuestion(null);
          setDiceValue(null);
          setAttempts(1);
        }, 1500);
      }
    }
  };

  const resetGame = () => {
    setPosition(0);
    setScore(0);
    setDiceValue(null);
    setCurrentQuestion(null);
    setAttempts(1);
    setSelectedAnswer(null);
    setShowResult(false);
    setTotalRolls(0);
    setScreen('game');
  };

  return (
      <GameContext.Provider
        value={{
          screen,
          setScreen,
          language,
          setLanguage,
          position,
          setPosition,
          score,
          setScore,
          diceValue,
          setDiceValue,
          currentQuestion,
          setCurrentQuestion,
          attempts,
          setAttempts,
          selectedAnswer,
          setSelectedAnswer,
          showResult,
          setShowResult,
          isRolling,
          setIsRolling,
          totalRolls,
          setTotalRolls,
          translations,
          colors,
          totalSquares,
          questions,
          gameHistory,
          addToGameHistory,
          rollDice,
          showQuestion,
          handleAnswer,
          resetGame
        }}
      >
        {children}
      </GameContext.Provider>
    );
  };