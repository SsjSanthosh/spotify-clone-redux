import React from "react";

export interface AuthType {
  token: null | string;
}

export interface ChildrenType {
  children: React.ReactElement;
}

export interface GenericObject {
  [key: string]: any;
}
