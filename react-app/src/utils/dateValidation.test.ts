import { describe, test, expect } from 'vitest';
import { isValidDate, validateYearInput, validateDateOrder } from './dateValidation';

describe('isValidDate', () => {
  test('有効な日付を正しく判定する', () => {
    expect(isValidDate(2025, 1, 15)).toBe(true);
    expect(isValidDate(2025, 12, 31)).toBe(true);
  });

  test('存在しない日付を検出する', () => {
    expect(isValidDate(2025, 2, 30)).toBe(false); // 2月30日は存在しない
    expect(isValidDate(2025, 4, 31)).toBe(false); // 4月31日は存在しない
  });

  test('閏年の2月29日を正しく判定する', () => {
    expect(isValidDate(2024, 2, 29)).toBe(true);  // 閏年
    expect(isValidDate(2025, 2, 29)).toBe(false); // 非閏年
  });
});

describe('validateYearInput', () => {
  test('有効な年はnullを返す', () => {
    expect(validateYearInput(2025, 2025)).toBeNull();
    expect(validateYearInput(1900, 2100)).toBeNull();
  });

  test('1900未満の年はエラーメッセージを返す', () => {
    expect(validateYearInput(1899, 2025)).toBe('1900以上の数値を設定してください。');
    expect(validateYearInput(2025, 1800)).toBe('1900以上の数値を設定してください。');
  });

  test('NaNはエラーメッセージを返す', () => {
    expect(validateYearInput(NaN, 2025)).toBe('年が空欄になっているか、数字ではありません。');
  });
});

describe('validateDateOrder', () => {
  test('開始日が終了日より前ならtrueを返す', () => {
    expect(validateDateOrder(2025, 1, 1, 2025, 12, 31)).toBe(true);
  });

  test('開始日と終了日が同じならtrueを返す', () => {
    expect(validateDateOrder(2025, 6, 15, 2025, 6, 15)).toBe(true);
  });

  test('開始日が終了日より後ならfalseを返す', () => {
    expect(validateDateOrder(2025, 12, 31, 2025, 1, 1)).toBe(false);
  });
});
