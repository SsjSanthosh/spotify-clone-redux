import Loader from "components/Loader";
import React, { useContext, useEffect } from "react";
import styles from "./CallbackPage.module.scss";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useAppDispatch } from "redux/types";
import { authSelector, setToken } from "redux/authSlice";
import { useSelector } from "react-redux";
import { SkeletonText } from "@chakra-ui/react";
import { COMMON_SKELETON_PROPS } from "utils/constants";
const CallbackPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const query = queryString.parse(window.location.hash);
    if (!query.access_token) {
      router.push("/login?error=invalid_token");
    } else {
      dispatch(setToken({ token: query.access_token as string }));
      router.push("/?message=success_redirect");
    }
  }, [router, dispatch]);

  return (
    <div className={styles["container"]}>
      <div className={styles["skeleton-container"]}>
        <SkeletonText noOfLines={15} spacing={7} {...COMMON_SKELETON_PROPS} />
      </div>
    </div>
  );
};

export default CallbackPage;
