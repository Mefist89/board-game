import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
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
  
  const t = translations[language];

  const handleFormSubmit = async (userInfo: { firstName: string; lastName: string; group: string }) => {
    setLoading(true);
    setError(null);

    try {
      await submitUserInfoToGoogleSheets({ ...userInfo, score, rolls: totalRolls });
      setSuccess(true);
      setShowForm(false);
    } catch (err) {
      setError('Ошибка при отправке данных. Пожалуйста, попробуйте снова.');
      console.error('Ошибка отправки:', err);
    } finally {
      setLoading(false);
    }
 };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-40 to-orange-500 p-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <Trophy size={80} className="mx-auto mb-6 text-yellow-500" />
          <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.finish}</h2>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-6">
            <p className="text-2xl mb-2 text-gray-600">{t.finalScore}:</p>
            <p className="text-5xl font-bold mb-4 text-green-600">{score}</p>
            <p className="text-xl text-gray-600">{t.rolls}: <span className="font-bold text-blue-600">{totalRolls}</span></p>
          </div>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Данные успешно отправлены!
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        {showForm ? (
          <UserInfoForm onSubmit={handleFormSubmit} loading={loading} error={error} />
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <Trophy size={80} className="mx-auto mb-6 text-yellow-500" />
            <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.finish}</h2>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-6">
              <p className="text-2xl mb-2 text-gray-600">{t.finalScore}:</p>
              <p className="text-5xl font-bold mb-4 text-green-600">{score}</p>
              <p className="text-xl text-gray-600">{t.rolls}: <span className="font-bold text-blue-60">{totalRolls}</span></p>
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
        )}
      </div>
    </div>
 );
};

export default ResultsPage;