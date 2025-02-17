"use client";
import { useEffect } from "react";
import CategoryItem from "../CategoryItem";
import Slider from "../Slider";
import { SwiperSlide } from "swiper/react";
import { CATEGORIES } from "@/const";
import styles from "./categories.module.css";
import { useTabs } from "@/context/TabsContext";
import { useCategory } from "@/context/CategoryContext";

export default function Categories({ category }: { category: string }) {
  const { setActiveTab } = useTabs();
  const { setCategory } = useCategory();

  useEffect(() => {
    setActiveTab("all");
    setCategory(category);
  }, [category]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.categories}>
        <h2 className={styles.title}>Kategorie</h2>
        <Slider>
          {CATEGORIES.map((category) => (
            <SwiperSlide key={category}>
              <CategoryItem category={category} />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </div>
  );
}
