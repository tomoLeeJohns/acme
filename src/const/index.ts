import { Navigation, Pagination } from "swiper/modules";
import { OptionType } from "@/types";

export const CATEGORY_MAP = {
  wiedza: "Wiedza",
  inspiracje: "Inspiracje",
  interpretacje: "Interpretacje",
  dostepne: "Dostępne",
};

export const OPTIONS: OptionType[] = [
  { value: "newest", label: "Od najnowszych" },
  { value: "oldest", label: "Od najstarszych" },
];

export const CATEGORIES = Object.keys(CATEGORY_MAP);

export const POSTS_LIMIT = 10;

export const SWIPER_CONFIG = {
  modules: [Pagination, Navigation],
  navigation: true,
  pagination: { el: ".swiper-pagination", clickable: true },
  spaceBetween: 54,
  slidesPerView: 4,
  className: "mySwiper",
  loop: false,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 54,
    },
  },
};
