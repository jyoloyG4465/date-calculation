"use client";

import type { DateValue } from "@/types/date";
import styles from "./DateField.module.css";

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

interface DateFieldProps {
  value: DateValue;
  onDateChange: (value: DateValue) => void;
}

export function DateField({ value, onDateChange }: DateFieldProps) {
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value, 10) || 0;
    onDateChange({ ...value, year });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value, 10);
    onDateChange({ ...value, month });
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = parseInt(e.target.value, 10);
    onDateChange({ ...value, day });
  };

  return (
    <div className={styles.inputGroup}>
      <input
        type="text"
        className={styles.yearInput}
        value={value.year || ""}
        onChange={handleYearChange}
        maxLength={4}
      />
      <span>年</span>
      <select
        className={styles.select}
        value={value.month}
        onChange={handleMonthChange}
      >
        {MONTHS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <span>月</span>
      <select
        className={styles.select}
        value={value.day}
        onChange={handleDayChange}
      >
        {DAYS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      <span>日</span>
    </div>
  );
}
