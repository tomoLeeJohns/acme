import { useTabs } from "@/context/TabsContext";
import styles from "./tabs.module.css";

export default function Tabs() {
  const { activeTab, setActiveTab } = useTabs();
  return (
    <div className={styles.tabs}>
      <button
        className={activeTab === "all" ? styles.active : ""}
        onClick={() => setActiveTab("all")}
      >
        Wszystkie
      </button>
      <button
        className={activeTab === "favorites" ? styles.active : ""}
        onClick={() => setActiveTab("favorites")}
      >
        Ulubione
      </button>
    </div>
  );
}
