import styles from './InfoSection.module.css';

export function InfoSection() {
  return (
    <section className={styles.section}>
      <h2>このサイトについて</h2>
      <ul className={styles.list}>
        <li>
          本ツールでは、入力した日付情報をローカルストレージに保存します。データはブラウザを閉じても保持され、次回アクセス時に自動的に読み込まれます。
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
  );
}
