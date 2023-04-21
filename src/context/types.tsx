import { AuthType } from "../utils/types";

export interface AuthContextType {
  auth: AuthType;
  setToken: (data: AuthType) => void;
  isUserAuthenticated: () => boolean;
}
