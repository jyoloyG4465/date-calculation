import Link from "next/link";
import styles from "./Thanks.module.css";

export default function Thanks() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>&#x2705;</div>
      <h1 className={styles.title}>お問い合わせありがとうございます</h1>
      <p className={styles.message}>
        お問い合わせを受け付けました。
        <br />
        内容を確認の上、ご連絡させていただきます。
      </p>
      <Link href="/" className={styles.backLink}>
        トップページへ戻る
      </Link>
    </div>
  );
}
