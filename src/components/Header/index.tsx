import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
const Header = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/logo.svg"
            alt="logo"
            width={185}
            height={58}
            priority
          />
          <span>FIKCYJNA INSTYTUCJA EDUKACYJNA</span>
        </Link>

        <span className={styles.txt}>&mdash; BLOG</span>
      </header>
    </div>
  );
};

export default Header;
