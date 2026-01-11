import type { DateValue } from "@/types/date";
import { DateField } from "@/components/DateField";
import styles from "./DateFieldWithLabel.module.css";

interface DateFieldWithLabelProps {
  label: string;
  value: DateValue;
  onDateChange: (value: DateValue) => void;
}

export function DateFieldWithLabel({
  label,
  value,
  onDateChange,
}: DateFieldWithLabelProps) {
  return (
    <div className={styles.field}>
      <fieldset className={styles.fieldset}>
        <legend>{label}</legend>
        <DateField value={value} onDateChange={onDateChange} />
      </fieldset>
    </div>
  );
}
