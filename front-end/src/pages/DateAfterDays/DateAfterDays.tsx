import { useState } from "react";
import type { DateValue } from "@/types/date";
import { DateField } from "@/shared/components/DateField";
import {
  getToday,
  calculateDateAfterDays,
} from "@/shared/utils/dateCalculation";
import { validateIntegerDaysInput } from "@/shared/utils/dateValidation";
import styles from "./DateAfterDays.module.css";

export function DateAfterDays() {
  const [baseDate, setBaseDate] = useState<DateValue>(getToday);
  const [days, setDays] = useState<string>("1");
  const [resultDate, setResultDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const validationError = validateIntegerDaysInput(days);
    if (validationError) {
      setError(validationError);
      setResultDate(null);
      return;
    }

    setError(null);
    const daysNum = parseInt(days, 10);
    const result = calculateDateAfterDays(baseDate, daysNum);
    setResultDate(result.formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.subTitle}>N日後計算</h1>
      <div className={styles.inputSection}>
        <DateField value={baseDate} onDateChange={setBaseDate} />
        <div className={styles.inputGroup}>
          <span className={styles.inputLabel}>から</span>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.daysInput}
            placeholder="0"
          />
          <span className={styles.inputLabel}>日後</span>
        </div>
        <button
          type="button"
          onClick={handleCalculate}
          className={styles.calculateButton}
        >
          計算
        </button>
      </div>
      <section className={styles.resultSection}>
        <h2>結果</h2>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : resultDate ? (
          <div className={styles.resultBox}>
            <p className={styles.resultDate}>{resultDate}</p>
          </div>
        ) : (
          <p className={styles.placeholder}>計算ボタンを押してください</p>
        )}
      </section>
    </div>
  );
}
