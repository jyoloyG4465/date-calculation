import { useState } from 'react';
import type { DateValue } from '../../types/date';
import { DateField } from '../DateField';
import { SettingsMenu } from '../SettingsMenu';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getToday } from '../../utils/dateCalculation';
import styles from './DateFieldWithSettings.module.css';

interface DateFieldWithSettingsProps {
  type: 'start' | 'end';
  label: string;
  value: DateValue;
  onDateChange: (value: DateValue) => void;
}

export function DateFieldWithSettings({
  type,
  label,
  value,
  onDateChange
}: DateFieldWithSettingsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { saveDate, loadDate } = useLocalStorage(type);

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
    <div className={styles.container}>
      <DateField
        label={label}
        value={value}
        onDateChange={onDateChange}
      />
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
  );
}
