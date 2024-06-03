import Image from "next/image";
import styles from "./loading.module.scss";

export function Loading() {
  return (
    <div className={styles.container} data-cy="loading">
      <Image
        className={styles.loading}
        src="/icons/loading-spinner.svg"
        alt="loading-spinner"
        height={64}
        width={64}
      />
    </div>
  );
}
