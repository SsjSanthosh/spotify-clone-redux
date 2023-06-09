import AppLayout from "components/AppLayout";
import styles from "./HomePage.module.scss";
import ProtectedRoute from "components/ProtectedRoute";
import SectionHeader from "components/SectionHeader";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "redux/userSlice";
import GenericPageSkeleton from "components/GenericPageSkeleton";
import CompactPlayCard from "components/CompactPlayCard";
import { PlaylistType } from "utils/types";
import { fetchData } from "utils/functions";
import { FEATURED_PLAYLISTS_ENDPOINT } from "utils/endpoints";
import PlaylistCard from "components/PlaylistCard";
import { themeSelector } from "redux/themeSlice";
import Head from "next/head";

interface FeaturedListsType {
  playlists: PlaylistType[]; //
  message: string;
}

const HomePage = () => {
  const hour = dayjs().hour();
  const greetingTime =
    hour < 12 ? "morning" : hour > 17 ? "evening" : "afternoon";
  const { profile, playlists } = useSelector(userSelector);
  const [featuredLists, setFeaturedLists] = useState<FeaturedListsType | null>(
    null
  );
  const { contextColor } = useSelector(themeSelector);

  useEffect(() => {
    const fetchFeaturedLists = async () => {
      const data = await fetchData(FEATURED_PLAYLISTS_ENDPOINT);
      setFeaturedLists({
        message: data.message,
        playlists: data.playlists.items,
      });
    };
    if (profile && !featuredLists?.playlists) {
      fetchFeaturedLists();
    }
  }, [profile, featuredLists]);

  if (!profile) {
    return <GenericPageSkeleton />;
  }
  return (
    <ProtectedRoute>
      <AppLayout>
        <Head>
          <title>Spotify clone - A project by Santhosh</title>
        </Head>
        <div className={styles["container"]}>
          <section
            className={styles["user-playlists-wrapper"]}
          >
            <SectionHeader title={`Good ${greetingTime}`} size="large" />
            <div className={styles["user-playlists-container"]}>
              {!!playlists?.length &&
                playlists.slice(0, 6).map((play) => {
                  return <CompactPlayCard play={play} key={play.id} route="playlist" />;
                })}
            </div>
          </section>
          {!!featuredLists?.playlists.length && (
            <section className={styles["user-featured-wrapped"]}>
              <SectionHeader title={featuredLists.message} />
              <div className={styles["user-featured-container"]}>
                {featuredLists.playlists.map((play) => {
                  return <PlaylistCard playlist={play} key={play.id} />;
                })}
              </div>
            </section>
          )}
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
