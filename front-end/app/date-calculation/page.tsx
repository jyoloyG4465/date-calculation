import { CommentSection } from "@/shared/components/Comments";
import { DateCalculationClient } from "./DateCalculationClient";
import styles from "./DateCalculation.module.css";

export default async function DateCalculation() {
  return (
    <div className={styles.container}>
      <DateCalculationClient />
      <CommentSection pagePath="/date-calculation" />
    </div>
  );
}
