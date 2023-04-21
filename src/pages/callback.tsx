import { useRouter } from "next/router";
import React from "react";

const CallbackPage = () => {
  const router = useRouter();
  const query = router.query;
  return <div>callback</div>;
};

export default CallbackPage;
