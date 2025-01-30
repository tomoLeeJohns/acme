import { useSorting } from "@/context/SortingContext";
import Select, { SingleValue } from "react-select";
import { OPTIONS } from "@/const";
import { OptionType } from "@/types";
import styles from "./sorting.module.css";

export default function Sorting() {
  const { sortOrder, setSortOrder } = useSorting();
  const value = OPTIONS.find((option) => option.value === sortOrder);
  return (
    <div className={styles.sorting}>
      <span className={styles.label}>pokaż od:</span>
      <Select
        options={OPTIONS}
        value={value}
        isSearchable={false}
        classNamePrefix="custom-select"
        onChange={(option: SingleValue<OptionType>) =>
          setSortOrder(option!.value)
        }
      />
    </div>
  );
}
