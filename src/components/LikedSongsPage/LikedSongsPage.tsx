import React, { useEffect, useState } from "react";
import styles from "./LikedSongsPage.module.scss";
import ProtectedRoute from "components/ProtectedRoute";
import AppLayout from "components/AppLayout";
import { useRouter } from "next/router";
import { fetchData } from "utils/functions";
import { USER_TRACKS_ENDPOINT } from "utils/endpoints";
import { GenericObject, TrackType } from "utils/types";

import Head from "next/head";
import TrackTable from "components/TrackTable";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { COMMON_SKELETON_PROPS } from "utils/constants";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { userSelector } from "redux/userSlice";

const PageHeader = () => {
  const user = useSelector(userSelector);
  return (
    <div className={styles["header"]}>
      <div className={styles["image-container"]}>
        <Image
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          fill
          alt="heart"
          priority
        />
      </div>
      <div className={styles["header-content"]}>
        <h4>Playlist</h4>
        <h1>Liked songs</h1>
        <div className={styles["playlist-owner-container"]}>
          <h6>Created by {user.profile?.display_name}</h6>
        </div>
      </div>
    </div>
  );
};

const getPlaylistData = async () => {
  return fetchData(USER_TRACKS_ENDPOINT);
};

const LikedSongsPage = () => {
  const router = useRouter();
  const [tracks, setTracks] = useState<TrackType[]>([]);
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
  return (
    <ProtectedRoute>
      <AppLayout>
        {tracks.length ? (
          <main>
            <Head>
              <title>Liked songs</title>
            </Head>
            <div className={styles["container"]}>
              <div className={styles["header"]}>
                <PageHeader />
              </div>
              <div className={styles["content"]}>
                <TrackTable tracks={tracks} />
              </div>
            </div>
          </main>
        ) : (
          <div className={styles["skeleton-container"]}>
            <div className={styles["skeleton-header-container"]}>
              <SkeletonCircle size="250" {...COMMON_SKELETON_PROPS} />
            </div>
            <div>
              <SkeletonText
                noOfLines={12}
                spacing={4}
                height={200}
                {...COMMON_SKELETON_PROPS}
              />
            </div>
          </div>
        )}
      </AppLayout>
    </ProtectedRoute>
  );
};

export default LikedSongsPage;
