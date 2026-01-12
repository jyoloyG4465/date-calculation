import { CommentSection } from "@/shared/components/Comments";
import { DateAfterDaysClient } from "./DateAfterDaysClient";
import styles from "./DateAfterDays.module.css";

export default async function DateAfterDays() {
  return (
    <div className={styles.container}>
      <DateAfterDaysClient />
      <CommentSection pagePath="/date-after-days" />
    </div>
  );
}
