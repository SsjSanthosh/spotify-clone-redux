import "styles/globals.css";
import "styles/normalize.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "context/auth";
import { UserProvider } from "context/user";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
