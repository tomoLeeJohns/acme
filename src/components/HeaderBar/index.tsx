import Link from "next/link";
import styles from "./header-bar.module.css";
import { Favourite } from "../Favourite";

export const HeaderBar = ({
  id,
  category,
}: {
  id: string;
  category: string;
}) => {
  const postId = parseInt(id);

  return (
    <div className={styles.wrapper}>
      <div className={styles["header-bar"]}>
        <Link className={styles["return-link"]} href={`/${category}`}>
          <span>Blog Edukacyjny</span>
        </Link>
        <Favourite id={postId} label={true} />
      </div>
    </div>
  );
};
