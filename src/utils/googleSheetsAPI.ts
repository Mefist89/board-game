// src/utils/googleSheetsAPI.ts

// ВАЖНО: Использование API-ключа в клиентском JavaScript небезопасно.
// Этот метод может не сработать из-за политик безопасности браузера (CORS)
// и требует, чтобы таблица была общедоступной для записи.
// Рекомендуется использовать Google Apps Script Web App (как было реализовано ранее).

const API_KEY = 'AIzaSyBhm9nNi5C_cP8yraSZL3jdgzSSFJskn8I'; // ЗАМЕНИТЕ НА ВАШ РЕАЛЬНЫЙ API-КЛЮЧ
const SPREADSHEET_ID = '1vZaeb_BxK3ehqAxW3YzvhA7FBG4m6nRlxgbL7Y-0434'; // ЗАМЕНИТЕ НА ID ВАШЕЙ ТАБЛИЦЫ
// Укажите диапазон, например, 'Лист1'!A:C (для столбцов A, B, C на листе "Лист1")
// Или просто 'A:C' если вы используете первый лист по умолчанию.
const RANGE = 'A:C';

interface UserInfo {
  firstName: string;
  lastName: string;
  group: string;
  score: number;
  rolls: number;
}

// Функция для получения последней заполненной строки в столбце A
// Это нужно, чтобы не перезаписывать существующие данные и добавлять новую строку
async function findNextRow(): Promise<number> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:A?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка при получении данных: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    // Возвращаем количество строк + 1
    return (data.values ? data.values.length : 0) + 1;
  } catch (error) {
    console.error('Ошибка при определении следующей строки:', error);
    // Если не удалось определить, возвращаем 1 (первая строка)
    return 1;
  }
}


export const submitUserInfoToGoogleSheets = async (userInfo: UserInfo): Promise<void> => {
  try {
    // Находим следующую строку
    const nextRow = await findNextRow();

    // Формируем диапазон для новой строки (предполагаем столбцы A, B, C, D, E)
    const rowRange = `A${nextRow}:E${nextRow}`;

    // Подготовка данных для отправки
    const values = [[userInfo.firstName, userInfo.lastName, userInfo.group, userInfo.score, userInfo.rolls]];
    const body = {
      values: values
    };

    // URL для Google Sheets API (обновление значений)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${rowRange}?valueInputOption=RAW&key=${API_KEY}`;

    const response = await fetch(url, {
      method: 'PUT', // Используем PUT для вставки значений в конкретный диапазон
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка API: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const result = await response.json();
    console.log('Данные успешно отправлены в Google Sheets:', result);
  } catch (error) {
    console.error('Ошибка при отправке данных в Google Sheets через API:', error);
    throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
  }
};
