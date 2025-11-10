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
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_WHi0KnpczIXPE0XNQB3KWuIj30W5nELd3_R7TZZ3lIjIE0MxGTc7UY4BPQx2Q6hDVg/exec';

export const submitUserInfoToGoogleSheets = async (userInfo: UserInfo): Promise<void> => {
  try {
    // Подготовка данных для отправки
    const data = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      group: userInfo.group,
      score: userInfo.score,
      rolls: userInfo.rolls
    };

    // Отправка данных в Google Sheets через Google Apps Script
    let response;
    let success = false;
    
    try {
      response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      // Проверяем статус ответа
      if (response.ok) {
        success = true;
        console.log('Данные успешно отправлены в Google Sheets через Google Apps Script');
      }
    } catch (error) {
      // If fetch fails (possibly due to CORS), we'll try with no-cors mode
      console.warn('Fetch failed, trying with no-cors mode:', error);
      
      response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Fallback for CORS issues
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      // With no-cors, we assume success since we can't check the response
      success = true;
      console.log('Данные отправлены в Google Sheets через Google Apps Script (проверка ответа невозможна)');
    }
    
    if (!success) {
      throw new Error('Failed to submit data to Google Sheets');
    }
  } catch (error) {
    console.error('Ошибка при отправке данных в Google Sheets через Google Apps Script:', error);
    throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
  }
};

// Удаляем функцию submitDetailedResultsToGoogleSheets, оставляем только простую отправку
