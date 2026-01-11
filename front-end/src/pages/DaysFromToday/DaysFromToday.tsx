import { useState } from "react";
import type { DateValue } from "@/types/date";
import { DateField } from "@/components/DateField";
import { getToday } from "@/utils/dateCalculation";
import styles from "./DaysFromToday.module.css";

export function DaysFromToday() {
  const [baseDate, setBaseDate] = useState<DateValue>(getToday);
  const [days, setDays] = useState<string>("");
  const [resultDate, setResultDate] = useState<string | null>(null);

  const handleCalculate = () => {
    const daysNum = parseInt(days, 10);
    if (isNaN(daysNum)) {
      setResultDate(null);
      return;
    }

    const date = new Date(baseDate.year, baseDate.month - 1, baseDate.day);
    date.setDate(date.getDate() + daysNum);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const weekday = weekdays[date.getDay()];

    setResultDate(`${year}年${month}月${day}日（${weekday}）`);
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
        {resultDate ? (
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
