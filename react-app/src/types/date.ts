export interface DateValue {
  year: number;
  month: number;
  day: number;
}

export interface CalculationResult {
  days: number;
  weeks: number;
  remainingWeekDays: number;
  months: number;
  remainingMonthDays: number;
}

export interface ValidationError {
  type: 'year' | 'date' | 'order';
  message: string;
}
