import { submitUserInfoToGoogleSheets, submitDetailedResultsToGoogleSheets } from './src/utils/googleSheetsAPI';

// Тестовая функция для проверки отправки данных в Google Sheets
const testGoogleSheets = async () => {
  console.log('Начинаем тестирование отправки данных в Google Sheets...');

  try {
    // Тест базовой отправки
    console.log('Тест 1: Отправка базовой информации...');
    await submitUserInfoToGoogleSheets({
      firstName: 'Тест',
      lastName: 'Пользователь',
      group: 'Тестовая группа',
      score: 8,
      rolls: 5
    });
    console.log('✓ Базовая информация успешно отправлена');

    // Тест детальной отправки
    console.log('Тест 2: Отправка детальной информации...');
    await submitDetailedResultsToGoogleSheets({
      firstName: 'Детальный',
      lastName: 'Тест',
      group: 'Тестовая группа 2',
      score: 10,
      totalPossible: 10,
      scoreFormat: '10/10',
      percentage: '100%',
      evaluation: 'EXCELENT! 🏆',
      timestamp: new Date().toLocaleString('ro-RO'),
      detailedVerification: JSON.stringify([
        { task: 1, userAnswer: 'v = 2 + 3t', correctAnswer: 'v = 2 + 3t', isCorrect: true, score: 1 },
        { task: 2, userAnswer: 'v = 1 + 4t', correctAnswer: 'v = 1 + 4t', isCorrect: true, score: 1 },
        { task: 3, userAnswer: 'v = 5 + 2t', correctAnswer: 'v = 5 + 2t', isCorrect: true, score: 1 }
      ]),
      task1Response: 'v = 2 + 3t',
      task1CorrectFunction: 'v = 2 + 3t',
      task1Status: 'CORECT',
      task1Score: 1,
      task2Response: 'v = 1 + 4t',
      task2CorrectFunction: 'v = 1 + 4t',
      task2Status: 'CORECT',
      task2Score: 1,
      task3Response: 'v = 5 + 2t',
      task3CorrectFunction: 'v = 5 + 2t',
      task3Status: 'CORECT',
      task3Score: 1
    });
    console.log('✓ Детальная информация успешно отправлена');

    console.log('Все тесты пройдены успешно!');
  } catch (error) {
    console.error('Ошибка при тестировании:', error);
  }
};

// Запуск теста
testGoogleSheets();