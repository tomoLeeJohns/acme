import { useFavorites } from "@/context/FavoritesContext";
import PostItem from "../PostItem";
import Tabs from "../Tabs";
import Sorting from "../Sorting";
import { Post, RawPost } from "@/types";
import { useTabs } from "@/context/TabsContext";
import { useSorting } from "@/context/SortingContext";
import { useEffect, useState } from "react";
import { CATEGORIES, POSTS_LIMIT, CATEGORY_MAP } from "@/const";
import Link from "next/link";
import styles from "./post-list.module.css";
import { useCategory } from "@/context/CategoryContext";

export default function PostList() {
  const { category } = useCategory();
  const { activeTab } = useTabs();
  const { sortOrder } = useSorting();
  const { favorites } = useFavorites();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const posts = localStorage.getItem("posts");
    if (posts) {
      setPosts(JSON.parse(posts));
    } else {
      fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${POSTS_LIMIT}`)
        .then((res) => res.json())
        .then((data: RawPost[]) => {
          const categorizedPosts = data.slice(0, 10).map((post, index) => ({
            ...post,
            category: CATEGORIES[index % CATEGORIES.length],
            createdAt: Date.now() - Math.floor(Math.random() * 1000000000),
          }));

          setPosts(categorizedPosts);
          localStorage.setItem("posts", JSON.stringify(categorizedPosts));
        })
        .catch((err) => setError(err));
    }
  }, []);

  if (error) return <h2>⛔ Błąd: {error}</h2>;
  if (!posts.length) return <p className={styles.loading}>Ładowanie...</p>;

  let filteredPosts: Post[] = [];
  if (category) {
    filteredPosts = posts.filter(
      (post) => post.category === category || category === "all"
    );
  }

  if (activeTab === "favorites") {
    filteredPosts = filteredPosts.filter((post) => favorites.includes(post.id));
  }

  filteredPosts.sort((a, b) =>
    sortOrder === "newest"
      ? b.createdAt - a.createdAt
      : a.createdAt - b.createdAt
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <div>
          <span>Wpisy</span>
          {category !== "all" && (
            <Link
              className={styles["clear-filters"]}
              href={`/all`}
              scroll={false}
            >
              <span>{CATEGORY_MAP[category as keyof typeof CATEGORY_MAP]}</span>
              <span>&times;</span>
            </Link>
          )}
        </div>

        <Tabs />
        <Sorting />
      </div>
      <div className={styles["posts-list"]}>
        {filteredPosts.length === 0 && <p>Brak wpisów</p>}
        {filteredPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
