"use client";

import type { Comment } from "@/lib/supabase/types";
import styles from "./Comments.module.css";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const formattedDate = new Date(comment.created_at).toLocaleDateString(
    "ja-JP",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className={styles.item}>
      <div className={styles.itemHeader}>
        <span className={styles.authorName}>{comment.author_name}</span>
        <span className={styles.date}>{formattedDate}</span>
      </div>
      <p className={styles.content}>{comment.content}</p>
    </div>
  );
}
