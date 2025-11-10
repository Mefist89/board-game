import React, { useState, useEffect } from 'react';
import { Dices, Trophy, Info, User } from 'lucide-react';

const MathBoardGame = () => {
  const [screen, setScreen] = useState('menu');
  const [language, setLanguage] = useState('ru');
  const [position, setPosition] = useState(0);
  const [score, setScore] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [attempts, setAttempts] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [totalRolls, setTotalRolls] = useState(0);

  // Добавляем стили для адаптивности
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

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const translations = {
    ru: {
      title: 'МАТЕМАТИЧЕСКАЯ ИГРА',
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
        '• Бросьте кубик и передвигайтесь по полю',
        '• Примите вызов - ответьте на вопрос',
        '• Если отвечаете правильно, ходите дальше',
        '• Иначе - назад и бросайте кубик снова',
        '',
        'СИСТЕМА ОЧКОВ:',
        '• 1-я попытка: 100 очков',
        '• 2-я попытка: 50 очков',
        '• 3-я попытка: 25 очков'
      ],
      creatorText: 'Игра создана для обучения математике учеников 10-12 классов'
    },
    ro: {
      title: 'JOC MATEMATIC',
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
        '• A treia încercare: 25 puncte'
      ],
      creatorText: 'Joc creat pentru învățarea matematicii elevilor claselor 10-12'
    }
  };

  const t = translations[language];

  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'];
  const totalSquares = 30;

  const questions = {
    ru: [
      {
        q: 'Чему равен sin(π/2)?',
        answers: ['0', '1', '-1', '√2/2'],
        correct: 1
      },
      {
        q: 'Производная функции f(x) = x³?',
        answers: ['x²', '3x²', '3x', 'x³/3'],
        correct: 1
      },
      {
        q: 'Решите уравнение: 2x + 5 = 13',
        answers: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correct: 1
      },
      {
        q: 'Чему равен cos(0)?',
        answers: ['0', '1', '-1', '√3/2'],
        correct: 1
      },
      {
        q: 'Интеграл ∫2x dx = ?',
        answers: ['x', 'x² + C', '2x² + C', 'x²/2 + C'],
        correct: 1
      },
      {
        q: 'Логарифм log₂(8) = ?',
        answers: ['2', '3', '4', '8'],
        correct: 1
      },
      {
        q: 'Чему равно значение √81?',
        answers: ['7', '8', '9', '10'],
        correct: 2
      },
      {
        q: 'Площадь круга с радиусом 5?',
        answers: ['25π', '10π', '5π', '15π'],
        correct: 0
      },
      {
        q: 'Решите: x² = 16',
        answers: ['x = ±2', 'x = ±4', 'x = 4', 'x = 8'],
        correct: 1
      },
      {
        q: 'Чему равен tg(π/4)?',
        answers: ['0', '1', '√3', '√2'],
        correct: 1
      }
    ],
    ro: [
      {
        q: 'Cât este sin(π/2)?',
        answers: ['0', '1', '-1', '√2/2'],
        correct: 1
      },
      {
        q: 'Derivata funcției f(x) = x³?',
        answers: ['x²', '3x²', '3x', 'x³/3'],
        correct: 1
      },
      {
        q: 'Rezolvați ecuația: 2x + 5 = 13',
        answers: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correct: 1
      },
      {
        q: 'Cât este cos(0)?',
        answers: ['0', '1', '-1', '√3/2'],
        correct: 1
      },
      {
        q: 'Integrala ∫2x dx = ?',
        answers: ['x', 'x² + C', '2x² + C', 'x²/2 + C'],
        correct: 1
      },
      {
        q: 'Logaritm log₂(8) = ?',
        answers: ['2', '3', '4', '8'],
        correct: 1
      },
      {
        q: 'Cât este √81?',
        answers: ['7', '8', '9', '10'],
        correct: 2
      },
      {
        q: 'Aria cercului cu raza 5?',
        answers: ['25π', '10π', '5π', '15π'],
        correct: 0
      },
      {
        q: 'Rezolvați: x² = 16',
        answers: ['x = ±2', 'x = ±4', 'x = 4', 'x = 8'],
        correct: 1
      },
      {
        q: 'Cât este tg(π/4)?',
        answers: ['0', '1', '√3', '√2'],
        correct: 1
      }
    ]
  };

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setTotalRolls(totalRolls + 1);
    let rolls = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rolls++;
      if (rolls > 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        setIsRolling(false);
        setTimeout(() => showQuestion(), 300);
      }
    }, 100);
  };

  const showQuestion = () => {
    const questionList = questions[language];
    const randomQuestion = questionList[Math.floor(Math.random() * questionList.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correct;
    setShowResult(true);

    if (isCorrect) {
      const points = attempts === 1 ? 100 : attempts === 2 ? 50 : 25;
      setScore(score + points);
      setTimeout(() => {
        const newPosition = Math.min(position + diceValue, totalSquares - 1);
        setPosition(newPosition);
        setCurrentQuestion(null);
        setDiceValue(null);
        setAttempts(1);
        if (newPosition >= totalSquares - 1) {
          setScreen('finish');
        }
      }, 1500);
    } else {
      setTimeout(() => {
        if (attempts < 3) {
          setAttempts(attempts + 1);
          setShowResult(false);
          setSelectedAnswer(null);
        } else {
          setCurrentQuestion(null);
          setDiceValue(null);
          setAttempts(1);
        }
      }, 1500);
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

  const renderBoard = () => {
    // Определяем путь лабиринта: [x, y] координаты для каждой клетки
    const path = [
      // 5 клеток вправо (START)
      [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
      // 2 вниз
      [6, 2], [6, 3],
      // 4 влево
      [5, 3], [4, 3], [3, 3], [2, 3],
      // 4 вниз
      [2, 4], [2, 5], [2, 6], [2, 7],
      // 2 вправо
      [3, 7], [4, 7],
      // 3 вверх
      [4, 6], [4, 5], [4, 4],
      // 2 вправо
      [5, 4], [6, 4],
      // 3 вниз (ФИНИШ на последней клетке)
      [6, 5], [6, 6], [6, 7]
    ];

    const gridWidth = 9;
    const gridHeight = 9;
    
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

  if (screen === 'menu') {
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
              <p className="text-center text-gray-600 mb-2">{t.language}</p>
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
  }

  if (screen === 'howto') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t.howToPlay}</h2>
          <div className="space-y-3 mb-8 text-gray-700">
            {t.howToPlayText.map((line, idx) => (
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
  }

  if (screen === 'creator') {
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
  }

  if (screen === 'finish') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <Trophy size={80} className="mx-auto mb-6 text-yellow-500" />
          <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.finish}</h2>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-6">
            <p className="text-2xl mb-2 text-gray-600">{t.finalScore}:</p>
            <p className="text-5xl font-bold mb-4 text-green-600">{score}</p>
            <p className="text-xl text-gray-600">{t.rolls}: <span className="font-bold text-blue-600">{totalRolls}</span></p>
          </div>
          <button
            onClick={resetGame}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-xl transition transform hover:scale-105"
          >
            {t.playAgain}
          </button>
          <button
            onClick={() => setScreen('menu')}
            className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition"
          >
            {t.back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-blue-500 p-4">
      <div className="max-w-4xl mx-auto">
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

        {currentQuestion ? (
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8">
            <div className="mb-4 text-center">
              <span className="bg-purple-500 text-white px-3 md:px-4 py-2 rounded-full font-bold text-sm md:text-base">
                {t.attempt} {attempts}/3
              </span>
            </div>
            
            <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-center text-gray-800">
              {currentQuestion.q}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
              {currentQuestion.answers.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => !showResult && setSelectedAnswer(idx)}
                  disabled={showResult}
                  className={`py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-base md:text-lg transition transform hover:scale-105 ${
                    showResult
                      ? idx === currentQuestion.correct
                        ? 'bg-green-500 text-white'
                        : idx === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                      : selectedAnswer === idx
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {answer}
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`text-center text-xl md:text-2xl font-bold mb-4 ${
                selectedAnswer === currentQuestion.correct ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedAnswer === currentQuestion.correct ? t.correct : t.wrong}
              </div>
            )}

            {!showResult && (
              <button
                onClick={handleAnswer}
                disabled={selectedAnswer === null}
                className={`w-full py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-lg md:text-xl transition ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
                }`}
              >
                {t.submit}
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 text-center">
            {diceValue && (
              <div className="mb-4 md:mb-6">
                <div className="inline-block bg-gray-800 text-white text-4xl md:text-6xl font-bold w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg">
                  {diceValue}
                </div>
              </div>
            )}
            
            <button
              onClick={rollDice}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MathBoardGame;