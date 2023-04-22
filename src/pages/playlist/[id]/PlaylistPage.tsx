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
import { PlaylistHeader } from "./PlaylistPage.helpers.";
import TrackTable from "components/TrackTable";

const getPlaylistData = async (id: string) => {
  return fetchData(PLAYLIST_ENDPOINT.replace("{playlist_id}", id));
};

const PlaylistPage = () => {
  const router = useRouter();
  const [playlist, setPlaylist] = useState<GenericObject>({});
  useEffect(() => {
    const { query } = router;
    const getData = async (id: string) => {
      try {
        const data = await getPlaylistData(id);
        setPlaylist(data);
      } catch (err) {
        console.log({ err });
      }
    };
    if (!query.id) {
      //   router.push("/");
    } else {
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
                <TrackTable tracks={playlist.tracks.items} />
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
