import { describe, test, expect } from "vitest";
import {
  calculateDateDifference,
  getToday,
  getInitialStartDate,
  getInitialEndDate,
} from "./dateCalculation";

describe("calculateDateDifference", () => {
  test("同日の差は0日", () => {
    const result = calculateDateDifference(
      { year: 2025, month: 1, day: 1 },
      { year: 2025, month: 1, day: 1 }
    );
    expect(result.diffDays).toBe(0);
    expect(result.diffWeeks).toBe(0);
    expect(result.remainingWeekDays).toBe(0);
    expect(result.diffMonths).toBe(0);
    expect(result.remainingMonthDays).toBe(0);
  });

  test("1週間の差", () => {
    const result = calculateDateDifference(
      { year: 2025, month: 1, day: 1 },
      { year: 2025, month: 1, day: 8 }
    );
    expect(result.diffDays).toBe(7);
    expect(result.diffWeeks).toBe(1);
    expect(result.remainingWeekDays).toBe(0);
  });

  test("10日間の差", () => {
    const result = calculateDateDifference(
      { year: 2025, month: 1, day: 1 },
      { year: 2025, month: 1, day: 11 }
    );
    expect(result.diffDays).toBe(10);
    expect(result.diffWeeks).toBe(1);
    expect(result.remainingWeekDays).toBe(3);
  });

  test("1ヶ月の差", () => {
    const result = calculateDateDifference(
      { year: 2025, month: 1, day: 15 },
      { year: 2025, month: 2, day: 15 }
    );
    expect(result.diffMonths).toBe(1);
    expect(result.remainingMonthDays).toBe(0);
  });

  test("月またぎの計算", () => {
    const result = calculateDateDifference(
      { year: 2025, month: 1, day: 15 },
      { year: 2025, month: 2, day: 20 }
    );
    expect(result.diffMonths).toBe(1);
    expect(result.remainingMonthDays).toBe(5);
  });

  test("年またぎの計算", () => {
    const result = calculateDateDifference(
      { year: 2024, month: 12, day: 1 },
      { year: 2025, month: 1, day: 1 }
    );
    expect(result.diffDays).toBe(31);
    expect(result.diffMonths).toBe(1);
    expect(result.remainingMonthDays).toBe(0);
  });

  test("年またぎの計算（終了日の日付が開始日より小さい）", () => {
    const result = calculateDateDifference(
      { year: 2025, month: 12, day: 21 },
      { year: 2026, month: 5, day: 1 }
    );
    expect(result.diffDays).toBe(131);
    expect(result.diffMonths).toBe(4);
    expect(result.remainingMonthDays).toBe(10);
  });

  test("月末計算2", () => {
    const result = calculateDateDifference(
      { year: 2026, month: 2, day: 28 },
      { year: 2026, month: 3, day: 1 }
    );
    expect(result.diffDays).toBe(1);
    expect(result.diffMonths).toBe(0);
    expect(result.remainingMonthDays).toBe(1);
  });
});

test("うるう年の計算", () => {
  const result = calculateDateDifference(
    { year: 2028, month: 1, day: 1 },
    { year: 2028, month: 3, day: 1 }
  );
  expect(result.diffDays).toBe(60);
  expect(result.diffMonths).toBe(2);
  expect(result.remainingMonthDays).toBe(0);
});

test("うるう年の計算（終了日の日付が開始日より小さい）", () => {
  const result = calculateDateDifference(
    { year: 2028, month: 1, day: 31 },
    { year: 2028, month: 3, day: 1 }
  );
  expect(result.diffDays).toBe(30);
  expect(result.diffMonths).toBe(1);
  expect(result.remainingMonthDays).toBe(1);
});

test("うるう年の計算（年またぎ）", () => {
  const result = calculateDateDifference(
    { year: 2027, month: 12, day: 21 },
    { year: 2028, month: 3, day: 1 }
  );
  expect(result.diffDays).toBe(71);
  expect(result.diffMonths).toBe(2);
  expect(result.remainingMonthDays).toBe(9);
});

describe("getToday", () => {
  test("今日の日付を返す", () => {
    const today = getToday();
    const now = new Date();
    expect(today.year).toBe(now.getFullYear());
    expect(today.month).toBe(now.getMonth() + 1);
    expect(today.day).toBe(now.getDate());
  });
});

describe("getInitialStartDate", () => {
  test("今日の日付を返す", () => {
    const start = getInitialStartDate();
    const now = new Date();
    expect(start.year).toBe(now.getFullYear());
    expect(start.month).toBe(now.getMonth() + 1);
    expect(start.day).toBe(now.getDate());
  });
});

describe("getInitialEndDate", () => {
  test("翌月の日付を返す", () => {
    const end = getInitialEndDate();
    const now = new Date();
    const currentMonth = now.getMonth() + 1;

    if (currentMonth === 12) {
      expect(end.year).toBe(now.getFullYear() + 1);
      expect(end.month).toBe(1);
    } else {
      expect(end.year).toBe(now.getFullYear());
      expect(end.month).toBe(currentMonth + 1);
    }
  });
});
