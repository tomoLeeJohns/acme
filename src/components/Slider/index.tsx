"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { useCategory } from "@/context/CategoryContext";
import { SWIPER_CONFIG, CATEGORIES } from "@/const";
import styles from "./slider.module.css";

import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider({ children }: { children: React.ReactNode }) {
  const { category } = useCategory();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);
  const activeIndex = CATEGORIES.findIndex((item) => item === category);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.el.style.opacity = "1";
    }
  }, []);

  const updateArrows = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current.update();
        updateArrows(swiperRef.current);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      const isVisible =
        activeIndex >= swiper.activeIndex &&
        activeIndex <
          Number(swiper.activeIndex) + Number(swiper.params.slidesPerView!);

      if (!isVisible) swiper.slideTo(activeIndex, 0);
    }
  }, [activeIndex]);

  return (
    <div className={styles["slider-wrapper"]}>
      <div className="swiper-pagination"></div>
      <button
        className={`${styles["custom-arr-prev"]} ${
          isBeginning
            ? styles["custom-arr-hidden"]
            : styles["custom-arr-visible"]
        }`}
        onClick={() => swiperRef.current?.slidePrev()}
      ></button>
      <Swiper
        {...SWIPER_CONFIG}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateArrows(swiper);
        }}
        onSlideChange={(swiper) => {
          updateArrows(swiper);
        }}
      >
        {children}
      </Swiper>
      <button
        className={`${styles["custom-arr-next"]} ${
          isEnd ? styles["custom-arr-hidden"] : styles["custom-arr-visible"]
        }`}
        onClick={() => swiperRef.current?.slideNext()}
      ></button>
    </div>
  );
}
