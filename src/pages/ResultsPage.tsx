import React, { useState } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { useGame } from '../context/GameContext';
import UserInfoForm from '../components/UserInfoForm';
import { submitUserInfoToGoogleSheets } from '../utils/googleSheetsAPI';

const ResultsPage: React.FC = () => {
  const {
    score,
    totalRolls,
    resetGame,
    setScreen,
    translations,
    language
  } = useGame();

  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string>('');
  // Удаляем неиспользуемую переменную detailedResults
  
  const t = translations[language];

  // Удаляем неиспользуемый useEffect для detailedResults

  const handleFormSubmit = async (userInfo: { firstName: string; lastName: string; group: string }) => {
    setLoading(true);
    setError(null);
    setSubmissionStatus('📤 Se trimite și se verifică...');

    try {
          // Отправляем только основные данные
          await submitUserInfoToGoogleSheets({ ...userInfo, score, rolls: totalRolls });
    
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