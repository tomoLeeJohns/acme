import Link from "next/link";
import { Post } from "@/types";
import { CATEGORY_MAP } from "@/const";
import styles from "./post-item.module.css";
import { useTabs } from "@/context/TabsContext";
import { useCategory } from "@/context/CategoryContext";
import { Favourite } from "../Favourite";

export default function PostItem({ post }: { post: Post }) {
  const { activeTab } = useTabs();
  const { category } = useCategory();
  const categoryName = CATEGORY_MAP[post.category as keyof typeof CATEGORY_MAP];
  const formattedDate = new Date(post.createdAt).toISOString().split("T")[0];

  return (
    <div className={styles.wrapper}>
      <strong className={`${styles.category} ${`cat-${post.category}`}`}>
        {categoryName}
      </strong>

      <h3 className={styles.title}>{post.title}</h3>

      <time className={styles["created-at"]} dateTime={formattedDate}>
        {new Date(post.createdAt).toLocaleDateString()}
      </time>

      <p className={styles.body}>{post.body}</p>

      <div className={styles.actions}>
        <Link className={styles.link} href={`/${category}/${post.id}`}>
          zobacz więcej
        </Link>
        {activeTab === "favorites" && (
          <div className={styles.favourite}>
            <Favourite id={post.id} label={false} />
          </div>
        )}
      </div>
    </div>
  );
}
