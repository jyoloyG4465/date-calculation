import { useState, useMemo } from 'react';
import type { DateValue } from '../../types/date';
import { SettingsMenu } from '../SettingsMenu';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getToday } from '../../utils/dateCalculation';
import styles from './DateField.module.css';

interface DateFieldProps {
  type: 'start' | 'end';
  label: string;
  value: DateValue;
  onChange: (value: DateValue) => void;
}

export function DateField({ type, label, value, onChange }: DateFieldProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { save, load } = useLocalStorage(type);

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }, []);

  const days = useMemo(() => {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }, []);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value, 10) || 0;
    onChange({ ...value, year });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value, 10);
    onChange({ ...value, month });
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = parseInt(e.target.value, 10);
    onChange({ ...value, day });
  };

  const handleToday = () => {
    onChange(getToday());
    setIsMenuOpen(false);
  };

  const handleSave = () => {
    save(value);
    setIsMenuOpen(false);
  };

  const handleLoad = () => {
    const loaded = load();
    if (loaded) {
      onChange(loaded);
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
              {months.map((m) => (
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
              {days.map((d) => (
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
