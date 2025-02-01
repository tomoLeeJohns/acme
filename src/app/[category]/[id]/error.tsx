"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./post.module.css";

export default function Error({ error }: { error: Error }) {
  const { category } = useParams<{ category: string }>();
  return (
    <div className={styles.error}>
      <h2>Ups..coś poszło nie tak ;(</h2>
      <strong>{error.message}</strong>
      <Link className={styles["return-link"]} href={`/${category}`}>
        ⬅ <span>Powrót</span>
      </Link>
    </div>
  );
}
