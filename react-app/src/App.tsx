import { useState } from 'react';
import type { DateValue, CalculationResult } from './types/date';
import { ToastProvider } from './contexts/ToastContext';
import { DateField } from './components/DateField';
import { ResultSection } from './components/ResultSection';
import { InfoSection } from './components/InfoSection';
import { Toast } from './components/Toast';
import {
  calculateDateDifference,
  getInitialStartDate,
  getInitialEndDate,
} from './utils/dateCalculation';
import {
  isValidDate,
  validateYearInput,
  validateDateOrder,
} from './utils/dateValidation';
import styles from './App.module.css';

function DateCalculator() {
  const [startDate, setStartDate] = useState<DateValue>(getInitialStartDate);
  const [endDate, setEndDate] = useState<DateValue>(getInitialEndDate);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    // 年のバリデーション
    const yearError = validateYearInput(startDate.year, endDate.year);
    if (yearError) {
      setError(yearError);
      setResult(null);
      return;
    }

    // 日付の存在チェック
    if (!isValidDate(startDate.year, startDate.month, startDate.day)) {
      setError('開始日が不正な日付です。');
      setResult(null);
      return;
    }
    if (!isValidDate(endDate.year, endDate.month, endDate.day)) {
      setError('終了日が不正な日付です。');
      setResult(null);
      return;
    }

    // 日付の順序チェック
    if (
      !validateDateOrder(
        startDate.year,
        startDate.month,
        startDate.day,
        endDate.year,
        endDate.month,
        endDate.day
      )
    ) {
      setError('開始日は終了日より前の日付にしてください。');
      setResult(null);
      return;
    }

    // 計算実行
    const calcResult = calculateDateDifference(startDate, endDate);
    setResult(calcResult);
    setError(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>日数計算ツール</h1>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}
      >
        <DateField
          type="start"
          label="開始日"
          value={startDate}
          onChange={setStartDate}
        />
        <DateField
          type="end"
          label="終了日"
          value={endDate}
          onChange={setEndDate}
        />
        <button type="submit" className={styles.calculateButton}>
          計算
        </button>
      </form>
      <ResultSection result={result} error={error} />
      <InfoSection />
      <Toast />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <DateCalculator />
    </ToastProvider>
  );
}

export default App;
