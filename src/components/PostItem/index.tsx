import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { Post } from "@/types";
import { CATEGORY_MAP } from "@/const";
import styles from "./post-item.module.css";
import { useTabs } from "@/context/TabsContext";
import { useCategory } from "@/context/CategoryContext";

export default function PostItem({ post }: { post: Post }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { activeTab } = useTabs();
  const { category } = useCategory();
  const isFavorite = favorites.some((id) => id === post.id);
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

      {activeTab === "favorites" && (
        <button
          className={styles["favorite-button"]}
          onClick={() => toggleFavorite(post.id)}
        >
          {isFavorite ? "⭐ Usuń z ulubionych" : "☆ Dodaj do ulubionych"}
        </button>
      )}

      <Link className={styles.link} href={`/${category}/${post.id}`}>
        zobacz więcej
      </Link>
    </div>
  );
}
