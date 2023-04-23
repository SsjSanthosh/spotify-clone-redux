import { AuthType, PlayerType, UserType } from "utils/types";
import { useDispatch } from "react-redux";
import { store } from "./store";

export interface RootReduxState {
  auth: AuthType;
  user: UserType;
  player: PlayerType;
}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
