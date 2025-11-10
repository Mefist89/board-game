import React from 'react';
import { useGame } from '../context/GameContext';

const Question: React.FC = () => {
  const { 
    currentQuestion, 
    selectedAnswer, 
    setSelectedAnswer, 
    showResult, 
    handleAnswer, 
    attempts, 
    translations, 
    language 
  } = useGame();
  
  const t = translations[language];

  if (!currentQuestion) return null;

  return (
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
        {currentQuestion.answers.map((answer: string, idx: number) => (
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
  );
};

export default Question;