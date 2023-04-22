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
  };
  type: string;
  uri: string;
}

export interface UserType {
  profile: ProfileType | null;
  playlists: GenericObject[] | null;
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
