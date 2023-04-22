import { createContext, useState } from "react";
import { UserContextType } from "./types";
import { ChildrenType, UserType } from "utils/types";
import { fetchData } from "utils/functions";
import { MY_PROFILE_ENDPOINT, USER_PLAYLISTS_ENDPOINT } from "utils/endpoints";

const UserContext = createContext<UserContextType | null>(null);

const { Provider } = UserContext;

const UserProvider = ({ children }: ChildrenType) => {
  const [user, setUser] = useState<UserType>({
    profile: null,
    playlists: null,
  });

  //   fetches user and sets profile
  const fetchUser = async () => {
    const data = await fetchData(MY_PROFILE_ENDPOINT);
    if (data.data) {
      setUser((user) => ({ ...user, profile: data.data }));
    }
  };

  const fetchPlaylists = async () => {
    const data = await fetchData(
      USER_PLAYLISTS_ENDPOINT.replace("{user_id}", user.profile?.id as string)
    );
    if (data.data) {
      setUser((user) => ({ ...user, playlists: data.data }));
    }
  };

  return <Provider value={{ user, fetchUser, fetchPlaylists }}>{children}</Provider>;
};

export { UserContext, UserProvider };
