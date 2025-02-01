"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RawPost, Post } from "@/types";
import { HeaderBar } from "@/components/HeaderBar";
import styles from "./post.module.css";

export default function PostPage() {
  const params = useParams<{
    id: string;
    category: string;
  }>();
  const { id } = params;
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
        if (!foundPost)
          throw new Error(
            "Nie ma takiego posta we wcześniejszych postach, na ilosc postów nałożony jest limit i są one związane losowo z kategoriami i zapisane w localstorage"
          );
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

  return (
    <main className={styles.wrapper}>
      <HeaderBar {...params} />
      <article className={styles.post}>
        <div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.body}>{post.body}</p>
          <h3 className={styles.subtitle}>Lorem ipsum</h3>
          <p className={styles.txt}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrs standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. Lorem Ipsum is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s.
          </p>
          <img src="/sample.png" alt="sample image" />
        </div>
      </article>
    </main>
  );
}
