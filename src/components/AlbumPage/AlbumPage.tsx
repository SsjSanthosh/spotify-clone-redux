import ProtectedRoute from "components/ProtectedRoute";
import styles from "./AlbumPage.module.scss";
import { useState, useEffect } from "react";
import AppLayout from "components/AppLayout";
import GenericPageHeader from "components/GenericPageHeader";
import { AlbumType, GenericPageHeaderType } from "utils/types";
import { useRouter } from "next/router";
import { fetchData } from "utils/functions";
import { ALBUM_ENDPOINT } from "utils/endpoints";
import GenericPageSkeleton from "components/GenericPageSkeleton";
import SpotifyLink from "components/SpotifyLink";
import { BsDot } from "react-icons/bs";
import dayjs from "dayjs";
import { FALLBACK_IMAGE } from "utils/constants";
import TrackTable from "components/TrackTable";
import Head from "next/head";

const AlbumPage = () => {
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    const fetchAlbum = async () => {
      const data = await fetchData(
        ALBUM_ENDPOINT.replace("{id}", query.id as string)
      );
      setAlbum(data);
    };

    if (query.id) {
      fetchAlbum();
    }
  }, [query]);

  if (!album) {
    return <GenericPageSkeleton />;
  }

  const header: GenericPageHeaderType = {
    title: album.name,
    type: "album",
    image: !!album.images.length ? album.images[0].url : FALLBACK_IMAGE,
    descriptions: [
      { type: "artists", renderItems: album.artists },
      {
        type: "text",
        renderItems: dayjs(album.release_date).year() as unknown as string,
      },
      { type: "text", renderItems: `${album.total_tracks} tracks` },
    ],
    showPlayButton: true,
    uri: album.uri,
  };
  return (
    <ProtectedRoute>
      <AppLayout>
        <Head>
          <title>
            {album ? `Spotify - Album ${album.name}` : "Spotify - Album"}
          </title>
        </Head>
        <main>
          <GenericPageHeader header={header} />
        </main>
        <TrackTable
          tracks={album.tracks.items}
          album={true}
          albumInfo={{ name: album.name, id: album.id }}
        />
      </AppLayout>
    </ProtectedRoute>
  );
};

export default AlbumPage;
