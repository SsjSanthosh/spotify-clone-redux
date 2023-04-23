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
  playlists: GenericObject[] | null;
  loading: boolean;
  error?: boolean;
}
export interface AuthType {
  token: null | string;
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
}

export interface GenreType {
  href: string;
  id: string;
  name: string;
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
}

export interface TrackType {
  id: string;
  added_at: string;
  name: string;
  artists?: ArtistType[];
  album: AlbumType;
  track_number: number;
  duration_ms: number;
}
