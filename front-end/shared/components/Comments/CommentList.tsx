"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Comment } from "@/lib/supabase/types";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import styles from "./Comments.module.css";

interface CommentListProps {
  initialComments: Comment[];
  pagePath: string;
}

export function CommentList({ initialComments, pagePath }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleSubmit = async (authorName: string, content: string) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("comments")
      .insert({
        page_path: pagePath,
        author_name: authorName,
        content: content,
      })
      .select()
      .single();

    if (error) throw error;

    setComments((prev) => [data, ...prev]);
  };

  return (
    <>
      <CommentForm onSubmit={handleSubmit} />
      <div className={styles.list}>
        {comments.length === 0 ? (
          <p className={styles.empty}>まだコメントはありません</p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </>
  );
}
