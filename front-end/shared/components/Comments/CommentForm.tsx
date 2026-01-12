"use client";

import { useState } from "react";
import styles from "./Comments.module.css";

interface CommentFormProps {
  onSubmit: (authorName: string, content: string) => Promise<void>;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(authorName.trim(), content.trim());
      setContent("");
    } catch {
      setError("コメントの投稿に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = authorName.trim() && content.trim();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="authorName">名前</label>
        <input
          id="authorName"
          type="text"
          className={styles.input}
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="お名前を入力"
          maxLength={50}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="content">コメント</label>
        <textarea
          id="content"
          className={`${styles.input} ${styles.textarea}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="コメントを入力"
          maxLength={1000}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "送信中..." : "コメントを投稿"}
      </button>
    </form>
  );
}
