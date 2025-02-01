"use client";
import Categories from "@/components/Categories";
import PostList from "@/components/PostList";
import { CATEGORIES } from "@/const";
import { notFound, useParams } from "next/navigation";
import { useCategory } from "@/context/CategoryContext";
import { useEffect } from "react";
import { useTabs } from "@/context/TabsContext";
import styles from "./home.module.css";

export default function Home() {
  const { setCategory } = useCategory();
  const { setActiveTab } = useTabs();
  const { category = "all" } = useParams<{
    category: string | undefined;
  }>();

  useEffect(() => {
    setActiveTab("all");
    setCategory(category);
  }, [category]);

  if (![...CATEGORIES, "all"].includes(category)) return notFound();

  return (
    <main className={styles.main}>
      <Categories />
      <PostList />
    </main>
  );
}
