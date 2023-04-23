import ProtectedRoute from "components/ProtectedRoute";
import styles from "./SearchPage.module.scss";
import AppLayout from "components/AppLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  AlbumType,
  ArtistType,
  GenericObject,
  PlaylistType,
  TrackType,
} from "utils/types";
import { fetchData } from "utils/functions";
import { SEARCH_ENDPOINT } from "utils/endpoints";

interface SearchType {
  tracks: null | TrackType[];
  playlists: null | PlaylistType[];
  albums: null | AlbumType[];
  artists: null | ArtistType[];
}

const SearchPage = () => {
  const router = useRouter();
  const { query } = router;
  const [results, setResults] = useState<SearchType | null>({
    tracks: null,
    playlists: null,
    albums: null,
    artists: null,
  });
  useEffect(() => {
    const fetchAndSetResults = async (val: string) => {
      const data = await fetchData(
        SEARCH_ENDPOINT.replace("{search_query}", val)
      );
      const { tracks, albums, playlists, artists } = data;
      setResults({
        albums: albums.items,
        playlists: playlists.items,
        artists: artists.items,
        tracks: tracks.items,
      });
    };
    if (query.q) {
      fetchAndSetResults(query.q as string);
    }
  }, []);
  console.log({ results });
  return (
    <ProtectedRoute>
      <AppLayout>
        <p>Search page</p>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default SearchPage;
