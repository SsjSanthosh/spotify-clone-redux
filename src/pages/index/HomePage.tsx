import AppLayout from "components/AppLayout";
import ProtectedRoute from "components/ProtectedRoute";
import { AuthContext } from "context/auth";
import { AuthContextType } from "context/types";
import Head from "next/head";
import { useRouter } from "next/router";

import React, { useContext, useEffect } from "react";
import { TOAST_MESSAGES } from "utils/constants";

const HomePage = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <ProtectedRoute>
      <AppLayout>
        <Head>
          <title>Spotify Clone - Santhosh </title>
        </Head>
        <h1>hey</h1>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
