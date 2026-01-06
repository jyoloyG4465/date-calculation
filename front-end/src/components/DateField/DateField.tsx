import { useState } from 'react';
import type { DateValue } from '../../types/date';
import { SettingsMenu } from '../SettingsMenu';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getToday } from '../../utils/dateCalculation';
import styles from './DateField.module.css';

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

interface DateFieldProps {
  type: 'start' | 'end';
  label: string;
  value: DateValue;
  onDateChange: (value: DateValue) => void;
}

export function DateField({ type, label, value, onDateChange }: DateFieldProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { saveDate, loadDate } = useLocalStorage(type);

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

  const handleToday = () => {
    onDateChange(getToday());
    setIsMenuOpen(false);
  };

  const handleSave = () => {
    saveDate(value);
    setIsMenuOpen(false);
  };

  const handleLoad = () => {
    const loaded = loadDate();
    if (loaded) {
      onDateChange(loaded);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.field}>
      <div className={styles.fieldsetWithMenu}>
        <fieldset className={styles.fieldset}>
          <legend>{label}</legend>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.yearInput}
              value={value.year || ''}
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
        </fieldset>
        <SettingsMenu
          type={type}
          isOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen(!isMenuOpen)}
          onClose={() => setIsMenuOpen(false)}
          onToday={type === 'start' ? handleToday : undefined}
          onSave={handleSave}
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
}
