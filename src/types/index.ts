import { CATEGORIES } from "@/const";

export interface Post {
  id: number;
  title: string;
  body: string;
  category: string;
  createdAt: number;
}

export type RawPost = Omit<Post, "createdAt" | "category">;

export type CategoryNames = (typeof CATEGORIES)[number];

export interface OptionType {
  value: string;
  label: string;
}

export interface PostParams {
  id: string;
  category: string;
}
