import ProtectedRoute from "components/ProtectedRoute";
import styles from "./LibraryPage.module.scss";
import AppLayout from "components/AppLayout";
import SectionHeader from "components/SectionHeader";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { userSelector } from "redux/userSlice";
import PlaylistCard from "components/PlaylistCard";
import { AlbumType } from "utils/types";
import { fetchData } from "utils/functions";
import { USER_ALBUMS_ENDPOINT } from "utils/endpoints";
import AlbumCard from "components/AlbumCard";
import GenericPageSkeleton from "components/GenericPageSkeleton";
import Head from "next/head";

const LibraryPage = () => {
  const { playlists } = useSelector(userSelector);
  const [albums, setAlbums] = useState<
    { added_at: string; album: AlbumType }[] | null
  >(null);
  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await fetchData(USER_ALBUMS_ENDPOINT);
      setAlbums(data.items);
    };
    fetchAlbums();
  }, []);
  if (!playlists) {
    return <GenericPageSkeleton />;
  }
  return (
    <ProtectedRoute>
      <AppLayout>
        <Head>
          <title>Spotify - Your library</title>
        </Head>
        <div className={styles["container"]}>
          <section className={styles["playlists-section"]}>
            <SectionHeader title="Your top playlists" />
            <div className={styles["playlists-container"]}>
              {!!playlists?.length &&
                playlists.slice(0, 12).map((play) => {
                  return <PlaylistCard playlist={play} key={play.id} />;
                })}
            </div>
          </section>
          <section className={styles["albums-section"]}>
            <SectionHeader title="Saved albums" />
            <div className={styles["albums-container"]}>
              {!!albums?.length &&
                albums.slice(0, 10).map((alb) => {
                  return <AlbumCard album={alb.album} key={alb.album.id} />;
                })}
            </div>
          </section>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default LibraryPage;
