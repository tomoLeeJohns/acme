import Link from "next/link";
import { CATEGORY_MAP } from "@/const";
import { useCategory } from "@/context/CategoryContext";
import styles from "./category-item.module.css";

const CategoryItem = ({ category }: { category: string }) => {
  const { category: selectedCategory } = useCategory();

  return (
    <Link key={category} href={`/${category}`} scroll={false} passHref>
      <button
        className={`${styles.category} ${`cat-${category}`} ${
          category === selectedCategory ? `${styles.active}` : ""
        }`}
      >
        <span className={styles.image}>
          <img
            src={`/${category}-img.png`}
            alt={CATEGORY_MAP[category as keyof typeof CATEGORY_MAP]}
          />
        </span>
        <span className={styles.desc}>
          <span className={styles.name}>
            {CATEGORY_MAP[category as keyof typeof CATEGORY_MAP]}
          </span>
          <span className={styles.icon}>
            <img src={`/${category}-icon.png`} alt="icon" />
          </span>
        </span>
      </button>
    </Link>
  );
};

export default CategoryItem;
