import {
  getToday,
  getInitialStartDate,
  getInitialEndDate,
  calculateDateDifference,
  calculateDateAfterDays,
} from "./dateCalculation";

describe("dateCalculation", () => {
  describe("getToday", () => {
    it("今日の日付を正しく返す", () => {
      const today = new Date();
      const result = getToday();

      expect(result.year).toBe(today.getFullYear());
      expect(result.month).toBe(today.getMonth() + 1);
      expect(result.day).toBe(today.getDate());
    });
  });

  describe("getInitialStartDate", () => {
    it("今日の日付を返す", () => {
      const today = getToday();
      const result = getInitialStartDate();

      expect(result).toEqual(today);
    });
  });

  describe("getInitialEndDate", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    function mockDate(year: number, month: number, day: number) {
      jest.setSystemTime(new Date(year, month - 1, day));
    }

    it("1/15 → 2/15（通常ケース）", () => {
      mockDate(2024, 1, 15);
      const result = getInitialEndDate();

      expect(result).toEqual({ year: 2024, month: 2, day: 15 });
    });

    it("12/15 → 翌年1/15（年またぎ）", () => {
      mockDate(2024, 12, 15);
      const result = getInitialEndDate();

      expect(result).toEqual({ year: 2025, month: 1, day: 15 });
    });

    it("1/31 → 2/29 or 2/28（月末問題：2月には31日がない）", () => {
      mockDate(2024, 1, 31);
      const result = getInitialEndDate();

      expect(result.year).toBe(2024);
      expect(result.month).toBe(2);
      expect(result.day).toBeLessThanOrEqual(29);
    });

    it("1/30 → 2/29 or 2/28（月末問題：2月には30日がない）", () => {
      mockDate(2024, 1, 30);
      const result = getInitialEndDate();

      expect(result.year).toBe(2024);
      expect(result.month).toBe(2);
      expect(result.day).toBeLessThanOrEqual(29);
    });

    it("1/29 → 2/29（うるう年）", () => {
      mockDate(2024, 1, 29);
      const result = getInitialEndDate();

      expect(result.year).toBe(2024);
      expect(result.month).toBe(2);
      expect(result.day).toBeLessThanOrEqual(29);
    });

    it("1/29 → 2/28（平年）", () => {
      mockDate(2025, 1, 29);
      const result = getInitialEndDate();

      expect(result.year).toBe(2025);
      expect(result.month).toBe(2);
      expect(result.day).toBeLessThanOrEqual(28);
    });

    it("3/31 → 4/30（4月には31日がない）", () => {
      mockDate(2024, 3, 31);
      const result = getInitialEndDate();

      expect(result.year).toBe(2024);
      expect(result.month).toBe(4);
      expect(result.day).toBeLessThanOrEqual(30);
    });

    it("5/31 → 6/30（6月には31日がない）", () => {
      mockDate(2024, 5, 31);
      const result = getInitialEndDate();

      expect(result.year).toBe(2024);
      expect(result.month).toBe(6);
      expect(result.day).toBeLessThanOrEqual(30);
    });

    it("8/31 → 9/30（9月には31日がない）", () => {
      mockDate(2024, 8, 31);
      const result = getInitialEndDate();

      expect(result.year).toBe(2024);
      expect(result.month).toBe(9);
      expect(result.day).toBeLessThanOrEqual(30);
    });

    it("10/31 → 11/30（11月には31日がない）", () => {
      mockDate(2024, 10, 31);
      const result = getInitialEndDate();

      expect(result.year).toBe(2024);
      expect(result.month).toBe(11);
      expect(result.day).toBeLessThanOrEqual(30);
    });
  });

  describe("calculateDateDifference", () => {
    it("同じ日付の差は0", () => {
      const result = calculateDateDifference(
        { year: 2024, month: 1, day: 15 },
        { year: 2024, month: 1, day: 15 }
      );

      expect(result.diffDays).toBe(0);
      expect(result.diffWeeks).toBe(0);
      expect(result.diffMonths).toBe(0);
    });

    it("1週間後", () => {
      const result = calculateDateDifference(
        { year: 2024, month: 1, day: 1 },
        { year: 2024, month: 1, day: 8 }
      );

      expect(result.diffDays).toBe(7);
      expect(result.diffWeeks).toBe(1);
      expect(result.remainingWeekDays).toBe(0);
    });

    it("1ヶ月後（同日）", () => {
      const result = calculateDateDifference(
        { year: 2024, month: 1, day: 15 },
        { year: 2024, month: 2, day: 15 }
      );

      expect(result.diffMonths).toBe(1);
      expect(result.remainingMonthDays).toBe(0);
    });

    it("月末から翌月末への計算", () => {
      const result = calculateDateDifference(
        { year: 2024, month: 1, day: 31 },
        { year: 2024, month: 2, day: 29 }
      );

      expect(result.diffMonths).toBe(1);
      expect(result.remainingMonthDays).toBe(0);
    });

    it("年またぎの計算（終了日の日付が開始日より小さい）", () => {
      const result = calculateDateDifference(
        { year: 2024, month: 11, day: 20 },
        { year: 2025, month: 1, day: 10 }
      );

      expect(result.diffMonths).toBe(1);
      expect(result.remainingMonthDays).toBe(21);
    });

    it("年またぎの計算（12月から1月）", () => {
      const result = calculateDateDifference(
        { year: 2024, month: 12, day: 15 },
        { year: 2025, month: 1, day: 15 }
      );

      expect(result.diffMonths).toBe(1);
      expect(result.remainingMonthDays).toBe(0);
      expect(result.diffDays).toBe(31);
    });

    it("うるう年の2月29日を含む計算", () => {
      const result = calculateDateDifference(
        { year: 2024, month: 2, day: 28 },
        { year: 2024, month: 3, day: 1 }
      );

      expect(result.diffDays).toBe(2); // 2/28 → 2/29 → 3/1
    });

    it("うるう年をまたぐ計算", () => {
      const result = calculateDateDifference(
        { year: 2024, month: 2, day: 29 },
        { year: 2025, month: 2, day: 28 }
      );

      expect(result.diffDays).toBe(365);
      expect(result.diffMonths).toBe(12);
    });

    it("平年の2月28日から3月1日", () => {
      const result = calculateDateDifference(
        { year: 2025, month: 2, day: 28 },
        { year: 2025, month: 3, day: 1 }
      );

      expect(result.diffDays).toBe(1);
    });

    it("複数年にまたがる計算", () => {
      const result = calculateDateDifference(
        { year: 2020, month: 6, day: 15 },
        { year: 2024, month: 6, day: 15 }
      );

      expect(result.diffMonths).toBe(48);
      expect(result.diffDays).toBe(1461); // うるう年1回含む
    });
  });

  describe("calculateDateAfterDays", () => {
    it("0日後は同じ日付", () => {
      const result = calculateDateAfterDays(
        { year: 2024, month: 1, day: 15 },
        0
      );

      expect(result.year).toBe(2024);
      expect(result.month).toBe(1);
      expect(result.day).toBe(15);
    });

    it("7日後", () => {
      const result = calculateDateAfterDays(
        { year: 2024, month: 1, day: 1 },
        7
      );

      expect(result.year).toBe(2024);
      expect(result.month).toBe(1);
      expect(result.day).toBe(8);
    });

    it("月をまたぐ計算", () => {
      const result = calculateDateAfterDays(
        { year: 2024, month: 1, day: 30 },
        5
      );

      expect(result.year).toBe(2024);
      expect(result.month).toBe(2);
      expect(result.day).toBe(4);
    });

    it("年をまたぐ計算", () => {
      const result = calculateDateAfterDays(
        { year: 2024, month: 12, day: 30 },
        5
      );

      expect(result.year).toBe(2025);
      expect(result.month).toBe(1);
      expect(result.day).toBe(4);
    });

    it("うるう年の2月28日から1日後", () => {
      const result = calculateDateAfterDays(
        { year: 2024, month: 2, day: 28 },
        1
      );

      expect(result.year).toBe(2024);
      expect(result.month).toBe(2);
      expect(result.day).toBe(29);
    });

    it("うるう年の2月29日から1日後", () => {
      const result = calculateDateAfterDays(
        { year: 2024, month: 2, day: 29 },
        1
      );

      expect(result.year).toBe(2024);
      expect(result.month).toBe(3);
      expect(result.day).toBe(1);
    });

    it("平年の2月28日から1日後", () => {
      const result = calculateDateAfterDays(
        { year: 2025, month: 2, day: 28 },
        1
      );

      expect(result.year).toBe(2025);
      expect(result.month).toBe(3);
      expect(result.day).toBe(1);
    });

    it("うるう年の2月28日から365日後", () => {
      const result = calculateDateAfterDays(
        { year: 2024, month: 2, day: 28 },
        365
      );

      // 2024年はうるう年なので366日あるが、365日後は2025/2/27
      expect(result.year).toBe(2025);
      expect(result.month).toBe(2);
      expect(result.day).toBe(27);
    });

    it("マイナス日数（過去への計算）", () => {
      const result = calculateDateAfterDays(
        { year: 2024, month: 3, day: 1 },
        -1
      );

      expect(result.year).toBe(2024);
      expect(result.month).toBe(2);
      expect(result.day).toBe(29); // うるう年なので29日
    });

    it("大きな日数（1000日後）", () => {
      const result = calculateDateAfterDays(
        { year: 2024, month: 1, day: 1 },
        1000
      );

      expect(result.year).toBe(2026);
      expect(result.month).toBe(9);
      expect(result.day).toBe(27);
    });
  });
});
