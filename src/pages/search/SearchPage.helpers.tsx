import Link from "next/link";

import styles from './SearchPage.module.scss';

export const SEARCH_TYPES = ["artists", "playlists", "tracks", "albums"];

export const SearchCategoryButton = ({
  query,
  type,
  highlight
}: {
  query: string;
  type: string;
  highlight: boolean;
}) => {
  return (
    <Link href={`/search?q=${query}&type=${type}`}>
      <button className={`${styles['search-category-btn']} ${highlight && styles['search-category-active']}`}>{type}</button>
    </Link>
  );
};
