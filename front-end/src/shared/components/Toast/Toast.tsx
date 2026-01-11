import { useToast } from "@/contexts/ToastContext";
import styles from "./Toast.module.css";

export function Toast() {
  const { message } = useToast();

  if (!message) return null;

  return <div className={styles.toast}>{message}</div>;
}
