import Loader from "components/Loader";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PlaylistDummy = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);
  return (
    <div className="loader-div">
      <Loader />
    </div>
  );
};

export default PlaylistDummy;
