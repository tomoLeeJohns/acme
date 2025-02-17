import HeaderBar from "@/components/HeaderBar";
import Post from "@/components/Post";
import { RawPost, PostParams } from "@/types";
import styles from "./post.module.css";

function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

async function getPost(id: string) {
  if (!/^\d+$/.test(id)) {
    throw new Error("Nieprawidłowe id - musi być liczbą");
  }
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Błąd podczas pobierania danych");
  }
  const post: RawPost = await res.json();
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PostParams>;
}) {
  const allParams = await params;
  const post = await getPost(allParams.id);

  return {
    title: `ACME - ${post.title}`,
    description: truncateText(post.body, 100),
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<PostParams>;
}) {
  const allParams = await params;
  const post = await getPost(allParams.id);

  return (
    <main className={styles.wrapper}>
      <HeaderBar {...allParams} />
      <Post data={post} />
    </main>
  );
}
