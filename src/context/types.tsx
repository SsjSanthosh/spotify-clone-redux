import { AuthType, ProfileType, UserType } from "../utils/types";

export interface AuthContextType {
  auth: AuthType;
  setToken: (data: AuthType) => void;
  isUserAuthenticated: () => boolean;
}

export interface UserContextType {
  user: UserType;
  fetchUser: () => void;
  fetchPlaylists: () => void;
}
