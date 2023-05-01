import { GenericObject } from "./types";

export const TOAST_MESSAGES: GenericObject = {
  success_redirect: "Your account has been connected successfully.",
  invalid_token:
    "Your security token is invalid, please connect your account and try again.",
};

export const BASE_ENDPOINT = `https://api.spotify.com/v1`;

export const FALLBACK_IMAGE =
  "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

export const COMMON_SKELETON_PROPS = {
  startColor: "whiteAlpha.300",
  endColor: "whiteAlpha.400",
};
