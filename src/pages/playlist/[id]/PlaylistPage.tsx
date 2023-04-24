import React, { useEffect, useState } from "react";
import styles from "./PlaylistPage.module.scss";
import ProtectedRoute from "components/ProtectedRoute";
import AppLayout from "components/AppLayout";
import { useRouter } from "next/router";
import { fetchData } from "utils/functions";
import { PLAYLIST_ENDPOINT } from "utils/endpoints";
import { GenericObject } from "utils/types";

import Loader from "components/Loader";
import Head from "next/head";
import TrackTable from "components/TrackTable";
import Image from "next/image";
import { BsDot } from "react-icons/bs";

const PlaylistHeader = ({ playlist }: { playlist: GenericObject }) => {
  return (
    <div className={styles["header"]}>
      <div className={styles["image-container"]}>
        <Image src={playlist.images[0].url} alt={playlist.name} fill priority />
      </div>
      <div className={styles["header-content"]}>
        <h4>Playlist</h4>
        <h1>{playlist.name}</h1>
        <p>{playlist.description}</p>
        <div className={styles["playlist-owner-container"]}>
          <h6>Created by {playlist.owner.display_name}</h6> <BsDot />
          <h6>{playlist.total_tracks} songs</h6>
        </div>
      </div>
    </div>
  );
};

const getPlaylistData = async (id: string) => {
  return fetchData(PLAYLIST_ENDPOINT.replace("{playlist_id}", id));
};

const PlaylistPage = () => {
  const router = useRouter();
  const [playlist, setPlaylist] = useState<GenericObject>({});
  console.log({ playlist });
  useEffect(() => {
    const { query } = router;
    const getData = async (id: string) => {
      try {
        const data = await getPlaylistData(id);
        data.total_tracks = data.tracks.total;
        data.tracks = data.tracks.items.map((t: GenericObject) => {
          // flatten track for easy typing and rendering
          const newTrack = { ...t, ...t.track };
          delete newTrack.track;
          return newTrack;
        });
        setPlaylist(data);
      } catch (err) {
        console.log({ err });
      }
    };
    if (query.id) {
      getData(query.id as string);
    }
  }, [router]);
  return (
    <ProtectedRoute>
      <AppLayout>
        {playlist.id ? (
          <main>
            <Head>
              <title>{playlist.name}</title>
            </Head>
            <div className={styles["container"]}>
              <div className={styles["header"]}>
                <PlaylistHeader playlist={playlist} />
              </div>
              <div className={styles["content"]}>
                <TrackTable tracks={playlist.tracks} />
              </div>
            </div>
          </main>
        ) : (
          <Loader />
        )}
      </AppLayout>
    </ProtectedRoute>
  );
};

export default PlaylistPage;
