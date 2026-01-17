"use server";

import { Resend } from "resend";
import {
  AGE_OPTIONS,
  validateContactForm,
  hasErrors,
} from "@/shared/components/utils/contactValidation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
  age: string;
  subject: string;
  message: string;
}) {
  // サーバーサイドバリデーション
  const errors = validateContactForm({ ...formData, website: "" });
  if (hasErrors(errors)) {
    return { success: false, error: "入力内容に問題があります" };
  }

  // ageの値を検証（AGE_OPTIONSに含まれるかチェック）
  const ageOption = AGE_OPTIONS.find((opt) => opt.value === formData.age);
  if (!ageOption) {
    return { success: false, error: "不正な年齢の値です" };
  }

  // subjectから改行を除去（ヘッダーインジェクション対策）
  const sanitizedSubject = formData.subject.replace(/[\r\n]/g, "");

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev", // Resend無料プランのデフォルト
    to: process.env.CONTACT_EMAIL!,
    subject: `[問い合わせ] ${sanitizedSubject}`,
    text: `年齢: ${ageOption.label}\n\n${formData.message}`,
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
