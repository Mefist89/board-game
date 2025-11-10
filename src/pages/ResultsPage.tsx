import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { useGame } from '../context/GameContext';
import UserInfoForm from '../components/UserInfoForm';
import { submitUserInfoToGoogleSheets, submitDetailedResultsToGoogleSheets } from '../utils/googleSheetsAPI';

const ResultsPage: React.FC = () => {
  const { 
    score, 
    totalRolls, 
    resetGame, 
    setScreen, 
    translations, 
    language,
    gameHistory
  } = useGame();

  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string>('');
  const [detailedResults, setDetailedResults] = useState<any>(null);
  
  const t = translations[language];

  // Calculate detailed results when game is finished
  useEffect(() => {
    if (score > 0 && totalRolls > 0) {
      // Calculate percentage and evaluation
      const percentage = Math.round((score / 10) * 10); // Assuming max score is 10
      
      let evaluation = '';
      if (percentage === 100) {
        evaluation = 'EXCELENT! 🏆';
      } else if (percentage >= 67) {
        evaluation = 'FOARTE BINE! 👍';
      } else if (percentage >= 34) {
        evaluation = 'BINE, dar mai exersează! 📚';
      } else {
        evaluation = 'Ai nevoie de mai multă practică! 💪';
      }

      // Prepare detailed verification data
      // For now, we'll use a simplified version - in a real implementation, you would have actual answers to compare
      const details = gameHistory.map((entry: any, index: number) => ({
        task: index + 1,
        userAnswer: entry.userAnswer || 'N/A',
        correctAnswer: entry.correctAnswer || 'N/A',
        isCorrect: entry.isCorrect || false,
        score: entry.isCorrect ? 1 : 0
      }));

      setDetailedResults({
        score: score,
        totalPossible: 10,
        scoreFormat: `${score}/10`,
        percentage: `${percentage}%`,
        evaluation: evaluation,
        timestamp: new Date().toLocaleString('ro-RO'),
        detailedVerification: JSON.stringify(details),
        task1Response: details[0] ? details[0].userAnswer : '',
        task1CorrectFunction: details[0] ? details[0].correctAnswer : '',
        task1Status: details[0] ? (details[0].isCorrect ? 'CORECT' : 'INCORECT') : '',
        task1Score: details[0] ? details[0].score : 0,
        task2Response: details[1] ? details[1].userAnswer : '',
        task2CorrectFunction: details[1] ? details[1].correctAnswer : '',
        task2Status: details[1] ? (details[1].isCorrect ? 'CORECT' : 'INCORECT') : '',
        task2Score: details[1] ? details[1].score : 0,
        task3Response: details[2] ? details[2].userAnswer : '',
        task3CorrectFunction: details[2] ? details[2].correctAnswer : '',
        task3Status: details[2] ? (details[2].isCorrect ? 'CORECT' : 'INCORECT') : '',
        task3Score: details[2] ? details[2].score : 0
      });
    }
 }, [score, totalRolls, gameHistory]);

  const handleFormSubmit = async (userInfo: { firstName: string; lastName: string; group: string }) => {
    setLoading(true);
    setError(null);
    setSubmissionStatus('📤 Se trimite și se verifică...');

    try {
      // If we have detailed results, use the detailed submission function
      if (detailedResults) {
        await submitDetailedResultsToGoogleSheets({
          ...detailedResults,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          group: userInfo.group
        });
      } else {
        // Fallback to basic submission
        await submitUserInfoToGoogleSheets({ ...userInfo, score, rolls: totalRolls });
      }

      setSuccess(true);
      setShowForm(false);
      setSubmissionStatus('✅ Rezultatele au fost transmise și verificate cu succes!');
    } catch (err) {
      setError('Ошибка при отправке данных. Пожалуйста, попробуйте снова.');
      setSubmissionStatus('❌ Eroare la transmitere.');
      console.error('Ошибка отправки:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <Trophy size={80} className="mx-auto mb-6 text-yellow-500" />
          <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.finish}</h2>
          <div className="bg-gradient-to-r from-blue-10 to-purple-100 rounded-2xl p-6 mb-6">
            <p className="text-2xl mb-2 text-gray-60">{t.finalScore}:</p>
            <p className="text-5xl font-bold mb-4 text-green-600">{score}</p>
            <p className="text-xl text-gray-600">{t.rolls}: <span className="font-bold text-blue-600">{totalRolls}</span></p>
          </div>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {submissionStatus}
          </div>
          <button
            onClick={resetGame}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-xl transition transform hover:scale-105 flex items-center justify-center"
          >
            <RotateCcw className="mr-2" size={24} />
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-40 to-orange-500 p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        {showForm ? (
          <UserInfoForm onSubmit={handleFormSubmit} loading={loading} error={error} submissionStatus={submissionStatus} />
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <Trophy size={80} className="mx-auto mb-6 text-yellow-500" />
            <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.finish}</h2>
            <div className="bg-gradient-to-r from-blue-10 to-purple-100 rounded-2xl p-6 mb-6">
              <p className="text-2xl mb-2 text-gray-60">{t.finalScore}:</p>
              <p className="text-5xl font-bold mb-4 text-green-600">{score}</p>
              <p className="text-xl text-gray-600">{t.rolls}: <span className="font-bold text-blue-600">{totalRolls}</span></p>
            </div>
            <button
              onClick={resetGame}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-xl transition transform hover:scale-105 flex items-center justify-center"
            >
              <RotateCcw className="mr-2" size={24} />
              {t.playAgain}
            </button>
            <button
              onClick={() => setScreen('menu')}
              className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition"
            >
              {t.back}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;