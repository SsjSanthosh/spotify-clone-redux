import { Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Spinner
      thickness="4px"
      speed="0.85s"
      emptyColor="gray.700"
      color="green.700"
      size="xl"
      boxSize={200}
    />
  );
};

export default Loader;
