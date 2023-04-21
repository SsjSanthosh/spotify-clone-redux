// src/context/auth-context.js
import React, { useState, createContext } from "react";
import { AuthType, ChildrenType } from "../utils/types";
import { AuthContextType } from "./types";
import { setAxiosToken } from "utils/functions";

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }: ChildrenType) => {
  const [auth, setAuth] = useState<AuthType>({
    token: null,
  });

  //   gets a token from the provider and sets it on the local storage
  const setToken = (data: AuthType) => {
    const token = data.token;
    if (token) {
      localStorage.setItem("token", token);
      setAuth({
        token,
      });
      setAxiosToken(token);
    }
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => !!auth.token;

  return (
    <Provider
      value={{
        auth,
        setToken,
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
