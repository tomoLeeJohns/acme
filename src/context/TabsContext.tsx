"use client";
import { createContext, useState, ReactNode, useContext } from "react";

export const TabsContext = createContext<
  { activeTab: string; setActiveTab: (value: string) => void } | undefined
>(undefined);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}
