/**
 * 日付が有効かどうかをチェックする
 */
export function isValidDate(year: number, month: number, day: number): boolean {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/**
 * 半角数字かどうかをチェックする
 */
function isHalfWidthNumeric(value: number): boolean {
  return /^[0-9]+$/.test(String(value));
}

/**
 * 年の入力値をバリデーションする
 */
export function validateYearInput(startYear: number): string | null {
  if (isNaN(startYear)) {
    return "年が空欄になっているか、数字ではありません。";
  }
  if (!isHalfWidthNumeric(startYear) || startYear < 1900) {
    return "1900以上の数値を設定してください。";
  }
  return null;
}

/**
 * 日付の順序をチェックする（開始日 <= 終了日）
 */
export function validateDateOrder(
  startYear: number,
  startMonth: number,
  startDay: number,
  endYear: number,
  endMonth: number,
  endDay: number
): boolean {
  const startDate = new Date(startYear, startMonth - 1, startDay);
  const endDate = new Date(endYear, endMonth - 1, endDay);
  return startDate <= endDate;
}

/**
 * 日数入力のバリデーション
 * @returns エラーメッセージ（正常な場合はnull）
 */
export function validateIntegerDaysInput(value: string): string | null {
  const num = parseFloat(value);

  if (isNaN(num)) {
    return "数値を入力してください";
  }

  if (!Number.isInteger(num)) {
    return "整数を入力してください";
  }

  return null;
}
