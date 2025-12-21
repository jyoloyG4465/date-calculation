import type { CalculationResult, DateValue } from "../types/date";

/**
 * 2つの日付間の差を計算する
 */
export function calculateDateDifference(
  start: DateValue,
  end: DateValue
): CalculationResult {
  const startDate = new Date(start.year, start.month - 1, start.day);
  const endDate = new Date(end.year, end.month - 1, end.day);

  // 日数差
  const diffTime = endDate.getTime() - startDate.getTime();
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 週数差
  const weeks = Math.floor(days / 7);
  const remainingWeekDays = days % 7;

  // 月数差
  let months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const adjustedStartDate = new Date(startDate);
  adjustedStartDate.setMonth(startDate.getMonth() + months);

  if (adjustedStartDate > endDate) {
    months--;
    adjustedStartDate.setMonth(startDate.getMonth() + months);
  }

  const remainingTime = endDate.getTime() - adjustedStartDate.getTime();
  const remainingMonthDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  return {
    days,
    weeks,
    remainingWeekDays,
    months,
    remainingMonthDays,
  };
}

/**
 * 今日の日付を取得する
 */
export function getToday(): DateValue {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
}

/**
 * 初期の開始日を取得する（今日）
 */
export function getInitialStartDate(): DateValue {
  return getToday();
}

/**
 * 初期の終了日を取得する（翌月1日、12月なら翌年1月1日）
 */
export function getInitialEndDate(): DateValue {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  if (month === 12) {
    return { year: year + 1, month: 1, day };
  }
  return { year, month: month + 1, day };
}
