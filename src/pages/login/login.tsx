import React, { useContext } from "react";
import styles from "./LoginPage.module.scss";

import SpotifyLogo from "../../../public/images/spotify_logo_white.png";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "context/auth";
import { AuthContextType } from "context/types";
import Head from "next/head";

const LoginPage = () => {
  const handleLogin = async () => {
    const rdata = await axios.get("/api/login");
    window.location.href = rdata.data.link;
  };

  const auth = useContext(AuthContext) as AuthContextType;
  return (
    <div className={styles["container"]}>
      <Head>
        <title>Connect your Spotify account to continue</title>
      </Head>
      <div className={styles["logo-container"]}>
        <Image src={SpotifyLogo} fill alt="Spotify Logo" />
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
