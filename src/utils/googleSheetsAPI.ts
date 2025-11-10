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

// Оставляем только простую отправку основных полей

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
          scor_total: userInfo.rolls // Используем rolls как total, так как это более логично
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

// Удаляем функцию submitDetailedResultsToGoogleSheets, оставляем только простую отправку
