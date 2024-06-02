import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.version}>Version: {process.env.APP_VERSION}</div>
      <ul className={styles.links}>
        <li>
          <Link href="#">Docs</Link>
        </li>
        <li>
          <Link href="#">API</Link>
        </li>
        <li>
          <Link href="#">Help</Link>
        </li>
        <li>
          <Link href="#">Community</Link>
        </li>
      </ul>
      <div className={styles.logo}>
        <Image src="/icons/logo-small.svg" alt="logo" width={23} height={33} />
      </div>
    </footer>
  );
}
