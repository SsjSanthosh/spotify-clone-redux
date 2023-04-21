import React from "react";

export interface NavlinkType {
  icon: React.ReactNode;
  text: String;
  link: String;
  key: React.Key;
}

export interface UserActionLink extends NavlinkType {
  iconContainerClassName: String;
}
