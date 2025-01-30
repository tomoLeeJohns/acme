"use client";
import { createContext, useContext, useState } from "react";

const SortingContext = createContext<
  { sortOrder: string; setSortOrder: (value: string) => void } | undefined
>(undefined);

export const SortingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sortOrder, setSortOrder] = useState("newest");
  return (
    <SortingContext.Provider value={{ sortOrder, setSortOrder }}>
      {children}
    </SortingContext.Provider>
  );
};

export const useSorting = () => {
  const context = useContext(SortingContext);
  if (context === undefined) {
    throw new Error("useSorting must be used within a SortingProvider");
  }
  return context;
};
