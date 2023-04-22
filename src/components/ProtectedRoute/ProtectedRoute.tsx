import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ChildrenType } from "utils/types";
import styles from "./ProtectedRoute.module.scss";
import { Spinner } from "@chakra-ui/react";
import Loader from "components/Loader";
import { isTokenAvailable } from "utils/functions";
import { useAppDispatch } from "redux/types";
import { authSelector, setToken } from "redux/authSlice";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: ChildrenType) => {
  const router = useRouter();
  const token = isTokenAvailable();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useSelector(authSelector);
  useEffect(() => {
    if (!auth.token && !token) {
      router.push("/login?error=not_logged_in");
      setIsLoggedIn(false);
    } else if (!auth.token && token) {
      setIsLoggedIn(true);
      dispatch(setToken({ token }));
    } else {
      setIsLoggedIn(true);
    }
  }, [router, token, dispatch, auth.token]);

  return isLoggedIn ? (
    children
  ) : (
    <div className={styles["container"]}>
      <Loader />
    </div>
  );
};

export default ProtectedRoute;
