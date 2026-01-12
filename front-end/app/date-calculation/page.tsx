"use client";

import { useState } from "react";
import type { DateValue, CalculateResult } from "@/shared/types/date";
import { DateFieldWithSettings } from "@/shared/components/DateFieldWithSettings";
import { ResultSection } from "@/shared/components/ResultSection";
import { Toast } from "@/shared/components/Toast";
import {
  calculateDateDifference,
  getInitialStartDate,
  getInitialEndDate,
} from "@/shared/components/utils/dateCalculation";
import {
  isValidDate,
  validateYearInput,
  validateDateOrder,
} from "@/shared/components/utils/dateValidation";
import styles from "./DateCalculation.module.css";

export default function DateCalculation() {
  const [startDate, setStartDate] = useState<DateValue>(getInitialStartDate);
  const [endDate, setEndDate] = useState<DateValue>(getInitialEndDate);
  const [calculateResult, setCalculateResult] =
    useState<CalculateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const startYearError = validateYearInput(startDate.year);
    const endYearError = validateYearInput(endDate.year);
    if (startYearError || endYearError) {
      setError(startYearError || endYearError);
      setCalculateResult(null);
      return;
    }

    if (!isValidDate(startDate.year, startDate.month, startDate.day)) {
      setError("開始日が不正な日付です。");
      setCalculateResult(null);
      return;
    }
    if (!isValidDate(endDate.year, endDate.month, endDate.day)) {
      setError("終了日が不正な日付です。");
      setCalculateResult(null);
      return;
    }

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
      setError("開始日は終了日より前の日付にしてください。");
      setCalculateResult(null);
      return;
    }

    const calcResult = calculateDateDifference(startDate, endDate);
    setCalculateResult(calcResult);
    setError(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>日数差計算</h1>
      <div className={styles.inputSection}>
        <DateFieldWithSettings
          type="start"
          label="開始日"
          value={startDate}
          onDateChange={setStartDate}
        />
        <DateFieldWithSettings
          type="end"
          label="終了日"
          value={endDate}
          onDateChange={setEndDate}
        />
        <button
          type="button"
          onClick={handleCalculate}
          className={styles.calculateButton}
        >
          計算
        </button>
      </div>
      <ResultSection result={calculateResult} error={error} />
      <Toast />
    </div>
  );
}
