"use client";
import { useFavorites } from "@/context/FavoritesContext";
import PostItem from "../PostItem";
import Tabs from "../Tabs";
import Sorting from "../Sorting";
import { Post } from "@/types";
import { useTabs } from "@/context/TabsContext";
import { useSorting } from "@/context/SortingContext";
import { useEffect, useState } from "react";
import { CATEGORY_MAP } from "@/const";
import Link from "next/link";
import styles from "./post-list.module.css";
import { useCategory } from "@/context/CategoryContext";

export default function PostList({ initialPosts }: { initialPosts: Post[] }) {
  const { category } = useCategory();
  const { activeTab } = useTabs();
  const { sortOrder } = useSorting();
  const { favorites } = useFavorites();
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      localStorage.setItem("posts", JSON.stringify(initialPosts));
    }
  }, [initialPosts]);

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
