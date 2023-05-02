import ProtectedRoute from "components/ProtectedRoute";
import styles from "./SearchPage.module.scss";
import AppLayout from "components/AppLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlbumType, ArtistType, PlaylistType, TrackType } from "utils/types";
import { fetchData } from "utils/functions";
import { SEARCH_ENDPOINT } from "utils/endpoints";
import TrackTable from "components/TrackTable";
import AlbumCard from "components/AlbumCard";
import PlaylistCard from "components/PlaylistCard";
import ArtistCard from "components/ArtistCard";
import Link from "next/link";
import Head from "next/head";

interface SearchType {
  tracks: null | TrackType[];
  playlists: null | PlaylistType[];
  albums: null | AlbumType[];
  artists: null | ArtistType[];
}

export const SEARCH_TYPES = ["artists", "playlists", "tracks", "albums"];

const SearchCategoryButton = ({
  query,
  type,
  highlight,
}: {
  query: string;
  type: string;
  highlight: boolean;
}) => {
  return (
    <Link href={`/search?q=${query}&type=${type}`}>
      <button
        className={`${styles["search-category-btn"]} ${
          highlight && styles["search-category-active"]
        }`}
      >
        {type}
      </button>
    </Link>
  );
};

const SearchPage = () => {
  const router = useRouter();
  const { query } = router;

  const [results, setResults] = useState<SearchType>({
    tracks: null,
    playlists: null,
    albums: null,
    artists: null,
  });
  
  const type = query.type || "tracks";

  useEffect(() => {
    const fetchAndSetResults = async (val: string) => {
      const typeKey = type.slice(0, type.length - 1) as string;
      const data = await fetchData(
        SEARCH_ENDPOINT.replace("{search_query}", val).replace(
          "{type}",
          typeKey as string
        )
      );
      setResults((results) => ({
        ...results,
        [type as string]: data[type as string].items,
      }));
    };
    if (query.q) {
      fetchAndSetResults(query.q as string);
    }
  }, [query, type]);

  const renderSection = () => {
    if (type === "tracks" && results.tracks) {
      return (
        <TrackTable tracks={results.tracks} album={false} albumInfo={null} />
      );
    }
    if (type === "albums" && results.albums) {
      return (
        <div className={styles["albums-container"]}>
          {results.albums.map((album) => {
            return <AlbumCard key={album.id} album={album} />;
          })}
        </div>
      );
    }
    if (type === "playlists" && results.playlists) {
      return (
        <div className={styles["albums-container"]}>
          {results.playlists.map((play) => {
            return <PlaylistCard key={play.id} playlist={play} />;
          })}
        </div>
      );
    }
    if (type === "artists" && results.artists) {
      return (
        <div className={styles["albums-container"]}>
          {results.artists.map((art) => {
            return <ArtistCard key={art.id} artist={art} />;
          })}
        </div>
      );
    }
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <Head>
          <title>
            Spotify - Search &quot;{query.q}&quot; in {type}
          </title>
        </Head>
        <div className={styles["container"]}>
          <div className={styles["search-types"]}>
            {SEARCH_TYPES.map((t) => {
              return (
                <SearchCategoryButton
                  query={query.q as string}
                  type={t}
                  key={t}
                  highlight={t == type}
                />
              );
            })}
          </div>
          <div className={styles["section-container"]}>{renderSection()}</div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default SearchPage;
