import {
  AlbumType,
  ArtistProfile,
  ArtistType,
  GenericPageHeaderType,
  TrackType,
} from "utils/types";
import styles from "./ArtistPage.module.scss";
import { useState, useEffect } from "react";
import ProtectedRoute from "components/ProtectedRoute";
import AppLayout from "components/AppLayout";
import { useRouter } from "next/router";
import { fetchData } from "utils/functions";
import {
  ARTIST_ALBUMS_ENDPOINT,
  ARTIST_ENDPOINT,
  ARTIST_TOP_TRACKS_ENDPOINT,
  RELATED_ARTISTS_ENDPOINT,
} from "utils/endpoints";
import GenericPageHeader from "components/GenericPageHeader";
import GenericPageSkeleton from "components/GenericPageSkeleton";
import { FALLBACK_IMAGE } from "utils/constants";
import SectionHeader from "components/SectionHeader";
import TrackTable from "components/TrackTable";
import AlbumCard from "components/AlbumCard";
import ArtistCard from "components/ArtistCard";

interface ArtistStateType {
  profile: ArtistProfile;
  tracks: TrackType[];
  albums: AlbumType[];
  related: ArtistProfile[];
}

const ArtistPage = () => {
  const [artist, setArtist] = useState<null | ArtistStateType>(null);
  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    const fetchArtist = async () => {
      const [profile, tracks, albums, related] = await Promise.all([
        await fetchData(ARTIST_ENDPOINT.replace("{id}", query.id as string)),
        await fetchData(
          ARTIST_TOP_TRACKS_ENDPOINT.replace("{id}", query.id as string)
        ),
        await fetchData(
          ARTIST_ALBUMS_ENDPOINT.replace("{id}", query.id as string)
        ),
        await fetchData(
          RELATED_ARTISTS_ENDPOINT.replace("{id}", query.id as string)
        ),
      ]);
      setArtist((old) => ({
        ...old,
        profile: profile,
        tracks: tracks.tracks.slice(0, 5),
        albums: albums.items.slice(10),
        related: related.artists.slice(0, 10),
      }));
    };

    if (query.id) {
      // setArtist(null);
      fetchArtist();
    }
  }, [query]);
  if (!artist) {
    return <GenericPageSkeleton />;
  }

  const { name, uri, images } = artist.profile;

  const header: GenericPageHeaderType = {
    title: name,
    uri: uri,
    image: images.length ? images[0].url : FALLBACK_IMAGE,
    type: "Artist",
    showPlayButton: true,
    descriptions: [
      {
        renderItems: `${
          new Intl.NumberFormat("en-IN").format(artist.profile.followers.total) as unknown as string
        } followers`,
        type: "text",
      },
    ],
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <GenericPageHeader imageType="circle" header={header} />
        <div className={styles["container"]}>
          <section className={styles["tracks-section"]}>
            <SectionHeader title="Popular tracks" />
            <TrackTable tracks={artist.tracks} album={false} albumInfo={null} />
          </section>
          <section className={styles["albums-section"]}>
            <SectionHeader title="Albums" />
            <div className={styles["albums-container"]}>
              {!!artist.albums.length &&
                artist.albums.map((alb) => {
                  return <AlbumCard album={alb} key={alb.id} />;
                })}
            </div>
          </section>
          <section className={styles["artists-section"]}>
            <SectionHeader title="Related artists" />
            <div className={styles["artists-container"]}>
              {!!artist.related.length &&
                artist.related.map((art) => {
                  return <ArtistCard artist={art} key={art.id} />;
                })}
            </div>
          </section>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default ArtistPage;
