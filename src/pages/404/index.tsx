import React from "react";
import styles from "./404.module.scss";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
const NotFound = () => {
  return (
    <div className={styles["container"]}>
      <h1>404 | Page not found</h1>
      <Link href="/">
        <Button colorScheme="green">Go to the home page</Button>
      </Link>
    </div>
  );
};

export default NotFound;
