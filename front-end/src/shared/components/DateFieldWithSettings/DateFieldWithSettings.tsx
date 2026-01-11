import { useState } from "react";
import type { DateValue } from "@/types/date";
import { DateFieldWithLabel } from "@/shared/components/DateFieldWithLabel";
import { SettingsMenu } from "@/shared/components/SettingsMenu";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getToday } from "@/shared/utils/dateCalculation";
import styles from "./DateFieldWithSettings.module.css";

interface DateFieldWithSettingsProps {
  type: "start" | "end";
  label: string;
  value: DateValue;
  onDateChange: (value: DateValue) => void;
}

export function DateFieldWithSettings({
  type,
  label,
  value,
  onDateChange,
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
      <DateFieldWithLabel
        label={label}
        value={value}
        onDateChange={onDateChange}
      />
      <SettingsMenu
        isOpen={isMenuOpen}
        onToggleMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onCloseMenuClick={() => setIsMenuOpen(false)}
        onTodayClick={type === "start" ? handleToday : undefined}
        onSaveClick={handleSave}
        onLoadClick={handleLoad}
      />
    </div>
  );
}
