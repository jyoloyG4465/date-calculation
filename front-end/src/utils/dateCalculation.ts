import type { CalculationResult, DateValue } from "../types/date";

/**
 * 指定した月の末日を取得する
 */
function getLastDayOfMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * 日付が月末かどうかを判定する
 */
function isEndOfMonth(date: Date): boolean {
  const lastDay = getLastDayOfMonth(date.getFullYear(), date.getMonth());
  return date.getDate() === lastDay;
}

/**
 * 開始日からNヶ月後の日付を計算する（月末考慮）
 * @param startDate 開始日
 * @param diffMonths 加算する月数
 * @param preserveEndOfMonth 月末基準で計算するか
 */
function addMonths(
  startDate: Date,
  months: number,
  preserveEndOfMonth: boolean
): Date {
  const result = new Date(startDate);

  // 月を安全に設定するため、一旦1日に設定
  result.setDate(1);
  result.setMonth(startDate.getMonth() + months);

  if (preserveEndOfMonth) {
    // 月末基準：その月の末日に設定
    result.setMonth(result.getMonth() + 1, 0);
  } else {
    // 元の日付を復元
    result.setDate(startDate.getDate());
  }

  return result;
}

/**
 * 2つの日付間の月数差を計算する
 */
function calculateMonthsDifference(
  startDate: Date,
  endDate: Date
): { diffMonths: number; remainingMonthDays: number } {
  const startIsEndOfMonth = isEndOfMonth(startDate);

  // 年月の差から初期月数を計算
  let diffMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  // 開始日からmonthsヶ月後の日付を計算
  let adjustedDate = addMonths(startDate, diffMonths, startIsEndOfMonth);

  // 調整後の日付が終了日を超えていたら1ヶ月戻す
  if (adjustedDate > endDate) {
    diffMonths--;
    adjustedDate = addMonths(startDate, diffMonths, startIsEndOfMonth);
  }

  // 残り日数を計算
  const remainingTime = endDate.getTime() - adjustedDate.getTime();
  const remainingMonthDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  return { diffMonths, remainingMonthDays };
}

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
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 週数差
  const diffWeeks = Math.floor(diffDays / 7);
  const remainingWeekDays = diffDays % 7;

  // 月数差
  const { diffMonths, remainingMonthDays } = calculateMonthsDifference(
    startDate,
    endDate
  );

  return {
    diffDays,
    diffWeeks,
    remainingWeekDays,
    diffMonths,
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
 * 初期の終了日を取得する（翌月同日、12月なら翌年1月）
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
