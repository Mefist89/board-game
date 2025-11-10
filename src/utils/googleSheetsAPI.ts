// src/utils/googleSheetsAPI.ts

// Использование Google Apps Script Web App для отправки данных в Google Sheets
// Это более безопасный и надежный способ по сравнению с прямым доступом к Google Sheets API

interface UserInfo {
  firstName: string;
  lastName: string;
  group: string;
  score: number;
  rolls: number;
}

interface DetailedResult {
  firstName: string;
  lastName: string;
  group: string;
  score: number;
  totalPossible: number;
  scoreFormat: string;
  percentage: string;
  evaluation: string;
  timestamp: string;
  detailedVerification: string;
  // Детали для каждого задания
  task1Response: string;
  task1CorrectFunction: string;
  task1Status: string;
  task1Score: number;
  task2Response: string;
  task2CorrectFunction: string;
  task2Status: string;
  task2Score: number;
  task3Response: string;
  task3CorrectFunction: string;
  task3Status: string;
  task3Score: number;
}

// URL для Google Apps Script Web App
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxgWV2eTIBYVa_PQ_WK6geX10cisRJTUFUKX_OwUGrjxzcD_JasuDHhvS7GPvAYW_Jm/exec';

export const submitUserInfoToGoogleSheets = async (userInfo: UserInfo): Promise<void> => {
  try {
    // Подготовка данных для отправки
    const data = {
      nume: userInfo.lastName,
      prenume: userInfo.firstName,
      clasa: userInfo.group,
      scor_numeric: userInfo.score,
      scor_total: 10, // Предполагаем максимальный возможный балл
      scor_format: `${userInfo.score}/10`,
      procent: `${Math.round((userInfo.score / 10) * 100)}%`,
      evaluare: userInfo.score === 10 ? 'EXCELENT! 🏆' : userInfo.score >= 7 ? 'FOARTE BINE! 👍' : userInfo.score >= 5 ? 'BINE, dar mai exersează! 📚' : 'Ai nevoie de mai multă practică! 💪',
      data_ora: new Date().toLocaleString('ro-RO'),
      verificare_detalii: JSON.stringify([]), // Пустой массив деталей, так как это базовая отправка
      grafic1_raspuns: '',
      grafic1_corect_functie: '',
      grafic1_status: '',
      grafic1_punctaj: 0,
      grafic2_raspuns: '',
      grafic2_corect_functie: '',
      grafic2_status: '',
      grafic2_punctaj: 0,
      grafic3_raspuns: '',
      grafic3_corect_functie: '',
      grafic3_status: '',
      grafic3_punctaj: 0
    };

    // Отправка данных в Google Sheets через Google Apps Script
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Важно для Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
    
        // Так как при no-cors не возвращается ответ, предполагаем успех
        console.log('Данные успешно отправлены в Google Sheets через Google Apps Script');
  } catch (error) {
    console.error('Ошибка при отправке данных в Google Sheets через Google Apps Script:', error);
    throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
  }
};

export const submitDetailedResultsToGoogleSheets = async (detailedResult: DetailedResult): Promise<void> => {
  try {
    // Подготовка данных для отправки
    const data = {
      nume: detailedResult.lastName,
      prenume: detailedResult.firstName,
      clasa: detailedResult.group,
      scor_numeric: detailedResult.score,
      scor_total: detailedResult.totalPossible,
      scor_format: detailedResult.scoreFormat,
      procent: detailedResult.percentage,
      evaluare: detailedResult.evaluation,
      data_ora: detailedResult.timestamp,
      verificare_detalii: detailedResult.detailedVerification,
      grafic1_raspuns: detailedResult.task1Response,
      grafic1_corect_functie: detailedResult.task1CorrectFunction,
      grafic1_status: detailedResult.task1Status,
      grafic1_punctaj: detailedResult.task1Score,
      grafic2_raspuns: detailedResult.task2Response,
      grafic2_corect_functie: detailedResult.task2CorrectFunction,
      grafic2_status: detailedResult.task2Status,
      grafic2_punctaj: detailedResult.task2Score,
      grafic3_raspuns: detailedResult.task3Response,
      grafic3_corect_functie: detailedResult.task3CorrectFunction,
      grafic3_status: detailedResult.task3Status,
      grafic3_punctaj: detailedResult.task3Score
    };

    // Отправка данных в Google Sheets через Google Apps Script
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Важно для Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
    
        // Так как при no-cors не возвращается ответ, предполагаем успех
        console.log('Детальные результаты успешно отправлены в Google Sheets через Google Apps Script');
  } catch (error) {
    console.error('Ошибка при отправке детальных результатов в Google Sheets через Google Apps Script:', error);
    throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
  }
};
