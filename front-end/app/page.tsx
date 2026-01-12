import styles from "./Home.module.css";
import Link from "next/link";
import { CommentSection } from "@/shared/components/Comments";

export default async function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>このサイトについて</h1>

      <section className={styles.section}>
        <h2>機能紹介</h2>
        <ul className={styles.list}>
          <li>
            <Link href="/date-calculation" className={styles.link}>
              日数差計算
            </Link>
            ：2つの日付間の日数差を計算します。日数、週数、月数で結果を表示します。
          </li>
          <li>
            <Link href="/date-after-days" className={styles.link}>
              N日後計算
            </Link>
            ：指定した日付からN日後の日付を計算します。
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>データの取り扱いについて</h2>
        <ul className={styles.list}>
          <li>
            本ツールの保存機能では、入力した日付情報をローカルストレージに保存します。データはブラウザを閉じても保持され、次回アクセス時に自動的に読み込まれます。
          </li>
          <li>
            保存されたデータは、ブラウザの設定でクリアするまで保持され、他のウェブサイトからはアクセスできません。
          </li>
          <li>
            保存される情報には個人を特定するデータは含まれず、外部サーバーへの送信も行われません。
          </li>
          <li>
            本ツールをご利用いただくことで、ローカルストレージの使用に同意いただいたものとみなします。
          </li>
          <li>
            ご利用の環境によっては、保存内容が失われる可能性があります。予期せぬデータ消失等について、当方では一切の責任を負いかねます。
          </li>
        </ul>
      </section>

      <CommentSection pagePath="/" />
    </div>
  );
}
