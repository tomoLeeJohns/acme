import Categories from "@/components/Categories";
import PostList from "@/components/PostList";
import { CATEGORIES } from "@/const";
import { notFound } from "next/navigation";
import styles from "./home.module.css";
import { RawPost } from "@/types";

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10`,
    { cache: "force-cache" }
  );
  if (!res.ok) {
    throw new Error("Błąd podczas pobierania danych");
  }
  const posts: RawPost[] = await res.json();
  const categorizedPosts = posts.map((post, index) => ({
    ...post,
    category: CATEGORIES[index % CATEGORIES.length],
    createdAt: Date.now() - Math.floor(Math.random() * 1000000000),
  }));
  return categorizedPosts;
}

export default async function Home({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const allParams = await params;
  const categorizedPosts = await getPosts();

  if (![...CATEGORIES, "all"].includes(allParams.category)) return notFound();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <span>Blog Edukacyjny</span>
      </h1>
      <Categories category={allParams.category} />
      <PostList initialPosts={categorizedPosts} />
    </main>
  );
}
