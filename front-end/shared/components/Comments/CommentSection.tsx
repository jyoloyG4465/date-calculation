import { createClient } from "@/lib/supabase/server";
import { CommentList } from "./CommentList";
import styles from "./Comments.module.css";

interface CommentSectionProps {
  pagePath: string;
}

export async function CommentSection({ pagePath }: CommentSectionProps) {
  const supabase = await createClient();

  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("page_path", pagePath)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch comments:", error);
    return (
      <section className={styles.section}>
        <h2>コメント</h2>
        <div className={styles.error}>コメントの読み込みに失敗しました</div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2>コメント</h2>
      <CommentList initialComments={comments ?? []} pagePath={pagePath} />
    </section>
  );
}
