import React, { useEffect } from "react";
import styles from "./LoginPage.module.scss";

import SpotifyLogo from "../../../public/images/spotify_logo_white.png";
import Image from "next/image";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { GenericObject } from "utils/types";

const LOGIN_ERROR_MESSAGES: GenericObject = {
  not_logged_in: "Please connect your account to access this app",
  expired_token:
    "Your token has expired, please connect again to continue using this app",
};

const LoginPage = () => {
  const handleLogin = async () => {
    const rdata = await axios.get("/api/login");
    window.location.href = rdata.data.link;
  };
  const router = useRouter();
  const toast = useToast();
  const { query } = router;
  useEffect(() => {
    if (query.error && LOGIN_ERROR_MESSAGES[query.error as string]) {
      const id = "login-error";
      if (!toast.isActive(id)) {
        toast({
          position: "top",
          description: LOGIN_ERROR_MESSAGES[query.error as string],
          id,
        });
      }
    }
  }, [query, toast]);
  return (
    <div className={styles["container"]}>
      <Head>
        <title>Connect your Spotify account to continue</title>
      </Head>
      <div className={styles["logo-container"]}>
        <Image src={SpotifyLogo} fill alt="Spotify Logo" priority />
      </div>
      <div className={styles["button-container"]}>
        <Button size="lg" colorScheme="green" onClick={handleLogin}>
          Connect your spotify account
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
