import { PLAYER_PLAY_ENDPOINT } from "./endpoints";
import { putData } from "./functions";
import { GenericObject } from "./types";

export const playPauseResource = async (uri: GenericObject) => {
  await putData(PLAYER_PLAY_ENDPOINT, { ...uri });
};
