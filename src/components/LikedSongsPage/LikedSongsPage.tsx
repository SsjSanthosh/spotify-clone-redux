import React, { useEffect, useState } from "react";
import styles from "./LikedSongsPage.module.scss";
import ProtectedRoute from "components/ProtectedRoute";
import AppLayout from "components/AppLayout";
import { useRouter } from "next/router";
import { fetchData } from "utils/functions";
import { USER_TRACKS_ENDPOINT } from "utils/endpoints";
import { GenericObject, GenericPageHeaderType, TrackType } from "utils/types";

import Head from "next/head";
import TrackTable from "components/TrackTable";
import { useSelector } from "react-redux";
import { userSelector } from "redux/userSlice";
import GenericPageSkeleton from "components/GenericPageSkeleton";
import GenericPageHeader from "components/GenericPageHeader";

const LIKED_SONGS_IMAGE =
  "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png";


const getPlaylistData = async () => {
  return fetchData(USER_TRACKS_ENDPOINT);
};

const LikedSongsPage = () => {
  const router = useRouter();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const user = useSelector(userSelector);
  console.log({ tracks });
  useEffect(() => {
    const { query } = router;
    const getData = async () => {
      try {
        let data = await getPlaylistData();
        data = data.items.map((t: GenericObject) => {
          // flatten track for easy typing and rendering
          const newTrack = { ...t, ...t.track };
          delete newTrack.track;
          return newTrack;
        });
        console.log({ data });
        setTracks(data);
      } catch (err) {
        console.log({ err });
      }
    };

    getData();
  }, [router]);
  if (!tracks.length) {
    return <GenericPageSkeleton />;
  }
  const header: GenericPageHeaderType = {
    title: "Your liked songs",
    image: LIKED_SONGS_IMAGE,
    type: "playlist",
    descriptions: [
      { type: "text", renderItems: `Created by ${user.profile?.display_name}` },
    ],
  };
  return (
    <ProtectedRoute>
      <AppLayout>
        <main>
          <Head>
            <title>Liked songs</title>
          </Head>
          <div className={styles["container"]}>
            <div className={styles["header"]}>
              <GenericPageHeader header={header} />
            </div>
            <div className={styles["content"]}>
              <TrackTable tracks={tracks} album={false} albumInfo={null} />
            </div>
          </div>
        </main>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default LikedSongsPage;
