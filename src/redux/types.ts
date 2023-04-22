import { AuthType, UserType } from "utils/types";
import { useDispatch } from "react-redux";
import { store } from "./store";

export interface RootReduxState {
  auth: AuthType;
  user: UserType;
}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;