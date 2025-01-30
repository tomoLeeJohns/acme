"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { CATEGORY_MAP } from "@/const";
import { RawPost, Post } from "@/types";
import styles from "./post.module.css";

export default function PostPage() {
  const { id, category } = useParams<{
    id: string;
    category: string;
  }>();
  const { favorites, toggleFavorite } = useFavorites();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data: RawPost) => {
        if (!Object.keys(data).length) throw new Error("Nie ma takiego posta");
        const storedPosts = localStorage.getItem("posts");
        const posts: Post[] =
          storedPosts === null ? [] : JSON.parse(storedPosts);
        const foundPost = posts.find((p) => p.id === parseInt(id));
        if (!foundPost) return;
        setPost({
          ...data,
          createdAt: foundPost?.createdAt,
          category: foundPost?.category,
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, [id]);

  if (error) throw error;
  if (!post) return <p className={styles.loading}>Ładowanie...</p>;

  const categoryName = CATEGORY_MAP[post.category as keyof typeof CATEGORY_MAP];
  const isFavorite = favorites.some((favId) => favId === post.id);

  return (
    <main className={styles.main}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>
        <strong>Kategoria:</strong> {categoryName}
      </p>
      <p>
        <strong>Data utworzenia:</strong>{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <button
        onClick={() => toggleFavorite(post.id)}
        style={{ marginRight: "10px" }}
      >
        {isFavorite ? "⭐ Usuń z ulubionych" : "☆ Dodaj do ulubionych"}
      </button>

      <Link
        href={`/${category}`}
        style={{ textDecoration: "none", color: "blue" }}
      >
        ⬅ Powrót
      </Link>
    </main>
  );
}
