import React from "react";

export interface ProfileType {
  country: string;
  email: string;
  product: string;
  display_name: string;
  external_urls: GenericObject;
  followers: {
    href: null | string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    url: string | null;
    height: null | number;
    width: null | number;
  }[];
  type: string;
  uri: string;
}

export interface UserType {
  profile: ProfileType | null;
  playlists: PlaylistType[] | null;
  loading: boolean;
  error?: boolean;
}
export interface AuthType {
  token: null | string;
}

export interface PlayerType {
  player: {
    device: {
      id: string;
      is_active: boolean;
      is_private_session: boolean;
      name: string;
      type: string;
      volume_percent: number;
    };
    repeat_state: "off" | "context" | "track";
    shuffle_state: boolean;
    context: {
      type: string;
      href: string;
      external_urls: {
        spotify: string;
      };
      uri: string;
    };
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item: TrackType;
  } | null;
  loading: boolean;
  error: null | string;
}

export interface ChildrenType {
  children: React.ReactElement;
}

export interface GenericObject {
  [key: string]: any;
}

export interface SpotifyImageType {
  height: number;
  width: number;
  url: string;
}

export interface ArtistType {
  href: string;
  id: string;
  type: string;
  name: string;
  uri: string;
  images: SpotifyImageType[];
}

export interface GenreType {
  href: string;
  id: string;
  name: string;
  uri: string;
  icons: {
    url: string;
  }[];
}

export interface PlaylistType {
  collaborative: boolean;
  description: string;
  id: string;
  primary_color: null | string;
  tracks: TrackType[];
  type: string;
  images: SpotifyImageType[];
  name: string;
  uri: string;
  total_tracks?: number;
  owner: {
    display_name: string;
  };
}

export interface AlbumType {
  album_type: string;
  album_group: string;
  artists: ArtistType[];
  images: SpotifyImageType[];
  is_playable: boolean;
  name: string;
  release_date: string;
  total_tracks: number;
  uri: string;
  id: string;
  tracks: { items: TrackType[] };
}

export interface TrackType {
  id: string;
  added_at: string;
  name: string;
  artists?: ArtistType[];
  album: AlbumType;
  track_number: number;
  duration_ms: number;
  uri: string;
}

export interface GenericPageHeaderType {
  title: string;
  descriptions: {
    type: "artists" | "text";
    renderItems: ArtistType[] | string;
  }[];
  image: string;
  type: string;
  uri?: string;
  showPlayButton: boolean;
}

export interface ArtistProfile {
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  id: string;
  images: SpotifyImageType[];
  name: string;
  popularity: number;
  uri: string;
  type: string;
}

export type CompactCardType = ArtistType | PlaylistType | AlbumType;
