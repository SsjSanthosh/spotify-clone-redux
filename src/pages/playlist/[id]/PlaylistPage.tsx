import React, { useEffect, useState } from "react";
import styles from "./PlaylistPage.module.scss";
import ProtectedRoute from "components/ProtectedRoute";
import AppLayout from "components/AppLayout";
import { useRouter } from "next/router";
import { fetchData } from "utils/functions";
import { PLAYLIST_ENDPOINT } from "utils/endpoints";
import {
  GenericObject,
  GenericPageHeaderType,
  PlaylistType,
} from "utils/types";

import Loader from "components/Loader";
import Head from "next/head";
import TrackTable from "components/TrackTable";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { COMMON_SKELETON_PROPS, FALLBACK_IMAGE } from "utils/constants";
import GenericPageSkeleton from "components/GenericPageSkeleton";
import GenericPageHeader from "components/GenericPageHeader";

const PlaylistHeader = ({ playlist }: { playlist: PlaylistType }) => {
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
  const [playlist, setPlaylist] = useState<PlaylistType | null>(null);
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
    setPlaylist(null);
    if (query.id) {
      getData(query.id as string);
    }
  }, [router]);
  if (!playlist) {
    return <GenericPageSkeleton />;
  }
  const header: GenericPageHeaderType = {
    type: "playlist",
    title: playlist.name,
    image: !!playlist.images.length ? playlist.images[0].url : FALLBACK_IMAGE,
    descriptions: [
      {
        type: "text",
        renderItems: `Created by ${playlist.owner.display_name}`,
      },
      {
        type: "text",
        renderItems: `${playlist.total_tracks} tracks`,
      },
    ],
  };
  return (
    <ProtectedRoute>
      <AppLayout>
        <main>
          <Head>
            <title>{playlist.name}</title>
          </Head>
          <div className={styles["container"]}>
            <GenericPageHeader header={header} />
            <TrackTable
              tracks={playlist.tracks}
              album={false}
              albumInfo={null}
            />
          </div>
        </main>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default PlaylistPage;
