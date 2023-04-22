import AppLayout from "components/AppLayout";
import ProtectedRoute from "components/ProtectedRoute";
import Head from "next/head";
import { useRouter } from "next/router";

import React from "react";

const HomePage = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <ProtectedRoute>
      <AppLayout>
        <Head>
          <title>Spotify Clone - Santhosh </title>
        </Head>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
