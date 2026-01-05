export interface DateValue {
  year: number;
  month: number;
  day: number;
}

export interface CalculateResult {
  diffDays: number;
  diffWeeks: number;
  remainingWeekDays: number;
  diffMonths: number;
  remainingMonthDays: number;
}

export interface ValidationError {
  type: "year" | "date" | "order";
  message: string;
}
