import { useCallback } from "react";
import { useToast } from "../contexts/ToastContext";
import type { DateValue } from "../types/date";

const STORAGE_KEYS = {
  start: "startDay",
  end: "endDay",
} as const;

export function useLocalStorage(type: "start" | "end") {
  const { showToast } = useToast();
  const key = STORAGE_KEYS[type];

  const save = useCallback(
    (date: DateValue) => {
      localStorage.setItem(key, JSON.stringify(date));
      showToast("設定を保存しました");
    },
    [key, showToast]
  );

  const load = useCallback((): DateValue | null => {
    const data = localStorage.getItem(key);
    if (data) {
      showToast("保存設定を読み込みました");
      return JSON.parse(data);
    }
    showToast("保存されたデータがありません");
    return null;
  }, [key, showToast]);

  return { save, load };
}
