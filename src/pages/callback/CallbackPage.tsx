import Loader from "components/Loader";
import React, { useContext, useEffect } from "react";
import styles from "./CallbackPage.module.scss";
import { useRouter } from "next/router";
import queryString from "query-string";
import { AuthContext } from "context/auth";
import { AuthContextType } from "context/types";
const CallbackPage = () => {
  const router = useRouter();
  const { setToken } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const query = queryString.parse(window.location.hash);
    if (!query.access_token) {
        router.push("/login?error=invalid_token");
    } else {
      setToken({ token: query.access_token as string });
      router.push("/?message=success_redirect");
    }
  }, [router]);


  return (
    <div className={styles["container"]}>
      <Loader />
    </div>
  );
};

export default CallbackPage;
