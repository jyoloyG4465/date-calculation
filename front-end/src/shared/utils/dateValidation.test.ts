import { describe, test, expect } from "vitest";
import {
  isValidDate,
  validateYearInput,
  validateDateOrder,
  validateIntegerDaysInput,
} from "./dateValidation";

describe("isValidDate", () => {
  test("有効な日付を正しく判定する", () => {
    expect(isValidDate(2025, 1, 15)).toBe(true);
    expect(isValidDate(2025, 12, 31)).toBe(true);
  });

  test("存在しない日付を検出する", () => {
    expect(isValidDate(2025, 2, 30)).toBe(false); // 2月30日は存在しない
    expect(isValidDate(2025, 4, 31)).toBe(false); // 4月31日は存在しない
  });

  test("閏年の2月29日を正しく判定する", () => {
    expect(isValidDate(2024, 2, 29)).toBe(true); // 閏年
    expect(isValidDate(2025, 2, 29)).toBe(false); // 非閏年
  });
});

describe("validateYearInput", () => {
  test("有効な年はnullを返す", () => {
    expect(validateYearInput(2025)).toBeNull();
    expect(validateYearInput(1900)).toBeNull();
  });

  test("1900未満の年はエラーメッセージを返す", () => {
    expect(validateYearInput(1899)).toBe("1900以上の数値を設定してください。");
    expect(validateYearInput(1800)).toBe("1900以上の数値を設定してください。");
  });

  test("NaNはエラーメッセージを返す", () => {
    expect(validateYearInput(NaN)).toBe(
      "年が空欄になっているか、数字ではありません。"
    );
  });
});

describe("validateDateOrder", () => {
  test("開始日が終了日より前ならtrueを返す", () => {
    expect(validateDateOrder(2025, 1, 1, 2025, 12, 31)).toBe(true);
  });

  test("開始日と終了日が同じならtrueを返す", () => {
    expect(validateDateOrder(2025, 6, 15, 2025, 6, 15)).toBe(true);
  });

  test("開始日が終了日より後ならfalseを返す", () => {
    expect(validateDateOrder(2025, 12, 31, 2025, 1, 1)).toBe(false);
  });
});

describe("validateIntegerDaysInput", () => {
  test("正の整数はnullを返す", () => {
    expect(validateIntegerDaysInput("1")).toBeNull();
    expect(validateIntegerDaysInput("30")).toBeNull();
    expect(validateIntegerDaysInput("365")).toBeNull();
  });

  test("負の整数はnullを返す", () => {
    expect(validateIntegerDaysInput("-1")).toBeNull();
    expect(validateIntegerDaysInput("-30")).toBeNull();
  });

  test("ゼロはnullを返す", () => {
    expect(validateIntegerDaysInput("0")).toBeNull();
  });

  test("小数はエラーメッセージを返す", () => {
    expect(validateIntegerDaysInput("3.5")).toBe("整数を入力してください");
    expect(validateIntegerDaysInput("1.1")).toBe("整数を入力してください");
    expect(validateIntegerDaysInput("-2.5")).toBe("整数を入力してください");
  });

  test("数値以外はエラーメッセージを返す", () => {
    expect(validateIntegerDaysInput("abc")).toBe("数値を入力してください");
    expect(validateIntegerDaysInput("")).toBe("数値を入力してください");
    expect(validateIntegerDaysInput("１２３")).toBe("数値を入力してください");
  });
});
