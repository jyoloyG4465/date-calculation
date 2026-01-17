/**
 * 問い合わせフォームのバリデーションとbot対策
 */

// 年齢の選択肢
export const AGE_OPTIONS = [
  { value: "under20", label: "20歳以下" },
  { value: "21-30", label: "21〜30歳" },
  { value: "31-40", label: "31〜40歳" },
  { value: "41-50", label: "41〜50歳" },
  { value: "51-60", label: "51〜60歳" },
  { value: "over60", label: "60歳以上" },
] as const;

export type AgeValue = (typeof AGE_OPTIONS)[number]["value"];

export interface ContactFormData {
  age: string;
  subject: string;
  message: string;
  website: string; // ハニーポット用
}

export interface ContactFormErrors {
  age?: string;
  subject?: string;
  message?: string;
}

/**
 * 年齢のバリデーション
 */
export function validateAge(age: string): string | null {
  if (!age) {
    return "年齢を選択してください";
  }
  return null;
}

/**
 * 件名のバリデーション (1-100文字)
 */
export function validateSubject(subject: string): string | null {
  const trimmed = subject.trim();
  if (!trimmed) {
    return "件名を入力してください";
  }
  if (trimmed.length > 100) {
    return "件名は100文字以内で入力してください";
  }
  return null;
}

/**
 * メッセージのバリデーション (10-2000文字)
 */
export function validateMessage(message: string): string | null {
  const trimmed = message.trim();
  if (!trimmed) {
    return "メッセージを入力してください";
  }
  if (trimmed.length < 10) {
    return "メッセージは10文字以上で入力してください";
  }
  if (trimmed.length > 2000) {
    return "メッセージは2000文字以内で入力してください";
  }
  return null;
}

/**
 * フォーム全体のバリデーション
 */
export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const ageError = validateAge(data.age);
  if (ageError) errors.age = ageError;

  const subjectError = validateSubject(data.subject);
  if (subjectError) errors.subject = subjectError;

  const messageError = validateMessage(data.message);
  if (messageError) errors.message = messageError;

  return errors;
}

/**
 * エラーがあるかどうかをチェック
 */
export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * ハニーポット検証
 * botはhiddenフィールドにも値を入力するため、空でなければbot判定
 */
export function isHoneypotFilled(website: string): boolean {
  return website.trim().length > 0;
}

/**
 * 時間検証
 * フォーム表示から送信までの時間が短すぎる場合はbot判定
 * @param formLoadTime フォーム表示時刻 (Date.now())
 * @param minSeconds 最低必要秒数 (デフォルト: 2秒)
 */
export function isSubmissionTooFast(
  formLoadTime: number,
  minSeconds: number = 2
): boolean {
  const elapsedMs = Date.now() - formLoadTime;
  return elapsedMs < minSeconds * 1000;
}

/**
 * 年齢の値からラベルを取得
 */
export function getAgeLabel(value: string): string {
  const option = AGE_OPTIONS.find((opt) => opt.value === value);
  return option ? option.label : value;
}
