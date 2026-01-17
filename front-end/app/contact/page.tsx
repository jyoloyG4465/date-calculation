"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import styles from "./Contact.module.css";
import {
  ContactFormData,
  ContactFormErrors,
  AGE_OPTIONS,
  validateContactForm,
  hasErrors,
  isHoneypotFilled,
  isSubmissionTooFast,
} from "@/shared/components/utils/contactValidation";
import { sendContactEmail } from "./actions";

const initialFormData: ContactFormData = {
  age: "",
  subject: "",
  message: "",
  website: "", // ハニーポット
};

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [formLoadTime, setFormLoadTime] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isFormValid =
    formData.age && formData.subject.trim() && formData.message.trim();

  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 入力時にそのフィールドのエラーをクリア
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      return;
    }

    // bot対策チェック
    if (isHoneypotFilled(formData.website)) {
      // botの場合は静かに成功扱いにして遷移
      router.push("/contact/thanks");
      return;
    }

    if (isSubmissionTooFast(formLoadTime)) {
      // 送信が早すぎる場合も静かに成功扱いにして遷移
      router.push("/contact/thanks");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await sendContactEmail({
      age: formData.age,
      subject: formData.subject,
      message: formData.message,
    });

    if (result.success) {
      router.push("/contact/thanks");
    } else {
      setSubmitError(
        result.error || "送信に失敗しました。時間をおいて再度お試しください。"
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>お問い合わせ</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formField}>
          <TextField
            select
            label="年齢"
            name="age"
            value={formData.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
            required
            fullWidth
            size="small"
          >
            <MenuItem value="" disabled>
              選択してください
            </MenuItem>
            {AGE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className={styles.formField}>
          <TextField
            label="件名"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            error={!!errors.subject}
            helperText={errors.subject}
            required
            fullWidth
            size="small"
          />
        </div>

        <div className={styles.formField}>
          <TextField
            label="メッセージ"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            required
            fullWidth
            multiline
            rows={6}
            size="small"
          />
        </div>

        {/* ハニーポット - botのみが入力する隠しフィールド */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {submitError && (
          <div className={styles.errorMessage}>{submitError}</div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "送信中..." : "送信する"}
        </button>
      </form>
    </div>
  );
}
