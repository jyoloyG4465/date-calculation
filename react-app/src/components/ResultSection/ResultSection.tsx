import type { CalculationResult } from '../../types/date';
import styles from './ResultSection.module.css';

interface ResultSectionProps {
  result: CalculationResult | null;
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
          <p className={styles.result}>
            日数差： {result.days} 日です。
          </p>
          <p className={styles.result}>
            週数差： {result.weeks} 週と {result.remainingWeekDays} 日です。
          </p>
          <p className={styles.result}>
            月数差： {result.months} ヶ月と {result.remainingMonthDays} 日です。
          </p>
        </>
      ) : (
        <p className={styles.placeholder}>計算ボタンを押してください</p>
      )}
    </section>
  );
}
