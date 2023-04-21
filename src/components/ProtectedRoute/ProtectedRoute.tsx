import { AuthContext } from "context/auth";
import { AuthContextType } from "context/types";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { ChildrenType } from "utils/types";
import styles from "./ProtectedRoute.module.scss";
import { Spinner } from "@chakra-ui/react";
import Loader from "components/Loader";

const ProtectedRoute = ({ children }: ChildrenType) => {
  const router = useRouter();
  const { isUserAuthenticated, setToken } = useContext(
    AuthContext
  ) as AuthContextType;
  const loggedIn = isUserAuthenticated();

  useEffect(() => {
    if (!loggedIn && typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      if (token) {
        setToken({ token });
      } else router.push("/login?error=not_logged_in");
    }
  }, [router, loggedIn, setToken]);
  if (loggedIn) {
    return children;
  }
  return (
    <div className={styles["container"]}>
      <Loader />
    </div>
  );
};

export default ProtectedRoute;
