import React, { useEffect } from "react";
import styles from "./LoginPage.module.scss";

import SpotifyLogo from "../../../public/images/spotify_logo_white.png";
import Image from "next/image";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { GenericObject } from "utils/types";
import Link from "next/link";
import { BsGithub, BsLinkedin, BsSpotify, BsYoutube } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const LOGIN_ERROR_MESSAGES: GenericObject = {
  not_logged_in: "Please connect your account to access this app",
  expired_token:
    "Your token has expired, please connect again to continue using this app",
  forbidden:
    "Unauthorized access, please make sure you are a pre-approved user. Reach out to bgj.santhosh@gmail.com for any queries.",
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
        <Button
          size="lg"
          colorScheme="green"
          onClick={handleLogin}
          leftIcon={<BsSpotify size={20} />}
        >
          Connect your spotify account
        </Button>
        <Link href="https://youtu.be/abFK_pSoeXY">
          <Button
            size="lg"
            colorScheme="red"
            leftIcon={<BsYoutube size={20} />}
          >
            Watch a youtube walkthrough
          </Button>
        </Link>
        <Link href="https://www.linkedin.com/in/ssj-santhosh/">
          <Button
            size="lg"
            colorScheme="blue"
            leftIcon={<BsLinkedin size={20} />}
          >
            Connect on LinkedIn
          </Button>
        </Link>
        <Link href="https://github.com/SsjSanthosh/spotify-clone-redux">
          <Button
            size="lg"
            colorScheme="whiteAlpha"
            leftIcon={<BsGithub size={20} />}
          >
            Check out the source code on Github
          </Button>
        </Link>
        <Link href="mailto:bgj.santhosh@gmail.com">
          <Button
            size="lg"
            colorScheme="messenger"
            leftIcon={<AiOutlineMail size={20} />}
          >
           Email @ bgj.santhosh@gmail.com
          </Button>
        </Link>
        <h4>
          IMPORTANT NOTE - All users must be pre-approved to be able to connect
          to Spotify and use this app&apos;s features{" "}
          <a
            href="https://developer.spotify.com/documentation/web-api/concepts/quota-modes"
            target="_blank"
          >
            as per the Spotify API
          </a>
          . Please send an email to{" "}
          <a href="mailto:bgj.santhosh@gmail.com">bgj.santhosh@gmail.com</a>{" "}
          along with your spotify account email to be able to access this app
        </h4>
      </div>
    </div>
  );
};

export default LoginPage;
