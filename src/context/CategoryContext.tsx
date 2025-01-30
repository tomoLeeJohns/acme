"use client";
import { createContext, useContext, useState } from "react";

export const CategoryContext = createContext<
  { category: string; setCategory: (value: string) => void } | undefined
>(undefined);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [category, setCategory] = useState("all");
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}
