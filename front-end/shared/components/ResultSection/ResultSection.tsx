import type { CalculateResult } from "@/shared/types/date";
import styles from "./ResultSection.module.css";

interface ResultSectionProps {
  result: CalculateResult | null;
  error: string | null;
}

export function ResultSection({ result, error }: ResultSectionProps) {
  return (
    <section className={styles.section}>
      <h2>結果</h2>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : result ? (
        <>
          <div className={styles.resultBox}>
            <p className={styles.resultValue}>日数差： {result.diffDays} 日</p>
          </div>
          <div className={styles.resultBox}>
            <p className={styles.resultValue}>
              週数差： {result.diffWeeks} 週と {result.remainingWeekDays} 日
            </p>
          </div>
          <div className={styles.resultBox}>
            <p className={styles.resultValue}>
              月数差： {result.diffMonths} ヶ月と {result.remainingMonthDays} 日
            </p>
          </div>
        </>
      ) : (
        <p className={styles.placeholder}>計算ボタンを押してください</p>
      )}
    </section>
  );
}
