import { useFavorites } from "@/context/FavoritesContext";
import styles from "./favourite.module.css";
export const Favourite = ({
  id,
  label = true,
}: {
  id: number;
  label: boolean;
}) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((favId) => favId === id);
  return (
    <button className={styles.favourite} onClick={() => toggleFavorite(id)}>
      <svg
        width="37"
        height="35"
        viewBox="0 0 37 35"
        fill={isFavorite ? "#000" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.5 2L23.5985 12.2029L35 13.8491L26.75 21.7865L28.697 33L18.5 27.7029L8.303 33L10.25 21.7865L2 13.8491L13.4015 12.2029L18.5 2Z"
          stroke="#1E1E1E"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label && <span>Dodaj do ulubionych</span>}
    </button>
  );
};
